'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Send, Loader2 } from 'lucide-react';
import type { Question } from '@/types';
import { useQuiz } from '@/hooks/useQuiz';
import { useTimer } from '@/hooks/useTimer';
import api from '@/lib/api';
import QuizIntro from './QuizIntro';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import TimerDisplay from './TimerDisplay';
import QuizNav from './QuizNav';

interface QuizPlayerProps {
  quizId: string;
  title: string;
  slug: string;
  description: string | null;
  instruction: string | null;
  quizType: string;
  timeLimitMins: number;
  questions: Question[];
}

export default function QuizPlayer({
  quizId,
  title,
  slug,
  description,
  instruction,
  quizType,
  timeLimitMins,
  questions,
}: QuizPlayerProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);
  const startTimeRef = useRef<number>(0);

  const quiz = useQuiz({ questions, quizSlug: slug });

  const handleTimeUp = useCallback(() => {
    handleSubmit();
  }, []);

  const timer = useTimer({
    totalMinutes: timeLimitMins,
    onTimeUp: handleTimeUp,
  });

  function handleStart() {
    quiz.startQuiz();
    timer.start();
    startTimeRef.current = Date.now();
  }

  function handleSelectAnswer(questionId: string, answerId: string) {
    quiz.selectAnswer(questionId, answerId);
    // Auto-advance after 500ms
    setTimeout(() => {
      if (quiz.currentIndex < questions.length - 1) {
        setDirection(1);
        quiz.goNext();
      }
    }, 500);
  }

  function handleGoBack() {
    setDirection(-1);
    quiz.goBack();
  }

  function handleGoNext() {
    setDirection(1);
    quiz.goNext();
  }

  async function handleSubmit() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    timer.pause();

    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);

    try {
      const response = await api.post('/quiz-engine/submit', {
        quizId,
        answers: quiz.getSubmitData(),
        timeSpentSecs: timeSpent,
      });

      quiz.completeQuiz();
      router.push(`/result/${response.data.resultId}`);
    } catch (error) {
      console.error('Submit failed:', error);
      setIsSubmitting(false);
      alert('Có lỗi khi gửi bài. Vui lòng thử lại.');
    }
  }

  // Intro screen
  if (!quiz.isStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <QuizIntro
          title={title}
          description={description}
          instruction={instruction}
          totalQuestions={questions.length}
          timeLimitMins={timeLimitMins}
          onStart={handleStart}
        />
      </div>
    );
  }

  const isLastQuestion = quiz.currentIndex >= questions.length - 1;
  const allAnswered = quiz.answeredCount >= questions.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top bar: Timer + Progress */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <ProgressBar current={quiz.answeredCount} total={quiz.totalQuestions} />
        </div>
        <TimerDisplay
          display={timer.display}
          isWarning={timer.isWarning}
          isCritical={timer.isCritical}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* Main question area */}
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 min-h-[400px] flex flex-col">
          {/* Question number */}
          <span className="text-xs text-muted font-medium mb-4">
            Câu {quiz.currentIndex + 1} / {quiz.totalQuestions}
          </span>

          {/* Question + Answers */}
          <div className="flex-1">
            {quiz.currentQuestion && (
              <QuestionCard
                question={quiz.currentQuestion}
                selectedAnswerId={quiz.answers[quiz.currentQuestion.id] || null}
                onSelectAnswer={handleSelectAnswer}
                direction={direction}
              />
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <button
              onClick={handleGoBack}
              disabled={quiz.currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-dark hover:bg-light-secondary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Câu trước
            </button>

            {isLastQuestion || allAnswered ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !allAnswered}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Nộp bài ({quiz.answeredCount}/{quiz.totalQuestions})
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleGoNext}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-primary hover:bg-primary/5 transition-all"
              >
                Câu tiếp
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar: QuizNav (desktop only) */}
        <div className="hidden lg:block">
          <QuizNav
            total={quiz.totalQuestions}
            currentIndex={quiz.currentIndex}
            answers={quiz.answers}
            questionIds={questions.map((q) => q.id)}
            onJump={(idx) => {
              setDirection(idx > quiz.currentIndex ? 1 : -1);
              quiz.goToQuestion(idx);
            }}
          />
        </div>
      </div>
    </div>
  );
}

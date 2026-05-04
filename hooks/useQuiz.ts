'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Question } from '@/types';

interface UseQuizOptions {
  questions: Question[];
  quizSlug: string;
}

interface QuizState {
  currentIndex: number;
  answers: Record<string, string>; // questionId -> answerId
  isStarted: boolean;
  isCompleted: boolean;
  hasSavedProgress?: boolean;
}

const STORAGE_PREFIX = 'quiz_progress_';

function loadState(quizSlug: string): QuizState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + quizSlug);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(quizSlug: string, state: QuizState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_PREFIX + quizSlug, JSON.stringify(state));
}

function clearState(quizSlug: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_PREFIX + quizSlug);
}

export function useQuiz({ questions, quizSlug }: UseQuizOptions) {
  const [state, setState] = useState<QuizState>(() => {
    const saved = loadState(quizSlug);
    if (saved && saved.isStarted && !saved.isCompleted) {
      return {
        ...saved,
        isStarted: false, // Force Intro screen to show
        hasSavedProgress: true, // Flag to show "Resume" button
      };
    }
    return {
      currentIndex: 0,
      answers: {},
      isStarted: false,
      isCompleted: false,
      hasSavedProgress: false,
    };
  });

  // Persist to localStorage
  useEffect(() => {
    // We only save if isStarted is true (user is actively taking the quiz)
    if (state.isStarted && !state.isCompleted) {
      saveState(quizSlug, state);
    }
  }, [state, quizSlug]);

  const currentQuestion = questions[state.currentIndex] || null;
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(state.answers).length;
  const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  const startQuiz = useCallback(() => {
    setState((prev) => ({ ...prev, isStarted: true, hasSavedProgress: false }));
  }, []);

  const resetQuiz = useCallback(() => {
    clearState(quizSlug);
    setState({
      currentIndex: 0,
      answers: {},
      isStarted: true,
      isCompleted: false,
      hasSavedProgress: false,
    });
  }, [quizSlug]);

  const selectAnswer = useCallback(
    (questionId: string, answerId: string) => {
      setState((prev) => {
        const newAnswers = { ...prev.answers, [questionId]: answerId };
        return {
          ...prev,
          answers: newAnswers,
          // Auto-advance after 500ms is handled in the component
        };
      });
    },
    []
  );

  const goNext = useCallback(() => {
    setState((prev) => {
      if (prev.currentIndex >= totalQuestions - 1) return prev;
      return { ...prev, currentIndex: prev.currentIndex + 1 };
    });
  }, [totalQuestions]);

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.currentIndex <= 0) return prev;
      return { ...prev, currentIndex: prev.currentIndex - 1 };
    });
  }, []);

  const goToQuestion = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalQuestions) return;
      setState((prev) => ({ ...prev, currentIndex: index }));
    },
    [totalQuestions]
  );

  const completeQuiz = useCallback(() => {
    setState((prev) => ({ ...prev, isCompleted: true }));
    clearState(quizSlug);
  }, [quizSlug]);

  const getSubmitData = useCallback(() => {
    return Object.entries(state.answers).map(([questionId, answerId]) => ({
      questionId,
      answerId,
    }));
  }, [state.answers]);

  return {
    // State
    currentIndex: state.currentIndex,
    currentQuestion,
    answers: state.answers,
    isStarted: state.isStarted,
    isCompleted: state.isCompleted,
    hasSavedProgress: state.hasSavedProgress,
    totalQuestions,
    answeredCount,
    progress,

    // Actions
    startQuiz,
    resetQuiz,
    selectAnswer,
    goNext,
    goBack,
    goToQuestion,
    completeQuiz,
    getSubmitData,
  };
}

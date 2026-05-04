'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '@/types';
import AnswerButton from './AnswerButton';

interface QuestionCardProps {
  question: Question;
  selectedAnswerId: string | null;
  onSelectAnswer: (questionId: string, answerId: string) => void;
  direction: number; // 1 = forward, -1 = backward
}

const answerLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

export default function QuestionCard({
  question,
  selectedAnswerId,
  onSelectAnswer,
  direction,
}: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {/* Question text */}
        <h2 className="font-heading text-lg md:text-xl font-semibold mb-6 leading-relaxed" style={{ color: 'var(--text-main)' }}>
          {question.content}
        </h2>

        {/* Answers */}
        <div className="space-y-3">
          {question.answers.map((answer, idx) => (
            <AnswerButton
              key={answer.id}
              content={answer.content}
              label={answerLabels[idx] || String(idx + 1)}
              isSelected={selectedAnswerId === answer.id}
              onClick={() => onSelectAnswer(question.id, answer.id)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

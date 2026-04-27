'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnswerButtonProps {
  content: string;
  label: string; // "A", "B", etc
  isSelected: boolean;
  onClick: () => void;
}

export default function AnswerButton({ content, label, isSelected, onClick }: AnswerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200',
        'flex items-center gap-4 min-h-[56px]',
        isSelected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-white hover:border-primary/40 hover:bg-primary/[0.02]',
      )}
    >
      {/* Label circle */}
      <span
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
          isSelected
            ? 'bg-primary text-white'
            : 'bg-light-secondary text-dark/60 group-hover:bg-primary/10 group-hover:text-primary',
        )}
      >
        {isSelected ? <Check className="w-4 h-4" /> : label}
      </span>

      {/* Content */}
      <span
        className={cn(
          'text-sm md:text-base leading-relaxed transition-colors',
          isSelected ? 'text-dark font-medium' : 'text-dark/80',
        )}
      >
        {content}
      </span>
    </button>
  );
}

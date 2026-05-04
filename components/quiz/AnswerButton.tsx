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
          ? 'border-primary bg-primary/10 shadow-sm'
          : 'border-transparent glass-panel-dark hover:border-primary/40 hover:bg-primary/5',
      )}
      style={!isSelected ? { borderColor: 'var(--glass-border)' } : undefined}
    >
      {/* Label circle */}
      <span
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
          isSelected
            ? 'bg-primary text-white'
            : 'bg-[var(--glass-bg)] group-hover:bg-primary/20 group-hover:text-primary',
        )}
        style={!isSelected ? { color: 'var(--text-muted)' } : undefined}
      >
        {isSelected ? <Check className="w-4 h-4" /> : label}
      </span>

      {/* Content */}
      <span
        className={cn(
          'text-sm md:text-base leading-relaxed transition-colors',
          isSelected ? 'font-medium' : 'font-light',
        )}
        style={{ color: isSelected ? 'var(--text-main)' : 'var(--text-muted)' }}
      >
        {content}
      </span>
    </button>
  );
}

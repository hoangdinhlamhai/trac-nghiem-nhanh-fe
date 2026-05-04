import Link from 'next/link';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import type { Quiz } from '@/types';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  quiz: Quiz;
  className?: string;
}

export default function QuizCard({ quiz, className }: QuizCardProps) {
  return (
    <Link
      href={`/quiz/${quiz.slug}`}
      className={cn(
        'group flex flex-col h-full glass-panel-dark rounded-xl p-5 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1',
        className,
      )}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text-main)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
    >
      {/* Meta row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          {quiz.totalQuestions} câu
        </span>
        <span className="text-xs text-muted flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {quiz.timeLimitMins} phút
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-main mb-2 line-clamp-2 transition-colors">
        {quiz.title}
      </h3>

      {/* Description — fixed height via line-clamp */}
      <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4 flex-1 font-light">
        {quiz.description || '\u00A0'}
      </p>

      {/* Footer — always pinned to bottom */}
      <div className="flex items-center justify-between pt-3 border-t mt-auto" style={{ borderColor: 'var(--glass-border)' }}>
        <span className="text-sm font-medium text-main flex items-center gap-1 group-hover:gap-2 transition-all">
          Bắt đầu
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

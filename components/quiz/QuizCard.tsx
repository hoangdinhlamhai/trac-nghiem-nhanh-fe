import Link from 'next/link';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import type { Quiz } from '@/types';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  quiz: Quiz;
  className?: string;
}

const typeColors: Record<string, string> = {
  MBTI: 'bg-purple-100 text-purple-700',
  SCORED: 'bg-blue-100 text-blue-700',
  PERSONALITY: 'bg-emerald-100 text-emerald-700',
};

export default function QuizCard({ quiz, className }: QuizCardProps) {
  return (
    <Link
      href={`/quiz/${quiz.slug}`}
      className={cn(
        'group block bg-white rounded-xl border border-border p-5 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1',
        className,
      )}
    >
      {/* Type badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            'px-2.5 py-0.5 rounded-full text-xs font-semibold',
            typeColors[quiz.quizType] || 'bg-gray-100 text-gray-600',
          )}
        >
          {quiz.quizType}
        </span>
        <span className="text-xs text-muted flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          {quiz.totalQuestions} câu
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-dark mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {quiz.title}
      </h3>

      {/* Description */}
      {quiz.description && (
        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">
          {quiz.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {quiz.timeLimitMins} phút
        </span>
        <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
          Làm bài
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

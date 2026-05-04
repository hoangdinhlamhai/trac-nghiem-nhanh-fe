'use client';

import { CheckCircle2, Target } from 'lucide-react';
import type { ScoredResultData } from '@/types';

interface ScoredResultProps {
  scoreData: ScoredResultData;
}

function getGradeColor(grade: string): string {
  switch (grade) {
    case 'Xuất sắc':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'Giỏi':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'Khá':
      return 'text-cyan-600 bg-cyan-50 border-cyan-200';
    case 'Trung bình':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'Yếu':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-muted bg-light-secondary border-border';
  }
}

function getProgressColor(percentage: number): string {
  if (percentage >= 90) return 'bg-green-500';
  if (percentage >= 80) return 'bg-blue-500';
  if (percentage >= 65) return 'bg-cyan-500';
  if (percentage >= 50) return 'bg-amber-500';
  return 'bg-red-500';
}

export default function ScoredResult({ scoreData }: ScoredResultProps) {
  const { correctCount, totalQuestions, percentage, grade } = scoreData;
  const gradeColor = getGradeColor(grade);
  const progressColor = getProgressColor(percentage);

  return (
    <div className="space-y-6">
      {/* Score overview */}
      <div className="glass-panel-dark rounded-2xl p-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Kết quả của bạn</span>
        </div>

        {/* Percentage display */}
        <div className="mb-4">
          <span className="font-heading text-5xl md:text-6xl font-bold" style={{ color: 'var(--text-main)' }}>
            {percentage}%
          </span>
        </div>

        {/* Correct count */}
        <div className="flex items-center justify-center gap-2 mb-6" style={{ color: 'var(--text-muted)' }}>
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm">
            {correctCount} / {totalQuestions} câu đúng
          </span>
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--glass-bg)' }}>
            <div
              className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Grade badge */}
        <div className="inline-block">
          <span className={`px-5 py-2 rounded-lg border text-lg font-semibold ${gradeColor}`}>
            {grade}
          </span>
        </div>
      </div>
    </div>
  );
}

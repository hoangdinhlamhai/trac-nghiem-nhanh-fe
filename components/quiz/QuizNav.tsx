'use client';

import { cn } from '@/lib/utils';

interface QuizNavProps {
  total: number;
  currentIndex: number;
  answers: Record<string, string>;
  questionIds: string[];
  onJump: (index: number) => void;
}

export default function QuizNav({ total, currentIndex, answers, questionIds, onJump }: QuizNavProps) {
  return (
    <div className="glass-panel-dark rounded-xl p-4">
      <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-main)' }}>Danh sách câu hỏi</h3>
      <div className="grid grid-cols-10 gap-1.5">
        {Array.from({ length: total }, (_, i) => {
          const qId = questionIds[i];
          const isAnswered = qId && qId in answers;
          const isCurrent = i === currentIndex;

          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              className={cn(
                'w-full aspect-square rounded-md text-xs font-medium transition-all',
                isCurrent
                  ? 'bg-primary text-white shadow-sm ring-2 ring-primary/30'
                  : isAnswered
                    ? 'bg-primary/20 text-primary hover:bg-primary/30'
                    : 'bg-[var(--glass-bg)] hover:bg-[var(--glass-border)]'
              )}
              style={!isCurrent && !isAnswered ? { color: 'var(--text-muted)' } : undefined}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-primary" /> Đang làm
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-primary/20" /> Đã trả lời
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-[var(--glass-bg)]" /> Chưa trả lời
        </span>
      </div>
    </div>
  );
}

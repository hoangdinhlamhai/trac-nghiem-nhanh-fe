'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-dark whitespace-nowrap">
        Câu {current}/{total}
      </span>
      <div className="flex-1 h-2.5 bg-light-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            'bg-gradient-to-r from-primary to-primary-dark',
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-muted whitespace-nowrap">
        {Math.round(percent)}%
      </span>
    </div>
  );
}

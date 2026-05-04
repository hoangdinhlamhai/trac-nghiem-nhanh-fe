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
      <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--text-main)' }}>
        Câu {current}/{total}
      </span>
      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--glass-bg)' }}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            'bg-gradient-to-r from-primary to-primary-dark',
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
        {Math.round(percent)}%
      </span>
    </div>
  );
}

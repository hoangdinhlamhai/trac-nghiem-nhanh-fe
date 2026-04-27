'use client';

import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  display: string;
  isWarning: boolean;
  isCritical: boolean;
}

export default function TimerDisplay({ display, isWarning, isCritical }: TimerDisplayProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all',
        isCritical
          ? 'bg-accent/10 text-accent animate-pulse-soft'
          : isWarning
            ? 'bg-warning/10 text-warning'
            : 'bg-primary/10 text-primary',
      )}
    >
      <Clock className="w-4 h-4" />
      <span>{display}</span>
    </div>
  );
}

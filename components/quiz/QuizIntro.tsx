'use client';

import { Clock, FileText, ArrowRight, AlertTriangle, RotateCcw } from 'lucide-react';

interface QuizIntroProps {
  title: string;
  description: string | null;
  instruction: string | null;
  totalQuestions: number;
  timeLimitMins: number;
  hasSavedProgress?: boolean;
  onStart: () => void;
  onReset?: () => void;
}

export default function QuizIntro({
  title,
  description,
  instruction,
  totalQuestions,
  timeLimitMins,
  hasSavedProgress,
  onStart,
  onReset,
}: QuizIntroProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <h1 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="leading-relaxed mb-6 font-light" style={{ color: 'var(--text-muted)' }}>{description}</p>
      )}

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-4 glass-panel-dark rounded-xl">
          <FileText className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Số câu hỏi</p>
            <p className="font-semibold" style={{ color: 'var(--text-main)' }}>{totalQuestions} câu</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 glass-panel-dark rounded-xl">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Thời gian</p>
            <p className="font-semibold" style={{ color: 'var(--text-main)' }}>{timeLimitMins} phút</p>
          </div>
        </div>
      </div>

      {/* Instruction */}
      {instruction && (
        <div className="glass-panel-dark rounded-xl p-5 mb-6 border-l-4" style={{ borderLeftColor: 'var(--color-primary)' }}>
          <h3 className="font-heading font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
            <AlertTriangle className="w-4 h-4 text-warning" />
            Hướng dẫn
          </h3>
          <div className="text-sm leading-relaxed whitespace-pre-line font-light" style={{ color: 'var(--text-muted)' }}>
            {instruction}
          </div>
        </div>
      )}

      {/* Start button */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onStart}
          className="group w-full py-4 rounded-xl bg-primary text-white font-heading font-semibold text-lg hover:bg-primary-dark transition-all duration-300 shadow-[var(--shadow-glow)] hover:shadow-lg flex items-center justify-center gap-2"
        >
          {hasSavedProgress ? 'Tiếp tục làm bài' : 'Bắt đầu làm bài'}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        
        {hasSavedProgress && onReset && (
          <button
            onClick={onReset}
            className="group w-full py-3.5 rounded-xl border border-[var(--glass-border)] bg-transparent text-sm hover:bg-[var(--glass-bg)] transition-all duration-300 flex items-center justify-center gap-2"
            style={{ color: 'var(--text-muted)' }}
          >
            <RotateCcw className="w-4 h-4" />
            Làm lại từ đầu
          </button>
        )}
      </div>
    </div>
  );
}

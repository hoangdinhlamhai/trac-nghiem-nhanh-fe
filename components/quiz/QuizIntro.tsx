'use client';

import { Clock, FileText, ArrowRight, AlertTriangle } from 'lucide-react';

interface QuizIntroProps {
  title: string;
  description: string | null;
  instruction: string | null;
  totalQuestions: number;
  timeLimitMins: number;
  onStart: () => void;
}

export default function QuizIntro({
  title,
  description,
  instruction,
  totalQuestions,
  timeLimitMins,
  onStart,
}: QuizIntroProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <h1 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-4">
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-muted leading-relaxed mb-6">{description}</p>
      )}

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border">
          <FileText className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted">Số câu hỏi</p>
            <p className="font-semibold text-dark">{totalQuestions} câu</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted">Thời gian</p>
            <p className="font-semibold text-dark">{timeLimitMins} phút</p>
          </div>
        </div>
      </div>

      {/* Instruction */}
      {instruction && (
        <div className="bg-primary-light rounded-xl p-5 mb-6">
          <h3 className="font-heading font-semibold text-dark mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Hướng dẫn
          </h3>
          <div className="text-sm text-dark/70 leading-relaxed whitespace-pre-line">
            {instruction}
          </div>
        </div>
      )}

      {/* Start button */}
      <button
        onClick={onStart}
        className="group w-full py-4 rounded-xl bg-primary text-white font-heading font-semibold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 flex items-center justify-center gap-2"
      >
        Bắt đầu làm bài
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

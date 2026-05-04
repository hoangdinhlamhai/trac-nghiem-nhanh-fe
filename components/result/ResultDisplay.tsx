'use client';

import { Clock, Calendar } from 'lucide-react';
import type { QuizResult, QuizType } from '@/types';
import MBTIResult from './MBTIResult';
import ScoredResult from './ScoredResult';
import ScaleResult from './ScaleResult';
import ShareButtons from './ShareButtons';

interface ResultDisplayProps {
  result: QuizResult;
  quizTitle: string;
  quizType: QuizType;
  resultId: string;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ResultDisplay({ result, quizTitle, quizType, resultId }: ResultDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
          {quizTitle}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {formatTime(result.timeSpentSecs)}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(result.completedAt)}
          </span>
        </div>
      </div>

      {/* Result content by quiz type */}
      <div className="mb-8">
        {quizType === 'MBTI' && result.mbtiDetail && (
          <MBTIResult mbtiDetail={result.mbtiDetail} />
        )}
        {quizType === 'SCORED' && result.scaleDetail && (
          <ScaleResult scoreData={result.scaleDetail} />
        )}
        {quizType === 'SCORED' && result.scoredDetail && !result.scaleDetail && (
          <ScoredResult scoreData={result.scoredDetail} />
        )}
        {quizType === 'PERSONALITY' && (
          <div className="glass-panel-dark rounded-2xl p-8 text-center">
            <p style={{ color: 'var(--text-muted)' }}>
              Kết quả phân loại tính cách: <strong style={{ color: 'var(--text-main)' }}>{result.resultType}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Share buttons */}
      <ShareButtons
        title={quizTitle}
        resultType={result.resultType}
        resultId={resultId}
      />
    </div>
  );
}

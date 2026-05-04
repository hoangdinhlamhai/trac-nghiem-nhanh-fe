'use client';

import { Activity } from 'lucide-react';
import type { ScaleResultData } from '@/types';

interface ScaleResultProps {
  scoreData: ScaleResultData;
}

function getLevelColor(level: string): string {
  switch (level) {
    case 'Rất tốt':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'Tốt':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'Trung bình':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'Cần cải thiện':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Cần hỗ trợ':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-muted bg-light-secondary border-border';
  }
}

function getProgressColor(percentage: number): string {
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 60) return 'bg-blue-500';
  if (percentage >= 40) return 'bg-amber-500';
  if (percentage >= 20) return 'bg-orange-500';
  return 'bg-red-500';
}

function getLevelDescription(level: string): string {
  switch (level) {
    case 'Rất tốt':
      return 'Kết quả cho thấy bạn có sức khỏe tinh thần rất tốt. Hãy tiếp tục duy trì lối sống lành mạnh.';
    case 'Tốt':
      return 'Kết quả khá tích cực. Bạn đang có nền tảng tâm lý tốt.';
    case 'Trung bình':
      return 'Kết quả ở mức trung bình. Bạn có thể cải thiện thêm bằng cách chú ý chăm sóc sức khỏe tinh thần.';
    case 'Cần cải thiện':
      return 'Kết quả cho thấy một số khía cạnh cần được quan tâm. Hãy tìm hiểu thêm và cân nhắc tham khảo ý kiến chuyên gia.';
    case 'Cần hỗ trợ':
      return 'Kết quả cho thấy bạn có thể cần sự hỗ trợ chuyên môn. Khuyến khích bạn liên hệ chuyên gia tâm lý.';
    default:
      return '';
  }
}

export default function ScaleResult({ scoreData }: ScaleResultProps) {
  const { scaleScore, scaleMax, percentage, level } = scoreData;
  const levelColor = getLevelColor(level);
  const progressColor = getProgressColor(percentage);

  return (
    <div className="space-y-6">
      {/* Score overview */}
      <div className="glass-panel-dark rounded-2xl p-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Kết quả đánh giá</span>
        </div>

        {/* Score display */}
        <div className="mb-4">
          <span className="font-heading text-5xl md:text-6xl font-bold" style={{ color: 'var(--text-main)' }}>
            {scaleScore}
          </span>
          <span className="text-xl ml-1" style={{ color: 'var(--text-muted)' }}>/ {scaleMax}</span>
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--glass-bg)' }}>
            <div
              className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            <span>Cần hỗ trợ</span>
            <span>Rất tốt</span>
          </div>
        </div>

        {/* Level badge */}
        <div className="inline-block mb-4">
          <span className={`px-5 py-2 rounded-lg border text-lg font-semibold ${levelColor}`}>
            Mức độ: {level}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {getLevelDescription(level)}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
        <p className="text-amber-700 text-xs leading-relaxed">
          ⚠️ Kết quả này chỉ mang tính chất tham khảo, không thay thế cho chẩn đoán y khoa.
          Nếu bạn cảm thấy lo lắng, hãy liên hệ chuyên gia tâm lý hoặc bác sĩ.
        </p>
      </div>
    </div>
  );
}

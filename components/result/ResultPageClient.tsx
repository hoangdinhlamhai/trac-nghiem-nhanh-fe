'use client';

import { useState } from 'react';
import { SenlyzerLock } from '@/components/senlyzer-lock';
import ResultClient from '@/components/result/ResultClient';
import type { ResultResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

type Props = {
  initialData: ResultResponse;
  resultId: string;
};

export function ResultPageClient({ initialData, resultId }: Props) {
  const [data, setData] = useState<ResultResponse>(initialData);
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  async function handleUnlocked() {
    if (!data.isLocked) return;
    setUnlocking(true);
    setUnlockError(null);
    try {
      const res = await fetch(`${API_URL}/results/${resultId}/unlock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: data.unlockCode, expectedCode: data.unlockCode }),
      });
      const json = await res.json();
      if (json && json.success) {
        const { success: _success, ...rest } = json;
        setData({ ...rest, isLocked: false } as ResultResponse);
      } else {
        setUnlockError(json?.message || 'Không thể mở khoá kết quả.');
      }
    } catch {
      setUnlockError('Lỗi kết nối khi mở khoá kết quả.');
    } finally {
      setUnlocking(false);
    }
  }

  return (
    <SenlyzerLock contentId={`quiz-${resultId}`} onUnlocked={handleUnlocked}>
      {unlocking ? (
        <div className="p-8 text-center" style={{ color: 'var(--text-muted)' }}>
          Đang mở khoá kết quả...
        </div>
      ) : data.isLocked ? (
        <div className="p-8 text-center text-red-500">
          {unlockError ?? 'Không lấy được kết quả. Vui lòng thử lại.'}
        </div>
      ) : (
        <ResultClient initialData={data} resultId={resultId} />
      )}
    </SenlyzerLock>
  );
}

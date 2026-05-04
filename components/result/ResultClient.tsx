'use client';

import { useState, useRef, useEffect } from 'react';
import { Home, RefreshCw, Lock, KeyRound } from 'lucide-react';
import Link from 'next/link';
import type { ResultResponse, UnlockedResultResponse } from '@/types';
import api from '@/lib/api';
import ResultDisplay from './ResultDisplay';

interface ResultClientProps {
  initialData: ResultResponse;
  resultId: string;
}

export default function ResultClient({ initialData, resultId }: ResultClientProps) {
  const [resultData, setResultData] = useState<ResultResponse>(initialData);
  const [error, setError] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount when locked
  useEffect(() => {
    if (resultData.isLocked && inputRef.current) {
      inputRef.current.focus();
    }
  }, [resultData.isLocked]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-16 text-center">
        <div className="glass-panel-dark rounded-2xl p-8">
          <h2 className="font-heading text-xl font-semibold mb-3" style={{ color: 'var(--text-main)' }}>
            Không thể tải kết quả
          </h2>
          <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
            Đã xảy ra lỗi khi tải kết quả. Vui lòng thử lại.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setError(false);
                window.location.reload();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Thử lại
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-muted font-medium text-sm hover:text-dark hover:border-dark/20 transition-all"
            >
              <Home className="w-4 h-4" />
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Unlocked → show result
  if (!resultData.isLocked) {
    return (
      <ResultDisplay
        result={resultData.result}
        quizTitle={resultData.quizTitle}
        quizType={resultData.quizType}
        resultId={resultId}
      />
    );
  }

  // Locked → show unlock gate
  const unlockCode = resultData.unlockCode;

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!codeInput.trim() || isUnlocking) return;

    setIsUnlocking(true);
    setUnlockError('');

    try {
      const res = await api.post(`/results/${resultId}/unlock`, {
        code: codeInput.trim(),
        expectedCode: unlockCode,
      });

      if (res.data.success) {
        // Unlocked! Update state to show result
        setResultData({
          isLocked: false,
          quizTitle: res.data.quizTitle,
          quizType: res.data.quizType,
          quizSlug: res.data.quizSlug,
          result: res.data.result,
        } as UnlockedResultResponse);
      } else {
        setUnlockError(res.data.message || 'Mã không đúng');
        setCodeInput('');
        inputRef.current?.focus();
      }
    } catch {
      setUnlockError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsUnlocking(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-28 pb-10 relative">
      {/* Mã hiện nhỏ ở góc trên phải */}
      <div className="fixed top-24 right-4 z-50">
        <div className="glass-panel-dark px-3 py-1.5 rounded-lg shadow-lg">
          <span className="text-[10px] block leading-none mb-0.5" style={{ color: 'var(--text-muted)' }}>Mã xác nhận</span>
          <span className="font-mono text-sm font-bold tracking-widest" style={{ color: 'var(--text-main)' }}>{unlockCode}</span>
        </div>
      </div>

      {/* Blur teaser background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <div className="text-center blur-lg opacity-30 scale-90">
          <div className="text-6xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>???</div>
          <div className="text-lg" style={{ color: 'var(--text-muted)' }}>Kết quả đang chờ bạn...</div>
        </div>
      </div>

      {/* Unlock card */}
      <div className="relative z-10">
        <div className="glass-panel-dark rounded-2xl shadow-[var(--shadow-glow)] p-8 text-center">
          {/* Lock icon */}
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-primary" />
          </div>

          <h2 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
            {resultData.quizTitle}
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Nhập mã xác nhận để xem kết quả của bạn
          </p>

          {/* Code input form */}
          <form onSubmit={handleUnlock} className="max-w-xs mx-auto">
            <div className="relative mb-3">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <input
                ref={inputRef}
                type="text"
                value={codeInput}
                onChange={(e) => {
                  setCodeInput(e.target.value.toUpperCase());
                  setUnlockError('');
                }}
                placeholder="Nhập mã 5 ký tự"
                maxLength={5}
                className="w-full pl-10 pr-4 py-3 rounded-xl border text-center font-mono text-lg tracking-[0.3em] font-semibold bg-[var(--glass-bg)] placeholder:tracking-normal placeholder:font-normal placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                style={{ color: 'var(--text-main)', borderColor: 'var(--glass-border)' }}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            {unlockError && (
              <p className="text-red-500 text-xs mb-3">{unlockError}</p>
            )}

            <button
              type="submit"
              disabled={codeInput.length < 5 || isUnlocking}
              className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isUnlocking ? 'Đang xác nhận...' : 'Xem kết quả'}
            </button>
          </form>

          <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
            Tìm mã xác nhận ở góc trên bên phải màn hình
          </p>
        </div>
      </div>
    </div>
  );
}

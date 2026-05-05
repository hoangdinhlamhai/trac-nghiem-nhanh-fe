import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent relative z-10">
      <div className="glass-panel-dark p-8 rounded-2xl flex flex-col items-center justify-center shadow-[var(--shadow-glow)]">
        <Loader2 className="w-12 h-12 animate-spin mb-4" style={{ color: 'var(--color-primary)' }} />
        <h2 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
          Đang tải bài thi...
        </h2>
        <p className="text-sm font-light animate-pulse" style={{ color: 'var(--text-muted)' }}>
          Vui lòng đợi trong giây lát
        </p>
      </div>
    </div>
  );
}

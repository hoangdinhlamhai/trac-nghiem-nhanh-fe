import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-transparent relative z-10">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin mb-4" style={{ color: 'var(--color-primary)' }} />
        <h2 className="font-heading text-lg font-medium mb-2" style={{ color: 'var(--text-main)' }}>
          Đang tải danh mục...
        </h2>
        <p className="text-sm font-light animate-pulse" style={{ color: 'var(--text-muted)' }}>
          Vui lòng đợi trong giây lát
        </p>
      </div>
    </div>
  );
}

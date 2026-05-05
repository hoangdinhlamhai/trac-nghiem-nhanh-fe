import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Target,
  CheckCircle,
  AlertTriangle,
  ThumbsUp,
  Clock,
  Shield,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cách làm bài test MBTI chính xác nhất – TracNghiemNhanh',
  description:
    'Hướng dẫn chi tiết cách trả lời các câu hỏi MBTI để nhận kết quả phản ánh đúng tính cách của bạn.',
};

const doList = [
  'Trả lời theo bản năng đầu tiên — đừng suy nghĩ quá lâu.',
  'Chọn câu trả lời phản ánh con người thật sự, không phải con người bạn muốn trở thành.',
  'Làm bài trong trạng thái thoải mái, không bị áp lực.',
  'Nghĩ về bản thân trong cuộc sống hàng ngày, không phải trong tình huống đặc biệt.',
  'Hoàn thành tất cả câu hỏi — đừng bỏ sót câu nào.',
];

const dontList = [
  'Đừng chọn đáp án mà bạn nghĩ "xã hội mong đợi".',
  'Đừng so sánh bản thân với người khác khi trả lời.',
  'Đừng thay đổi câu trả lời quá nhiều lần — tin vào phản ứng đầu tiên.',
  'Đừng cố "hack" bài test để ra kết quả mong muốn.',
  'Đừng làm bài khi tâm trạng đang quá vui hoặc quá buồn.',
];

const tips = [
  {
    icon: Clock,
    title: 'Thời gian lý tưởng',
    desc: 'Dành 15-20 phút cho mỗi bài test. Đừng vội vàng nhưng cũng đừng suy nghĩ quá lâu cho mỗi câu.',
  },
  {
    icon: Shield,
    title: 'Làm lại sau 6 tháng',
    desc: 'Tính cách có thể thay đổi theo thời gian. Làm lại bài test sau 6-12 tháng để theo dõi sự phát triển.',
  },
  {
    icon: Target,
    title: 'Thử nhiều bài test',
    desc: 'TracNghiemNhanh có 5 bài MBTI với các góc nhìn khác nhau. Thử tất cả để có kết quả toàn diện nhất.',
  },
];

const steps = [
  {
    step: 1,
    title: 'Chọn bài test MBTI',
    desc: 'Truy cập trang chủ TracNghiemNhanh và chọn một trong 5 bài test MBTI phù hợp với bạn: Cơ bản, Phong cách làm việc, Mối quan hệ, Học tập, hoặc Phong cách sống.',
  },
  {
    step: 2,
    title: 'Đọc kỹ hướng dẫn',
    desc: 'Trước khi bắt đầu, đọc phần hướng dẫn để hiểu cách trả lời. Mỗi câu hỏi có 2 đáp án — chọn câu mô tả bạn đúng nhất.',
  },
  {
    step: 3,
    title: 'Trả lời theo bản năng',
    desc: 'Đọc câu hỏi và chọn ngay câu trả lời đầu tiên xuất hiện trong đầu bạn. Không có đáp án đúng hay sai.',
  },
  {
    step: 4,
    title: 'Xem kết quả chi tiết',
    desc: 'Sau khi hoàn thành, bạn sẽ nhận được phân tích chi tiết: loại tính cách, 4 chiều tính cách, điểm mạnh, điểm yếu và nghề nghiệp phù hợp.',
  },
];

export default function HowToMBTIPage() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-primary"
        style={{ color: 'var(--text-muted)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Trang chủ
      </Link>

      {/* Header */}
      <div className="mb-10">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--color-primary)' }}
        >
          <Target className="w-3.5 h-3.5" />
          Hướng dẫn
        </span>
        <h1
          className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-4"
          style={{ color: 'var(--text-main)' }}
        >
          Cách làm bài test MBTI chính xác nhất
        </h1>
        <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Kết quả bài test MBTI phụ thuộc rất nhiều vào cách bạn trả lời. Dưới đây là hướng dẫn
          chi tiết để bạn nhận được kết quả chính xác và phản ánh đúng tính cách thật sự.
        </p>
      </div>

      <article className="space-y-10">
        {/* Steps */}
        <section>
          <h2 className="font-heading text-xl font-semibold mb-6" style={{ color: 'var(--text-main)' }}>
            Các bước làm bài
          </h2>
          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.step} className="glass-panel-dark rounded-xl p-5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">{s.step}</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1" style={{ color: 'var(--text-main)' }}>
                    {s.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Do & Don't */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Do */}
          <div className="glass-panel-dark rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <ThumbsUp className="w-5 h-5 text-green-500" />
              <h3 className="font-heading text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
                Nên làm
              </h3>
            </div>
            <ul className="space-y-3">
              {doList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-main)' }}>
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don't */}
          <div className="glass-panel-dark rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-heading text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
                Không nên
              </h3>
            </div>
            <ul className="space-y-3">
              {dontList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-main)' }}>
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pro Tips */}
        <section>
          <h2 className="font-heading text-xl font-semibold mb-5" style={{ color: 'var(--text-main)' }}>
            Mẹo để có kết quả chính xác nhất
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tips.map((t) => (
              <div key={t.title} className="glass-panel-dark rounded-xl p-5 text-center">
                <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--glass-bg)' }}>
                  <t.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-sm mb-1.5" style={{ color: 'var(--text-main)' }}>
                  {t.title}
                </h3>
                <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass-panel-dark rounded-2xl p-6 md:p-8 text-center shadow-[var(--shadow-glow)]">
          <h3 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
            Đã sẵn sàng chưa?
          </h3>
          <p className="text-sm font-light mb-5" style={{ color: 'var(--text-muted)' }}>
            Áp dụng những mẹo trên và bắt đầu làm bài test ngay!
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all shadow-[var(--shadow-glow)]"
          >
            Bắt đầu Test MBTI
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </article>
    </div>
  );
}

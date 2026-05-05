import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Scale,
  Brain,
  Users,
  BarChart3,
  Briefcase,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'So sánh MBTI và DISC: Nên dùng bài test nào? – TracNghiemNhanh',
  description:
    'Phân tích chi tiết sự khác biệt giữa hai hệ thống đánh giá tính cách MBTI và DISC. Khi nào nên dùng MBTI, khi nào nên dùng DISC?',
};

const comparisons = [
  {
    aspect: 'Nguồn gốc',
    mbti: 'Dựa trên lý thuyết của Carl Jung (1921), phát triển bởi Katharine Briggs & Isabel Myers.',
    disc: 'Dựa trên nghiên cứu của William Moulton Marston (1928), được thương mại hóa bởi nhiều tổ chức.',
  },
  {
    aspect: 'Số loại',
    mbti: '16 nhóm tính cách (4 chiều × 2 cực = 16 tổ hợp).',
    disc: '4 loại chính: Dominance, Influence, Steadiness, Conscientiousness.',
  },
  {
    aspect: 'Đo lường',
    mbti: 'Đo tính cách bẩm sinh — cách bạn tiếp nhận thông tin và ra quyết định.',
    disc: 'Đo hành vi quan sát được — cách bạn hành xử trong môi trường cụ thể.',
  },
  {
    aspect: 'Thay đổi',
    mbti: 'Tính cách tương đối ổn định theo thời gian.',
    disc: 'Hành vi có thể thay đổi tùy theo hoàn cảnh và môi trường.',
  },
  {
    aspect: 'Độ phức tạp',
    mbti: 'Phức tạp hơn với 16 tổ hợp và nhiều lớp phân tích.',
    disc: 'Đơn giản hơn, dễ hiểu và dễ áp dụng nhanh chóng.',
  },
  {
    aspect: 'Ứng dụng chính',
    mbti: 'Phát triển bản thân, hướng nghiệp, hiểu bản thân sâu hơn.',
    disc: 'Xây dựng đội nhóm, giao tiếp hiệu quả, quản lý nhân sự.',
  },
];

const whenMBTI = [
  'Muốn hiểu sâu về bản thân và cách tư duy.',
  'Đang tìm kiếm định hướng nghề nghiệp.',
  'Muốn cải thiện mối quan hệ cá nhân.',
  'Quan tâm đến phát triển bản thân dài hạn.',
];

const whenDISC = [
  'Cần cải thiện kỹ năng giao tiếp trong công việc.',
  'Đang xây dựng đội nhóm hiệu quả.',
  'Muốn hiểu phong cách làm việc của đồng nghiệp.',
  'Cần đánh giá nhanh để ứng dụng ngay.',
];

export default function MBTIvsDISCPage() {
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
          <Scale className="w-3.5 h-3.5" />
          So sánh
        </span>
        <h1
          className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-4"
          style={{ color: 'var(--text-main)' }}
        >
          So sánh MBTI và DISC: Nên dùng bài test nào?
        </h1>
        <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          MBTI và DISC là hai hệ thống đánh giá tính cách phổ biến nhất hiện nay, nhưng chúng
          phục vụ mục đích rất khác nhau. Bài viết này sẽ giúp bạn hiểu rõ sự khác biệt
          và chọn công cụ phù hợp nhất.
        </p>
      </div>

      <article className="space-y-10">
        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass-panel-dark rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold" style={{ color: 'var(--text-main)' }}>MBTI</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Myers-Briggs Type Indicator</p>
              </div>
            </div>
            <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Tập trung vào <strong style={{ color: 'var(--text-main)' }}>tính cách bẩm sinh</strong> — cách bạn nhận thức
              thế giới và đưa ra quyết định. Phân loại thành 16 nhóm tính cách dựa trên
              4 chiều: E/I, S/N, T/F, J/P.
            </p>
          </div>
          <div className="glass-panel-dark rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-heading font-semibold" style={{ color: 'var(--text-main)' }}>DISC</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Dominance, Influence, Steadiness, Conscientiousness</p>
              </div>
            </div>
            <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Tập trung vào <strong style={{ color: 'var(--text-main)' }}>hành vi quan sát được</strong> — cách bạn hành xử
              và phản ứng trong các tình huống cụ thể. Phân thành 4 nhóm hành vi chính:
              D, I, S, C.
            </p>
          </div>
        </div>

        {/* Comparison table */}
        <section className="glass-panel-dark rounded-2xl overflow-hidden">
          <div className="p-5 border-b" style={{ borderColor: 'var(--glass-border)' }}>
            <h2 className="font-heading text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
              Bảng so sánh chi tiết
            </h2>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--glass-border)' }}>
            {comparisons.map((c) => (
              <div key={c.aspect} className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] gap-4 p-5" style={{ borderColor: 'var(--glass-border)' }}>
                <div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                    {c.aspect}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary md:hidden">MBTI: </span>
                  <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>{c.mbti}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-500 md:hidden">DISC: </span>
                  <p className="text-sm font-light" style={{ color: 'var(--text-muted)' }}>{c.disc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* When to use */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="glass-panel-dark rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
                Dùng MBTI khi
              </h3>
            </div>
            <ul className="space-y-3">
              {whenMBTI.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-main)' }}>
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel-dark rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-amber-500" />
              <h3 className="font-heading text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
                Dùng DISC khi
              </h3>
            </div>
            <ul className="space-y-3">
              {whenDISC.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-main)' }}>
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conclusion */}
        <section className="glass-panel-dark rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
              Kết luận
            </h2>
          </div>
          <div className="space-y-3 text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            <p>
              <strong style={{ color: 'var(--text-main)' }}>Không có bài test nào "tốt hơn"</strong> — mỗi công cụ phục vụ
              mục đích khác nhau. MBTI giúp bạn hiểu <em>tại sao</em> bạn hành xử như vậy,
              trong khi DISC cho bạn biết <em>cách</em> bạn hành xử.
            </p>
            <p>
              Lý tưởng nhất là <strong style={{ color: 'var(--text-main)' }}>sử dụng cả hai</strong>: MBTI để hiểu sâu bản thân,
              DISC để cải thiện giao tiếp và hiệu suất công việc. TracNghiemNhanh hiện đang
              cung cấp bài test MBTI miễn phí — bài test DISC sẽ sớm ra mắt!
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="glass-panel-dark rounded-2xl p-6 md:p-8 text-center shadow-[var(--shadow-glow)]">
          <h3 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
            Thử bài test MBTI ngay!
          </h3>
          <p className="text-sm font-light mb-5" style={{ color: 'var(--text-muted)' }}>
            Khám phá tính cách của bạn với bài test MBTI miễn phí trên TracNghiemNhanh.
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

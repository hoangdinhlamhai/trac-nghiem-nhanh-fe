import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Brain, Users, Lightbulb, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MBTI là gì? Tổng quan 16 nhóm tính cách – TracNghiemNhanh',
  description:
    'Tìm hiểu hệ thống phân loại tính cách MBTI (Myers-Briggs Type Indicator), lịch sử hình thành, 4 chiều tính cách và ý nghĩa của 16 nhóm tính cách.',
};

const dimensions = [
  {
    code: 'E / I',
    name: 'Hướng ngoại — Hướng nội',
    desc: 'Bạn lấy năng lượng từ việc giao tiếp với người khác hay từ thời gian ở một mình?',
  },
  {
    code: 'S / N',
    name: 'Giác quan — Trực giác',
    desc: 'Bạn tiếp nhận thông tin qua các chi tiết cụ thể hay qua bức tranh tổng thể?',
  },
  {
    code: 'T / F',
    name: 'Lý trí — Cảm xúc',
    desc: 'Bạn đưa ra quyết định dựa trên logic hay dựa trên cảm nhận và giá trị cá nhân?',
  },
  {
    code: 'J / P',
    name: 'Nguyên tắc — Linh hoạt',
    desc: 'Bạn thích cuộc sống có kế hoạch rõ ràng hay linh hoạt tùy cơ ứng biến?',
  },
];

const typeGroups = [
  {
    group: 'Nhóm Nhà phân tích (NT)',
    types: [
      { code: 'INTJ', name: 'Kiến trúc sư', desc: 'Chiến lược, độc lập, quyết đoán.' },
      { code: 'INTP', name: 'Nhà logic', desc: 'Sáng tạo, tò mò, phân tích.' },
      { code: 'ENTJ', name: 'Chỉ huy', desc: 'Lãnh đạo, tự tin, quyết liệt.' },
      { code: 'ENTP', name: 'Người tranh luận', desc: 'Thông minh, lanh lợi, thích thử thách.' },
    ],
  },
  {
    group: 'Nhóm Nhà ngoại giao (NF)',
    types: [
      { code: 'INFJ', name: 'Người cầm quân', desc: 'Sâu sắc, lý tưởng, có tầm nhìn.' },
      { code: 'INFP', name: 'Người hòa giải', desc: 'Mơ mộng, giàu cảm xúc, nhân ái.' },
      { code: 'ENFJ', name: 'Người dẫn dắt', desc: 'Đồng cảm, cuốn hút, truyền cảm hứng.' },
      { code: 'ENFP', name: 'Người truyền cảm hứng', desc: 'Nhiệt tình, sáng tạo, tự do.' },
    ],
  },
  {
    group: 'Nhóm Người bảo vệ (SJ)',
    types: [
      { code: 'ISTJ', name: 'Người thực thi', desc: 'Trách nhiệm, đáng tin, nguyên tắc.' },
      { code: 'ISFJ', name: 'Người bảo vệ', desc: 'Tận tụy, ấm áp, chu đáo.' },
      { code: 'ESTJ', name: 'Người giám sát', desc: 'Tổ chức, kiên định, thực tế.' },
      { code: 'ESFJ', name: 'Người quan tâm', desc: 'Hòa đồng, chu đáo, trung thành.' },
    ],
  },
  {
    group: 'Nhóm Nhà thám hiểm (SP)',
    types: [
      { code: 'ISTP', name: 'Thợ cơ khí', desc: 'Thực dụng, linh hoạt, phân tích.' },
      { code: 'ISFP', name: 'Nghệ sĩ', desc: 'Nhạy cảm, tốt bụng, sáng tạo.' },
      { code: 'ESTP', name: 'Doanh nhân', desc: 'Năng động, thực tế, liều lĩnh.' },
      { code: 'ESFP', name: 'Người giải trí', desc: 'Vui vẻ, hào phóng, yêu đời.' },
    ],
  },
];

export default function MBTIOverviewPage() {
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
          <Brain className="w-3.5 h-3.5" />
          MBTI
        </span>
        <h1
          className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-4"
          style={{ color: 'var(--text-main)' }}
        >
          MBTI là gì? Tổng quan về 16 nhóm tính cách
        </h1>
        <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          MBTI (Myers-Briggs Type Indicator) là công cụ đánh giá tính cách phổ biến nhất thế giới,
          được sử dụng bởi hơn 2 triệu người mỗi năm trong các lĩnh vực phát triển bản thân,
          hướng nghiệp và xây dựng đội nhóm.
        </p>
      </div>

      {/* Article content */}
      <article className="space-y-10">
        {/* Section: Lịch sử */}
        <section className="glass-panel-dark rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-xl font-semibold" style={{ color: 'var(--text-main)' }}>
              Lịch sử hình thành
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
            <p>
              MBTI được phát triển bởi <strong style={{ color: 'var(--text-main)' }}>Katharine Cook Briggs</strong> và con gái bà,{' '}
              <strong style={{ color: 'var(--text-main)' }}>Isabel Briggs Myers</strong>, dựa trên lý thuyết về các kiểu tâm lý
              của nhà tâm lý học nổi tiếng Carl Gustav Jung.
            </p>
            <p>
              Công trình bắt đầu từ những năm 1940 với mục đích giúp phụ nữ trong Thế chiến II
              tìm được công việc phù hợp nhất với tính cách của họ. Sau nhiều thập kỷ nghiên cứu,
              bộ công cụ MBTI chính thức được xuất bản vào năm 1962 và trở thành một trong những
              bài đánh giá tính cách được sử dụng rộng rãi nhất trên thế giới.
            </p>
          </div>
        </section>

        {/* Section: 4 chiều */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-xl font-semibold" style={{ color: 'var(--text-main)' }}>
              4 chiều tính cách
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dimensions.map((d) => (
              <div key={d.code} className="glass-panel-dark rounded-xl p-5">
                <span className="text-sm font-mono font-bold text-primary">{d.code}</span>
                <h3 className="font-heading font-semibold mt-1 mb-2" style={{ color: 'var(--text-main)' }}>
                  {d.name}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: 16 types */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-xl font-semibold" style={{ color: 'var(--text-main)' }}>
              16 nhóm tính cách
            </h2>
          </div>
          <div className="space-y-6">
            {typeGroups.map((g) => (
              <div key={g.group}>
                <h3 className="text-sm font-semibold tracking-wider uppercase mb-3" style={{ color: 'var(--color-primary)' }}>
                  {g.group}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {g.types.map((t) => (
                    <div key={t.code} className="glass-panel-dark rounded-xl p-4 flex items-start gap-3">
                      <span className="font-mono text-sm font-bold text-primary mt-0.5">{t.code}</span>
                      <div>
                        <span className="font-semibold text-sm" style={{ color: 'var(--text-main)' }}>{t.name}</span>
                        <p className="text-xs font-light mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass-panel-dark rounded-2xl p-6 md:p-8 text-center shadow-[var(--shadow-glow)]">
          <h3 className="font-heading text-xl font-semibold mb-2" style={{ color: 'var(--text-main)' }}>
            Bạn thuộc nhóm tính cách nào?
          </h3>
          <p className="text-sm font-light mb-5" style={{ color: 'var(--text-muted)' }}>
            Làm bài test MBTI ngay để khám phá!
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

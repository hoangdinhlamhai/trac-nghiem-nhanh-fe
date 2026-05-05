import type { Metadata } from 'next';
import {
  Brain,
  Target,
  Users,
  Shield,
  Sparkles,
  BookOpen,
  Heart,
  Zap,
  CheckCircle,
  ArrowRight,
  Mail,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Giới thiệu – TracNghiemNhanh',
  description:
    'TracNghiemNhanh là nền tảng trắc nghiệm online miễn phí, giúp bạn khám phá tính cách, đánh giá năng lực và phát triển bản thân thông qua các bài test được thiết kế chuyên sâu.',
};

/* ──────────────── Data ──────────────── */

const stats = [
  { value: '50+', label: 'Bài test' },
  { value: '16', label: 'Nhóm MBTI' },
  { value: '100K+', label: 'Lượt làm bài' },
  { value: '4.8★', label: 'Đánh giá' },
];

const values = [
  {
    icon: Target,
    title: 'Chính xác',
    desc: 'Bài test được xây dựng dựa trên các mô hình tâm lý học được công nhận quốc tế như MBTI, Big Five và các thang đo chuẩn hóa.',
  },
  {
    icon: Shield,
    title: 'Bảo mật',
    desc: 'Dữ liệu cá nhân của bạn được mã hoá và bảo vệ tuyệt đối. Chúng tôi cam kết không chia sẻ thông tin với bên thứ ba.',
  },
  {
    icon: Sparkles,
    title: 'Miễn phí',
    desc: 'Tất cả bài test đều hoàn toàn miễn phí. Không quảng cáo xâm phạm, không yêu cầu đăng ký tài khoản để làm bài.',
  },
  {
    icon: Heart,
    title: 'Tận tâm',
    desc: 'Đội ngũ chúng tôi liên tục nghiên cứu và cập nhật nội dung để mang đến trải nghiệm tốt nhất cho người dùng.',
  },
];

const features = [
  {
    icon: Brain,
    title: 'Test MBTI chuyên sâu',
    desc: 'Khám phá 16 nhóm tính cách với các bài test từ cơ bản đến nâng cao, phân tích chi tiết 4 chiều tính cách.',
  },
  {
    icon: BookOpen,
    title: 'Trắc nghiệm học tập',
    desc: 'Hệ thống đề thi trắc nghiệm THPT, ôn thi THPT Quốc Gia và đại học với hàng nghìn câu hỏi chất lượng.',
  },
  {
    icon: Users,
    title: 'Test tâm lý học',
    desc: 'Đánh giá sức khỏe tinh thần, mức độ stress, EQ và nhiều khía cạnh tâm lý khác qua các thang đo khoa học.',
  },
  {
    icon: Zap,
    title: 'Kết quả tức thì',
    desc: 'Nhận phân tích chi tiết ngay khi hoàn thành bài test — điểm mạnh, điểm yếu, nghề nghiệp phù hợp và lời khuyên phát triển.',
  },
];

const timeline = [
  { year: '2024', event: 'Ý tưởng TracNghiemNhanh được hình thành từ nhu cầu tự khám phá bản thân.' },
  { year: '2025', event: 'Ra mắt phiên bản đầu tiên với 5 bài test MBTI và hệ thống trắc nghiệm THPT.' },
  { year: '2026', event: 'Mở rộng hơn 50 bài test, tích hợp phân tích AI và đạt 100.000+ lượt làm bài.' },
];

/* ──────────────── Page ──────────────── */

export default function AboutPage() {
  return (
    <div className="relative z-10">
      {/* ───── Hero ───── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-16">
        <p
          className="text-sm font-medium tracking-widest uppercase mb-4"
          style={{ color: 'var(--color-primary)' }}
        >
          Về chúng tôi
        </p>
        <h1
          className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 max-w-3xl"
          style={{ color: 'var(--text-main)' }}
        >
          Giúp bạn <span className="text-gradient">hiểu rõ chính mình</span> hơn
          mỗi ngày.
        </h1>
        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl font-light mb-10"
          style={{ color: 'var(--text-muted)' }}
        >
          TracNghiemNhanh là nền tảng trắc nghiệm online miễn phí, nơi bạn có
          thể khám phá tính cách, đánh giá năng lực và tìm kiếm con đường phát
          triển phù hợp nhất.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass-panel-dark rounded-xl p-4 text-center"
            >
              <p
                className="font-heading text-2xl md:text-3xl font-bold mb-1"
                style={{ color: 'var(--color-primary)' }}
              >
                {s.value}
              </p>
              <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Values ───── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-3"
              style={{ color: 'var(--text-main)' }}
            >
              Giá trị cốt lõi
            </h2>
            <p className="max-w-xl mx-auto font-light" style={{ color: 'var(--text-muted)' }}>
              Bốn nguyên tắc định hướng mọi hoạt động của chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-panel-dark rounded-2xl p-6 text-center group hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-colors group-hover:bg-primary/20"
                  style={{ backgroundColor: 'var(--glass-bg)' }}
                >
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3
                  className="font-heading text-lg font-semibold mb-2"
                  style={{ color: 'var(--text-main)' }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Features ───── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-3"
              style={{ color: 'var(--text-main)' }}
            >
              Chúng tôi cung cấp gì?
            </h2>
            <p className="max-w-xl mx-auto font-light" style={{ color: 'var(--text-muted)' }}>
              Khám phá hệ sinh thái trắc nghiệm toàn diện của TracNghiemNhanh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass-panel-dark rounded-2xl p-6 flex gap-5 group hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center transition-colors group-hover:bg-primary/20"
                  style={{ backgroundColor: 'var(--glass-bg)' }}
                >
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3
                    className="font-heading text-lg font-semibold mb-1.5"
                    style={{ color: 'var(--text-main)' }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Timeline ───── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-3"
              style={{ color: 'var(--text-main)' }}
            >
              Hành trình phát triển
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[19px] top-2 bottom-2 w-px"
              style={{ backgroundColor: 'var(--glass-border)' }}
            />

            <div className="space-y-8">
              {timeline.map((t, idx) => (
                <div key={idx} className="flex gap-5 items-start">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="glass-panel-dark rounded-xl p-5 flex-1">
                    <span
                      className="text-xs font-semibold tracking-wider uppercase"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {t.year}
                    </span>
                    <p className="text-sm mt-1.5 leading-relaxed font-light" style={{ color: 'var(--text-main)' }}>
                      {t.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glass-panel-dark rounded-2xl p-8 md:p-12 text-center shadow-[var(--shadow-glow)]">
            <h2
              className="font-heading text-2xl md:text-3xl font-bold mb-3"
              style={{ color: 'var(--text-main)' }}
            >
              Sẵn sàng khám phá bản thân?
            </h2>
            <p className="mb-8 font-light max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
              Bắt đầu với bài Test MBTI phổ biến nhất hoặc liên hệ với chúng tôi
              nếu bạn có bất kỳ câu hỏi nào.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 shadow-[var(--shadow-glow)]"
              >
                Làm Test MBTI Ngay
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

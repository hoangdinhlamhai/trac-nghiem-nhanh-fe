import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag, Clock, BookOpen, ChevronRight } from 'lucide-react';

/* ──────────────── Article Data ──────────────── */

interface ArticleSection {
  heading: string;
  content: string[];
}

interface Article {
  title: string;
  description: string;
  tag: string;
  date: string;
  readTime: string;
  sections: ArticleSection[];
}

const articles: Record<string, Article> = {
  'mbti-la-gi': {
    title: 'MBTI là gì? Tổng quan về 16 nhóm tính cách',
    description: 'Tìm hiểu về hệ thống phân loại tính cách MBTI, lịch sử hình thành và ý nghĩa của 16 nhóm tính cách.',
    tag: 'MBTI',
    date: '2026-04-20',
    readTime: '8 phút đọc',
    sections: [
      {
        heading: 'MBTI là gì?',
        content: [
          'MBTI (Myers-Briggs Type Indicator) là một công cụ đánh giá tính cách được phát triển bởi Isabel Briggs Myers và mẹ của bà, Katharine Cook Briggs, dựa trên lý thuyết loại hình tâm lý của Carl Gustav Jung.',
          'MBTI phân loại con người thành 16 nhóm tính cách dựa trên 4 cặp chiều hướng tâm lý đối lập. Mỗi người sẽ có xu hướng thiên về một phía trong mỗi cặp, tạo nên một tổ hợp 4 chữ cái đại diện cho kiểu tính cách của họ.',
        ],
      },
      {
        heading: '4 chiều hướng tính cách',
        content: [
          'Hướng ngoại (E) vs Hướng nội (I): Cách bạn lấy năng lượng — từ thế giới bên ngoài hay từ bên trong bản thân. Người hướng ngoại thích giao tiếp, hoạt động nhóm; người hướng nội thích suy nghĩ sâu, thời gian riêng tư.',
          'Giác quan (S) vs Trực giác (N): Cách bạn thu nhận thông tin — qua các giác quan cụ thể hay qua trực giác, ý tưởng trừu tượng. Người thuộc nhóm S tập trung vào sự kiện thực tế; người thuộc nhóm N nhìn vào bức tranh tổng thể.',
          'Lý trí (T) vs Cảm xúc (F): Cách bạn đưa ra quyết định — dựa trên logic khách quan hay giá trị cá nhân và cảm xúc. Người T phân tích lý tính; người F cân nhắc tác động đến con người.',
          'Nguyên tắc (J) vs Linh hoạt (P): Cách bạn tổ chức cuộc sống — có kế hoạch rõ ràng hay linh hoạt, tự phát. Người J thích sự trật tự; người P thích sự tự do và khả năng thích ứng.',
        ],
      },
      {
        heading: '16 nhóm tính cách MBTI',
        content: [
          'Nhóm Nhà phân tích: INTJ (Kiến trúc sư) — chiến lược, độc lập; INTP (Nhà logic) — sáng tạo, ham học hỏi; ENTJ (Chỉ huy) — lãnh đạo, quyết đoán; ENTP (Người tranh luận) — nhanh nhạy, thích thử thách.',
          'Nhóm Nhà ngoại giao: INFJ (Người ủng hộ) — sâu sắc, lý tưởng; INFP (Người hòa giải) — nhạy cảm, sáng tạo; ENFJ (Người chủ xướng) — truyền cảm hứng, vị tha; ENFP (Người vận động) — nhiệt tình, tự do.',
          'Nhóm Lính canh: ISTJ (Người hậu cần) — đáng tin cậy, trách nhiệm; ISFJ (Người bảo vệ) — tận tâm, chu đáo; ESTJ (Giám đốc điều hành) — tổ chức, lãnh đạo; ESFJ (Lãnh sự) — quan tâm, hòa đồng.',
          'Nhóm Nhà thám hiểm: ISTP (Nghệ nhân) — thực tế, linh hoạt; ISFP (Nhà phiêu lưu) — nghệ sĩ, nhạy cảm; ESTP (Nhà kinh doanh) — năng động, thực tế; ESFP (Nghệ sĩ giải trí) — vui vẻ, tự phát.',
        ],
      },
      {
        heading: 'Ứng dụng của MBTI',
        content: [
          'Phát triển bản thân: Hiểu rõ điểm mạnh, điểm yếu của mình để phát triển toàn diện hơn. MBTI giúp bạn nhận ra phong cách làm việc, giao tiếp và học tập phù hợp nhất.',
          'Định hướng nghề nghiệp: Mỗi nhóm tính cách có những nghề nghiệp phù hợp riêng. Ví dụ, INTJ thường phù hợp với các vai trò chiến lược, trong khi ESFP thích hợp với công việc sáng tạo, tương tác.',
          'Cải thiện mối quan hệ: Hiểu tính cách đối phương giúp giảm xung đột và tăng sự thấu hiểu trong các mối quan hệ cá nhân lẫn công việc.',
        ],
      },
      {
        heading: 'Lưu ý khi sử dụng MBTI',
        content: [
          'MBTI không phải là công cụ tuyệt đối — nó phản ánh xu hướng tính cách, không phải định mệnh. Tính cách con người rất phức tạp và có thể thay đổi theo thời gian, hoàn cảnh.',
          'Hãy sử dụng kết quả MBTI như một công cụ tham khảo để hiểu bản thân tốt hơn, không nên gán nhãn cố định cho mình hay người khác. Mỗi người đều có khả năng phát triển và thay đổi.',
        ],
      },
    ],
  },
  'cach-lam-test-mbti': {
    title: 'Cách làm bài test MBTI chính xác nhất',
    description: 'Hướng dẫn chi tiết cách trả lời các câu hỏi MBTI để nhận kết quả phản ánh đúng tính cách.',
    tag: 'Hướng dẫn',
    date: '2026-04-18',
    readTime: '6 phút đọc',
    sections: [
      {
        heading: 'Tại sao cần làm đúng cách?',
        content: [
          'Nhiều người làm bài test MBTI nhưng nhận kết quả không chính xác do trả lời theo kỳ vọng thay vì bản chất thật. Để kết quả phản ánh đúng tính cách, bạn cần hiểu cách tiếp cận bài test một cách khoa học.',
          'Kết quả sai có thể dẫn đến những hiểu lầm về bản thân, ảnh hưởng đến quyết định nghề nghiệp và các mối quan hệ. Vì vậy, việc làm bài test đúng cách là bước đầu tiên quan trọng.',
        ],
      },
      {
        heading: 'Bước 1: Chuẩn bị tâm lý',
        content: [
          'Chọn thời điểm bạn cảm thấy thoải mái, không bị áp lực hay stress. Tránh làm bài test khi đang trong trạng thái cảm xúc cực đoan (quá vui, quá buồn, quá mệt).',
          'Dành ít nhất 15-20 phút không bị gián đoạn. Tắt thông báo điện thoại và tìm không gian yên tĩnh để tập trung hoàn toàn vào bài test.',
        ],
      },
      {
        heading: 'Bước 2: Trả lời thành thật',
        content: [
          'Trả lời dựa trên con người thật của bạn — không phải con người bạn muốn trở thành hay con người mà xã hội mong đợi. Hãy nghĩ về cách bạn phản ứng tự nhiên trong đa số trường hợp.',
          'Không có câu trả lời đúng hay sai trong MBTI. Mỗi đặc điểm tính cách đều có giá trị riêng. Hãy bỏ qua suy nghĩ "câu nào nghe hay hơn" và chọn câu mô tả đúng bạn nhất.',
          'Nếu phân vân giữa hai lựa chọn, hãy nghĩ về phản ứng đầu tiên, bản năng nhất của bạn — đó thường là câu trả lời chính xác nhất.',
        ],
      },
      {
        heading: 'Bước 3: Nghĩ về bối cảnh đa dạng',
        content: [
          'Đừng chỉ nghĩ về bản thân ở nơi làm việc hay ở nhà. Hãy nghĩ về cách bạn hành xử ở nhiều hoàn cảnh khác nhau — khi đi du lịch, khi ở với bạn bè thân, khi đối mặt thử thách.',
          'Một số người có tính cách "thích ứng" — họ thay đổi cách hành xử theo môi trường. Nếu bạn thuộc nhóm này, hãy nghĩ về môi trường nào bạn cảm thấy thoải mái nhất và tự nhiên nhất.',
        ],
      },
      {
        heading: 'Bước 4: Đọc kỹ từng câu hỏi',
        content: [
          'Không nên vội vàng lướt qua các câu hỏi. Đọc kỹ từng câu và suy nghĩ trước khi chọn đáp án. Nhiều câu hỏi có sự khác biệt tinh tế mà bạn có thể bỏ lỡ nếu đọc lướt.',
          'Chú ý các từ khóa quan trọng như "thường xuyên", "đa số trường hợp", "xu hướng". Những từ này cho thấy bạn không cần lúc nào cũng như vậy — chỉ cần phần lớn thời gian.',
        ],
      },
      {
        heading: 'Bước 5: Làm lại nếu cần',
        content: [
          'Nếu kết quả khiến bạn ngạc nhiên hoặc không đồng tình, hãy thử làm lại sau vài ngày. Nếu kết quả vẫn giống nhau, có thể bạn chưa hiểu hết về nhóm tính cách đó — hãy đọc thêm mô tả chi tiết.',
          'Nhiều chuyên gia khuyến nghị làm bài test 2-3 lần trong các thời điểm khác nhau và xem kết quả nào xuất hiện nhiều nhất. Đó thường là tính cách cốt lõi của bạn.',
        ],
      },
      {
        heading: 'Những sai lầm phổ biến',
        content: [
          'Trả lời theo mong muốn xã hội: Ví dụ, chọn "hướng ngoại" vì nghĩ nó tốt hơn, trong khi thực chất bạn là người hướng nội.',
          'So sánh với người khác: Đừng nghĩ "tôi hướng nội hơn anh A nhưng hướng ngoại hơn chị B". Hãy tự đánh giá bản thân một cách độc lập.',
          'Nhầm lẫn kỹ năng với tính cách: Bạn có thể giỏi thuyết trình (kỹ năng) nhưng vẫn là người hướng nội (tính cách). MBTI đo xu hướng tự nhiên, không phải khả năng học được.',
        ],
      },
    ],
  },
  'so-sanh-mbti-disc': {
    title: 'So sánh MBTI và DISC: Nên dùng bài test nào?',
    description: 'Phân tích sự khác biệt giữa hai hệ thống đánh giá tính cách phổ biến nhất hiện nay.',
    tag: 'So sánh',
    date: '2026-04-15',
    readTime: '7 phút đọc',
    sections: [
      {
        heading: 'Giới thiệu MBTI và DISC',
        content: [
          'MBTI và DISC là hai hệ thống đánh giá tính cách được sử dụng rộng rãi nhất trên thế giới. Cả hai đều giúp hiểu rõ bản thân và người khác, nhưng chúng tiếp cận vấn đề từ góc độ hoàn toàn khác nhau.',
          'MBTI (Myers-Briggs Type Indicator) được phát triển từ lý thuyết của Carl Jung, phân loại thành 16 nhóm tính cách. DISC được phát triển bởi William Moulton Marston, phân loại thành 4 nhóm hành vi chính.',
        ],
      },
      {
        heading: 'Sự khác biệt cốt lõi',
        content: [
          'MBTI đo tính cách bẩm sinh — cách bạn suy nghĩ, cảm nhận và nhận thức thế giới. Đây là những đặc điểm tương đối ổn định theo thời gian và phản ánh bản chất sâu xa của bạn.',
          'DISC đo hành vi quan sát được — cách bạn phản ứng và hành xử trong các tình huống cụ thể. Hành vi có thể thay đổi tùy theo môi trường (công việc vs đời sống cá nhân).',
          'Nói đơn giản: MBTI trả lời câu hỏi "Bạn LÀ ai?", còn DISC trả lời câu hỏi "Bạn HÀNH ĐỘNG như thế nào?".',
        ],
      },
      {
        heading: 'DISC hoạt động như thế nào?',
        content: [
          'D (Dominance) — Sự thống trị: Tập trung vào kết quả, quyết đoán, thích thử thách. Người D là những nhà lãnh đạo tự nhiên, thẳng thắn và hướng đến mục tiêu.',
          'I (Influence) — Sự ảnh hưởng: Tập trung vào con người, nhiệt tình, lạc quan. Người I giỏi giao tiếp, thuyết phục và tạo động lực cho người khác.',
          'S (Steadiness) — Sự ổn định: Tập trung vào sự hòa hợp, kiên nhẫn, đáng tin cậy. Người S là thành viên nhóm tuyệt vời, trung thành và luôn hỗ trợ người khác.',
          'C (Conscientiousness) — Sự tận tâm: Tập trung vào chất lượng, chính xác, logic. Người C cẩn thận, có hệ thống và luôn tuân thủ tiêu chuẩn cao.',
        ],
      },
      {
        heading: 'Khi nào nên dùng MBTI?',
        content: [
          'Phát triển bản thân sâu: Khi bạn muốn hiểu rõ bản chất tính cách, động lực nội tại, giá trị cốt lõi và cách bạn nhìn nhận thế giới.',
          'Định hướng nghề nghiệp: MBTI cung cấp insight sâu về môi trường làm việc và loại công việc phù hợp với tính cách bẩm sinh.',
          'Hiểu các mối quan hệ: Phân tích sự tương thích tính cách trong tình yêu, tình bạn và gia đình.',
        ],
      },
      {
        heading: 'Khi nào nên dùng DISC?',
        content: [
          'Cải thiện giao tiếp nhóm: DISC rất hiệu quả để hiểu cách giao tiếp với từng kiểu người trong môi trường làm việc.',
          'Quản lý và lãnh đạo: Giúp nhà quản lý điều chỉnh phong cách lãnh đạo phù hợp với từng nhân viên.',
          'Bán hàng và dịch vụ: Nhận diện nhanh kiểu hành vi của khách hàng để tiếp cận hiệu quả hơn.',
        ],
      },
      {
        heading: 'Bảng so sánh tổng hợp',
        content: [
          'Số lượng phân loại: MBTI có 16 nhóm chi tiết, DISC có 4 nhóm cơ bản (với nhiều biến thể phụ). MBTI phức tạp hơn nhưng cũng cung cấp bức tranh chi tiết hơn.',
          'Thời gian làm bài: MBTI thường mất 15-30 phút, DISC chỉ mất 5-10 phút. DISC phù hợp hơn khi cần đánh giá nhanh trong môi trường doanh nghiệp.',
          'Độ ổn định: Kết quả MBTI tương đối ổn định theo thời gian, trong khi DISC có thể thay đổi tùy theo môi trường và giai đoạn cuộc sống.',
          'Ứng dụng phổ biến: MBTI được dùng nhiều trong tư vấn cá nhân và giáo dục; DISC được ưa chuộng trong doanh nghiệp và huấn luyện đội nhóm.',
        ],
      },
      {
        heading: 'Kết luận: Nên dùng cả hai!',
        content: [
          'MBTI và DISC không thay thế mà bổ sung cho nhau. MBTI giúp bạn hiểu "tại sao" bạn hành xử như vậy, còn DISC giúp bạn hiểu "như thế nào" bạn thể hiện ra bên ngoài.',
          'Lời khuyên của chúng tôi: Hãy bắt đầu với MBTI để hiểu bản chất tính cách, sau đó làm DISC để hiểu hành vi và cách cải thiện giao tiếp. Sự kết hợp này sẽ cho bạn bức tranh toàn diện nhất về bản thân.',
        ],
      },
    ],
  },
};

const allSlugs = Object.keys(articles);

/* ──────────────── Metadata ──────────────── */

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: 'Không tìm thấy' };
  return {
    title: `${article.title} – TracNghiemNhanh`,
    description: article.description,
  };
}

/* ──────────────── Page ──────────────── */

export default async function TaiLieuDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const otherArticles = allSlugs
    .filter((s) => s !== slug)
    .map((s) => ({ slug: s, title: articles[s].title, tag: articles[s].tag }));

  return (
    <div className="relative z-10">
      {/* ───── Hero ───── */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: 'var(--text-main)' }}>Tài liệu</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--color-primary)', border: '1px solid var(--glass-border)' }}>
            <Tag className="w-3 h-3" />
            {article.tag}
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Calendar className="w-3.5 h-3.5" />
            {new Date(article.date).toLocaleDateString('vi-VN')}
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        <h1
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4 max-w-3xl"
          style={{ color: 'var(--text-main)' }}
        >
          {article.title}
        </h1>
        <p
          className="text-base md:text-lg leading-relaxed max-w-2xl font-light"
          style={{ color: 'var(--text-muted)' }}
        >
          {article.description}
        </p>
      </section>

      {/* ───── Content ───── */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto space-y-10">
          {article.sections.map((section, idx) => (
            <div key={idx} className="glass-panel-dark rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
                >
                  {idx + 1}
                </div>
                <h2
                  className="font-heading text-xl md:text-2xl font-semibold"
                  style={{ color: 'var(--text-main)' }}
                >
                  {section.heading}
                </h2>
              </div>
              <div className="space-y-4">
                {section.content.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-sm md:text-base leading-relaxed font-light"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Related Articles ───── */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <h3
            className="font-heading text-2xl font-semibold mb-6 text-center"
            style={{ color: 'var(--text-main)' }}
          >
            Bài viết liên quan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/tai-lieu/${a.slug}`}
                className="glass-panel-dark rounded-xl p-5 group hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3"
                  style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--color-primary)', border: '1px solid var(--glass-border)' }}
                >
                  {a.tag}
                </span>
                <h4
                  className="font-heading text-base font-medium leading-snug group-hover:text-primary transition-colors"
                  style={{ color: 'var(--text-main)' }}
                >
                  {a.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Back CTA ───── */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-panel-dark rounded-2xl p-8 shadow-[var(--shadow-glow)]">
            <BookOpen className="w-10 h-10 mx-auto mb-4 text-primary" />
            <h3
              className="font-heading text-xl md:text-2xl font-bold mb-2"
              style={{ color: 'var(--text-main)' }}
            >
              Sẵn sàng khám phá tính cách?
            </h3>
            <p className="text-sm font-light mb-6 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
              Áp dụng kiến thức vừa đọc — làm bài test MBTI ngay để tìm hiểu nhóm tính cách của bạn.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-all duration-300 shadow-[var(--shadow-glow)]"
            >
              <ArrowLeft className="w-4 h-4" />
              Về trang chủ làm test
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

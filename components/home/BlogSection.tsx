'use client';

import { Calendar, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Static blog data (no CMS for now)
const blogPosts = [
  {
    id: 1,
    title: 'MBTI là gì? Tổng quan về 16 nhóm tính cách',
    excerpt:
      'Tìm hiểu về hệ thống phân loại tính cách MBTI, lịch sử hình thành và ý nghĩa của 16 nhóm tính cách.',
    tag: 'MBTI',
    date: '2026-04-20',
    slug: '#',
  },
  {
    id: 2,
    title: 'Cách làm bài test MBTI chính xác nhất',
    excerpt:
      'Hướng dẫn chi tiết cách trả lời các câu hỏi MBTI để nhận kết quả phản ánh đúng tính cách.',
    tag: 'Hướng dẫn',
    date: '2026-04-18',
    slug: '#',
  },
  {
    id: 3,
    title: 'So sánh MBTI và DISC: Nên dùng bài test nào?',
    excerpt:
      'Phân tích sự khác biệt giữa hai hệ thống đánh giá tính cách phổ biến nhất hiện nay.',
    tag: 'So sánh',
    date: '2026-04-15',
    slug: '#',
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const heading = sectionRef.current!.querySelector('.blog-heading');
      const underline = sectionRef.current!.querySelector('.blog-underline');
      const subtitle = sectionRef.current!.querySelector('.blog-subtitle');
      const cards = sectionRef.current!.querySelectorAll('.blog-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Heading: split text feel with clip-path reveal
      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.out' },
        );
      }

      // Underline expand from center
      if (underline) {
        tl.fromTo(
          underline,
          { scaleX: 0, transformOrigin: 'center' },
          { scaleX: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.3',
        );
      }

      // Subtitle
      if (subtitle) {
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.2',
        );
      }

      // Cards: stagger with 3D-like perspective entrance
      if (cards.length > 0) {
        tl.fromTo(
          Array.from(cards),
          {
            opacity: 0,
            y: 50,
            rotateX: 10,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'back.out(1.4)',
          },
          '-=0.1',
        );
      }

      // Add hover magnetic effect to cards
      cards.forEach((card) => {
        const el = card as HTMLElement;
        el.addEventListener('mouseenter', () => {
          gsap.to(el, {
            y: -6,
            scale: 1.02,
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, {
            y: 0,
            scale: 1,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="blog-heading font-heading text-3xl md:text-4xl font-bold text-dark mb-3">
            Tài Liệu <span className="text-primary">Ôn Tập</span> Mới Nhất
          </h2>
          <div className="blog-underline w-16 h-1 bg-primary rounded-full mx-auto mb-4" />
          <p className="blog-subtitle text-muted max-w-xl mx-auto">
            Kiến thức hữu ích về tâm lý học và phát triển bản thân
          </p>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card bg-white rounded-2xl border border-border overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              {/* Colored top bar */}
              <div className="h-1.5 gradient-primary" />

              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <Tag className="w-3 h-3" />
                    {post.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-dark mb-2 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <Link
                  href={post.slug}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                >
                  Đọc tiếp
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

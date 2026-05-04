'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.2
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      {/* Content wrapper */}
      <div className="max-w-4xl mx-auto z-10 flex flex-col items-center justify-center mt-[-10vh]">
        
        <h1
          ref={titleRef}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-main leading-tight tracking-tight mb-6"
          style={{ opacity: 0 }}
        >
          Khám phá <span className="text-muted italic">bản thân</span>
          <br />
          với Trắc Nghiệm Nhanh.
        </h1>

        <p
          ref={descRef}
          className="text-lg md:text-xl text-muted leading-relaxed mb-12 max-w-2xl font-light"
          style={{ opacity: 0 }}
        >
          Chúng tôi tạo ra những công cụ đánh giá chuyên sâu cho những người muốn hiểu rõ chính mình. 
          Giữa những bộn bề, hãy dành không gian để tìm về giá trị cốt lõi.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-6" style={{ opacity: 0 }}>
          <Link
            href="/quiz/mbti-quiz"
            className="group px-8 py-3.5 rounded-full border border-[var(--glass-border)] bg-[var(--text-main)]/5 backdrop-blur-md text-main font-medium hover:bg-[var(--text-main)]/10 hover:border-[var(--text-main)] transition-all duration-300 flex items-center gap-2"
          >
            Bắt Đầu Ngay
          </Link>
          {/* <Link
            href="/gioi-thieu"
            className="group px-8 py-3.5 text-muted font-medium hover:text-main transition-all duration-300 flex items-center gap-2"
          >
            Tìm Hiểu Thêm
          </Link> */}
        </div>
      </div>
    </section>
  );
}


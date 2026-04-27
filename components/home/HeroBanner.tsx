'use client';

import { ArrowRight, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.8 },
          '-=0.3',
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4',
        )
        .fromTo(
          ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15 },
          '-=0.3',
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2',
        );

      // Floating orbs - subtle continuous animation
      gsap.to(orb1Ref.current, {
        x: 30,
        y: -20,
        scale: 1.1,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(orb2Ref.current, {
        x: -25,
        y: 25,
        scale: 0.9,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Particle-like shimmer on the badge
      gsap.to(badgeRef.current, {
        boxShadow: '0 0 20px rgba(0, 166, 81, 0.3)',
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="gradient-hero relative overflow-hidden">
      {/* Decorative floating orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-10 right-10 w-80 h-80 bg-info/5 rounded-full blur-3xl"
      />
      {/* Extra floating particles */}
      <div className="hero-particles absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-6"
            style={{ opacity: 0 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>50.000+ người đã hoàn thành</span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            style={{ opacity: 0 }}
          >
            Khám Phá{' '}
            <span className="text-primary italic">Tính Cách</span>
            <br />
            Của Bạn
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="text-lg md:text-xl text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ opacity: 0 }}
          >
            Làm bài test MBTI, IQ, EQ miễn phí để hiểu rõ bản thân hơn.
            Kết quả chính xác, phân tích chi tiết.
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quiz-category/test-mbti"
              className="group px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 flex items-center gap-2"
              style={{ opacity: 0 }}
            >
              Làm test MBTI ngay
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/gioi-thieu"
              className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300"
              style={{ opacity: 0 }}
            >
              Tìm hiểu thêm
            </Link>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="flex items-center justify-center gap-6 mt-10 text-white/50 text-sm"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50K+ người dùng</span>
            </div>
            <span className="text-white/20">|</span>
            <span>5 loại test</span>
            <span className="text-white/20">|</span>
            <span>Miễn phí 100%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

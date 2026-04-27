'use client';

import { ArrowRight, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  return (
    <section className="gradient-hero relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-info/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>50.000+ người đã hoàn thành</span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Khám Phá{' '}
              <span className="text-primary italic">Tính Cách</span>
              <br />
              Của Bạn
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto">
              Làm bài test MBTI, IQ, EQ miễn phí để hiểu rõ bản thân hơn.
              Kết quả chính xác, phân tích chi tiết.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quiz-category/test-mbti"
                className="group px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 flex items-center gap-2"
              >
                Làm test MBTI ngay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/gioi-thieu"
                className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300"
              >
                Tìm hiểu thêm
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mt-10 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>50K+ người dùng</span>
              </div>
              <span className="text-white/20">|</span>
              <span>5 loại test</span>
              <span className="text-white/20">|</span>
              <span>Miễn phí 100%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

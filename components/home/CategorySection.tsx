'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { Category } from '@/types';
import { motion } from 'framer-motion';

interface CategorySectionProps {
  categories: Category[];
}

const categoryIcons: Record<string, string> = {
  'test-mbti': '🧠',
  'test-tam-ly': '💭',
  'test-iq': '🧩',
  'test-eq': '❤️',
  'test-disc': '📊',
};

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-16 md:py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-3">
            Các Bài Test <span className="text-primary">Trắc Nghiệm</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4" />
          <p className="text-muted max-w-xl mx-auto">
            Chọn danh mục để bắt đầu khám phá bản thân
          </p>
        </div>

        {/* Category cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/quiz-category/${cat.slug}`}
                className="group block bg-white rounded-2xl p-6 border border-border transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
              >
                {/* Icon + quiz count */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{categoryIcons[cat.slug] || '📝'}</span>
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {cat.quizCount || 0} đề
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-heading text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                  {cat.description || 'Khám phá ngay'}
                </p>

                {/* CTA */}
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 gap-1 transition-all">
                  <BookOpen className="w-4 h-4" />
                  Xem các đề
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/quiz-category/test-mbti"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300"
          >
            Xem tất cả
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

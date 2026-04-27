'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types';
import QuizCard from '@/components/quiz/QuizCard';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || categories.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate each category section on scroll
      const sections = containerRef.current!.querySelectorAll('.category-section');

      sections.forEach((section) => {
        const header = section.querySelector('.category-header');
        const underline = section.querySelector('.category-underline');
        const desc = section.querySelector('.category-desc');
        const cards = section.querySelectorAll('.quiz-card-wrapper');
        const viewAllBtn = section.querySelector('.view-all-btn');
        const viewAllMobile = section.querySelector('.view-all-mobile');
        const emptyState = section.querySelector('.empty-state');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        });

        // Header slide-in from left
        if (header) {
          tl.fromTo(
            header,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
          );
        }

        // Underline expand
        if (underline) {
          tl.fromTo(
            underline,
            { scaleX: 0, transformOrigin: 'left' },
            { scaleX: 1, duration: 0.4, ease: 'power2.out' },
            '-=0.3',
          );
        }

        // Description fade in
        if (desc) {
          tl.fromTo(
            desc,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.2',
          );
        }

        // View-all button slide
        if (viewAllBtn) {
          tl.fromTo(
            viewAllBtn,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.4',
          );
        }

        // Cards stagger from bottom with slight rotation
        if (cards.length > 0) {
          tl.fromTo(
            Array.from(cards),
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'back.out(1.2)',
            },
            '-=0.2',
          );
        }

        // Empty state
        if (emptyState) {
          tl.fromTo(
            emptyState,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
            '-=0.2',
          );
        }

        // Mobile view-all
        if (viewAllMobile) {
          tl.fromTo(
            viewAllMobile,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4 },
            '-=0.2',
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [categories]);

  if (categories.length === 0) return null;

  return (
    <div ref={containerRef}>
      {categories.map((category: Category) => (
        <section key={category.id} className="category-section py-12 md:py-16 even:bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header = tên danh mục */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="category-header font-heading text-2xl md:text-3xl font-bold text-dark mb-2">
                  {category.name}
                </h2>
                <div className="category-underline w-12 h-1 bg-primary rounded-full" />
                {category.description && (
                  <p className="category-desc text-muted mt-3 max-w-lg">{category.description}</p>
                )}
              </div>
              <Link
                href={`/quiz-category/${category.slug}`}
                className="view-all-btn hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Xem tất cả ({category.quizCount || 0})
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Grid = các đề thi trong danh mục */}
            {category.quizzes && category.quizzes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.quizzes.map((quiz) => (
                  <div key={quiz.id} className="quiz-card-wrapper">
                    <QuizCard quiz={quiz} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state text-center py-8 bg-white rounded-xl border border-border border-dashed">
                <p className="text-muted text-sm">Sắp có đề thi mới — Quay lại sau nhé! 🚀</p>
              </div>
            )}

            {/* Mobile: nút xem tất cả */}
            <div className="view-all-mobile sm:hidden text-center mt-6">
              <Link
                href={`/quiz-category/${category.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-primary text-primary text-sm font-medium hover:bg-primary hover:text-white transition-all"
              >
                Xem tất cả ({category.quizCount || 0})
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

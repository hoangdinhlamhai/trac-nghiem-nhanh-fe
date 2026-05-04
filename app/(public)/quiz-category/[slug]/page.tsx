import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import Link from 'next/link';
import SubCategoryTabs from '@/components/category/SubCategoryTabs';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface CategoryDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  iconUrl: string | null;
  quizCount: number;
  quizzes: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    quizType: string;
    timeLimitMins: number;
    totalQuestions: number;
    viewCount: number;
    completionCount: number;
  }[];
  children: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    quizCount: number;
    quizzes: {
      id: string;
      title: string;
      slug: string;
      description: string | null;
      quizType: string;
      timeLimitMins: number;
      totalQuestions: number;
      viewCount: number;
      completionCount: number;
    }[];
  }[];
}

async function getCategory(slug: string): Promise<CategoryDetail | null> {
  try {
    const res = await fetch(`${API_URL}/categories/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: 'Không tìm thấy' };
  return {
    title: category.name,
    description: category.description || `Các bài test ${category.name} trên TracNghiemNhanh`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const totalQuizzes =
    category.quizzes.length +
    category.children.reduce((sum, c) => sum + c.quizzes.length, 0);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="gradient-hero relative overflow-hidden pt-28 pb-16 lg:pb-20" style={{ color: 'var(--text-main)' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm mb-6 transition-all backdrop-blur-md category-back-link"
            style={{ borderColor: 'var(--glass-border)', color: 'var(--text-muted)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Về Trang chủ
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl border backdrop-blur-md shadow-glow" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
              <FolderOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold" style={{ color: 'var(--text-main)' }}>
              {category.name}
            </h1>
          </div>
          
          <p className="text-lg max-w-2xl mt-4 leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
            {category.description || `Khám phá các bài test ${category.name} chuyên sâu, giúp bạn đánh giá và phân tích một cách chính xác nhất.`}
          </p>
          
          <div className="flex items-center gap-6 mt-8 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            {category.children.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
                <span className="w-2 h-2 rounded-full bg-primary-light"></span>
                <span>{category.children.length} danh mục con</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span>{totalQuizzes} bài test</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <SubCategoryTabs
          children={category.children}
          parentQuizzes={category.quizzes}
        />
      </div>
    </div>
  );
}

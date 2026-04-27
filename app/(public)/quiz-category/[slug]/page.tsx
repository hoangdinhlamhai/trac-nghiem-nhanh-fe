import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import QuizCard from '@/components/quiz/QuizCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  iconUrl: string | null;
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
}

async function getCategory(slug: string): Promise<CategoryData | null> {
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

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <div className="gradient-hero text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Trang chủ
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            {category.name}
          </h1>
          <p className="text-white/60 max-w-2xl">
            {category.description || `Danh sách các bài test ${category.name}`}
          </p>
        </div>
      </div>

      {/* Quiz list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {category.quizzes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🧪</p>
            <h3 className="font-heading text-xl font-semibold text-dark mb-2">
              Chưa có đề nào
            </h3>
            <p className="text-muted">
              Danh mục này sẽ được cập nhật sớm. Quay lại sau nhé!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
            >
              Về trang chủ
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted mb-6">
              {category.quizzes.length} bài test
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz as any} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

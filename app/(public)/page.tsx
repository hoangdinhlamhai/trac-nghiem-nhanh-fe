import HeroBanner from '@/components/home/HeroBanner';
import CategorySection from '@/components/home/CategorySection';
import BlogSection from '@/components/home/BlogSection';
import type { Category } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 60 }, // ISR: 60s
    });
    if (!res.ok) return getFallbackCategories();
    return res.json();
  } catch {
    return getFallbackCategories();
  }
}

function getFallbackCategories(): Category[] {
  return [
    { id: '1', name: 'Test MBTI', slug: 'test-mbti', description: 'Trắc nghiệm tính cách MBTI - 16 nhóm tính cách', iconUrl: null, quizCount: 1 },
    { id: '2', name: 'Test Tâm Lý', slug: 'test-tam-ly', description: 'Các bài test tâm lý học thú vị', iconUrl: null, quizCount: 0 },
    { id: '3', name: 'Test IQ', slug: 'test-iq', description: 'Đo chỉ số IQ miễn phí', iconUrl: null, quizCount: 0 },
    { id: '4', name: 'Test EQ', slug: 'test-eq', description: 'Đo chỉ số trí tuệ cảm xúc', iconUrl: null, quizCount: 0 },
    { id: '5', name: 'Test DISC', slug: 'test-disc', description: 'Trắc nghiệm tính cách DISC', iconUrl: null, quizCount: 0 },
  ];
}

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <>
      <HeroBanner />
      <CategorySection categories={categories} />
      <BlogSection />
    </>
  );
}

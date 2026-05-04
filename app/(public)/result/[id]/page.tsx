import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ResultClient from '@/components/result/ResultClient';
import type { ResultResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ResultPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ResultPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(`${API_URL}/results/${id}`, { cache: 'no-store' });
    if (!res.ok) return { title: 'Kết quả không tồn tại' };

    const data: ResultResponse = await res.json();
    const title = `Kết quả: ${data.quizTitle} | Trắc Nghiệm Nhanh`;

    const description = !data.isLocked && data.result?.mbtiDetail
      ? `Kết quả ${data.result.mbtiDetail.type} - ${data.result.mbtiDetail.name}`
      : `Xem kết quả bài trắc nghiệm ${data.quizTitle}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
      },
    };
  } catch {
    return { title: 'Kết quả trắc nghiệm | Trắc Nghiệm Nhanh' };
  }
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_URL}/results/${id}`, { cache: 'no-store' });
    if (!res.ok) return notFound();

    const data: ResultResponse = await res.json();
    return <ResultClient initialData={data} resultId={id} />;
  } catch {
    return notFound();
  }
}

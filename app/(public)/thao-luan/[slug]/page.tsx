import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DiscussionDetail from '@/components/discussion/DiscussionDetail';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface DiscussionData {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  tag: string | null;
  authorName: string;
  commentCount: number;
  createdAt: string;
  comments: {
    id: string;
    authorName: string;
    content: string;
    createdAt: string;
  }[];
}

async function getDiscussion(slug: string): Promise<DiscussionData | null> {
  try {
    const res = await fetch(`${API_URL}/discussions/${slug}`, {
      cache: 'no-store',
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
  const discussion = await getDiscussion(slug);
  if (!discussion) return { title: 'Không tìm thấy bài thảo luận' };
  return {
    title: `${discussion.title} – TracNghiemNhanh`,
    description: discussion.excerpt || `Thảo luận: ${discussion.title}`,
  };
}

export default async function DiscussionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const discussion = await getDiscussion(slug);

  if (!discussion) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-transparent relative z-10">
      <DiscussionDetail discussion={discussion} />
    </div>
  );
}

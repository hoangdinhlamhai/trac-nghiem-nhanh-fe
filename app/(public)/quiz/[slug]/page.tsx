import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import QuizPlayer from '@/components/quiz/QuizPlayer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface QuizData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  instruction: string | null;
  quizType: string;
  timeLimitMins: number;
  totalQuestions: number;
  category: { name: string; slug: string };
  questions: {
    id: string;
    content: string;
    orderNumber: number;
    answers: { id: string; content: string }[];
  }[];
}

async function getQuiz(slug: string): Promise<QuizData | null> {
  try {
    const res = await fetch(`${API_URL}/quizzes/${slug}`, {
      cache: 'no-store', // Always fresh quiz data
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
  const quiz = await getQuiz(slug);
  if (!quiz) return { title: 'Không tìm thấy bài test' };
  return {
    title: quiz.title,
    description: quiz.description || `Làm bài test ${quiz.title} trên TracNghiemNhanh`,
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = await getQuiz(slug);

  if (!quiz || quiz.questions.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-transparent relative z-10">
      <QuizPlayer
        quizId={quiz.id}
        title={quiz.title}
        slug={quiz.slug}
        description={quiz.description}
        instruction={quiz.instruction}
        quizType={quiz.quizType}
        timeLimitMins={quiz.timeLimitMins}
        questions={quiz.questions}
      />
    </div>
  );
}

'use client';

import { useState } from 'react';
import QuizCard from '@/components/quiz/QuizCard';
import { BookOpen } from 'lucide-react';

interface SubCategory {
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
}

interface SubCategoryTabsProps {
  children: SubCategory[];
  parentQuizzes: {
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

export default function SubCategoryTabs({ children, parentQuizzes }: SubCategoryTabsProps) {
  // "all" = tab tổng hợp (quizzes trực tiếp của parent), sau đó là từng danh mục con
  const [activeTab, setActiveTab] = useState<string>(
    children.length > 0 ? children[0].slug : 'all',
  );

  // Nếu không có danh mục con, chỉ hiện quizzes trực tiếp
  if (children.length === 0) {
    return (
      <div>
        {parentQuizzes.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <p className="text-sm text-muted mb-6">{parentQuizzes.length} bài test</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parentQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz as any} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Tìm quizzes của tab đang active
  const activeChild = children.find((c) => c.slug === activeTab);
  const currentQuizzes = activeTab === 'all' ? parentQuizzes : (activeChild?.quizzes || []);

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {/* Tab "Tất cả" chỉ hiện nếu parent có quizzes trực tiếp */}
          {parentQuizzes.length > 0 && (
            <button
              onClick={() => setActiveTab('all')}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                ${activeTab === 'all'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white text-dark-secondary border border-border hover:border-primary/30 hover:text-primary'
                }
              `}
            >
              Tất cả ({parentQuizzes.length})
            </button>
          )}

          {/* Tabs cho từng danh mục con */}
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setActiveTab(child.slug)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                ${activeTab === child.slug
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white text-dark-secondary border border-border hover:border-primary/30 hover:text-primary'
                }
              `}
            >
              {child.name}
              <span className="ml-1.5 opacity-70">({child.quizCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quizzes grid */}
      {currentQuizzes.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <p className="text-sm text-muted mb-6">{currentQuizzes.length} bài test</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz as any} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-border border-dashed">
      <BookOpen className="w-12 h-12 text-muted/40 mx-auto mb-4" />
      <h3 className="font-heading text-xl font-semibold text-dark mb-2">
        Chưa có đề nào
      </h3>
      <p className="text-muted max-w-md mx-auto">
        Danh mục này sẽ được cập nhật sớm. Quay lại sau nhé! 🚀
      </p>
    </div>
  );
}

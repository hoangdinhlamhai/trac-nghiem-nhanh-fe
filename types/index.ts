// ============================================
// Quiz Types
// ============================================

export type QuizType = 'MBTI' | 'SCORED' | 'PERSONALITY';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  iconUrl: string | null;
  quizCount?: number;
  children?: { id: string; name: string; slug: string }[];
  quizzes?: Quiz[];
}

export interface Quiz {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  instruction: string | null;
  quizType: QuizType;
  timeLimitMins: number;
  totalQuestions: number;
  viewCount: number;
  completionCount: number;
  category?: Category;
  questions?: Question[];
}

export interface Question {
  id: string;
  content: string;
  orderNumber: number;
  answers: Answer[];
}

export interface Answer {
  id: string;
  content: string;
  // Note: mbtiPole, isCorrect, scoreValue are NOT sent to client (anti-cheat)
}

export interface QuizSubmitPayload {
  answers: { questionId: string; answerId: string }[];
  timeSpentSecs: number;
}

export interface QuizSubmitResponse {
  resultId: string;
  quizTitle: string;
  isLocked: boolean;
}

// ============================================
// Result Types
// ============================================

export interface MBTIDimension {
  E: number;
  I: number;
}

export interface MBTIDetail {
  type: string;
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  dimensions: {
    EI: { E: number; I: number };
    SN: { S: number; N: number };
    TF: { T: number; F: number };
    JP: { J: number; P: number };
  };
}

export interface QuizResult {
  resultType: string;
  scoreData: Record<string, number>;
  timeSpentSecs: number;
  completedAt: string;
  mbtiDetail?: MBTIDetail;
  scoredDetail?: ScoredResultData;
  scaleDetail?: ScaleResultData;
}

export interface ScoredResultData {
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  grade: string;
}

export interface ScaleResultData {
  scaleScore: number;
  scaleMax: number;
  totalQuestions: number;
  percentage: number;
  level: string;
}

export interface PersonalityResultData {
  resultType: string;
  typeName: string;
  description: string;
  traits: string[];
  scoreBreakdown: Record<string, number>;
  timeSpentSecs: number;
  completedAt: string;
}

// ============================================
// Result Response Types
// ============================================

export interface LockedResultResponse {
  isLocked: true;
  quizTitle: string;
  quizType: QuizType;
  quizSlug: string;
  completedAt: string;
  timeSpentSecs: number;
  unlockCode: string; // mã random hiện ở góc màn hình
}

export interface UnlockedResultResponse {
  isLocked: false;
  quizTitle: string;
  quizType: QuizType;
  quizSlug: string;
  result: QuizResult;
}

export type ResultResponse = LockedResultResponse | UnlockedResultResponse;

// ============================================
// CPA Types
// ============================================

export interface CpaCampaignInfo {
  searchKeyword: string;
  targetPreview: {
    title: string;
    description: string;
    image: string;
  };
  instruction: string;
}

export interface CpaVerifyResponse {
  success: boolean;
  message?: string;
  result?: QuizResult;
}

// ============================================
// User Types
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface UserStats {
  totalQuizzes: number;
  latestMbtiType: string | null;
  avgTimeSpentSecs: number;
  favoriteCount: number;
}

export interface HistoryItem {
  id: string;
  quizTitle: string;
  quizSlug: string;
  resultType: string | null;
  timeSpentSecs: number | null;
  completedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

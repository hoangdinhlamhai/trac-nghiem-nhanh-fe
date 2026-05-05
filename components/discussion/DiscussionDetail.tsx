'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  MessageCircle,
  Tag,
  Send,
  Loader2,
  User,
} from 'lucide-react';

interface Comment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

interface Discussion {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  tag: string | null;
  authorName: string;
  commentCount: number;
  createdAt: string;
  comments: Comment[];
}

interface DiscussionDetailProps {
  discussion: Discussion;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function timeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Vừa xong';
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function DiscussionDetail({ discussion }: DiscussionDetailProps) {
  const [comments, setComments] = useState<Comment[]>(discussion.comments);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Load saved name/email from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('tn_comment_name');
    const savedEmail = localStorage.getItem('tn_comment_email');
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch(`${API_URL}/discussions/${discussion.slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: name.trim(),
          authorEmail: email.trim(),
          content: content.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message?.[0] || 'Có lỗi xảy ra');
      }

      const newComment: Comment = await res.json();

      // Save to localStorage
      localStorage.setItem('tn_comment_name', name.trim());
      localStorage.setItem('tn_comment_email', email.trim());

      // Prepend new comment (newest first)
      setComments((prev) => [newComment, ...prev]);
      setContent('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-primary"
        style={{ color: 'var(--text-muted)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Trang chủ
      </Link>

      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {discussion.tag && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--color-primary)' }}
            >
              <Tag className="w-3.5 h-3.5" />
              {discussion.tag}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Calendar className="w-3.5 h-3.5" />
            {new Date(discussion.createdAt).toLocaleDateString('vi-VN')}
          </span>
        </div>

        <h1
          className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-4"
          style={{ color: 'var(--text-main)' }}
        >
          {discussion.title}
        </h1>

        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-primary" />
          </div>
          <span>{discussion.authorName}</span>
        </div>
      </div>

      {/* Article Content */}
      {discussion.content && (
        <div className="glass-panel-dark rounded-2xl p-6 md:p-8 mb-10">
          <div
            className="prose prose-sm max-w-none"
            style={{ color: 'var(--text-muted)' }}
          >
            {discussion.content.split('\n').map((line, idx) => {
              if (!line.trim()) return <br key={idx} />;
              if (line.startsWith('## ')) {
                return (
                  <h3
                    key={idx}
                    className="font-heading text-lg font-semibold mt-6 mb-3"
                    style={{ color: 'var(--text-main)' }}
                  >
                    {line.replace('## ', '')}
                  </h3>
                );
              }
              if (line.startsWith('- **')) {
                const parts = line.replace('- **', '').split('**');
                return (
                  <p key={idx} className="text-sm leading-relaxed font-light ml-4 mb-1">
                    <strong style={{ color: 'var(--text-main)' }}>{parts[0]}</strong>
                    {parts[1]}
                  </p>
                );
              }
              if (line.startsWith('✅') || line.startsWith('❌')) {
                return (
                  <p key={idx} className="text-sm leading-relaxed font-light ml-2 mb-1">
                    {line}
                  </p>
                );
              }
              return (
                <p key={idx} className="text-sm leading-relaxed font-light mb-2">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h2 className="font-heading text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
            {comments.length} bình luận
          </h2>
        </div>

        {comments.length === 0 ? (
          <div
            className="glass-panel-dark rounded-xl p-6 text-center text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="glass-panel-dark rounded-xl p-5">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{
                      backgroundColor: 'var(--glass-bg)',
                      color: 'var(--color-primary)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    {getInitials(c.authorName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                        {c.authorName}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {timeAgo(c.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed font-light whitespace-pre-line" style={{ color: 'var(--text-muted)' }}>
                      {c.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comment Form */}
      <div className="glass-panel-dark rounded-2xl p-6 md:p-8">
        <h3 className="font-heading text-lg font-semibold mb-5" style={{ color: 'var(--text-main)' }}>
          Để lại bình luận
        </h3>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Content textarea */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
              Bình luận <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết bình luận của bạn..."
              rows={4}
              required
              className="w-full px-4 py-3 rounded-xl border text-sm bg-[var(--glass-bg)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-y"
              style={{ color: 'var(--text-main)', borderColor: 'var(--glass-border)' }}
            />
          </div>

          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
                Tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên của bạn"
                required
                className="w-full px-4 py-3 rounded-xl border text-sm bg-[var(--glass-bg)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                style={{ color: 'var(--text-main)', borderColor: 'var(--glass-border)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-main)' }}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border text-sm bg-[var(--glass-bg)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                style={{ color: 'var(--text-main)', borderColor: 'var(--glass-border)' }}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Success */}
          {success && (
            <p className="text-green-500 text-sm">Bình luận đã được đăng thành công!</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !email.trim() || !content.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang gửi...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Gửi bình luận
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

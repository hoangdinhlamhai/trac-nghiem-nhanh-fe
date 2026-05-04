'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Search, Brain, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Test MBTI', href: '/quiz/mbti-quiz' },
  { label: 'Test Tâm Lý', href: '/quiz-category/test-tam-ly' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass-panel-dark backdrop-blur-md shadow-[var(--shadow-navbar)] py-2'
          : 'bg-transparent py-4'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[var(--text-main)]/10 border border-[var(--glass-border)] flex items-center justify-center transition-transform group-hover:scale-110">
              <Brain className="w-5 h-5" style={{ color: 'var(--text-main)' }} />
            </div>
            <span className="font-heading text-xl font-medium tracking-wide" style={{ color: 'var(--text-main)' }}>
              TracNghiem<span style={{ color: 'var(--text-muted)' }}>Nhanh</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-light hover:bg-[var(--text-main)]/10 transition-all duration-300"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-full hover:bg-[var(--text-main)]/10 transition-all"
                style={{ color: 'var(--text-muted)' }}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--text-main)]/10"
            style={{ color: 'var(--text-muted)' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-80 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-1 pt-4 border-t" style={{ borderColor: 'var(--glass-border)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-[var(--text-main)]/10 transition-all"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </Link>
            ))}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium hover:bg-[var(--text-main)]/10 transition-all text-left"
                style={{ color: 'var(--text-muted)' }}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

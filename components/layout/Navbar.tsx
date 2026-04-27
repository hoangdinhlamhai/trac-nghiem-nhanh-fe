'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Test MBTI', href: '/quiz-category/test-mbti' },
  { label: 'Test Tâm Lý', href: '/quiz-category/test-tam-ly' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-navbar)]'
          : 'bg-white'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-xl font-bold text-dark">
              TracNghiem<span className="text-primary">Nhanh</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-dark/70 hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 rounded-lg text-dark/50 hover:text-primary hover:bg-primary/5 transition-all">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/auth/login"
              className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Đăng nhập
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-dark/70 hover:bg-gray-100"
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
          <div className="flex flex-col gap-1 pt-2 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-dark/70 hover:text-primary hover:bg-primary/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="mx-4 mt-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium text-center hover:bg-primary-dark transition-all"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

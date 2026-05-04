import Link from 'next/link';
import { Brain, Globe, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="gradient-hero" style={{ color: 'var(--text-main)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold">
                TracNghiem<span className="text-primary">Nhanh</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Nền tảng trắc nghiệm online miễn phí. Khám phá tính cách, đo chỉ số IQ, EQ
              và nhiều bài test thú vị khác.
            </p>
          </div>

          {/* Thông tin */}
          <div>
            <h3 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-main)' }}>Thông tin</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Giới thiệu', href: '/gioi-thieu' },
                { label: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat' },
                { label: 'Điều khoản sử dụng', href: '/dieu-khoan' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-primary"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Danh mục */}
          <div>
            <h3 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-main)' }}>Danh mục</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Test MBTI', href: '/quiz-category/test-mbti' },
                { label: 'Test Tâm Lý', href: '/quiz-category/test-tam-ly' },
                { label: 'Test IQ', href: '/quiz-category/test-iq' },
                { label: 'Test DISC', href: '/quiz-category/test-disc' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-primary"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kết nối */}
          <div>
            <h3 className="font-heading font-semibold mb-4" style={{ color: 'var(--text-main)' }}>Kết nối</h3>
            <div className="space-y-3">
              <a
                href="mailto:contact@tracnghiemnhanh.com.vn"
                className="flex items-center gap-2 text-sm transition-colors hover:text-primary"
                style={{ color: 'var(--text-muted)' }}
              >
                <Mail className="w-4 h-4" /> contact@tracnghiemnhanh.com.vn
              </a>
              <a
                href="tel:0123456789"
                className="flex items-center gap-2 text-sm transition-colors hover:text-primary"
                style={{ color: 'var(--text-muted)' }}
              >
                <Phone className="w-4 h-4" /> 0123 456 789
              </a>
              <div className="flex gap-3 pt-2">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
                  style={{ backgroundColor: 'var(--glass-bg)', color: 'var(--text-muted)' }}
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-10 pt-6 text-center" style={{ borderColor: 'var(--glass-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} TracNghiemNhanh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

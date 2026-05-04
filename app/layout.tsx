import type { Metadata } from 'next';
import { Playfair_Display, Roboto } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const roboto = Roboto({
  variable: '--font-body',
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TracNghiemNhanh - Trắc Nghiệm Online Miễn Phí',
    template: '%s | TracNghiemNhanh',
  },
  description:
    'Nền tảng trắc nghiệm online miễn phí. Làm bài test MBTI, IQ, EQ, DISC để khám phá tính cách và năng lực của bạn.',
  keywords: ['trắc nghiệm', 'MBTI', 'IQ test', 'EQ test', 'DISC', 'tính cách', 'tâm lý'],
  openGraph: {
    title: 'TracNghiemNhanh - Trắc Nghiệm Online Miễn Phí',
    description: 'Khám phá tính cách với các bài test MBTI, IQ, EQ miễn phí.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'TracNghiemNhanh',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${roboto.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-body bg-starry text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

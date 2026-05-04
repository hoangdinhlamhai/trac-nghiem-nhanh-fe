'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ShootingStars() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || resolvedTheme !== 'light') return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      <div className="shooting-star absolute top-[-50px] left-[20%] w-[150px] h-[2px]"></div>
      <div className="shooting-star absolute top-[-50px] left-[50%] w-[200px] h-[2px]" style={{ animationDelay: '1.2s' }}></div>
      <div className="shooting-star absolute top-[-50px] left-[80%] w-[100px] h-[2px]" style={{ animationDelay: '2.5s' }}></div>
      <div className="shooting-star absolute top-[20%] left-[-50px] w-[250px] h-[2px]" style={{ animationDelay: '3.1s' }}></div>
      <div className="shooting-star absolute top-[50%] left-[-50px] w-[180px] h-[2px]" style={{ animationDelay: '4.7s' }}></div>
    </div>
  );
}

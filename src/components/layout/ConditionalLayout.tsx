'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface ConditionalLayoutProps {
  children: ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Corporate pages have their own layout - don't show store header/footer
  const isCorporate = pathname?.startsWith('/corporate');

  if (isCorporate) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

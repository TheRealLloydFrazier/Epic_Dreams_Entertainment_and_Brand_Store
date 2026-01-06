import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { CorporateHeader } from '@components/corporate/CorporateHeader';
import { CorporateFooter } from '@components/corporate/CorporateFooter';
import { HOLDING_COMPANY } from '@lib/constants/company';

export const metadata: Metadata = {
  title: {
    template: '%s | Epic Dreams Asset Management',
    default: 'Epic Dreams Asset Management and Holding Company, Inc.'
  },
  description: HOLDING_COMPANY.description,
  openGraph: {
    title: HOLDING_COMPANY.legalName,
    description: HOLDING_COMPANY.description,
    type: 'website',
    url: '/',
    images: [
      {
        url: '/images/og-corporate.jpg',
        width: 1200,
        height: 630,
        alt: 'Epic Dreams Asset Management'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: HOLDING_COMPANY.legalName,
    description: HOLDING_COMPANY.description
  }
};

export default function CorporateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <CorporateHeader />
      <main className="flex-1">{children}</main>
      <CorporateFooter />
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { Inter, EB_Garamond } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/site-header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Snowy Field',
  description: 'Snowy Field Studio',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ebGaramond.variable} m-4 antialiased md:m-8`}
      >
        <SiteHeader />

        {children}
      </body>
    </html>
  );
}

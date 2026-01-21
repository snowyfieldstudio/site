import React from 'react';
import type { Metadata } from 'next';
import { Inter, EB_Garamond } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/site-header';
import ClientsHydrator from '@/components/clients-hydrator';
import { getClientsAndContacts } from '@/lib/sanity.loader';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch and validate once for all routes under this layout.
  const { clients } = await getClientsAndContacts();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ebGaramond.variable} m-4 antialiased md:m-8`}
      >
        <ClientsHydrator clients={clients}>
          <SiteHeader />

          {children}
        </ClientsHydrator>
      </body>
    </html>
  );
}

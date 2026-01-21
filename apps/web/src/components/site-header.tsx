'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteHeader() {
  const pathname = usePathname();

  const isClientPage = pathname !== '/';

  const linkText = isClientPage ? '← See All' : 'Snowyfield.Studio';

  return (
    <div className="font-headerXL text-link mb-10 cursor-pointer underline decoration-3 hover:no-underline active:text-red-500 md:mb-12 md:text-5xl">
      <Link href="/">{linkText}</Link>
    </div>
  );
}

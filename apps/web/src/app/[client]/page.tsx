'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { useAtomValue } from 'jotai';

import { clientsAtom } from '@/lib/atoms/clients';
import Link from 'next/link';
import { Table } from '@/components/Table';

type ClientPageProps = {
  params: Promise<{
    client: string;
  }>;
};

export default function ClientPage({ params }: ClientPageProps) {
  const resolvedParams = React.use(params);

  const clients = useAtomValue(clientsAtom);

  if (!clients) return null;

  const client = clients.find(
    (c) => c.slug === resolvedParams.client?.toLowerCase(),
  );

  console.log('client', client);

  if (!client) return notFound();

  return (
    <>
      <div className="mb-6 md:mb-10">
        <Table
          rows={[client]}
          columns={[
            {
              header: 'Client',
              render: (c) => (
                <Link
                  href={`/${c.slug}`}
                  className="text-body text-link cursor-pointer underline md:text-base"
                >
                  {c.name}
                </Link>
              ),
            },
            { header: 'Year', render: (c) => c.year },
            { header: 'Focus', render: (c) => c.focus?.join(', ') },
          ]}
        />
      </div>
    </>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { useSetAtom } from 'jotai';

import { clientsAtom } from '@/lib/atoms/clients';
import type { Client } from '@/lib/sanity.types';
import { Table } from '@/components/Table';

type Contact = {
  type: 'email' | 'instagram';
  value: string;
};

type HomeClientProps = {
  clients: Client[];
  contacts: Contact[];
};

export default function HomeClient({ clients, contacts }: HomeClientProps) {
  const setClients = useSetAtom(clientsAtom);

  React.useEffect(() => {
    setClients((prev) => prev ?? clients);
  }, [clients, setClients]);

  return (
    <>
      <div className="mb-12 md:mb-14">
        <Table
          rows={clients}
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
      <Table
        rows={contacts}
        columns={[
          { header: 'Contact', render: (c) => c.type },
          {
            header: 'Address',
            render: (c) => (
              <Link
                href={`/${c.value.toLowerCase()}`}
                className="text-body text-link cursor-pointer underline md:text-base"
              >
                {c.value}
              </Link>
            ),
          },
        ]}
      />
    </>
  );
}

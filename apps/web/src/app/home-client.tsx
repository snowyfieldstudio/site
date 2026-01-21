'use client';

import Link from 'next/link';

import type { Client, Contact } from '@/lib/sanity.types';
import { normalizeSlug } from '@/lib/slug';
import { Table } from '@/components/Table';

type HomeClientProps = {
  clients: Client[];
  contacts: Contact[];
};

const getContactLinkProps = (contact: Contact) => {
  if (contact.type === 'email') {
    return { href: `mailto:${contact.value}`, isExternal: false };
  }

  const trimmedValue = contact.value.trim();
  const isFullUrl = /^https?:\/\//i.test(trimmedValue);
  const handle = trimmedValue.replace(/^@/, '');
  const href = isFullUrl ? trimmedValue : `https://instagram.com/${handle}`;

  return { href, isExternal: true };
};

export default function HomeClient({ clients, contacts }: HomeClientProps) {
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
                  href={`/${normalizeSlug(c.slug)}`}
                  className="text-body text-link cursor-pointer underline hover:no-underline active:text-red-500 md:text-base"
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
            render: (c) => {
              const { href, isExternal } = getContactLinkProps(c);

              return (
                <Link
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  className="text-body text-link cursor-pointer underline hover:no-underline active:text-red-500 md:text-base"
                >
                  {c.value}
                </Link>
              );
            },
          },
        ]}
      />
    </>
  );
}

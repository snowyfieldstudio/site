'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { useAtomValue } from 'jotai';

import { clientsAtom } from '@/lib/atoms/clients';

type ClientPageProps = {
  params: {
    client: string;
  };
};

export default function ClientPage({ params }: ClientPageProps) {
  const clients = useAtomValue(clientsAtom);

  if (!clients) return null;

  const client = clients.find(
    (c) => c.name.toLowerCase() === params.client.toLowerCase(),
  );

  if (!client) return notFound();

  return <h2>{client.name}</h2>;
}

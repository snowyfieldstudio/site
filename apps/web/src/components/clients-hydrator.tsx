'use client';

import React from 'react';
import { useHydrateAtoms } from 'jotai/utils';

import { clientsAtom } from '@/lib/atoms/clients';
import type { Client } from '@/lib/sanity.types';

type ClientsHydratorProps = {
  clients: Client[];
  children: React.ReactNode;
};

export default function ClientsHydrator({
  clients,
  children,
}: ClientsHydratorProps) {
  // Hydrate global client state once per request boundary.
  useHydrateAtoms([[clientsAtom, clients]]);

  return <>{children}</>;
}

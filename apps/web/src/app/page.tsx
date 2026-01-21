import React from 'react';

import HomeClient from '@/app/home-client';
import { getClientsAndContacts } from '@/lib/sanity.loader';

export default async function Page() {
  // Data is fetched/validated once in the shared server loader.
  const { clients, contacts } = await getClientsAndContacts();

  return <HomeClient clients={clients} contacts={contacts} />;
}

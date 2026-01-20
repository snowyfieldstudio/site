import React from 'react';

import { sanityClient } from '@/lib/sanity.client';
import { clientsQuery, contactsQuery } from '@/lib/sanity.queries';
import HomeClient from '@/app/home-client';

export default async function Page() {
  const clients = await sanityClient.fetch(clientsQuery);

  const contacts = await sanityClient.fetch(contactsQuery);

  return <HomeClient clients={clients} contacts={contacts} />;
}

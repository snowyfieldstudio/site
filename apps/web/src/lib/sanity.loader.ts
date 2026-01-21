import { cache } from 'react';
import { z } from 'zod';

import { sanityClient } from '@/lib/sanity.client';
import { clientsQuery, contactsQuery } from '@/lib/sanity.queries';
import { ClientSchema, ContactSchema } from '@/lib/sanity.types';

const ClientsSchema = z.array(ClientSchema);
const ContactsSchema = z.array(ContactSchema);

// Server-only loader shared across routes/layouts.
export const getClientsAndContacts = cache(async () => {
  const clients = await sanityClient.fetch(clientsQuery);

  const contacts = await sanityClient.fetch(contactsQuery);

  // Validate once at the boundary before hydrating client state.
  return {
    clients: ClientsSchema.parse(clients),
    contacts: ContactsSchema.parse(contacts),
  };
});

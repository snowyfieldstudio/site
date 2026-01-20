import { defineField, defineType } from 'sanity';

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: ['email', 'instagram'],
      },
    }),
    defineField({
      name: 'value',
      type: 'string',
    }),
  ],
});

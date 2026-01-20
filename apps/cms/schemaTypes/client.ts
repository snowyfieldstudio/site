import { defineField, defineType } from 'sanity';

export const client = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'focus',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'samples',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'deviceType',
              type: 'string',
              options: {
                list: ['phone', 'laptop', 'tablet'],
              },
            }),
            defineField({
              name: 'sampleType',
              type: 'string',
              options: {
                list: ['image', 'video'],
              },
            }),
            defineField({
              name: 'image',
              type: 'image',
              hidden: ({ parent }) => parent?.sampleType !== 'image',
            }),
            defineField({
              name: 'videoPlaybackId',
              type: 'string',
              hidden: ({ parent }) => parent?.sampleType !== 'video',
            }),
          ],
        },
      ],
    }),
  ],
});

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
      name: 'displayUrl',
      type: 'string',
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              type: 'image',
              hidden: ({ parent }) => parent?.sampleType !== 'image',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { sampleType?: string } | null;

                  if (parent?.sampleType === 'image' && !value) {
                    return 'Image is required when sample type is image.';
                  }

                  return true;
                }),
            }),
            defineField({
              name: 'videoPlaybackId',
              type: 'string',
              hidden: ({ parent }) => parent?.sampleType !== 'video',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { sampleType?: string } | null;

                  if (parent?.sampleType === 'video' && !value) {
                    return 'Video playback ID is required when sample type is video.';
                  }

                  return true;
                }),
            }),
          ],
          preview: {
            select: {
              deviceType: 'deviceType',
              sampleType: 'sampleType',
            },
            prepare: ({ deviceType, sampleType }) => ({
              title: `${deviceType ?? 'Device'} · ${sampleType ?? 'Sample'}`,
            }),
          },
        },
      ],
    }),
  ],
});

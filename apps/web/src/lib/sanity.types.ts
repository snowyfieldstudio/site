import { z } from 'zod';

export const SampleSchema = z.object({
  deviceType: z.enum(['phone', 'laptop', 'tablet']),
  sampleType: z.enum(['image', 'video']),
  image: z.any().optional(),
  videoPlaybackId: z.string().optional(),
});

export const ClientSchema = z.object({
  name: z.string(),
  slug: z.string(),
  year: z.number(),
  displayUrl: z.string(),
  focus: z.array(z.string()).optional(),
  samples: z.array(SampleSchema).optional(),
});

export type Client = z.infer<typeof ClientSchema>;

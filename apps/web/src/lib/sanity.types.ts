import { z } from 'zod';

const ImageDimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
});

const ImageMetadataSchema = z.object({
  dimensions: ImageDimensionsSchema,
});

const ImageAssetSchema = z.object({
  _id: z.string(),
  url: z.string(),
  metadata: ImageMetadataSchema,
});

const SampleImageSchema = z.object({
  asset: ImageAssetSchema,
});

const BaseSampleSchema = z.object({
  deviceType: z.enum(['phone', 'laptop', 'tablet']),
});

const ImageSampleSchema = BaseSampleSchema.extend({
  sampleType: z.literal('image'),
  image: SampleImageSchema,
  videoPlaybackId: z.null().optional(),
});

const VideoSampleSchema = BaseSampleSchema.extend({
  sampleType: z.literal('video'),
  videoPlaybackId: z.string(),
  image: z.null().optional(),
});

export const SampleSchema = z.discriminatedUnion('sampleType', [
  ImageSampleSchema,
  VideoSampleSchema,
]);

export const ClientSchema = z.object({
  name: z.string(),
  slug: z.string(),
  year: z.number(),
  displayUrl: z.string(),
  focus: z.array(z.string()).optional(),
  samples: z.array(SampleSchema).optional(),
});

export const ContactSchema = z.object({
  type: z.enum(['email', 'instagram']),
  value: z.string(),
});

export type Client = z.infer<typeof ClientSchema>;

export type Sample = z.infer<typeof SampleSchema>;

export type Contact = z.infer<typeof ContactSchema>;

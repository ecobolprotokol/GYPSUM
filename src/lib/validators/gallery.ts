import { z } from 'zod';

export const gallerySchema = z.object({
  title: z.string().min(3).max(120),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  cover_url: z.string().url(),
  external_link: z.string().url().optional(),
  external_link_label: z.string().max(100).optional(),
  location: z.string().max(200).optional(),
  completed_at: z.string().optional(),
  description: z.string().max(2000).optional(),
  sort_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

export type GalleryInput = z.infer<typeof gallerySchema>;

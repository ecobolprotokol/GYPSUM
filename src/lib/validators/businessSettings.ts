import { z } from 'zod';

export const businessSettingsSchema = z.object({
  business_name: z.string().min(2).max(100),
  tagline: z.string().max(140).optional(),
  description: z.string().max(2000).optional(),
  highlights_json: z.array(z.any()).optional(),
  faq_json: z.array(z.any()).optional(),
  about_json: z.record(z.any()).optional(),
  address: z.string().max(300).optional(),
  google_maps_embed_url: z.string().url().optional().or(z.literal('')),
  google_maps_link: z.string().url().optional().or(z.literal('')),
  whatsapp_number: z.string().regex(/^62[0-9]{8,13}$/),
  instagram_url: z.string().url().optional().or(z.literal('')),
  facebook_url: z.string().url().optional().or(z.literal('')),
  tiktok_url: z.string().url().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  operating_hours: z.string().max(100).optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
  cover_image_url: z.string().url().optional().or(z.literal('')),
});

export type BusinessSettingsInput = z.infer<typeof businessSettingsSchema>;

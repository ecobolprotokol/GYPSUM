import { z } from 'zod';

export const presetSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().min(1).max(60),
  multiplier: z.number().positive(),
  description: z.string().max(200).optional(),
  sort_order: z.number().int().min(0).default(0),
});

export const borringanSchema = z.object({
  name: z.string().min(3).max(120),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(2000).optional(),
  cover_url: z.string().url().optional(),
  price_min: z.number().positive(),
  price_max: z.number().positive(),
  unit: z.string().min(1).max(20).default('m²'),
  includes: z.string().max(1000).optional(),
  notes: z.string().max(500).optional(),
  sort_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
  presets: z.array(presetSchema).optional(),
});

export const borringanPresetSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().min(1).max(60),
  multiplier: z.number().positive(),
  description: z.string().max(200).optional(),
  sort_order: z.number().int().min(0).default(0),
});

export type BorringanInput = z.infer<typeof borringanSchema>;
export type PresetInput = z.infer<typeof presetSchema>;

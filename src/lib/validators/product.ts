import { z } from 'zod';

export const productSchema = z
  .object({
    category_id: z.string().uuid(),
    name: z.string().min(3).max(120),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    short_description: z.string().max(160).optional(),
    full_description: z.string().max(5000).optional(),
    specification_json: z
      .array(
        z.object({
          label: z.string().min(1).max(60),
          value: z.string().min(1).max(200),
        })
      )
      .max(20)
      .optional(),
    price_mode: z.enum(['exact', 'start']),
    price: z.number().positive().optional(),
    price_start: z.number().positive().optional(),
    unit: z.string().min(1).max(20),
    min_order: z.number().int().positive().optional(),
    min_order_note: z.string().max(200).optional(),
    is_pickup_only: z.boolean(),
    delivery_available: z.boolean(),
    cover_url: z.string().url(),
    gallery_urls: z.array(z.string().url()).max(10),
    is_featured: z.boolean(),
    is_active: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.price_mode === 'exact' && !data.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Harga wajib diisi',
        path: ['price'],
      });
    }
    if (data.price_mode === 'start' && !data.price_start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Harga mulai wajib diisi',
        path: ['price_start'],
      });
    }
  });

export type ProductInput = z.infer<typeof productSchema>;

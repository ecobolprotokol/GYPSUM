'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getAdminUser } from '@/lib/auth';
import { productSchema } from '@/lib/validators';
import { slugify } from '@/lib/slug';
import { ActionError, handleActionError } from '@/lib/actionError';

export async function adminUpsertProduct(
  prev: unknown,
  form: FormData
): Promise<{ success: boolean; id?: string; error?: string; field?: string }> {
  try {
    const id = form.get('id') as string | null;
    const input = {
      category_id: form.get('category_id') as string,
      name: form.get('name') as string,
      slug: form.get('slug') as string,
      short_description: form.get('short_description') as string,
      full_description: form.get('full_description') as string,
      specification_json: JSON.parse(
        (form.get('specification_json') as string) || '[]'
      ),
      price_mode: form.get('price_mode') as 'exact' | 'start',
      price: form.get('price') ? Number(form.get('price')) : undefined,
      price_start: form.get('price_start')
        ? Number(form.get('price_start'))
        : undefined,
      unit: form.get('unit') as string,
      min_order: form.get('min_order')
        ? Number(form.get('min_order'))
        : undefined,
      min_order_note: form.get('min_order_note') as string,
      is_pickup_only: form.get('is_pickup_only') === 'true',
      delivery_available: form.get('delivery_available') === 'true',
      cover_url: form.get('cover_url') as string,
      gallery_urls: JSON.parse(
        (form.get('gallery_urls') as string) || '[]'
      ),
      is_featured: form.get('is_featured') === 'true',
      is_active: form.get('is_active') === 'true',
    };

    const validated = productSchema.safeParse(input);
    if (!validated.success) {
      const issue = validated.error.issues[0];
      throw new ActionError(
        'VALIDATION_ERROR',
        issue.message,
        issue.path?.[0]?.toString()
      );
    }

    const { supabase, user } = await getAdminUser();

    if (id) {
      const { error } = await supabase
        .from('products')
        .update({
          ...validated.data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('category_id', validated.data.category_id);

      if (error) {
        throw new ActionError('DB_ERROR', error.message);
      }
    } else {
      const slug = validated.data.slug || slugify(validated.data.name);
      const { data, error } = await supabase
        .from('products')
        .insert({
          ...validated.data,
          slug,
          sort_order: 0,
        })
        .select('id')
        .single();

      if (error) {
        throw new ActionError('DB_ERROR', error.message);
      }

      revalidatePath('/produk', 'layout');
      return { success: true, id: data.id };
    }

    revalidatePath('/produk', 'layout');
    revalidatePath(`/produk/${validated.data.slug}`, 'layout');
    return { success: true, id };
  } catch (error) {
    const result = handleActionError(error);
    return {
      success: false,
      id: undefined,
      error: result.error.message,
      field: result.error.field,
    };
  }
}

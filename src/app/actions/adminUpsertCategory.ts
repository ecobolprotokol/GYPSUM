'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getAdminUser } from '@/lib/auth';
import { categorySchema } from '@/lib/validators';
import { slugify } from '@/lib/slug';
import { ActionError, handleActionError } from '@/lib/actionError';

export async function adminUpsertCategory(
  prev: unknown,
  form: FormData
): Promise<{ success: boolean; id?: string; error?: string; field?: string }> {
  try {
    const id = form.get('id') as string | null;
    const input = {
      name: form.get('name') as string,
      slug: form.get('slug') as string,
      description: form.get('description') as string,
      cover_url: form.get('cover_url') as string,
      sort_order: form.get('sort_order')
        ? Number(form.get('sort_order'))
        : 0,
      is_active: form.get('is_active') === 'true',
    };

    if (!input.slug) {
      input.slug = slugify(input.name);
    }

    const validated = categorySchema.safeParse(input);
    if (!validated.success) {
      const issue = validated.error.issues[0];
      throw new ActionError(
        'VALIDATION_ERROR',
        issue.message,
        issue.path?.[0]?.toString()
      );
    }

    const { supabase } = await getAdminUser();

    if (id) {
      const { error } = await supabase
        .from('categories')
        .update(validated.data)
        .eq('id', id);

      if (error) {
        throw new ActionError('DB_ERROR', error.message);
      }
    } else {
      const { data, error } = await supabase
        .from('categories')
        .insert(validated.data)
        .select('id')
        .single();

      if (error) {
        throw new ActionError('DB_ERROR', error.message);
      }

      revalidatePath('/admin/kategori', 'layout');
      return { success: true, id: data.id };
    }

    revalidatePath('/admin/kategori', 'layout');
    revalidatePath('/produk', 'layout');
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

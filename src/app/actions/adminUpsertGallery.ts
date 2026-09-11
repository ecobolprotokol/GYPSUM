'use server';

import { revalidatePath } from 'next/cache';
import { getAdminUser } from '@/lib/auth';
import { gallerySchema } from '@/lib/validators';
import { slugify } from '@/lib/slug';
import { ActionError, handleActionError } from '@/lib/actionError';

export async function adminUpsertGallery(
  prev: unknown,
  form: FormData
): Promise<{ success: boolean; id?: string; error?: string; field?: string }> {
  try {
    const id = form.get('id') as string | null;
    const input = {
      title: form.get('title') as string,
      slug: form.get('slug') as string,
      cover_url: form.get('cover_url') as string,
      external_link: form.get('external_link') as string,
      external_link_label: form.get('external_link_label') as string,
      location: form.get('location') as string,
      completed_at: form.get('completed_at') as string,
      description: form.get('description') as string,
      sort_order: form.get('sort_order')
        ? Number(form.get('sort_order'))
        : 0,
      is_active: form.get('is_active') === 'true',
    };

    const cleanInput = {
      ...input,
      external_link: input.external_link || undefined,
      external_link_label: input.external_link_label || undefined,
      description: input.description || undefined,
      location: input.location || undefined,
      completed_at: input.completed_at || undefined,
    };

    if (!cleanInput.slug) {
      cleanInput.slug = slugify(cleanInput.title);
    }

    const validated = gallerySchema.safeParse(cleanInput);
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
        .from('gallery_projects')
        .update(validated.data)
        .eq('id', id);

      if (error) {
        throw new ActionError('DB_ERROR', error.message);
      }
    } else {
      const { data, error } = await supabase
        .from('gallery_projects')
        .insert(validated.data)
        .select('id')
        .single();

      if (error) {
        throw new ActionError('DB_ERROR', error.message);
      }

      revalidatePath('/admin/galeri', 'layout');
      return { success: true, id: data.id };
    }

    revalidatePath('/admin/galeri', 'layout');
    revalidatePath('/galeri', 'layout');
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

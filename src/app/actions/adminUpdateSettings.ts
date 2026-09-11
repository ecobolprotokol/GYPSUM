'use server';

import { revalidatePath } from 'next/cache';
import { getAdminUser } from '@/lib/auth';
import { businessSettingsSchema } from '@/lib/validators';
import { ActionError, handleActionError } from '@/lib/actionError';

export async function adminUpdateSettings(
  prev: unknown,
  form: FormData
): Promise<{ success: boolean; error?: string; field?: string }> {
  try {
    const input = {
      business_name: form.get('business_name') as string,
      tagline: form.get('tagline') as string,
      description: form.get('description') as string,
      highlights_json: form.get('highlights_json')
        ? JSON.parse(form.get('highlights_json') as string)
        : [],
      faq_json: form.get('faq_json') ? JSON.parse(form.get('faq_json') as string) : [],
      about_json: form.get('about_json')
        ? JSON.parse(form.get('about_json') as string)
        : {},
      address: form.get('address') as string,
      google_maps_embed_url: form.get('google_maps_embed_url') as string,
      google_maps_link: form.get('google_maps_link') as string,
      whatsapp_number: form.get('whatsapp_number') as string,
      instagram_url: form.get('instagram_url') as string,
      facebook_url: form.get('facebook_url') as string,
      tiktok_url: form.get('tiktok_url') as string,
      email: form.get('email') as string,
      operating_hours: form.get('operating_hours') as string,
      logo_url: form.get('logo_url') as string,
      cover_image_url: form.get('cover_image_url') as string,
    };

    const cleanInput = {
      ...input,
      tagline: input.tagline || undefined,
      description: input.description || undefined,
      address: input.address || undefined,
      google_maps_embed_url: input.google_maps_embed_url || undefined,
      google_maps_link: input.google_maps_link || undefined,
      instagram_url: input.instagram_url || undefined,
      facebook_url: input.facebook_url || undefined,
      tiktok_url: input.tiktok_url || undefined,
      email: input.email || undefined,
      operating_hours: input.operating_hours || undefined,
      logo_url: input.logo_url || undefined,
      cover_image_url: input.cover_image_url || undefined,
    };

    const validated = businessSettingsSchema.safeParse(cleanInput);
    if (!validated.success) {
      const issue = validated.error.issues[0];
      throw new ActionError(
        'VALIDATION_ERROR',
        issue.message,
        issue.path?.[0]?.toString()
      );
    }

    const { supabase } = await getAdminUser();

    const { data: existing } = await supabase
      .from('business_settings')
      .select('id')
      .single();

    if (existing?.id) {
      const { error } = await supabase
        .from('business_settings')
        .update(validated.data)
        .eq('id', existing.id);

      if (error) {
        throw new ActionError('DB_ERROR', error.message);
      }
    } else {
      const { error } = await supabase
        .from('business_settings')
        .insert({
          ...validated.data,
        })
        .select('id')
        .single();

      if (error) {
        throw new ActionError('DB_ERROR', error.message);
      }
    }

    revalidatePath('/', 'layout');
    revalidatePath('/kontak', 'layout');
    revalidatePath('/tentang', 'layout');
    revalidatePath('/admin/pengaturan', 'layout');
    return { success: true };
  } catch (error) {
    const result = handleActionError(error);
    return {
      success: false,
      error: result.error.message,
      field: result.error.field,
    };
  }
}

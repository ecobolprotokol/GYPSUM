'use server';

import { revalidatePath } from 'next/cache';
import { getAdminUser } from '@/lib/auth';
import { borringanSchema } from '@/lib/validators';
import { slugify } from '@/lib/slug';
import { ActionError, handleActionError } from '@/lib/actionError';

export async function adminUpsertBorringan(
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
      price_min: form.get('price_min')
        ? Number(form.get('price_min'))
        : undefined,
      price_max: form.get('price_max')
        ? Number(form.get('price_max'))
        : undefined,
      unit: form.get('unit') as string,
      includes: form.get('includes') as string,
      notes: form.get('notes') as string,
      sort_order: form.get('sort_order')
        ? Number(form.get('sort_order'))
        : 0,
      is_active: form.get('is_active') === 'true',
      presets: JSON.parse((form.get('presets') as string) || '[]'),
    };

    const cleanInput = {
      ...input,
      description: input.description || undefined,
      cover_url: input.cover_url || undefined,
      includes: input.includes || undefined,
      notes: input.notes || undefined,
      unit: input.unit || 'm²',
    };

    if (!cleanInput.slug) {
      cleanInput.slug = slugify(cleanInput.name);
    }

    const validated = borringanSchema.safeParse(cleanInput);
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
      const { data: existingPresets } = await supabase
        .from('calculator_presets')
        .select('id')
        .eq('service_id', id);

      const { presets, ...serviceData } = validated.data;

      const { error } = await supabase
        .from('borringan_services')
        .update(serviceData)
        .eq('id', id);

      if (error) {
        throw new ActionError('DB_ERROR', error.message);
      }

      if (existingPresets?.length) {
        const existingIds = existingPresets.map((p) => p.id);
        const newPresetIds = (presets || []).map((p) => p.id).filter(Boolean);
        const toDelete = existingIds.filter(
          (id) => !newPresetIds.includes(id)
        );
        if (toDelete.length) {
          await supabase
            .from('calculator_presets')
            .delete()
            .in('id', toDelete as string[]);
        }
      }

      if (presets && presets.length) {
        for (const preset of presets) {
          if (preset.id) {
            await supabase
              .from('calculator_presets')
              .update({
                label: preset.label,
                multiplier: preset.multiplier,
                description: preset.description,
                sort_order: preset.sort_order,
              })
              .eq('id', preset.id);
          } else {
            await supabase.from('calculator_presets').insert({
              service_id: id,
              label: preset.label,
              multiplier: preset.multiplier,
              description: preset.description,
              sort_order: preset.sort_order,
            });
          }
        }
      }
    } else {
      const { presets, ...serviceData } = validated.data;
      const { data, error } = await supabase
        .from('borringan_services')
        .insert(serviceData)
        .select('id')
        .single();

      if (error) {
        throw new ActionError('DB_ERROR', error.message);
      }

      if (presets && presets.length) {
        for (const preset of presets) {
          await supabase.from('calculator_presets').insert({
            service_id: data.id,
            label: preset.label,
            multiplier: preset.multiplier,
            description: preset.description,
            sort_order: preset.sort_order,
          });
        }
      }

      revalidatePath('/borringan', 'layout');
      return { success: true, id: data.id };
    }

    revalidatePath('/admin/borringan', 'layout');
    revalidatePath('/borringan', 'layout');
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

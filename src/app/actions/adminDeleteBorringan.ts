'use server';

import { revalidatePath } from 'next/cache';
import { getAdminUser } from '@/lib/auth';
import { ActionError, handleActionError } from '@/lib/actionError';

export async function adminDeleteBorringan(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!id) {
      throw new ActionError('VALIDATION_ERROR', 'ID layanan wajib');
    }

    const { supabase } = await getAdminUser();

    await supabase.from('calculator_presets').delete().eq('service_id', id);

    const { error } = await supabase
      .from('borringan_services')
      .delete()
      .eq('id', id);

    if (error) {
      throw new ActionError('DB_ERROR', error.message);
    }

    revalidatePath('/admin/borringan', 'layout');
    revalidatePath('/borringan', 'layout');
    return { success: true };
  } catch (error) {
    const result = handleActionError(error);
    return {
      success: false,
      error: result.error.message,
    };
  }
}

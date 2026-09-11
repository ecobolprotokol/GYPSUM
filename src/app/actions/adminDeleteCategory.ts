'use server';

import { revalidatePath } from 'next/cache';
import { getAdminUser } from '@/lib/auth';
import { ActionError, handleActionError } from '@/lib/actionError';

export async function adminDeleteCategory(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!id) {
      throw new ActionError('VALIDATION_ERROR', 'ID kategori wajib');
    }

    const { supabase } = await getAdminUser();

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      throw new ActionError('DB_ERROR', error.message);
    }

    revalidatePath('/admin/kategori', 'layout');
    revalidatePath('/produk', 'layout');
    return { success: true };
  } catch (error) {
    const result = handleActionError(error);
    return {
      success: false,
      error: result.error.message,
    };
  }
}

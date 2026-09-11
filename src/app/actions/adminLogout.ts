'use server';

import { createClient } from '@/lib/supabase/server';
import { ActionError, handleActionError } from '@/lib/actionError';

export async function adminLogout(): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new ActionError('LOGOUT_ERROR', 'Gagal logout');
    }

    return { success: true };
  } catch (error) {
    const result = handleActionError(error);
    return {
      success: false,
      error: result.error.message,
    };
  }
}

'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { loginSchema } from '@/lib/validators';
import { ActionError, handleActionError } from '@/lib/actionError';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;

export async function adminLogin(
  prev: unknown,
  form: FormData
): Promise<{ success: boolean; error?: string; forceChangePin?: boolean }> {
  const username = form.get('username') as string;
  const pin = form.get('pin') as string;

  try {
    const validated = loginSchema.safeParse({ username, pin });
    if (!validated.success) {
      throw new ActionError('VALIDATION_ERROR', 'Username atau PIN salah');
    }

    const supabase = createClient();

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, pin_hash, failed_login_attempts, locked_until')
      .eq('username', username)
      .single();

    if (profileError || !profile) {
      throw new ActionError('INVALID_CREDENTIALS', 'Username atau PIN salah');
    }

    if (profile.locked_until) {
      const lockedUntil = new Date(profile.locked_until);
      if (lockedUntil > new Date()) {
        const minsLeft = Math.ceil(
          (lockedUntil.getTime() - Date.now()) / (1000 * 60)
        );
        throw new ActionError(
          'ACCOUNT_LOCKED',
          `Akun terkunci. Coba lagi dalam ${minsLeft} menit.`
        );
      }
    }

    const pinValid = await bcrypt.compare(pin, profile.pin_hash);
    if (!pinValid) {
      const newFailedAttempts = (profile.failed_login_attempts || 0) + 1;
      if (newFailedAttempts >= MAX_FAILED_ATTEMPTS) {
        const lockedUntil = new Date(
          Date.now() + LOCKOUT_DURATION_MINUTES * 60 * 1000
        );
        await supabase
          .from('profiles')
          .update({
            failed_login_attempts: newFailedAttempts,
            locked_until: lockedUntil.toISOString(),
          })
          .eq('id', profile.id);
        throw new ActionError(
          'ACCOUNT_LOCKED',
          `Akun terkunci. Coba lagi dalam ${LOCKOUT_DURATION_MINUTES} menit.`
        );
      }

      await supabase
        .from('profiles')
        .update({ failed_login_attempts: newFailedAttempts })
        .eq('id', profile.id);

      throw new ActionError('INVALID_CREDENTIALS', 'Username atau PIN salah');
    }

    await supabase
      .from('profiles')
      .update({ failed_login_attempts: 0, locked_until: null })
      .eq('id', profile.id);

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.signInWithPassword({
        email: profile.id,
        password: profile.id,
      });

    if (authError || !authData.user) {
      throw new ActionError('AUTH_ERROR', 'Gagal membuat sesi');
    }

    const { data: forceData } = await supabase
      .from('profiles')
      .select('force_change_pin')
      .eq('id', profile.id)
      .single();

    revalidatePath('/admin/dashboard', 'layout');

    return {
      success: true,
      forceChangePin: forceData?.force_change_pin ?? false,
    };
  } catch (error) {
    const result = handleActionError(error);
    return {
      success: false,
      error: result.error.message,
    };
  }
}

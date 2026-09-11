'use server';

import bcrypt from 'bcryptjs';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { changePinSchema } from '@/lib/validators';
import { WEAK_PINS } from '@/lib/constants';
import { ActionError, handleActionError } from '@/lib/actionError';

export async function adminChangePin(
  prev: unknown,
  form: FormData
): Promise<{ success: boolean; error?: string }> {
  const currentPin = form.get('currentPin') as string;
  const newPin = form.get('newPin') as string;
  const confirmNewPin = form.get('confirmNewPin') as string;

  try {
    const validated = changePinSchema.safeParse({
      currentPin,
      newPin,
      confirmNewPin,
    });

    if (!validated.success) {
      const issues = validated.error.issues;
      const firstIssue = issues[0];
      throw new ActionError(
        'VALIDATION_ERROR',
        firstIssue.message,
        firstIssue.path?.[0]?.toString()
      );
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new ActionError('UNAUTHORIZED', 'Authentication required');
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('pin_hash, force_change_pin')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      throw new ActionError('NOT_FOUND', 'Profil admin tidak ditemukan');
    }

    const currentPinValid = await bcrypt.compare(currentPin, profile.pin_hash);
    if (!currentPinValid) {
      throw new ActionError('INVALID_PIN', 'PIN saat ini tidak benar');
    }

    if (WEAK_PINS.includes(newPin) || /^(\d)\1{5}$/.test(newPin)) {
      throw new ActionError('WEAK_PIN', 'PIN terlalu lemah');
    }

    const newPinHash = await bcrypt.hash(newPin, 10);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        pin_hash: newPinHash,
        force_change_pin: false,
      })
      .eq('id', user.id);

    if (updateError) {
      throw new ActionError('UPDATE_ERROR', 'Gagal mengganti PIN');
    }

    await supabaseAdmin.auth.admin.signOut(user.id);

    return { success: true };
  } catch (error) {
    const result = handleActionError(error);
    return {
      success: false,
      error: result.error.message,
    };
  }
}

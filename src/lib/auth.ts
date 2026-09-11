import { createClient } from '@/lib/supabase/server';
import { ActionError } from '@/lib/actionError';

export async function getAdminUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    throw new ActionError('UNAUTHORIZED', 'Authentication required');
  }

  return { supabase, user };
}

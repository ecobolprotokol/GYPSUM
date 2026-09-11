import type { Metadata } from 'next';
import { env } from '@/lib/env';
import { createClient } from '@/lib/supabase/server';

export async function getBusinessSettings() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('business_settings')
    .select('*')
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export function createMetadata(opts: {
  title: string;
  description: string;
  image?: string;
  path?: string;
}): Metadata {
  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      images: image ? [image] : undefined,
      type: 'website',
      locale: 'id-ID',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description.slice(0, 160),
      images: image ? [image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...(opts.path
      ? { alternates: { canonical: `${env.NEXT_PUBLIC_SUPABASE_URL}${opts.path}` } }
      : {}),
  };
}

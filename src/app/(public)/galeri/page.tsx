import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { createMetadata, getBusinessSettings } from '@/lib/metadata';
import { createClient } from '@/lib/supabase/server';
import { GalleryCard } from '@/components/shared/GalleryCard';
import { EmptyState } from '@/components/shared/EmptyState';
import type { GalleryProject } from '@/types';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  const businessName = settings?.business_name ?? 'Gypsum Katalog Pro';
  return createMetadata({
    title: `Galeri | ${businessName}`,
    description:
      'Koleksi portfolio proyek gypsum terbaik untuk inspirasi desain rumah Anda.',
    path: '/galeri',
  });
}

export const revalidate = 3600;

export default async function GalleryPage() {
  const supabase = createClient();

  const { data: projects } = await supabase
    .from('gallery_projects')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  return (
    <div className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-8">
        <div className="mb-12">
          <h1 className="display-text text-4xl font-bold text-primary">
            Galeri Portfolio
          </h1>
          <p className="mt-4 text-muted-foreground">
            Kumpulan proyek gypsum yang telah diselesaikan.
          </p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <GalleryCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Belum ada portfolio"
            description="Belum ada proyek galeri yang tersedia."
            action={{
              label: 'Kembali ke beranda',
              href: '/',
            }}
          />
        )}
      </div>
    </div>
  );
}
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createMetadata, getBusinessSettings } from '@/lib/metadata';
import { createClient } from '@/lib/supabase/server';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { buildGalleryMessage } from '@/lib/whatsapp';
import type { GalleryProject } from '@/types';

async function getProject(slug: string): Promise<GalleryProject | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gallery_projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    return null;
  }
  return data as GalleryProject;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) {
    return {
      title: 'Proyek Tidak Ditemukan',
    };
  }
  const settings = await getBusinessSettings();
  const businessName = settings?.business_name ?? 'Gypsum Katalog Pro';
  return createMetadata({
    title: `${project.title} | ${businessName}`,
    description:
      project.description ??
      `Proyek ${project.title} di ${project.location ?? 'Indonesia'}.`,
    image: project.cover_url,
    path: `/galeri/${slug}`,
  });
}

export const revalidate = 3600;

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) {
    notFound();
  }

  const settings = await getBusinessSettings();
  const whatsappNumber = settings?.whatsapp_number ?? '6281234567890';
  const waMessage = buildGalleryMessage(project.title);

  const year = project.completed_at
    ? new Date(project.completed_at).getFullYear()
    : null;

  return (
    <div className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/galeri">Galeri</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{project.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
              <Image
                src={project.cover_url}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary">Portfolio</Badge>
            <h1 className="display-text text-3xl font-bold text-primary">
              {project.title}
            </h1>

            <div className="space-y-2 text-muted-foreground">
              {project.location && (
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{project.location}</span>
                </div>
              )}
              {year && (
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{year}</span>
                </div>
              )}
            </div>

            {project.description && (
              <p className="text-muted-foreground">{project.description}</p>
            )}

            <div className="flex flex-col gap-3">
              {project.external_link && (
                <a
                  href={project.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button variant="default" className="w-full">
                    {project.external_link_label ?? 'Lihat dokumentasi lengkap'}
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Button>
                </a>
              )}
              <WhatsAppCTA
                whatsappNumber={whatsappNumber}
                message={waMessage}
                size="lg"
                className="w-full"
              >
                Tertarik dengan proyek serupa?
              </WhatsAppCTA>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
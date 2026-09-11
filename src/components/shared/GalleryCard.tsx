import Link from 'next/link';
import Image from 'next/image';
import type { GalleryProject } from '@/types';

export function GalleryCard({ project }: { project: GalleryProject }) {
  const year = project.completed_at
    ? new Date(project.completed_at).getFullYear()
    : null;

  return (
    <Link href={`/galeri/${project.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={project.cover_url}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-semibold text-primary">
            {project.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            {project.location && <span>{project.location}</span>}
            {year && <span>• {year}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
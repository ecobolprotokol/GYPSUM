export function slugify(text: string): string {
  if (!text) return '';

  const normalized = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return normalized || 'untitled';
}

export function generateSlug(text: string, existing?: string[]): string {
  const base = slugify(text);
  let slug = base;
  let counter = 1;

  if (existing) {
    while (existing.includes(slug)) {
      slug = `${base}-${counter}`;
      counter++;
    }
  }

  return slug;
}

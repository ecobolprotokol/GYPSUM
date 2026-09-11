import { cn } from '@/lib/utils';

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={cn(
      'absolute left-4 top-4 z-[9999] -translate-y-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform focus:translate-y-0'
      )}
    >
      Skip to main content
    </a>
  );
}

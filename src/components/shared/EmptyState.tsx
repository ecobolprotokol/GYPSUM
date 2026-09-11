import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 text-center',
        className
      )}
    >
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        {icon ?? (
          <svg
            className="h-10 w-10 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1m16 0H4"
            />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="mt-2 max-w-md text-muted-foreground">{description}</p>
      {action && (
        <Link href={action.href} className="mt-6">
          <Button variant="default">{action.label}</Button>
        </Link>
      )}
    </div>
  );
}
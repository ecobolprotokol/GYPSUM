import { cn } from '@/lib/utils';

function Button({
  className,
  variant,
  size,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        {
          'bg-accent text-accent-foreground hover:bg-accent/90': variant === 'default' || !variant,
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
          'border border-border bg-background hover:bg-muted text-primary': variant === 'outline',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'hover:bg-muted text-primary hover:text-accent': variant === 'ghost',
          'text-accent underline-offset-4 hover:underline': variant === 'link',
        },
        {
          'h-9 px-3': size === 'sm',
          'h-10 px-4 py-2': size === 'md' || !size,
          'h-12 px-6 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };

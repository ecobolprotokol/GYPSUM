import * as React from 'react';
import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    className={cn(
      'h-4 w-4 rounded border-border text-accent focus:ring-accent',
      className
    )}
    ref={ref}
    {...props}
  />
));
Checkbox.displayName = 'Checkbox';

export { Checkbox };

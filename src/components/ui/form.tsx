import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form
    ref={ref}
    className={cn('space-y-6', className)}
    {...props}
  />
));
Form.displayName = 'Form';

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-2', className)} {...props} />
));
FormControl.displayName = 'FormControl';

const FormField = ({
  label,
  children,
  required = false,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  className?: string;
}) => (
  <div className={cn('space-y-2', className)}>
    <Label>
      {label}
      {required && <span className="text-destructive"> *</span>}
    </Label>
    {children}
    {error && <p className="text-sm text-destructive">{error}</p>}
  </div>
);

const FormMessage = ({
  message,
}: {
  message?: string;
}) => {
  if (!message) return null;
  return <p className="text-sm text-destructive">{message}</p>;
};

export { Form, FormControl, FormField, FormMessage };

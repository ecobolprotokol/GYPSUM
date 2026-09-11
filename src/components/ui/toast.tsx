import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const toastVariants = cva(
  'group pointer-events-auto flex items-center gap-3 overflow-hidden rounded-lg border p-4 text-sm font-medium shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'border-border bg-background text-foreground',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground',
        success: 'border-green-200 bg-green-50 text-green-900',
        info: 'border-blue-200 bg-blue-50 text-blue-900',
      },
      visible: {
        true: 'translate-y-0 opacity-100',
        false: 'translate-y-2 opacity-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      visible: true,
    },
  }
);

export type ToastProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof toastVariants>;

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, visible, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant, visible }), className)}
        {...props}
      />
    );
  }
);
Toast.displayName = 'Toast';

interface ToastState {
  show: boolean;
  message: string;
  variant: 'default' | 'destructive' | 'success' | 'info';
}

export function useToast() {
  const [toast, setToast] = React.useState<ToastState>({
    show: false,
    message: '',
    variant: 'default',
  });

  const showToast = React.useCallback(
    (message: string, variant: ToastState['variant'] = 'default') => {
      setToast({ show: true, message, variant });
      setTimeout(
        () => setToast((prev) => ({ ...prev, show: false })),
        4000
      );
    },
    []
  );

  return { toast, showToast };
}

export function ToastContainer({ toast }: { toast: ToastState }) {
  if (!toast.show) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Toast variant={toast.variant} visible={toast.show}>
        {toast.message}
      </Toast>
    </div>
  );
}

export { toastVariants };

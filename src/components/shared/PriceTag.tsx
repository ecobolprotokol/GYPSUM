import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const priceTagVariants = cva(
  'inline-flex items-baseline rounded-lg px-3 py-1 font-semibold',
  {
    variants: {
      variant: {
        default: 'text-accent',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export function PriceTag({
  amount,
  unit,
  priceMode = 'exact',
  variant,
  className,
}: {
  amount: number;
  unit?: string;
  priceMode?: 'exact' | 'start';
  variant?: VariantProps<typeof priceTagVariants>['variant'];
  className?: string;
}): JSX.Element {
  const formatted = new Intl.NumberFormat('id-ID').format(amount);
  const prefix = priceMode === 'start' ? 'Mulai ' : '';
  const unitStr = unit ? ` / ${unit}` : '';

  return (
    <span className={cn(priceTagVariants({ variant }), className)}>
      {prefix}Rp{formatted}
      <span className="font-normal text-sm text-muted-foreground">
        {unitStr}
      </span>
    </span>
  );
}

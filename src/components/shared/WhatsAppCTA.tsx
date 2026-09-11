import Link from 'next/link';
import { cn } from '@/lib/utils';

interface WhatsAppCTAProps {
  whatsappNumber: string;
  message: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  className?: string;
}

export function WhatsAppCTA({
  whatsappNumber,
  message,
  children = 'Hubungi via WhatsApp',
  size = 'md',
  variant = 'default',
  className,
}: WhatsAppCTAProps) {
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        {
          'bg-accent text-accent-foreground hover:bg-accent/90': variant === 'default',
          'border border-accent text-accent hover:bg-accent/10': variant === 'outline',
        },
        {
          'h-9 px-3 text-sm': size === 'sm',
          'h-10 px-4 py-2 text-sm': size === 'md',
          'h-12 px-6 text-base': size === 'lg',
        },
        className
      )}
    >
      <svg
        className="mr-2 h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12.04 2.01C6.5 2.01 2 6.27 2 11.51c0 1.99.53 3.85 1.45 5.42l-1.46 4.34c-.12.34.27.68.63.57l3.83-2.65c1.49.5 3.11.78 4.8.78 5.54 0 10.04-4.26 10.04-9.51 0-2.57-1-4.88-2.68-6.67-.17-.18-.4-.27-.61-.27l-.02.01zM11.96 19.85c-1.59 0-3.1-.42-4.44-1.17l-.32-.17-2.82 1.96.75-2.79-.1-.26c-.83-1.57-1.3-3.34-1.3-5.15 0-4.65 3.81-8.47 8.51-8.47 2.26 0 4.35.87 5.97 2.36 1.62 1.49 2.69 3.6 2.69 5.93 0 4.66-3.8 8.48-8.5 8.48z" />
        <path d="M16.64 13.92c-.24-.6-1.39-1.1-1.8-.14-.4.98-.94 1.84-1.6 2.52.02.02.75 2.13.96 2.86.08.26.1.45.05.62-.04.18-.12.34-.31.45-.18.11-.4.04-.67-.08l-.01-.01c-.24-.1-.5.26-.73.56-.22.3-.44.62-.65.95-.23.34-.45.66-.68 1 .03-.42.08-1.38.12-2.17l-.01-.02c0-.08-.01-.16-.01-.24 0-.08.01-.16.03-.24 0-.08.01-.16.03-.24l.01-.02c.04-.16.09-.31.15-.44.05-.13.11-.26.17-.38l.01-.01c.1-.19.2-.38.3-.57.12-.28.24-.55.37-.82.04-.07.08-.14.12-.21.2-.4.39-.82.58-1.26.06-.14.12-.28.17-.41 0 0-.01.01-.01.01v.02c0 .08-.01.16-.01.24 0 .08-.01.16-.03.24 0 .08-.01.16-.03.24l-.01.02c-.04.16-.09.31-.15.44-.05.13-.11.26-.17.38-.07.16-.14.32-.21.48-1.39 2.99-1.56 5.75.12 7.9.17.24.34.47.57.7 2.01 1.22 2.13 3.25 1.13 3.96-1.01.71-2.69.92-3.62.71-2.47-.54-4.43-2.33-5.29-4.81-.15-.4-.3-.8-.44-1.21.05-.08.1-.16.15-.25.03-.01.05-.02.08-.03l.16-.3c.38-.74 1.06-1.25 1.85-1.4.89-.15 1.86.1 2.91.62.22.1.44.21.65.34l.02.01c.1-.05.21-.09.31-.14.22-.1.44-.19.67-.28.05-.02.1-.03.15-.05.41-.13.83-.2 1.25-.22 1.74-.07 3.41.76 4.1 2.23.11.25.21.5.31.75.1.25.2.5.29.75.02.06.03.12.05.18z" />
      </svg>
      {children}
    </Link>
  );
}

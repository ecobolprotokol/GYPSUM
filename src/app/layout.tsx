import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Gypsum Katalog Pro',
  description: 'Katalog profesional gypsum rumahan — produk, borningan, dan galeri',
  keywords: ['gypsum', 'katalog', 'borningan', 'plafon', 'kontraktor'],
  authors: [{ name: 'Gypsum Katalog Pro' }],
  creator: 'Gypsum Katalog Pro',
  publisher: 'Gypsum Katalog Pro',
  openGraph: {
    type: 'website',
    locale: 'id-ID',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

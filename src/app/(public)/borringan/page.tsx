import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { createMetadata, getBusinessSettings } from '@/lib/metadata';
import { createClient } from '@/lib/supabase/server';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { BorringanCard } from '@/components/shared/BorringanCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPriceRange } from '@/lib/currency';
import { buildContactMessage } from '@/lib/whatsapp';
import type { BorringanService, CalculatorPreset, FAQItem } from '@/types';

const Calculator = dynamic(() => import('./Calculator'), {
  ssr: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  const businessName = settings?.business_name ?? 'Gypsum Katalog Pro';
  return createMetadata({
    title: `Borongan | ${businessName}`,
    description:
      'Layanan borongan dan jasa pasang gypsum dengan estimasi biaya transparan.',
    path: '/borringan',
  });
}

export const revalidate = 3600;

export default async function BoronganPage() {
  const supabase = createClient();
  const settings = await getBusinessSettings();

  const { data: services } = await supabase
    .from('borringan_services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  const { data: presets } = await supabase
    .from('calculator_presets')
    .select('*')
    .order('sort_order', { ascending: true });

  const faqRaw = settings?.faq_json;
  const faq: FAQItem[] = Array.isArray(faqRaw)
    ? (faqRaw as FAQItem[])
    : [];

  const whatsappNumber = settings?.whatsapp_number ?? '6281234567890';
  const contactMessage = buildContactMessage();

  return (
    <div className="flex flex-col">
      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Layanan Borongan
            </Badge>
            <h1 className="display-text text-4xl font-bold text-primary sm:text-5xl">
              Jasa Pasang &amp; Borongan
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Layanan profesional untuk kebutuhan gypsum rumahan Anda.
              Estimasi biaya transparan, survey gratis.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="display-text text-3xl font-bold text-primary">
              Pilihan Layanan
            </h2>
            <p className="mt-4 text-muted-foreground">
              Berbagai layanan borongan sesuai kebutuhan proyek Anda.
            </p>
          </div>
          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <BorringanCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              Belum ada layanan tersedia.
            </div>
          )}
        </div>
      </section>

      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <h2 className="display-text text-3xl font-bold text-primary">
                Kalkulator Estimasi Biaya
              </h2>
              <p className="mt-4 text-muted-foreground">
                Dapatkan estimasi biaya layanan borongan secara cepat.
              </p>
            </div>
            <div className="mt-10">
              <Calculator
                services={services ?? []}
                presets={presets ?? []}
                whatsappNumber={whatsappNumber}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="display-text mb-8 text-center text-3xl font-bold text-primary">
              Pertanyaan yang Sering Diajukan
            </h2>
            <div className="space-y-4">
              {faq.length > 0 ? (
                faq.map((item, idx) => (
                  <details
                    key={idx}
                    className="group overflow-hidden rounded-lg border border-border bg-background"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-medium text-foreground">
                      {item.question}
                      <svg
                        className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="border-t border-border p-4 text-sm text-muted-foreground">
                      {item.answer}
                    </div>
                  </details>
                ))
              ) : (
                <div className="rounded-lg border border-border bg-background p-8 text-center text-muted-foreground">
                  Belum ada FAQ.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8 text-center">
          <h2 className="display-text text-3xl font-bold text-primary-foreground sm:text-4xl">
            Siap memulai proyek?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Hubungi kami untuk konsultasi gratis dan survey lokasi.
          </p>
          <div className="mt-8">
            <WhatsAppCTA
              whatsappNumber={whatsappNumber}
              message={contactMessage}
              size="lg"
              className="inline-flex"
            >
              Konsultasi via WhatsApp
            </WhatsAppCTA>
          </div>
        </div>
      </section>
    </div>
  );
}
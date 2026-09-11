'use client';

import { useState, useMemo, useCallback } from 'react';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { formatRupiah } from '@/lib/currency';
import { calculateEstimate } from '@/lib/calculator';
import { buildBoronganMessage } from '@/lib/whatsapp';
import type { BorringanService, CalculatorPreset } from '@/types';

interface CalculatorProps {
  services: BorringanService[];
  presets: CalculatorPreset[];
  whatsappNumber: string;
}

export default function Calculator({
  services,
  presets,
  whatsappNumber,
}: CalculatorProps) {
  const [serviceId, setServiceId] = useState<string>('');
  const [presetId, setPresetId] = useState<string>('');
  const [area, setArea] = useState<string>('');

  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId) ?? null,
    [services, serviceId]
  );

  const selectedPreset = useMemo(
    () => presets.find((p) => p.id === presetId) ?? null,
    [presets, presetId]
  );

  const presetsForService = useMemo(
    () => presets.filter((p) => !p.service_id || p.service_id === serviceId),
    [presets, serviceId]
  );

  const areaValue = Number(area);
  const isValidArea = !isNaN(areaValue) && areaValue >= 1 && areaValue <= 10000;

  const result = useMemo(() => {
    if (!selectedService || !selectedPreset || !isValidArea) {
      return null;
    }
    return calculateEstimate(selectedService, selectedPreset, areaValue);
  }, [selectedService, selectedPreset, areaValue, isValidArea]);

  const handleServiceChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setServiceId(e.target.value);
      setPresetId('');
    },
    []
  );

  const handleAreaChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setArea(e.target.value);
    },
    []
  );

  const waMessage = result && selectedService && selectedPreset
    ? buildBoronganMessage({
        serviceName: selectedService.name,
        presetLabel: selectedPreset.label,
        area: areaValue,
        estimateMin: result.formattedMin,
        estimateMax: result.formattedMax,
      })
    : '';

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm md:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <Label htmlFor="service">Layanan</Label>
            <Select
              id="service"
              value={serviceId}
              onChange={handleServiceChange}
              className="mt-1"
            >
              <option value="">Pilih layanan</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="preset">Tipe</Label>
            <Select
              id="preset"
              value={presetId}
              onChange={(e) => setPresetId(e.target.value)}
              disabled={!serviceId}
              className="mt-1"
            >
              <option value="">Pilih tipe</option>
              {presetsForService.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="area">Luas Area (m²)</Label>
            <Input
              id="area"
              type="number"
              min={1}
              max={10000}
              value={area}
              onChange={handleAreaChange}
              placeholder="Contoh: 25"
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex h-full flex-col rounded-lg border border-border bg-muted/30 p-6">
            <h3 className="text-sm font-semibold text-foreground">
              Estimasi Biaya
            </h3>
            {result ? (
              <>
                <p className="mt-3 text-3xl font-bold text-accent">
                  {result.formattedMin}
                </p>
                <p className="text-lg text-muted-foreground">
                  s/d {result.formattedMax}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {areaValue} m² × {selectedService?.price_min} –{' '}
                  {selectedService?.price_max} / m² ×{' '}
                  {selectedPreset?.multiplier}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  *Estimasi awal. Harga final setelah survey.*
                </p>
                <div className="mt-auto pt-6">
                  <WhatsAppCTA
                    whatsappNumber={whatsappNumber}
                    message={waMessage}
                    size="lg"
                    className="w-full"
                  >
                    Konsultasi &amp; Survey Gratis
                  </WhatsAppCTA>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-center">
                <p className="text-sm text-muted-foreground">
                  Masukkan luas area
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
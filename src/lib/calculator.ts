import type { BorringanService, CalculatorPreset } from '@/types';
import { formatRupiah } from '@/lib/currency';

export interface CalculatorInput {
  service_id: string;
  preset_id: string;
  area: number;
}

export interface CalculatorState {
  service: BorringanService | null;
  preset: CalculatorPreset | null;
  area: number;
}

export interface CalculatorResult {
  estimateMin: number;
  estimateMax: number;
  formattedMin: string;
  formattedMax: string;
  displayString: string;
}

export function calculateEstimate(
  service: BorringanService,
  preset: CalculatorPreset,
  area: number
): CalculatorResult {
  const estimateMin = area * Number(service.price_min) * Number(preset.multiplier);
  const estimateMax = area * Number(service.price_max) * Number(preset.multiplier);

  const formattedMin = formatRupiah(estimateMin);
  const formattedMax = formatRupiah(estimateMax);

  return {
    estimateMin: Math.round(estimateMin),
    estimateMax: Math.round(estimateMax),
    formattedMin,
    formattedMax,
    displayString: `${formattedMin} – ${formattedMax}`,
  };
}

export function calculateEstimateFromString(
  serviceMin: number,
  serviceMax: number,
  multiplier: number,
  area: number
): CalculatorResult {
  const estimateMin = area * serviceMin * multiplier;
  const estimateMax = area * serviceMax * multiplier;

  const formattedMin = formatRupiah(estimateMin);
  const formattedMax = formatRupiah(estimateMax);

  return {
    estimateMin: Math.round(estimateMin),
    estimateMax: Math.round(estimateMax),
    formattedMin,
    formattedMax,
    displayString: `${formattedMin} – ${formattedMax}`,
  };
}

export const VALID_AREA_RANGE = { min: 1, max: 10000 };

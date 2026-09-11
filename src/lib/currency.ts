export function formatRupiah(amount: number): string {
  if (!Number.isFinite(amount)) return 'Rp0';
  const formatted = new Intl.NumberFormat('id-ID').format(amount);
  return `Rp${formatted}`;
}

export function formatRupiahWithUnit(amount: number, unit?: string): string {
  const formatted = formatRupiah(amount);
  return unit ? `${formatted} / ${unit}` : formatted;
}

export function parseRupiah(input: string): number {
  const numeric = input.replace(/[^0-9]/g, '');
  if (numeric === '') return 0;
  return parseInt(numeric, 10);
}

export function formatPriceRange(
  min: number,
  max: number,
  unit?: string
): string {
  const minStr = formatRupiah(min);
  const maxStr = formatRupiah(max);

  if (unit) {
    return `${minStr} – ${maxStr} / ${unit}`;
  }
  return `${minStr} – ${maxStr}`;
}

import { z } from 'zod';

export const calculatorSchema = z.object({
  service_id: z.string().uuid(),
  preset_id: z.string().uuid(),
  area: z.number().min(1).max(10000),
});

export type CalculatorInput = z.infer<typeof calculatorSchema>;

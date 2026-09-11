import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_]+$/),
  pin: z.string().regex(/^\d{6}$/),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const changePinSchema = z
  .object({
    currentPin: z.string().regex(/^\d{6}$/),
    newPin: z.string().regex(/^\d{6}$/),
    confirmNewPin: z.string().regex(/^\d{6}$/),
  })
  .superRefine((d, ctx) => {
    if (d.newPin !== d.confirmNewPin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'PIN tidak cocok',
        path: ['confirmNewPin'],
      });
    }
    if (d.newPin === d.currentPin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'PIN baru harus berbeda',
        path: ['newPin'],
      });
    }
    const weakPINS = ['111111', '123456', '654321', '000000'];
    if (weakPINS.includes(d.newPin) || /^(\d)\1{5}$/.test(d.newPin)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'PIN terlalu lemah',
        path: ['newPin'],
      });
    }
  });

export type ChangePinInput = z.infer<typeof changePinSchema>;

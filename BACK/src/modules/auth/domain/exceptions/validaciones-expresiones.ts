import { z } from 'zod';

export const createUserSchema = z.object({
  IDUser:z.number().int().nonnegative().optional(),
  FullName: z.string().optional(),
  Email: z
    .string()
    .email({ message: 'Formato de email inválido' })
    .refine(
      (val) => val.endsWith('@canopiacarbon918.onmicrosoft.com'),
      { message: 'El correo debe ser institucional (@canopiacarbon918.onmicrosoft.com)' }
    ),
  PasswordHash: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
   Status: z.number().int().optional(),
});
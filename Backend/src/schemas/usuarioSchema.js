import { z } from 'zod';

const usuarioSchema = z.object({
  nome: z
    .string()
    .min(3, 'Username muito curto')
    .max(30, 'Username muito longo'),
  email: z.string().email('Email não é válido').max(50),
  senha: z.string().min(8, 'Senha muita curta').max(100, 'Senha muito longa'),
  role: z.enum(['USUARIO', 'ORGANIZADOR']).default('USUARIO').optional(),
});

const organizadorRoleSchema = z.object({
  documento: z.string().min(11).max(18),
  nome: z
    .string()
    .min(3, 'Username muito curto')
    .max(30, 'Username muito longo'),
  email: z.string().email('Email não é válido').max(50),
  senha: z.string().min(8, 'Senha muita curta').max(100, 'Senha muito longa'),
});

export { usuarioSchema, organizadorRoleSchema };

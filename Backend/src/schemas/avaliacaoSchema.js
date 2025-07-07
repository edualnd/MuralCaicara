import { z } from 'zod';

const avaliacaoSchema = z.object({
  rating: z
    .number()
    .min(0)
    .max(5)
    .refine((val) => val >= 0 && val <= 5, {
      message: 'A nota deve estar entre 1 e 5 estrelas',
    }),
});

export default avaliacaoSchema;

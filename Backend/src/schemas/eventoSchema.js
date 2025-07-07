import { z } from 'zod';

const eventoSchema = z.object({
  text: z
    .string({
      required_error: 'O campo de texto é obrigatorio.',
      invalid_type_error: 'O campo deve ser um texto',
    })
    .min(1, 'O campo de texto deve ter no minimo 10 caracteres.')
    .max(255, 'O campo de texto deve ter no máximo 255 caracteress.'),

  title: z
    .string({
      required_error: 'O campo de titulo é obrigatorio.',
      invalid_type_error: 'O campo deve ser um texto',
    })
    .min(10, 'O campo de titulo deve ter no minimo 10 caracteres.')
    .max(100, 'O campo de texto deve ter no máximo 100 caracteress.'),
});

export default eventoSchema;

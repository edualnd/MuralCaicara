import { z } from 'zod';
const evento_classificacaoIdadeEnum = z.enum([
  'LIVRE',
  'MAIOR10',
  'MAIOR12',
  'MAIOR14',
  'MAIOR16',
  'MAIOR18',
]);

const evento_modalidadeEnum = z.enum(['PAGO', 'GRATUITO']);

const eventoSchema = z.object({
  titulo: z.string().max(50),
  sobre: z.string().max(255),
  inicioData: z.coerce.date(),
  terminoData: z.coerce.date(),
  inscricoesInicioData: z.coerce.date().nullable().optional(),
  inscricoesTerminoData: z.coerce.date().nullable().optional(),
  limite: z.number().int().nullable(),
  classificacaoIdade: evento_classificacaoIdadeEnum.default('LIVRE'),
  modalidade: evento_modalidadeEnum.default('GRATUITO'),
  preco: z
    .string()
    .regex(/^\d{1,8}(\.\d{1,2})?$/)
    .nullable()
    .optional(),
  acessibilidade: z.boolean(),
  local: z.string(),
});

export default eventoSchema;

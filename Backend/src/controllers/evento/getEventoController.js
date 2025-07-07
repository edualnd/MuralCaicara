import { getEventList } from '../../model/eventoModel.js';

export default async function getEventoController(req, res, next) {
  try {
    const result = await getEventList();
    return res
      .status(200)
      .json({ success: true, message: 'Posts pegos', posts: result });
  } catch (error) {
    console.error('Erro ao listar eventos', error);
    return res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
}

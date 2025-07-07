import { deletarEvento } from '../../model/eventoModel.js';
import { deletarDoCloud, deletarVideo } from '../../utils/cloudinary/config.js';

export default async function deletarEventoController(req, res, next) {
  try {
    const user = req.user.userId;
    const { publicationId } = req.params;

    const result = await deletarEvent(user, +publicationId);

    if (result.image) {
      const idFile = result.image.split('.');
      let id;
      if (idFile[0].startsWith('videos/')) {
        id = idFile[0];
        await deletarVideo(id);
      } else {
        id = idFile[0];
        await deletarDoCloud(id);
      }

      console.log(id, idFile, result.video, result.image);
      await deletarDoCloud(id);
    }
    if (result.video) {
      const idFile = result.video.split('.');
      let id;
      if (idFile[0].startsWith('videos/')) {
        id = idFile[0];
        await deletarVideo(id);
      } else {
        id = idFile[0];
        await deletarDoCloud(id);
      }
      console.log(id, idFile, result.video, result.image);
    }

    return res.json({
      message: 'Evento deletado com sucesso!',
      deletardPost: result,
    });
  } catch (error) {
    console.log('Erro ao deletar evento:', error.message);
    return res.status(500).json({ error: error.message });
  }
}

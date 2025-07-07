import { criarEvento } from '../../model/eventoModel.js';
import validadorSchema from '../../utils/validators/schemaValidator.js';
import eventoSchema from '../../schemas/eventoSchema.js';
import { uploadCloud, uploadVideo } from '../../utils/cloudinary/config.js';

export default async function criarEventoController(req, res, next) {
  try {
    const photo = req.files;
    const photoId = [];
    const user = req.user.userId;
    const role = req.user.userRole;
    const {
      titulo,
      sobre,
      inicioData,
      terminoData,
      inscritos,
      inscricoesInicioData,
      inscricoesTerminoData,
      limite,
      classificacaoIdade,
      modalidade,
      preco,
      acessibilidade,
      local,
    } = req.body;

    if (role == 'USUARIO') {
      return res.status(401).json({ message: 'Voce não e um organizador' });
    }
    const inscricoesInicio =
      inscricoesInicioData == undefined || inscritos == 'false'
        ? null
        : inscricoesInicioData;
    const inscricoesTermino =
      inscricoesTerminoData == undefined || inscritos == 'false'
        ? null
        : inscricoesTerminoData;
    const limi = inscritos == 'false' ? null : Number(limite);
    const valor = modalidade == 'GRATUITO' ? null : preco;
    const evento = {
      titulo,
      sobre,
      inicioData,
      terminoData,
      limite: limi,
      classificacaoIdade,
      modalidade,
      preco: valor,
      acessibilidade: Boolean(acessibilidade),
      local,
      organizador: user,
      inscricoesInicioData: inscricoesInicio,
      inscricoesTerminoData: inscricoesTermino,
    };

    const { success, error, data } = await validadorSchema(
      eventoSchema,
      evento,
    );

    let cloudImage;
    if (photo) {
      for (const p of photo) {
        if (p.mimetype.startsWith('image/')) {
          cloudImage = await uploadCloud(p.path);
        } else if (p.mimetype.startsWith('video/')) {
          cloudImage = await uploadVideo(p.path);
        }

        if (!cloudImage) {
          return res.status(500).json({ error: error });
        }

        photoId.push(cloudImage.public_id + '.' + cloudImage.format);
      }
    }

    if (!success) {
      console.log(error);
      return res.status(500).json({ success: false, error: error });
    }

    let images = {};

    if (photo && photoId.length == 2) {
      images = { image: photoId[0], video: photoId[1] };
    } else if (photo && photoId.length == 1) {
      images = { image: photoId[0] };
    }

    const result = await criarEvento({ ...evento });
    //TODO: associar imagens ao evento
    return res.status(200).json({
      success: true,
      message: 'Evento criado com sucesso!',
      post: result,
    });
  } catch (error) {
    console.log('Erro ao criar o evento:', error);
    return res.status(500).json({ error: error.message });
  }
}

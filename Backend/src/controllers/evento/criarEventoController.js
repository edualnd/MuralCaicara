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
      isEvent,
      text,
      title,
      eventDate,
      registrationStartDate,
      registrationEndDate,
    } = req.body;
    console.log(typeof isEvent);
    if (isEvent == 'true' && role == 'COMMOM') {
      return res.status(401).json({ message: 'voce não e um profissional' });
    }
    const rEnd = registrationEndDate == undefined ? null : registrationEndDate;
    const rStart =
      registrationStartDate == undefined ? null : registrationStartDate;
    const post = {
      text,
      title,
      isEvent: Boolean(isEvent),
      authorId: user,
      eventDate,
      registrationEndDate: rEnd,
      registrationStartDate: rStart,
    };

    const { success, error, data } = await validadorSchema(eventoSchema, {
      text,
      title,
    });

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

    const result = await criarEvent({ ...post, ...images });

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

import { getImages, atualizarEvento } from '../../model/eventoModel.js';
import validadorSchema from '../../utils/validators/schemaValidator.js';
import eventoSchema from '../../schemas/eventoSchema.js';
import {
  deletarDoCloud,
  deletarVideo,
  uploadCloud,
  uploadVideo,
} from '../../utils/cloudinary/config.js';
export default async function atualizarEventoController(req, res, next) {
  try {
    const { publicationId } = req.params;
    const newFiles = req.files;
    const {
      deletarX,
      deletarAll,
      isEvent,
      text,
      title,
      eventDate,
      registrationStartDate,
      registrationEndDate,
    } = req.body;

    const rEnd = registrationEndDate == undefined ? null : registrationEndDate;
    const rStart =
      registrationStartDate == undefined ? null : registrationStartDate;
    const post = {
      text,
      title,
      isEvent: Boolean(isEvent),
      eventDate,
      registrationEndDate: rEnd,
      registrationStartDate: rStart,
    };

    let images = {};

    const { success, error, data } = await validadorSchema(eventoSchema, {
      text: post.text,
      title: post.title,
    });

    if (!success) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: 'Dados invalidos',
        error: error,
      });
    }
    const photoId = [];
    let cloudImage;
    if (newFiles) {
      for (const p of newFiles) {
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
    const getCurrentImages = await getImages(+publicationId);

    if (newFiles.length != 0 && photoId.length == 2) {
      //troca duas imagens

      images = { image: photoId[0], video: photoId[1] };
      if (getCurrentImages.image) {
        await deletarFun(getCurrentImages.image);
      }
      if (getCurrentImages.video) {
        await deletarFun(getCurrentImages.video);
      }
    } else if (
      newFiles.length != 0 &&
      photoId.length == 1 &&
      deletarX == undefined
    ) {
      if (getCurrentImages.image == null) {
        images.image = photoId[0];
      } else if (getCurrentImages.video == null) {
        images.video = photoId[0];
      }
    } else if (
      newFiles.length != 0 &&
      photoId.length == 1 &&
      (deletarX === 'image' || deletarX === 'video')
    ) {
      //Troca uma imagem
      images[deletarX] = photoId[0];
      if (getCurrentImages[deletarX]) {
        await deletarFun(getCurrentImages[deletarX]);
      }
    }

    if (
      newFiles.length == 0 &&
      (deletarX === 'image' || deletarX === 'video')
    ) {
      if (getCurrentImages[deletarX]) {
        await deletarFun(getCurrentImages[deletarX]);
        images[deletarX] = null;
      }
    }

    if (newFiles.length == 0 && deletarAll != undefined) {
      //Deleta tudo

      if (getCurrentImages.image) {
        const idFile = getCurrentImages.image.split('.');
        let id;
        if (idFile[0].startsWith('videos/')) {
          id = idFile[0];
          await deletarVideo(id);
        } else {
          id = idFile[0];
          await deletarDoCloud(id);
        }
      }
      if (getCurrentImages.video) {
        const idFile = getCurrentImages.video.split('.');
        let id;
        if (idFile[0].startsWith('videos/')) {
          id = idFile[0];
          await deletarVideo(id);
        } else {
          id = idFile[0];
          await deletarDoCloud(id);
        }
      }
      images = { image: null, video: null };
    }
    const result = await atualizarEvento(+publicationId, {
      ...post,
      ...images,
    });

    return res.status(200).json({
      success: true,
      message: 'Evento atualizado com sucesso!',
      post: result,
    });
  } catch (error) {
    console.error('Erro ao atualizar o evento:', error);
    return res.status(500).json({ error: 'Erro ao atualizar evento' });
  }
}
const deletarFun = async (file) => {
  const idFile = file.split('.');
  let id;
  if (idFile[0].startsWith('videos/')) {
    id = idFile[0];
    await deletarVideo(id);
  } else {
    id = idFile[0];
    await deletarDoCloud(id);
  }
};

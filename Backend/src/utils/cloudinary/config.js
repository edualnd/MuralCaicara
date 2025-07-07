import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const uploadCloud = async (filePath) => {
  const file = await cloudinary.uploader.upload(filePath, (err, result) => {
    if (err) {
      console.log(err);
      return null;
    }
    return result;
  });

  return file;
};

const deletarDoCloud = async (publicId) => {
  const file = await cloudinary.uploader.destroy(publicId, (err, result) => {
    if (err) {
      console.log(err);
      return null;
    }
    return result;
  });

  return file;
};
const deletarVideo = async (publicId) => {
  const file = await cloudinary.uploader.destroy(
    publicId,
    {
      resource_type: 'video',
    },
    (err, result) => {
      if (err) {
        console.log(err);
        return null;
      }
      return result;
    },
  );
};
const uploadVideo = async (videoPath) => {
  const result = await cloudinary.uploader.upload(
    videoPath,
    {
      resource_type: 'video',
      folder: 'videos',
    },
    (err, result) => {
      if (err) {
        console.log(err);
        return null;
      }
      return result;
    },
  );
  return result;
};

export { uploadCloud, deletarDoCloud, uploadVideo, deletarVideo };

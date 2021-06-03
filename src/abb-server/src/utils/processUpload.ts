import { nanoid } from 'nanoid';
import multer from 'multer';
import path from 'path';

export const storeUpload = async (pictureUrl: string) => {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, '/../images');
    },
    filename: (_, file, cb) => {
      console.log(file);
      cb(null, `${pictureUrl}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });

  const up = multer({ storage });

  up.single('pictureUrl');
};

import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, 'uploads/');
  },
  filename(_, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

function checkFileType(file: any, cb: any) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  return cb('Images only!');
}

const upload = multer({
  storage,
  fileFilter(_, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req: any, res) => {
  res.send(`/${req.file.path}`);
});

export default router;

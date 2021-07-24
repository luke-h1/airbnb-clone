import multer from 'multer';
import { v4 } from 'uuid';

const DIR = './uploads/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, `${v4()}_${fileName}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .mp4 and .jpeg format allowed!'));
    }
  },
});

// eslint-disable-next-line consistent-return
module.exports.send = (req, res, next) => upload.single('file')(req, res, () => {
  // Remember, the middleware will call it's next function
  // so we can inject our controller manually as the next()

  if (!req.file) return res.json({ error: 'no file' });
  next();
});

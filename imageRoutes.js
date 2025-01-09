import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadImage, getAllImages, deleteImage } from '../controller/imageController.js';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getAllImages);
router.delete('/:imageName', deleteImage);

export default router;

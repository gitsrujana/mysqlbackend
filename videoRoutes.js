import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadVideo, getVideos, deleteVideo } from '../controller/videocontroller.js';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/videos');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});


router.post('/upload', upload.single('video'), uploadVideo);


router.get('/videos', getVideos);


router.delete('/delete/:videoName', deleteVideo);

export default router;

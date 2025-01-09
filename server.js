import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import registerRoutes from './routes/registerRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.static(path.join(__dirname, 'public')));


const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
};

ensureDirectoryExists(path.join(__dirname, '../public/images'));
ensureDirectoryExists(path.join(__dirname, '../public/videos'));


app.use('/v1/api', registerRoutes);
app.use('/v1/api', videoRoutes);
app.use('/v1/api/images', imageRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

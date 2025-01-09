import fs from 'fs';
import path from 'path';
import db from '../config/db.js';


export const uploadVideo = (req, res) => {
  console.log('File details:', req.file);

  if (!req.file) {
    return res.status(400).json({ Message: 'No file uploaded' });
  }

  const video = req.file.filename;
  console.log('Storing filename:', video);

  const sql = "INSERT INTO video (video) VALUES (?)";
  db.query(sql, [video], (err, result) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ Message: 'Database Error', Error: err });
    }
    console.log('Database insert result:', result);
    return res.json({ STATUS: 'Success' });
  });
};


export const getVideos = (req, res) => {
  const sql = "SELECT * FROM video";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Message: "Database Error", Error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ Message: "No videos found" });
    }

    return res.json({ STATUS: "Success", videos: results });
  });
};


export const deleteVideo = (req, res) => {
  const { videoName } = req.params;

  
  const filePath = path.join('public/videos', videoName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("File delete error:", err);
      return res.status(500).json({ Message: "File Deletion Error", Error: err });
    }

    
    const sql = "DELETE FROM video WHERE video = ?";
    db.query(sql, [videoName], (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ Message: "Database Error", Error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ Message: "Video not found in database" });
      }

      console.log('Video deleted from database:', result);
      return res.json({ STATUS: "Success", Message: "Video deleted successfully" });
    });
  });
};

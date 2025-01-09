import path from 'path';
import fs from 'fs';
import db from '../config/db.js';


export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ Message: 'No file uploaded' });
  }

  const image = req.file.filename;
  const sql = "INSERT INTO image (image) VALUES (?)";
  
  db.query(sql, [image], (err, result) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ Message: 'Database Error', Error: err });
    }
    res.json({ STATUS: 'Success', image });
  });
};


export const getAllImages = (req, res) => {
  const sql = "SELECT * FROM image";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ Message: "Database Error", Error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ Message: "No images found" });
    }

    res.json({ STATUS: "Success", images: results });
  });
};

export const deleteImage = (req, res) => {
  const { imageName } = req.params;
  const filePath = path.join('public/images', imageName);

 
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("File delete error:", err);
      return res.status(500).json({ Message: "File Deletion Error", Error: err });
    }

   
    const sql = "DELETE FROM image WHERE image = ?";
    db.query(sql, [imageName], (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ Message: "Database Error", Error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ Message: "Image not found in database" });
      }

      res.json({ STATUS: "Success", Message: "Image deleted successfully" });
    });
  });
};

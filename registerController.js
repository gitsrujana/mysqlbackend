import bcrypt from 'bcryptjs';
import db from '../config/db.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).send({ error: 'Email already exists or invalid data!' });
  }
};


export const getAllUsers = (req, res) => {
    db.query('SELECT id, name, email FROM user', (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        return res.status(500).send({ error: 'Error fetching users!' });
      }
     
      res.status(200).json(results);
    });
  };
  
  

  export const updateUser = (req, res) => {
    const { id } = req.params; 
    const { name, email } = req.body; 
  
    if (!name || !email) {
      return res.status(400).send({ error: 'Name and email are required!' });
    }
  
    const query = 'UPDATE user SET name = ?, email = ? WHERE id = ?';
    db.query(query, [name, email, id], (error, results) => {
      if (error) {
        console.error('Error updating user:', error);
        return res.status(500).send({ error: 'Error updating user!' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).send({ error: 'User not found!' });
      }
  
      res.status(200).send({ message: 'User updated successfully!' });
    });
  };

  export const deleteUser = (req, res) => {
    const { id } = req.params; 
  
    const query = 'DELETE FROM user WHERE id = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        console.error('Error deleting user:', error);
        return res.status(500).send({ error: 'Error deleting user!' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).send({ error: 'User not found!' });
      }
  
      res.status(200).send({ message: 'User deleted successfully!' });
    });
  };

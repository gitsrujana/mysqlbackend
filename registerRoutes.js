import express from 'express';
import {
  registerUser,
  updateUser,
  deleteUser,
  getAllUsers
} from '../controller/registerController.js';

const router = express.Router();


router.post('/register', registerUser);
router.get('/user', getAllUsers);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;

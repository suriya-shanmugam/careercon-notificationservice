import express from 'express';
import { addUserController } from '../controllers/userController.js'; // Ensure correct file extension

const router = express.Router();


// Route to add a user with device details
router.post('/add', addUserController);

export default router;

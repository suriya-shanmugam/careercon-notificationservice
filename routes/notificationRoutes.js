import express from 'express';
import { sendNotification } from '../controllers/notificationController.js'; // Ensure the correct path and extension

const router = express.Router();

// POST route to send notifications to a company's followers
router.post('/send', sendNotification);

export default router;

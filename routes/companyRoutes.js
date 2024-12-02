import express from 'express';
const router = express.Router();
import { addCompanyController, addFollowerController, registerDeviceController } from '../controllers/companyController.js'; // Add .js extension for ES Modules

// Route to add a company
router.post('/add', addCompanyController);

// Route to add a follower to a company
router.post('/add-follower', addFollowerController);

// Route to register a user's device
router.post('/register-device', registerDeviceController);

export default router;

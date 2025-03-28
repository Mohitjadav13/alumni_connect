import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { login, updateProfile, getProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);
router.put('/:id/profile', protect, updateProfile);
router.get('/:id/profile', protect, getProfile);

export default router;

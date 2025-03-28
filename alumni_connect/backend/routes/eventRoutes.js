import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createEvent, getEvents, showInterest } from '../controllers/eventController.js';

const router = express.Router();

router.post('/', protect, createEvent);
router.get('/', protect, getEvents);
router.put('/:id/interest', protect, showInterest);

export default router;

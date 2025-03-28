import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  createEvent, 
  getEvents, 
  getEventById, 
  showInterest, 
  deleteEvent, 
  updateEvent 
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/', protect, createEvent);
router.get('/', protect, getEvents);
router.get('/:id', protect, getEventById);
router.put('/:id/interest', protect, showInterest);
router.delete('/:id', protect, deleteEvent);
router.put('/:id', protect, updateEvent);

export default router;

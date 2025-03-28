import express from 'express';
import { protect, admin, allowViewAlumni } from '../middleware/authMiddleware.js';
import { addFaculty, addAlumni, getAllFaculty, getAllAlumni, adminLogin, removeFaculty, removeAlumni, sendMail } from '../controllers/adminController.js';

const router = express.Router();

// Public routes
router.post('/login', adminLogin);

// Alumni viewing route - accessible by both faculty and admin
router.get('/alumni', protect, allowViewAlumni, getAllAlumni);

// Protected admin routes
router.use(protect, admin);
router.post('/add-faculty', addFaculty);
router.post('/add-alumni', addAlumni);
router.delete('/remove-faculty/:id', removeFaculty);
router.delete('/remove-alumni/:id', removeAlumni);
router.get('/faculty', getAllFaculty);
router.post('/send-mail', sendMail);

export default router;

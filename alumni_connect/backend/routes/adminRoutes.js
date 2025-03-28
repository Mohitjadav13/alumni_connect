import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { addFaculty, addAlumni, getAllFaculty, getAllAlumni, adminLogin, removeFaculty, removeAlumni, sendMail } from '../controllers/adminController.js';

const router = express.Router();

// Admin auth route
router.post('/login', adminLogin);

// Protected admin routes
router.use(protect, admin);

router.post('/add-faculty', addFaculty);
router.post('/add-alumni', addAlumni);
router.delete('/remove-faculty/:id', removeFaculty);
router.delete('/remove-alumni/:id', removeAlumni);
router.get('/faculty', getAllFaculty);
router.get('/alumni', getAllAlumni);
router.post('/send-mail', sendMail);

export default router;

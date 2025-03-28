import User from '../models/User.js';
import { sendWelcomeEmail } from '../utils/emailService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Add faculty
export const addFaculty = async (req, res) => {
  try {
    const { name, email, department, password } = req.body;
    
    const facultyExists = await User.findOne({ email });
    if (facultyExists) {
      return res.status(400).json({ message: 'Faculty already exists' });
    }

    const faculty = await User.create({
      name,
      email,
      password,
      role: 'faculty',
      profile: {
        basicInfo: {
          department
        }
      }
    });

    await sendWelcomeEmail(email, password, 'faculty');

    res.status(201).json({
      _id: faculty._id,
      name: faculty.name,
      email: faculty.email,
      role: faculty.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add alumni
export const addAlumni = async (req, res) => {
  try {
    const { name, email, password, graduationYear, department } = req.body;
    
    const alumniExists = await User.findOne({ email });
    if (alumniExists) {
      return res.status(400).json({ message: 'Alumni already exists' });
    }

    const alumni = await User.create({
      name,
      email,
      password,
      role: 'alumni',
      profile: {
        basicInfo: {
          department
        },
        academic: {
          graduationYear
        }
      }
    });

    await sendWelcomeEmail(email, password, 'alumni');

    res.status(201).json({
      _id: alumni._id,
      name: alumni.name,
      email: alumni.email,
      role: alumni.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all faculty
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await User.find({ role: 'faculty' }).select('-password');
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all alumni
export const getAllAlumni = async (req, res) => {
  try {
    const alumni = await User.find({ role: 'alumni' }).select('-password');
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    // Check for admin using either email or username
    const admin = await User.findOne({ 
      email: email || username,
      role: 'admin'
    });

    if (!admin) {
      console.log('Admin not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Remove faculty
export const removeFaculty = async (req, res) => {
  try {
    const faculty = await User.findOneAndDelete({ 
      _id: req.params.id, 
      role: 'faculty' 
    });

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    res.json({ message: 'Faculty removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove alumni
export const removeAlumni = async (req, res) => {
  try {
    const alumni = await User.findOneAndDelete({ 
      _id: req.params.id, 
      role: 'alumni' 
    });

    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }

    res.json({ message: 'Alumni removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send mail
export const sendMail = async (req, res) => {
  try {
    const { subject, message, recipients } = req.body;
    const emailList = await User.find(
      recipients === 'all' ? {} : { role: recipients }
    ).select('email');

    await Promise.all(
      emailList.map(user => 
        sendWelcomeEmail(user.email, message, subject)
      )
    );

    res.json({ message: 'Emails sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'faculty', 'alumni'],
    required: true
  },
  profile: {
    basicInfo: {
      phone: String,
      location: String,
      avatar: String,
      department: String
    },
    professional: {
      currentCompany: String,
      designation: String,
      experience: String,
      skills: [String],
      achievements: [String]
    },
    academic: {
      graduationYear: String,
      degree: String,
      specialization: String,
      qualifications: [String],
      subjects: [String]
    },
    social: {
      linkedin: String,
      github: String,
      website: String
    }
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

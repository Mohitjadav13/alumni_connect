# 🎓 Alumni Connect

![React](https://img.shields.io/badge/React-18.0.0-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-brightgreen?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

> A modern web application connecting alumni, faculty, and administrators to foster a vibrant academic community.

## ✨ Features

### 👨‍🎓 For Alumni
- Create and manage detailed professional profiles
- Connect with fellow alumni
- View and register for upcoming events
- Network with the academic community
- Share professional achievements and experiences

### 👨‍🏫 For Faculty
- View alumni profiles and track their progress
- Create and manage events
- Send notifications to alumni
- Maintain professional profiles
- Track event participation

### 👨‍💼 For Administrators
- Manage alumni and faculty accounts
- Overview of system statistics
- Send mass communications
- Monitor platform activity
- Manage events and notifications

## 🚀 Tech Stack

- **Frontend**: React, TailwindCSS, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Email Service**: Nodemailer

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/alumni_connect.git
cd alumni_connect
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:
```bash
# Backend (.env)
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d

# Frontend (.env)
VITE_API_URL=http://localhost:5000/api
```

4. Start the application:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend development server
cd frontend
npm run dev
```

## 🌐 API Documentation

The API is organized around REST. All requests should be made to endpoints beginning with `/api/`.

### Main Endpoints:
- `/api/auth` - Authentication routes
- `/api/admin` - Administrator operations
- `/api/faculty` - Faculty operations
- `/api/alumni` - Alumni operations
- `/api/events` - Event management

## 🔒 Security

- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- Role-based access control

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Krish Kakadiya - UI/UX Designer
- Mohit Jadav - UI/UX Designer
- Harsh Hadiya - Backend Developer
- Om Hirvania - Frontend Developer

## 📞 Support

For support, email krishkkdy11@gmail.com.

---
Made with ❤️ for the academic community

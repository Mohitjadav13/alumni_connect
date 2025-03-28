import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendWelcomeEmail = async (email, password, role) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Alumni Connect',
    html: `
      <h1>Welcome to Alumni Connect!</h1>
      <p>Your account has been created as a ${role}.</p>
      <p>Your login credentials:</p>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      <p>Please change your password after first login.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

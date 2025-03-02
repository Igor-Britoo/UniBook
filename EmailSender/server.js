require('dotenv').config();

const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8001;
app.use(cors());
app.use(express.json());

// Create a transporter for sending emails using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Create a route to send an email
app.post('/api/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send('Missing required fields: to, subject, and textf are required.');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error occurred: ' + error.message);
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Email server running at http://localhost:${port}`);
});

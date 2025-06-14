const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const sendEmail = async (to, subject, text, html = null) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text
      };
      
      // Add HTML if provided
      if (html) {
        mailOptions.html = html;
      }
      
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error: error.message };
    }
  };
  
  module.exports = { sendEmail };
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testMail() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    console.log('Testing connection to:', process.env.SMTP_HOST);

    const info = await transporter.sendMail({
      from: `"Digieonix Test" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: 'SMTP Test Email',
      text: 'This is a test email to verify SMTP settings.'
    });

    console.log('Message sent successfully! Message ID:', info.messageId);
  } catch (error) {
    console.error('Failed to send email. Error details:', error);
  }
}

testMail();

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { db } = require('../firebase');
const { FieldValue } = require('firebase-admin/firestore');
require('dotenv').config();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, phone, service, budget, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide required fields (name, email, message)' });
  }

  try {
    // Save lead to Firestore first
    await db.collection('leads').add({
      name,
      email,
      phone: phone || '',
      service: service || '',
      budget: budget || '',
      message,
      status: 'new',
      createdAt: FieldValue.serverTimestamp()
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Sanitize inputs to prevent HTML injection / XSS in email
    const escapeHtml = (str) => String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeService = escapeHtml(service);
    const safeBudget = escapeHtml(budget);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const htmlBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone || 'N/A'}</p>
      <p><strong>Service:</strong> ${safeService || 'N/A'}</p>
      <p><strong>Budget:</strong> ${safeBudget || 'N/A'}</p>
      <hr />
      <h3>Message:</h3>
      <p>${safeMessage}</p>
    `;

    const mailOptions = {
      from: `"Digieonix Website" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: 'New Contact Form Submission — Digieonix',
      html: htmlBody
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      // 1. Send notification to Admin
      await transporter.sendMail(mailOptions);
      
      // 2. Send Auto-Responder to User
      const autoReplyHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #b449f6;">Thank You for Contacting Digieonix!</h2>
          <p>Hi ${safeName},</p>
          <p>We have successfully received your inquiry regarding <strong>${safeService || 'our services'}</strong>.</p>
          <p>Our team will review your message and get back to you shortly. If your request is urgent, please feel free to reply directly to this email.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>The Digieonix Team</strong></p>
          <a href="https://digieonix.com" style="color: #b449f6; text-decoration: none;">www.digieonix.com</a>
        </div>
      `;
      
      const autoReplyOptions = {
        from: `"Digieonix Support" <${process.env.SMTP_USER}>`,
        to: safeEmail,
        subject: 'Thank You for Reaching Out — Digieonix',
        html: autoReplyHtml
      };
      
      // Send auto reply asynchronously without blocking the response
      transporter.sendMail(autoReplyOptions).catch(err => console.error('Failed to send auto-reply:', err));

      // 3. Emit real-time notification to Admin Dashboard
      const io = req.app.get('io');
      if (io) {
        io.emit('newLead', { name: safeName, service: safeService, email: safeEmail });
      }

      res.json({ success: true, message: 'Message sent successfully' });
    } else {
      console.log('Mock email sent (no credentials configured):', htmlBody);
      
      // Emit real-time notification to Admin Dashboard (even in mock mode)
      const io = req.app.get('io');
      if (io) {
        io.emit('newLead', { name: safeName, service: safeService, email: safeEmail });
      }

      res.json({ success: true, message: 'Message sent successfully (Mock)' });
    }
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send' });
  }
});

module.exports = router;

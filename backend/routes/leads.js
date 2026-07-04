const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { db } = require('../firebase');
const verifyToken = require('../middleware/verifyToken');

// GET /api/leads
router.get('/', verifyToken, async (req, res) => {
  try {
    const snapshot = await db.collection('leads').orderBy('createdAt', 'desc').get();
    const leads = [];
    snapshot.forEach(doc => {
      leads.push({ id: doc.id, ...doc.data() });
    });
    res.json(leads);
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads' });
  }
});

// PATCH /api/leads/:id
router.patch('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['new', 'contacted', 'converted'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  try {
    await db.collection('leads').doc(id).update({ status });
    res.json({ success: true, message: 'Lead status updated' });
  } catch (error) {
    console.error('Failed to update lead:', error);
    res.status(500).json({ success: false, message: 'Failed to update lead' });
  }
});
// POST /api/leads/bulk-email
router.post('/bulk-email', verifyToken, async (req, res) => {
  const { subject, body } = req.body;

  if (!subject || !body) {
    return res.status(400).json({ success: false, message: 'Subject and body are required' });
  }

  try {
    const snapshot = await db.collection('leads').get();
    const emails = [];
    snapshot.forEach(doc => {
      const email = doc.data().email;
      if (email && !emails.includes(email)) {
        emails.push(email);
      }
    });

    if (emails.length === 0) {
      return res.status(400).json({ success: false, message: 'No leads with valid email addresses found' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"Digieonix" <${process.env.SMTP_USER}>`,
      bcc: emails.join(', '), // BCC to protect privacy
      subject: subject,
      html: body
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: `Successfully sent email to ${emails.length} leads` });
    } else {
      console.log('Mock bulk email sent (no credentials):', mailOptions);
      res.json({ success: true, message: `Mock: Successfully sent email to ${emails.length} leads` });
    }
  } catch (error) {
    console.error('Failed to send bulk email:', error);
    res.status(500).json({ success: false, message: 'Failed to send bulk emails' });
  }
});

module.exports = router;

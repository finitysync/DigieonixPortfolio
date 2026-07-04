const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { db } = require('../firebase');
const { FieldValue } = require('firebase-admin/firestore');
const verifyToken = require('../middleware/verifyToken');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Save to public/uploads
  },
  filename: function (req, file, cb) {
    // Unique filename: timestamp + original name (spaces removed)
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

// File filter (optional, to accept only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max file size
});

// POST /api/upload
// Requires authentication
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Build URL dynamically based on the request (works in both dev and production)
    const protocol = req.protocol;
    const host = req.get('host');
    const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    const type = req.body.type || 'general';
    
    // Save to Firestore
    await db.collection('uploads').add({
      filename: req.file.filename,
      url: imageUrl,
      type: type,
      uploadedAt: FieldValue.serverTimestamp()
    });

    res.json({
      success: true,
      url: imageUrl
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: 'Server error during upload' });
  }
});

// GET /api/upload
router.get('/', verifyToken, async (req, res) => {
  try {
    const snapshot = await db.collection('uploads').orderBy('uploadedAt', 'desc').get();
    const uploads = [];
    snapshot.forEach(doc => {
      uploads.push({ id: doc.id, ...doc.data() });
    });
    res.json(uploads);
  } catch (error) {
    console.error('Failed to fetch uploads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch uploads' });
  }
});

module.exports = router;

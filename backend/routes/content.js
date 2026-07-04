const express = require('express');
const router = express.Router();
const { db } = require('../firebase');
const verifyToken = require('../middleware/verifyToken');

// GET /api/content
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('content').get();
    const content = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      content[doc.id] = data._isArray ? data.items : data;
    });
    res.json(content);
  } catch (error) {
    console.error('Failed to fetch content from Firestore:', error);
    // Fallback empty object
    res.json({});
  }
});

// PUT /api/content
router.put('/', verifyToken, async (req, res) => {
  const newContent = req.body;

  if (!newContent || typeof newContent !== 'object' || Array.isArray(newContent)) {
    return res.status(400).json({ success: false, message: 'Invalid content format' });
  }

  try {
    const batch = db.batch();
    for (const [key, value] of Object.entries(newContent)) {
      const docRef = db.collection('content').doc(key);
      if (Array.isArray(value)) {
        batch.set(docRef, { _isArray: true, items: value });
      } else {
        batch.set(docRef, value);
      }
    }
    await batch.commit();
    res.json({ success: true, message: 'Content updated in Firestore' });
  } catch (error) {
    console.error('Failed to save content to Firestore:', error);
    res.status(500).json({ success: false, message: 'Failed to save content' });
  }
});

module.exports = router;

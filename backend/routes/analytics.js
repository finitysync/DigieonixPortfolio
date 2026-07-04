const express = require('express');
const router = express.Router();
const { db } = require('../firebase');
const { FieldValue } = require('firebase-admin/firestore');
const verifyToken = require('../middleware/verifyToken');
const { analyticsLimiter } = require('../middleware/rateLimiter');

// POST /api/analytics/pageview
router.post('/pageview', analyticsLimiter, async (req, res) => {
  const { page, referrer, sessionId } = req.body;
  
  if (!page) {
    return res.status(400).json({ success: false, message: 'Page is required' });
  }

  try {
    await db.collection('analytics').add({
      page,
      referrer: referrer || '',
      sessionId: sessionId || 'anonymous',
      timestamp: FieldValue.serverTimestamp()
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to log pageview:', error);
    // Don't crash or return error to user for analytics
    res.json({ success: false });
  }
});

// GET /api/analytics/summary
router.get('/summary', verifyToken, async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0,0,0,0);

    // Get analytics
    const analyticsSnapshot = await db.collection('analytics').get();
    
    let totalViewsToday = 0;
    let totalViewsThisWeek = 0;
    const pageCounts = {};

    analyticsSnapshot.forEach(doc => {
      const data = doc.data();
      const ts = data.timestamp ? data.timestamp.toDate() : new Date();
      
      if (ts >= startOfToday) totalViewsToday++;
      if (ts >= startOfWeek) totalViewsThisWeek++;
      
      pageCounts[data.page] = (pageCounts[data.page] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({ page, count }));

    // Get leads summary
    const leadsSnapshot = await db.collection('leads').get();
    let totalLeads = 0;
    const leadsStatusCount = { new: 0, contacted: 0, converted: 0 };

    leadsSnapshot.forEach(doc => {
      totalLeads++;
      const status = doc.data().status || 'new';
      leadsStatusCount[status] = (leadsStatusCount[status] || 0) + 1;
    });

    res.json({
      success: true,
      totalViewsToday,
      totalViewsThisWeek,
      topPages,
      totalLeads,
      leadsStatusCount
    });

  } catch (error) {
    console.error('Failed to fetch analytics summary:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
  }
});

module.exports = router;

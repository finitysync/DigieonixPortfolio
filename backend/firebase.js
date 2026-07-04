const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin App
const app = initializeApp({
  credential: cert(serviceAccount)
});

// Export Firestore database instance
const db = getFirestore(app);

module.exports = { db };

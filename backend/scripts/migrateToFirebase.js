const fs = require('fs');
const path = require('path');
const { db } = require('../firebase');

const migrate = async () => {
  try {
    const contentPath = path.join(__dirname, '../content.json');
    const rawData = fs.readFileSync(contentPath, 'utf8');
    const content = JSON.parse(rawData);

    console.log('Starting migration to Firestore...');
    const batch = db.batch();

    for (const [key, value] of Object.entries(content)) {
      const docRef = db.collection('content').doc(key);
      
      // Firestore doesn't allow top-level arrays, so wrap them
      if (Array.isArray(value)) {
        batch.set(docRef, { _isArray: true, items: value });
      } else {
        batch.set(docRef, value);
      }
      console.log(`Prepared document: content/${key}`);
    }

    await batch.commit();
    console.log('Migration completed successfully! 🎉');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();

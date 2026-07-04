const { db } = require('../firebase');

const initLayout = async () => {
  try {
    const layout = [
      'hero',
      'servicesPreview',
      'statsBar',
      'testimonialsPreview'
    ];
    
    // In Home.jsx, we have: Hero, Services, Stats, Testimonials
    // Let's create a layout document
    await db.collection('content').doc('layout').set({
      _isArray: true,
      items: layout
    });
    
    console.log('Layout initialized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to init layout:', error);
    process.exit(1);
  }
};

initLayout();

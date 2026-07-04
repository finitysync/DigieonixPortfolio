const admin = require('firebase-admin');
const { db } = require('./firebase');

async function enrichContent() {
  console.log('Fetching content...');
  const snapshot = await db.collection('content').get();
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    let updated = false;

    // Enrich Hero
    if (doc.id === 'hero') {
      data.headlines = [
        "We Engineer Digital Dominance.",
        "Scaling Brands Beyond Borders.",
        "Your Unfair Advantage in Marketing.",
        "Data-Driven. ROI-Obsessed."
      ];
      data.subtext = "Digieonix is an elite, performance-driven digital marketing agency. We don't just run ads or build websites—we architect scalable growth ecosystems that propel your brand to absolute market dominance, from Pakistan to the global stage.";
      data.cta1Text = "Initiate Growth Protocol";
      data.cta2Text = "View Our Case Studies";
      updated = true;
    }

    // Enrich Services
    if (doc.id === 'services' && data._isArray) {
      data.items = data.items.map(s => {
        if (s.title.includes('Social Media Marketing')) {
          s.shortDesc = "Strategic, data-driven social campaigns designed to aggressively grow your brand's footprint.";
          s.fullDesc = "We deploy hyper-targeted, data-driven social media architectures that don't just get likes—they generate revenue. By dominating platforms like Facebook, Instagram, LinkedIn, and TikTok, we turn passive scrollers into loyal brand advocates.";
        }
        if (s.title.includes('Social Media Management')) {
          s.shortDesc = "End-to-end premium content production and proactive community engagement.";
          s.fullDesc = "Your brand's digital storefront needs constant, high-quality activity. We provide end-to-end management, from premium asset creation and copywriting to proactive community engagement, ensuring your brand stays top-of-mind every single day.";
        }
        if (s.title.includes('Web Development')) {
          s.shortDesc = "Lightning-fast, highly-converting digital experiences tailored to your brand.";
          s.fullDesc = "A website is your 24/7 salesperson. We design and engineer lightning-fast, flawlessly responsive, and conversion-optimized digital experiences that instantly build trust and compel visitors to take action.";
        }
        if (s.title.includes('Search Engine Optimization')) {
          s.shortDesc = "Dominate search rankings and capture high-intent organic traffic consistently.";
          s.fullDesc = "Visibility is currency. We utilize advanced technical SEO, high-authority link building, and semantic content optimization to ensure your brand dominates the top of Google search results for your most profitable keywords.";
        }
        if (s.title.includes('PPC')) {
          s.shortDesc = "Ruthlessly optimized ad campaigns that guarantee maximum Return on Ad Spend (ROAS).";
          s.fullDesc = "Stop burning money on ineffective ads. Our elite media buying team constructs ruthlessly optimized Meta and Google Ad campaigns, utilizing continuous A/B testing and algorithmic scaling to deliver unparalleled Return on Ad Spend (ROAS).";
        }
        return s;
      });
      updated = true;
    }

    // Enrich FAQ
    if (doc.id === 'faq' && data._isArray) {
      // Keep existing and add some more professional ones
      const extraFAQs = [
        {
          id: Date.now() + 1,
          q: "What makes Digieonix different from other marketing agencies?",
          a: "Unlike traditional agencies that focus purely on vanity metrics (likes, impressions), we are ruthlessly focused on your bottom line. We engineer scalable systems that directly contribute to your revenue growth, utilizing data science and elite creative strategy."
        },
        {
          id: Date.now() + 2,
          q: "Do you work with international clients outside of Pakistan?",
          a: "Absolutely. While we are proud of our roots in Lahore, Pakistan, our team operates on a global scale. We have successfully scaled brands in the US, UK, UAE, and beyond, adapting our strategies to diverse international markets."
        },
        {
          id: Date.now() + 3,
          q: "How soon can we expect to see tangible results?",
          a: "For paid advertising (PPC/Meta Ads), you will begin seeing targeted traffic and initial conversions within the first 7-14 days. For organic strategies like SEO and Content Marketing, substantial compound growth typically materializes between months 3 to 6."
        }
      ];
      data.items = [...data.items, ...extraFAQs];
      updated = true;
    }

    // Enrich Branding / Contact Info slightly
    if (doc.id === 'contactInfo') {
      data.tagline = "Let's build something extraordinary together.";
      data.responseTime = "Priority Response under 12 hours";
      updated = true;
    }

    if (updated) {
      await db.collection('content').doc(doc.id).set(data);
      console.log(`Updated ${doc.id}`);
    }
  }
  console.log('Content enrichment complete!');
}

enrichContent().catch(console.error);

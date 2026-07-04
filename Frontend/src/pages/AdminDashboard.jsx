import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ImageUploader from '../components/ImageUploader';
import { SortableItem } from '../components/SortableItem';
import { socket } from '../App';

const AdminDashboard = () => {
  const [content, setContent] = useState(null);
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState('Leads');
  const [liveUsers, setLiveUsers] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [newsletterSubject, setNewsletterSubject] = useState('');
  const [newsletterBody, setNewsletterBody] = useState('');
  const [isSendingNewsletter, setIsSendingNewsletter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('digieonix_admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }

    fetchContent();
    fetchLeads(token);

    socket.on('liveUsersCount', (count) => {
      setLiveUsers(count);
    });

    socket.on('newLead', (data) => {
      toast.success(`New lead from ${data.name}!`);
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
      } catch (err) {
        console.error('Failed to play notification sound', err);
      }
      fetchLeads(token);
    });

    return () => {
      socket.off('liveUsersCount');
      socket.off('newLead');
    };
  }, [navigate]);

  const fetchContent = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/content');
      const data = await res.json();
      setContent(data);
    } catch (err) {
      toast.error('Failed to load content');
    }
  };

  const fetchLeads = async (token) => {
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setLeads(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    const token = localStorage.getItem('digieonix_admin_token');
    try {
      const res = await fetch(`http://localhost:5000/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success('Lead status updated');
        fetchLeads(token); // refresh
      }
    } catch (err) {
      toast.error('Failed to update lead');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('digieonix_admin_token');
    navigate('/admin');
  };

  const handleSave = async () => {
    setIsSaving(true);
    const token = localStorage.getItem('digieonix_admin_token');
    try {
      const res = await fetch('http://localhost:5000/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Content updated! Changes are live.', { duration: 3000 });
      } else {
        toast.error(data.message || 'Save failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event, section) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setContent((prev) => {
        const items = prev[section];
        const oldIndex = items.findIndex((item) => item.id === active.id || item === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id || item === over.id);
        return {
          ...prev,
          [section]: arrayMove(items, oldIndex, newIndex),
        };
      });
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-[#b449f6]/20 border-t-[#b449f6] rounded-full animate-spin"></div>
      </div>
    );
  }

  const tabs = [
    { name: 'Leads', icon: '📬' },
    { name: 'Newsletter', icon: '📧' },
    { name: 'Page Layout', icon: '↕️' },
    { name: 'Branding', icon: '🎨' },
    { name: 'Hero', icon: '🏠' },
    { name: 'Services', icon: '⚙️' },
    { name: 'Pricing', icon: '💰' },
    { name: 'Portfolio', icon: '🖼️' },
    { name: 'Team', icon: '👥' },
    { name: 'Testimonials', icon: '⭐' },
    { name: 'Contact Info', icon: '📞' },
    { name: 'Social Links', icon: '🔗' },
    { name: 'FAQ', icon: '❓' },
    { name: 'About', icon: 'ℹ️' },
    { name: 'Privacy', icon: '🔒' },
    { name: 'Terms', icon: '📜' }
  ];

  const handleSendNewsletter = async () => {
    if (!newsletterSubject || !newsletterBody) {
      toast.error('Please enter subject and body');
      return;
    }
    setIsSendingNewsletter(true);
    const token = localStorage.getItem('digieonix_admin_token');
    try {
      const res = await fetch('http://localhost:5000/api/leads/bulk-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subject: newsletterSubject, body: newsletterBody })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setNewsletterSubject('');
        setNewsletterBody('');
      } else {
        toast.error(data.message || 'Failed to send');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to send newsletter');
    } finally {
      setIsSendingNewsletter(false);
    }
  };

  // --- Handlers for deep state updates ---
  
  const updateBranding = (field, value) => setContent({ ...content, branding: { ...content.branding, [field]: value } });
  
  const updateThemeColor = (field, value) => {
    const currentTheme = content.branding?.theme || {};
    setContent({
      ...content,
      branding: {
        ...content.branding,
        theme: { ...currentTheme, [field]: value }
      }
    });
  };

  const updateSeo = (field, value) => {
    const currentSeo = content.branding?.seo || {};
    setContent({
      ...content,
      branding: {
        ...content.branding,
        seo: { ...currentSeo, [field]: value }
      }
    });
  };
  
  const updateHero = (field, value) => setContent({ ...content, hero: { ...content.hero, [field]: value } });
  const updateHeroHeadline = (index, value) => {
    const newHeadlines = [...content.hero.headlines];
    newHeadlines[index] = value;
    setContent({ ...content, hero: { ...content.hero, headlines: newHeadlines } });
  };

  const addService = () => {
    const newId = content.services.length ? Math.max(...content.services.map(s => s.id || 0)) + 1 : 1;
    setContent({ ...content, services: [...content.services, { id: newId, icon: '', title: '', shortDesc: '', description: '', features: [], image: '' }] });
  };
  const removeService = (index) => {
    const newServices = [...content.services];
    newServices.splice(index, 1);
    setContent({ ...content, services: newServices });
  };
  const updateService = (index, field, value) => {
    const newServices = [...content.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setContent({ ...content, services: newServices });
  };
  const updateServiceFeature = (serviceIdx, featureIdx, value) => {
    const newServices = [...content.services];
    newServices[serviceIdx].features[featureIdx] = value;
    setContent({ ...content, services: newServices });
  };
  const addServiceFeature = (serviceIdx) => {
    const newServices = [...content.services];
    newServices[serviceIdx].features.push('');
    setContent({ ...content, services: newServices });
  };
  const removeServiceFeature = (serviceIdx, featureIdx) => {
    const newServices = [...content.services];
    newServices[serviceIdx].features.splice(featureIdx, 1);
    setContent({ ...content, services: newServices });
  };

  const updatePricing = (index, field, value) => {
    const newPricing = [...content.pricing];
    newPricing[index] = { ...newPricing[index], [field]: value };
    setContent({ ...content, pricing: newPricing });
  };
  const updatePricingFeature = (pricingIdx, featureIdx, value) => {
    const newPricing = [...content.pricing];
    newPricing[pricingIdx].features[featureIdx] = value;
    setContent({ ...content, pricing: newPricing });
  };
  const addPricingFeature = (pricingIdx) => {
    const newPricing = [...content.pricing];
    newPricing[pricingIdx].features.push('');
    setContent({ ...content, pricing: newPricing });
  };
  const removePricingFeature = (pricingIdx, featureIdx) => {
    const newPricing = [...content.pricing];
    newPricing[pricingIdx].features.splice(featureIdx, 1);
    setContent({ ...content, pricing: newPricing });
  };

  const updatePortfolio = (index, field, value) => {
    const newPortfolio = [...content.portfolio];
    newPortfolio[index] = { ...newPortfolio[index], [field]: value };
    setContent({ ...content, portfolio: newPortfolio });
  };
  const addPortfolio = () => {
    const newId = content.portfolio.length ? Math.max(...content.portfolio.map(p => p.id)) + 1 : 1;
    setContent({ ...content, portfolio: [...content.portfolio, { id: newId, title: '', category: 'Meta Ads', client: '', desc: '', results: '', image: '' }] });
  };
  const removePortfolio = (index) => {
    const newPortfolio = [...content.portfolio];
    newPortfolio.splice(index, 1);
    setContent({ ...content, portfolio: newPortfolio });
  };

  const updateTestimonial = (index, field, value) => {
    const newTestimonials = [...content.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setContent({ ...content, testimonials: newTestimonials });
  };
  const addTestimonial = () => {
    const newId = content.testimonials.length ? Math.max(...content.testimonials.map(t => t.id)) + 1 : 1;
    setContent({ ...content, testimonials: [...content.testimonials, { id: newId, name: '', role: '', company: '', text: '', stars: 5, avatar: '' }] });
  };
  const removeTestimonial = (index) => {
    const newTestimonials = [...content.testimonials];
    newTestimonials.splice(index, 1);
    setContent({ ...content, testimonials: newTestimonials });
  };
  const updateTeam = (index, field, value) => {
    const newTeam = [...content.team];
    newTeam[index][field] = value;
    setContent({ ...content, team: newTeam });
  };
  const addTeamMember = () => {
    const newId = content.team.length ? Math.max(...content.team.map(t => t.id)) + 1 : 1;
    setContent({ ...content, team: [...content.team, { id: newId, name: '', role: '', image: '', bio: '', social: { linkedin: '', twitter: '' } }] });
  };
  const removeTeamMember = (index) => {
    const newTeam = [...content.team];
    newTeam.splice(index, 1);
    setContent({ ...content, team: newTeam });
  };

  const updateContact = (field, value) => setContent({ ...content, contactInfo: { ...content.contactInfo, [field]: value } });
  const updateSocial = (field, value) => setContent({ ...content, socialLinks: { ...content.socialLinks, [field]: value } });

  const updateFAQ = (index, field, value) => {
    const newFaq = [...content.faq];
    newFaq[index] = { ...newFaq[index], [field]: value };
    setContent({ ...content, faq: newFaq });
  };
  const addFAQ = () => {
    setContent({ ...content, faq: [...content.faq, { q: '', a: '' }] });
  };
  const removeFAQ = (index) => {
    const newFaq = [...content.faq];
    newFaq.splice(index, 1);
    setContent({ ...content, faq: newFaq });
  };

  const updateAboutNarrative = (field, value) => setContent({ ...content, about: { ...content.about, narrative: { ...content.about.narrative, [field]: value } } });
  const updateAboutNarrativeParagraph = (index, value) => {
    const newParagraphs = [...content.about.narrative.paragraphs];
    newParagraphs[index] = value;
    setContent({ ...content, about: { ...content.about, narrative: { ...content.about.narrative, paragraphs: newParagraphs } } });
  };
  const addAboutNarrativeParagraph = () => setContent({ ...content, about: { ...content.about, narrative: { ...content.about.narrative, paragraphs: [...content.about.narrative.paragraphs, ''] } } });
  const removeAboutNarrativeParagraph = (index) => {
    const newParagraphs = [...content.about.narrative.paragraphs];
    newParagraphs.splice(index, 1);
    setContent({ ...content, about: { ...content.about, narrative: { ...content.about.narrative, paragraphs: newParagraphs } } });
  };
  const updateAboutValue = (index, field, value) => {
    const newValues = [...content.about.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setContent({ ...content, about: { ...content.about, values: newValues } });
  };
  const updateAboutChecklist = (index, value) => {
    const newChecklist = [...content.about.checklist];
    newChecklist[index] = value;
    setContent({ ...content, about: { ...content.about, checklist: newChecklist } });
  };
  const addAboutChecklist = () => setContent({ ...content, about: { ...content.about, checklist: [...content.about.checklist, ''] } });
  const removeAboutChecklist = (index) => {
    const newChecklist = [...content.about.checklist];
    newChecklist.splice(index, 1);
    setContent({ ...content, about: { ...content.about, checklist: newChecklist } });
  };
  const updatePrivacy = (index, field, value) => {
    const newPrivacy = [...content.privacy];
    newPrivacy[index] = { ...newPrivacy[index], [field]: value };
    setContent({ ...content, privacy: newPrivacy });
  };
  const addPrivacy = () => setContent({ ...content, privacy: [...content.privacy, { title: '', content: '' }] });
  const removePrivacy = (index) => {
    const newPrivacy = [...content.privacy];
    newPrivacy.splice(index, 1);
    setContent({ ...content, privacy: newPrivacy });
  };
  const updateTerms = (index, field, value) => {
    const newTerms = [...content.terms];
    newTerms[index] = { ...newTerms[index], [field]: value };
    setContent({ ...content, terms: newTerms });
  };
  const addTerms = () => setContent({ ...content, terms: [...content.terms, { title: '', content: '' }] });
  const removeTerms = (index) => {
    const newTerms = [...content.terms];
    newTerms.splice(index, 1);
    setContent({ ...content, terms: newTerms });
  };

  // --- Renderers ---
  const renderBranding = () => (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <h3 className="text-white font-medium mb-4">Website Logo</h3>
        <p className="text-gray-400 text-sm mb-4">Upload a transparent PNG or SVG for best results.</p>
        <ImageUploader 
          label="Logo Image" 
          value={content?.branding?.logo || '/logo.png'} 
          onChange={(url) => updateBranding('logo', url)} 
        />
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <h3 className="text-white font-medium mb-4">Color Theme</h3>
        <p className="text-gray-400 text-sm mb-6">Customize the core colors of your website. Changes apply instantly but must be saved to persist.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Background Color</label>
            <div className="flex items-center gap-3">
              <input type="color" value={content.branding?.theme?.bg || '#0a0a14'} onChange={(e) => updateThemeColor('bg', e.target.value)} className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0" />
              <input type="text" value={content.branding?.theme?.bg || '#0a0a14'} onChange={(e) => updateThemeColor('bg', e.target.value)} className="flex-1 bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Card Background</label>
            <div className="flex items-center gap-3">
              <input type="color" value={content.branding?.theme?.card || '#131320'} onChange={(e) => updateThemeColor('card', e.target.value)} className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0" />
              <input type="text" value={content.branding?.theme?.card || '#131320'} onChange={(e) => updateThemeColor('card', e.target.value)} className="flex-1 bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Primary Color (Buttons, Borders)</label>
            <div className="flex items-center gap-3">
              <input type="color" value={content.branding?.theme?.primary || '#b449f6'} onChange={(e) => updateThemeColor('primary', e.target.value)} className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0" />
              <input type="text" value={content.branding?.theme?.primary || '#b449f6'} onChange={(e) => updateThemeColor('primary', e.target.value)} className="flex-1 bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Gradient Accent 1 (e.g. Cyan)</label>
            <div className="flex items-center gap-3">
              <input type="color" value={content.branding?.theme?.accent1 || '#06B6D4'} onChange={(e) => updateThemeColor('accent1', e.target.value)} className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0" />
              <input type="text" value={content.branding?.theme?.accent1 || '#06B6D4'} onChange={(e) => updateThemeColor('accent1', e.target.value)} className="flex-1 bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Gradient Accent 2 (e.g. Pink)</label>
            <div className="flex items-center gap-3">
              <input type="color" value={content.branding?.theme?.accent2 || '#EC4899'} onChange={(e) => updateThemeColor('accent2', e.target.value)} className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0" />
              <input type="text" value={content.branding?.theme?.accent2 || '#EC4899'} onChange={(e) => updateThemeColor('accent2', e.target.value)} className="flex-1 bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <h3 className="text-white font-medium mb-4">SEO & Meta Tags</h3>
        <p className="text-gray-400 text-sm mb-6">These settings control how your website appears in Google search results and when shared on social media.</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Site Title (shown in browser tab & Google)</label>
            <input type="text" value={content.branding?.seo?.siteTitle || ''} onChange={(e) => updateSeo('siteTitle', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" placeholder="Digieonix | Digital Marketing Agency" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Meta Description (Google snippet text)</label>
            <textarea value={content.branding?.seo?.metaDescription || ''} onChange={(e) => updateSeo('metaDescription', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-20" placeholder="A short description of your website for search engines..." />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Meta Keywords (comma-separated)</label>
            <input type="text" value={content.branding?.seo?.metaKeywords || ''} onChange={(e) => updateSeo('metaKeywords', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" placeholder="digital marketing, seo, web development..." />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">OG Image URL (social media share image)</label>
            <ImageUploader 
              label="OG Image" 
              value={content.branding?.seo?.ogImage || '/logo.png'} 
              onChange={(url) => updateSeo('ogImage', url)} 
            />
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <h3 className="text-white font-medium mb-4">Favicon</h3>
        <p className="text-gray-400 text-sm mb-4">The small icon shown in the browser tab. Upload a square PNG (32x32 or 64x64 recommended).</p>
        <ImageUploader 
          label="Favicon Image" 
          value={content.branding?.seo?.favicon || '/logo.png'} 
          onChange={(url) => updateSeo('favicon', url)} 
        />
      </div>
    </div>
  );

  const renderHero = () => (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <h3 className="text-white font-medium mb-4">Headlines (Typewriter Effect)</h3>
        {content.hero.headlines.map((hl, idx) => (
          <input key={idx} type="text" value={hl} onChange={(e) => updateHeroHeadline(idx, e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg mb-3 outline-none" />
        ))}
      </div>
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <h3 className="text-white font-medium mb-4">Subtext</h3>
        <textarea value={content.hero.subtext} onChange={(e) => updateHero('subtext', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-24" />
      </div>
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 flex gap-4">
        <div className="flex-1">
          <label className="text-gray-400 text-sm mb-1 block">CTA 1 Text</label>
          <input type="text" value={content.hero.cta1Text} onChange={(e) => updateHero('cta1Text', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
        </div>
        <div className="flex-1">
          <label className="text-gray-400 text-sm mb-1 block">CTA 2 Text</label>
          <input type="text" value={content.hero.cta2Text} onChange={(e) => updateHero('cta2Text', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <button onClick={addService} className="bg-[#1a1a1a] text-[#b449f6] border border-[#b449f6]/30 hover:bg-[#b449f6]/10 px-4 py-2 rounded-lg w-full transition-colors">+ Add Service</button>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'services')}>
        <SortableContext items={content.services.map((s, i) => s.id || s.title || String(i))} strategy={verticalListSortingStrategy}>
          {content.services.map((service, idx) => {
            const itemId = service.id || service.title || String(idx);
            return (
            <SortableItem key={itemId} id={itemId}>
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 relative">
                <button onClick={() => removeService(idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-sm">Delete</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Service Title</label>
                    <input type="text" value={service.title} onChange={(e) => updateService(idx, 'title', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Icon Name (lucide-react)</label>
                    <input type="text" value={service.icon} onChange={(e) => updateService(idx, 'icon', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-gray-400 text-sm mb-1 block">Short Description</label>
                  <textarea value={service.shortDesc || ''} onChange={(e) => updateService(idx, 'shortDesc', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-16" />
                </div>
                <div className="mb-4">
                  <label className="text-gray-400 text-sm mb-1 block">Full Description</label>
                  <textarea value={service.description} onChange={(e) => updateService(idx, 'description', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-24" />
                </div>
                
                <ImageUploader 
                  label="Service Image (Optional)" 
                  value={service.image} 
                  onChange={(url) => updateService(idx, 'image', url)} 
                />

                <div className="mt-4">
                  <label className="text-gray-400 text-sm mb-2 block">Key Features</label>
                  {(service.features || []).map((feature, fIdx) => (
                    <div key={fIdx} className="flex gap-2 mb-2">
                      <input type="text" value={feature} onChange={(e) => updateServiceFeature(idx, fIdx, e.target.value)} className="flex-1 bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
                      <button onClick={() => removeServiceFeature(idx, fIdx)} className="px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">X</button>
                    </div>
                  ))}
                  <button onClick={() => addServiceFeature(idx)} className="text-sm text-[#b449f6] hover:text-[#c469f6] mt-2">+ Add Feature</button>
                </div>
              </div>
            </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );

  const renderPricing = () => (
    <div className="space-y-8">
      {content.pricing.map((prc, idx) => (
        <div key={prc.id} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#b449f6] font-bold">{prc.service || 'Pricing Package'}</h3>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={prc.featured} onChange={(e) => updatePricing(idx, 'featured', e.target.checked)} className="accent-[#b449f6]" />
              Featured (Popular)
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Service Name</label>
              <input type="text" value={prc.service} onChange={(e) => updatePricing(idx, 'service', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Price (PKR)</label>
              <input type="number" value={prc.price.replace(/,/g, '')} onChange={(e) => {
                // Formatting price back with commas could be tricky on input, keeping it simple
                const val = Number(e.target.value).toLocaleString();
                updatePricing(idx, 'price', val === '0' ? '' : val);
              }} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
              <p className="text-xs text-gray-500 mt-1">Stored as: {prc.price}</p>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Period</label>
              <select value={prc.period} onChange={(e) => updatePricing(idx, 'period', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none">
                <option value="month">Per Month</option>
                <option value="one-time">One-time</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Features</label>
            {(prc.features || []).map((feat, fIdx) => (
              <div key={fIdx} className="flex gap-2 mb-2">
                <input type="text" value={feat} onChange={(e) => updatePricingFeature(idx, fIdx, e.target.value)} className="flex-1 bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
                <button onClick={() => removePricingFeature(idx, fIdx)} className="bg-red-500/10 text-red-500 px-3 rounded-lg hover:bg-red-500/20">×</button>
              </div>
            ))}
            <button onClick={() => addPricingFeature(idx)} className="text-[#b449f6] text-sm mt-2 hover:underline">+ Add Feature</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <button onClick={addPortfolio} className="bg-[#1a1a1a] text-[#b449f6] border border-[#b449f6]/30 hover:bg-[#b449f6]/10 px-4 py-2 rounded-lg w-full transition-colors">+ Add New Project</button>
      {content.portfolio.map((port, idx) => (
        <div key={port.id} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 relative">
          <button onClick={() => removePortfolio(idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-sm">Delete</button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Title</label>
              <input type="text" value={port.title} onChange={(e) => updatePortfolio(idx, 'title', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Category</label>
              <select value={port.category} onChange={(e) => updatePortfolio(idx, 'category', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none">
                <option value="Meta Ads">Meta Ads</option>
                <option value="Web Development">Web Development</option>
                <option value="SEO">SEO</option>
                <option value="Social Media">Social Media</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Client</label>
              <input type="text" value={port.client} onChange={(e) => updatePortfolio(idx, 'client', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Results</label>
              <input type="text" value={port.results} onChange={(e) => updatePortfolio(idx, 'results', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
            </div>
          </div>
          <ImageUploader 
            label="Project Image" 
            value={port.image} 
            onChange={(url) => updatePortfolio(idx, 'image', url)} 
          />
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Description</label>
            <textarea value={port.desc} onChange={(e) => updatePortfolio(idx, 'desc', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-20" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderLayout = () => {
    const layoutNames = {
      hero: 'Hero Section',
      servicesPreview: 'Services Preview',
      statsBar: 'Stats Bar',
      testimonialsPreview: 'Testimonials Section'
    };

    return (
      <div className="space-y-6">
        <p className="text-gray-400 text-sm">Drag and drop to reorder the sections on your live Home page.</p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'layout')}>
          <SortableContext items={content.layout} strategy={verticalListSortingStrategy}>
            {content.layout.map((item) => (
              <SortableItem key={item} id={item}>
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                  <span className="text-white font-semibold">{layoutNames[item] || item}</span>
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    );
  };

  const renderTeam = () => (
    <div className="space-y-6">
      <button onClick={addTeamMember} className="bg-[#1a1a1a] text-[#b449f6] border border-[#b449f6]/30 hover:bg-[#b449f6]/10 px-4 py-2 rounded-lg w-full transition-colors">+ Add Team Member</button>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'team')}>
        <SortableContext items={content.team.map((t, i) => t.id || t.name || String(i))} strategy={verticalListSortingStrategy}>
          {content.team.map((member, idx) => {
            const itemId = member.id || member.name || String(idx);
            return (
            <SortableItem key={itemId} id={itemId}>
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 relative">
                <button onClick={() => removeTeamMember(idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-sm">Delete</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Name</label>
                    <input type="text" value={member.name} onChange={(e) => updateTeam(idx, 'name', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Role</label>
                    <input type="text" value={member.role} onChange={(e) => updateTeam(idx, 'role', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
                  </div>
                </div>
                
                <ImageUploader 
                  label="Profile Image" 
                  value={member.image} 
                  onChange={(url) => updateTeam(idx, 'image', url)} 
                />
                
                <div className="mb-4">
                  <label className="text-gray-400 text-sm mb-1 block">Bio</label>
                  <textarea value={member.bio} onChange={(e) => updateTeam(idx, 'bio', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">LinkedIn URL</label>
                    <input type="text" value={member.social?.linkedin || ''} onChange={(e) => updateTeam(idx, 'social', { ...member.social, linkedin: e.target.value })} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Instagram URL</label>
                    <input type="text" value={member.social?.instagram || ''} onChange={(e) => updateTeam(idx, 'social', { ...member.social, instagram: e.target.value })} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
                  </div>
                </div>
              </div>
            </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );

  const renderTestimonials = () => (
    <div className="space-y-6">
      <button onClick={addTestimonial} className="bg-[#1a1a1a] text-[#b449f6] border border-[#b449f6]/30 hover:bg-[#b449f6]/10 px-4 py-2 rounded-lg w-full transition-colors">+ Add Testimonial</button>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, 'testimonials')}>
        <SortableContext items={content.testimonials.map((t, i) => t.id || t.name || String(i))} strategy={verticalListSortingStrategy}>
          {content.testimonials.map((test, idx) => {
            const itemId = test.id || test.name || String(idx);
            return (
            <SortableItem key={itemId} id={itemId}>
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 relative">
                <button onClick={() => removeTestimonial(idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-sm">Delete</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Client Name</label>
                    <input type="text" value={test.name} onChange={(e) => updateTestimonial(idx, 'name', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Role</label>
                    <input type="text" value={test.role} onChange={(e) => updateTestimonial(idx, 'role', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Company</label>
                    <input type="text" value={test.company} onChange={(e) => updateTestimonial(idx, 'company', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Stars</label>
                    <select value={test.stars} onChange={(e) => updateTestimonial(idx, 'stars', Number(e.target.value))} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none">
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                </div>
                <ImageUploader 
                  label="Client Avatar" 
                  value={test.avatar} 
                  onChange={(url) => updateTestimonial(idx, 'avatar', url)} 
                />
                <div className="mt-4">
                  <label className="text-gray-400 text-sm mb-1 block">Review Text</label>
                  <textarea value={test.text} onChange={(e) => updateTestimonial(idx, 'text', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-20" />
                </div>
              </div>
            </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );

  const renderContactInfo = () => (
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 space-y-4">
      {Object.keys(content.contactInfo).map((key) => (
        <div key={key}>
          <label className="text-gray-400 text-sm mb-1 block capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
          <input type="text" value={content.contactInfo[key]} onChange={(e) => updateContact(key, e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
        </div>
      ))}
    </div>
  );

  const renderSocialLinks = () => (
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 space-y-4">
      {Object.keys(content.socialLinks).map((key) => (
        <div key={key}>
          <label className="text-gray-400 text-sm mb-1 block capitalize">{key}</label>
          <input type="text" value={content.socialLinks[key]} onChange={(e) => updateSocial(key, e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
        </div>
      ))}
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6">
      <h3 className="text-white text-xl font-bold mb-4">Lead Submissions</h3>
      {leads.length === 0 ? (
        <p className="text-gray-400">No leads found yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-sm">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email / Phone</th>
                <th className="py-3 px-4">Service & Budget</th>
                <th className="py-3 px-4 w-1/4">Message</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-800/50 hover:bg-[#1a1a1a]/50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-400">
                    {lead.createdAt ? new Date(lead.createdAt._seconds ? lead.createdAt._seconds * 1000 : lead.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-4 px-4 font-medium">{lead.name}</td>
                  <td className="py-4 px-4 text-sm">
                    <div>{lead.email}</div>
                    <div className="text-gray-400">{lead.phone || 'N/A'}</div>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <div className="text-[#b449f6]">{lead.service}</div>
                    <div className="text-gray-400">{lead.budget}</div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400 max-w-xs break-words">{lead.message || '-'}</td>
                  <td className="py-4 px-4">
                    <select
                      value={lead.status || 'new'}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className={`text-sm px-3 py-1 rounded-full outline-none border ${
                        lead.status === 'converted' ? 'bg-green-500/10 border-green-500/50 text-green-500' :
                        lead.status === 'contacted' ? 'bg-blue-500/10 border-blue-500/50 text-blue-500' :
                        'bg-yellow-500/10 border-yellow-500/50 text-yellow-500'
                      }`}
                    >
                      <option value="new" className="bg-[#111]">New</option>
                      <option value="contacted" className="bg-[#111]">Contacted</option>
                      <option value="converted" className="bg-[#111]">Converted</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderNewsletter = () => (
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 space-y-4">
      <h3 className="text-white font-medium">Send Bulk Email to Leads</h3>
      <p className="text-gray-400 text-sm mb-4">This will send an email (via BCC) to all captured leads with valid email addresses.</p>
      
      <div>
        <label className="text-gray-400 text-sm mb-1 block">Subject</label>
        <input 
          type="text" 
          value={newsletterSubject} 
          onChange={(e) => setNewsletterSubject(e.target.value)} 
          className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" 
          placeholder="Special Offer / Monthly Update" 
        />
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-1 block">Message Body (HTML Supported)</label>
        <textarea 
          value={newsletterBody} 
          onChange={(e) => setNewsletterBody(e.target.value)} 
          className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-48" 
          placeholder="Write your email here..." 
        />
      </div>
      <button 
        onClick={handleSendNewsletter} 
        disabled={isSendingNewsletter}
        className="bg-[#b449f6] hover:bg-[#a03be0] text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        {isSendingNewsletter ? 'Sending...' : 'Send to All Leads'}
      </button>
    </div>
  );

  const renderFAQ = () => (
    <div className="space-y-6">
      <button onClick={addFAQ} className="bg-[#1a1a1a] text-[#b449f6] border border-[#b449f6]/30 hover:bg-[#b449f6]/10 px-4 py-2 rounded-lg w-full transition-colors">+ Add FAQ</button>
      {content.faq.map((item, idx) => (
        <div key={idx} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 relative">
          <button onClick={() => removeFAQ(idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-sm">Delete</button>
          <div className="mb-4 pr-12">
            <label className="text-gray-400 text-sm mb-1 block">Question</label>
            <input type="text" value={item.q} onChange={(e) => updateFAQ(idx, 'q', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Answer</label>
            <textarea value={item.a} onChange={(e) => updateFAQ(idx, 'a', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-20" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <h3 className="text-white font-medium mb-4">Narrative (Who We Are)</h3>
        <input type="text" value={content.about.narrative.title} onChange={(e) => updateAboutNarrative('title', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg mb-4 outline-none" placeholder="Title" />
        {content.about.narrative.paragraphs.map((p, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <textarea value={p} onChange={(e) => updateAboutNarrativeParagraph(idx, e.target.value)} className="flex-1 bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-20" />
            <button onClick={() => removeAboutNarrativeParagraph(idx)} className="bg-red-500/10 text-red-500 px-3 rounded-lg hover:bg-red-500/20">×</button>
          </div>
        ))}
        <button onClick={addAboutNarrativeParagraph} className="text-[#b449f6] text-sm mt-2 hover:underline">+ Add Paragraph</button>
      </div>
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <h3 className="text-white font-medium mb-4">Values</h3>
        {content.about.values.map((val, idx) => (
          <div key={idx} className="grid grid-cols-1 gap-2 mb-4 p-4 border border-gray-800 rounded-lg">
            <input type="text" value={val.title} onChange={(e) => updateAboutValue(idx, 'title', e.target.value)} className="bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" placeholder="Title" />
            <input type="text" value={val.icon} onChange={(e) => updateAboutValue(idx, 'icon', e.target.value)} className="bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" placeholder="Icon Name (lucide-react)" />
            <textarea value={val.description} onChange={(e) => updateAboutValue(idx, 'description', e.target.value)} className="bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-16" placeholder="Description" />
          </div>
        ))}
      </div>
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <h3 className="text-white font-medium mb-4">Why Choose Us Checklist</h3>
        {content.about.checklist.map((item, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input type="text" value={item} onChange={(e) => updateAboutChecklist(idx, e.target.value)} className="flex-1 bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
            <button onClick={() => removeAboutChecklist(idx)} className="bg-red-500/10 text-red-500 px-3 rounded-lg hover:bg-red-500/20">×</button>
          </div>
        ))}
        <button onClick={addAboutChecklist} className="text-[#b449f6] text-sm mt-2 hover:underline">+ Add Item</button>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <button onClick={addPrivacy} className="bg-[#1a1a1a] text-[#b449f6] border border-[#b449f6]/30 hover:bg-[#b449f6]/10 px-4 py-2 rounded-lg w-full transition-colors">+ Add Section</button>
      {content.privacy.map((item, idx) => (
        <div key={idx} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 relative">
          <button onClick={() => removePrivacy(idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-sm">Delete</button>
          <div className="mb-4 pr-12">
            <label className="text-gray-400 text-sm mb-1 block">Title</label>
            <input type="text" value={item.title} onChange={(e) => updatePrivacy(idx, 'title', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Content</label>
            <textarea value={item.content} onChange={(e) => updatePrivacy(idx, 'content', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-40" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTerms = () => (
    <div className="space-y-6">
      <button onClick={addTerms} className="bg-[#1a1a1a] text-[#b449f6] border border-[#b449f6]/30 hover:bg-[#b449f6]/10 px-4 py-2 rounded-lg w-full transition-colors">+ Add Section</button>
      {content.terms.map((item, idx) => (
        <div key={idx} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 relative">
          <button onClick={() => removeTerms(idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 text-sm">Delete</button>
          <div className="mb-4 pr-12">
            <label className="text-gray-400 text-sm mb-1 block">Title</label>
            <input type="text" value={item.title} onChange={(e) => updateTerms(idx, 'title', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Content</label>
            <textarea value={item.content} onChange={(e) => updateTerms(idx, 'content', e.target.value)} className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none h-40" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Leads': return renderLeads();
      case 'Newsletter': return renderNewsletter();
      case 'Page Layout': return renderLayout();
      case 'Branding': return renderBranding();
      case 'Hero': return renderHero();
      case 'Services': return renderServices();
      case 'Pricing': return renderPricing();
      case 'Portfolio': return renderPortfolio();
      case 'Team': return renderTeam();
      case 'Testimonials': return renderTestimonials();
      case 'Contact Info': return renderContactInfo();
      case 'Social Links': return renderSocialLinks();
      case 'FAQ': return renderFAQ();
      case 'About': return renderAbout();
      case 'Privacy': return renderPrivacy();
      case 'Terms': return renderTerms();
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans">
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#1a1a1a', color: '#fff', border: '1px solid #b449f6' } }} />
      
      {/* Sidebar */}
      <div className="w-[260px] bg-[#111111] border-r border-gray-800 flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-gray-800 flex flex-col items-center justify-center gap-3">
          <img src={content?.branding?.logo || "/logo.png"} alt="Digieonix" className="h-8 object-contain" />
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {liveUsers} Active Visitors
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-colors ${activeTab === tab.name ? 'bg-[#b449f6]/10 text-[#b449f6] border-r-2 border-[#b449f6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <span>{tab.icon}</span>
              <span className="font-medium text-sm">{tab.name}</span>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 py-2 rounded-lg text-sm font-medium transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#111111] p-4 border-b border-gray-800 flex justify-between items-center">
          <img src={content?.branding?.logo || "/logo.png"} alt="Digieonix" className="h-6 object-contain" />
          <button onClick={handleLogout} className="text-red-500 text-sm">Logout</button>
        </div>
        {/* Mobile Tabs */}
        <div className="md:hidden bg-[#111111] border-b border-gray-800 overflow-x-auto flex whitespace-nowrap p-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-2 text-sm rounded-lg ${activeTab === tab.name ? 'bg-[#b449f6]/10 text-[#b449f6]' : 'text-gray-400'}`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 pb-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              {tabs.find(t => t.name === activeTab)?.icon} {activeTab} Settings
            </h2>
            {renderActiveTab()}
          </div>
        </div>

        {/* Sticky Save Button */}
        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="pointer-events-auto bg-[#b449f6] hover:bg-[#a03be0] text-white px-8 py-3 rounded-lg font-medium shadow-[0_0_20px_rgba(180,73,246,0.4)] transition-all disabled:opacity-70 flex items-center gap-2"
          >
            {isSaving ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

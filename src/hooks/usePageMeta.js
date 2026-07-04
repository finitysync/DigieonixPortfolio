import { useEffect } from 'react';
import { useContent } from '../context/ContentContext';

/**
 * Custom hook for per-page SEO meta tags.
 * Reads global defaults from content.branding.seo (database) and allows per-page overrides.
 * @param {{ title?: string, description?: string }} options
 */
const usePageMeta = ({ title, description } = {}) => {
  const content = useContent();
  const seo = content?.branding?.seo || {};

  useEffect(() => {
    const baseTitle = seo.siteTitle || 'Digieonix | Digital Marketing Agency Pakistan';
    const baseDescription = seo.metaDescription || '';

    // Set page title
    if (title) {
      document.title = `${title} | Digieonix`;
    } else {
      document.title = baseTitle;
    }

    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || baseDescription);
    }

    // Set meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (seo.metaKeywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', seo.metaKeywords);
    }

    // Set OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    const twDesc = document.querySelector('meta[property="twitter:description"]');
    const twImage = document.querySelector('meta[property="twitter:image"]');

    const pageTitle = title ? `${title} | Digieonix` : baseTitle;
    const pageDesc = description || baseDescription;

    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    if (ogDesc) ogDesc.setAttribute('content', pageDesc);
    if (ogImage && seo.ogImage) ogImage.setAttribute('content', seo.ogImage);
    if (twTitle) twTitle.setAttribute('content', pageTitle);
    if (twDesc) twDesc.setAttribute('content', pageDesc);
    if (twImage && seo.ogImage) twImage.setAttribute('content', seo.ogImage);

    // Set favicon dynamically
    if (seo.favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = seo.favicon;
      }
    }
  }, [title, description, seo]);
};

export default usePageMeta;

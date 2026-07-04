import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'content'), (snapshot) => {
      const newContent = {};
      snapshot.forEach(doc => {
        const data = doc.data();
        newContent[doc.id] = data._isArray ? data.items : data;
      });
      
      // Inject Theme Colors
      if (newContent.branding?.theme) {
        const { bg, card, primary, accent1, accent2 } = newContent.branding.theme;
        const root = document.documentElement;
        if (bg) root.style.setProperty('--theme-bg', bg);
        if (card) root.style.setProperty('--theme-card', card);
        if (primary) root.style.setProperty('--theme-primary', primary);
        if (accent1) root.style.setProperty('--theme-accent1', accent1);
        if (accent2) root.style.setProperty('--theme-accent2', accent2);
      }
      
      setContent(newContent);
      setIsLoading(false);
    }, (error) => {
      console.error("Failed to load content from Firebase:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAdminRoute = location.pathname.startsWith('/admin');

  // If loading and not on admin, show a spinner (admin has its own loader logic)
  if (isLoading && !isAdminRoute) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#b449f6]/20 border-t-[#b449f6] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  return useContext(ContentContext);
};

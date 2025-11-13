import React, { createContext, useState, useContext, useMemo } from 'react';
import { enCopy, type AppCopy } from '../copy/en';
import { bnCopy } from '../copy/bn';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  // FIX: Corrected the type for `setLanguage` to match React's `useState` setter type.
  // This allows using the functional update form `setLanguage(prev => ...)` and fixes type errors in consuming components.
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  copy: AppCopy;
}

const resources = {
  en: enCopy,
  bn: bnCopy,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bn'); // Default to Bengali

  const value = useMemo(() => ({
    language,
    setLanguage,
    copy: resources[language],
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useCopy = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useCopy must be used within a LanguageProvider');
  }
  return context;
};
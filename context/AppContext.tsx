
import React, { createContext, useState, useContext, useMemo } from 'react';
import { type AppConfig } from '../types';

const AppContext = createContext<AppConfig | undefined>(undefined);

export const AppConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config] = useState<AppConfig>({
    isPro: false,
    locale: 'en',
  });

  const value = useMemo(() => config, [config]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppConfig = (): AppConfig => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppConfig must be used within an AppConfigProvider');
  }
  return context;
};

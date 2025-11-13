import React from 'react';
import { type NavigateFunction } from 'react-router-dom';

export type ModuleId = 'quiz' | 'calculator' | 'food' | 'doseDoctor' | 'guide' | 'settings' | 'profile' | 'tracker' | 'data' | 'tests';

export interface AppConfig {
  isPro: boolean;
  locale: 'en';
}

export interface ModuleSlotProps {
  navigate: NavigateFunction;
  config: AppConfig;
}

// FIX: Added React import to define React.FC type.
export type ModuleComponent = React.FC<ModuleSlotProps>;
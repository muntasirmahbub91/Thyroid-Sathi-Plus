
import React from 'react';
import ModuleSlot from '../components/ModuleSlot';
import Header from '../components/Header';
import { useCopy } from '../context/LanguageContext';

const ThyroidGuide: React.FC = () => {
  const { copy } = useCopy();
  return (
    <div>
      <Header title={copy.home.guideCard} />
      <ModuleSlot id="guide" />
    </div>
  );
};

export default ThyroidGuide;

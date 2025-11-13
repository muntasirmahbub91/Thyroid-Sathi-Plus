
import React from 'react';
import ModuleSlot from '../components/ModuleSlot';
import Header from '../components/Header';
import { useCopy } from '../context/LanguageContext';

const FoodGuide: React.FC = () => {
  const { copy } = useCopy();
  return (
    <div>
      <Header title={copy.home.foodCard} />
      <div className="p-4">
        <ModuleSlot id="food" />
      </div>
    </div>
  );
};

export default FoodGuide;

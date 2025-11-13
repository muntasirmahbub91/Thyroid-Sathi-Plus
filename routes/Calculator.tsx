
import React from 'react';
import ModuleSlot from '../components/ModuleSlot';
import Header from '../components/Header';
import { useCopy } from '../context/LanguageContext';

const Calculator: React.FC = () => {
  const { copy } = useCopy();
  return (
    <div>
      <Header title={copy.home.calcCard} />
      <div className="p-4">
        <ModuleSlot id="calculator" />
      </div>
    </div>
  );
};

export default Calculator;


import React from 'react';
import ModuleSlot from '../components/ModuleSlot';
import Header from '../components/Header';
import { useCopy } from '../context/LanguageContext';

const DoseDoctor: React.FC = () => {
  const { copy } = useCopy();
  return (
    <div>
      <Header title={copy.home.doseCard} />
      <ModuleSlot id="doseDoctor" />
    </div>
  );
};

export default DoseDoctor;

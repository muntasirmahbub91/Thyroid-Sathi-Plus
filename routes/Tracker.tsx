
import React from 'react';
import ModuleSlot from '../components/ModuleSlot';
import Header from '../components/Header';
import { useCopy } from '../context/LanguageContext';

const Tracker: React.FC = () => {
  const { copy } = useCopy();
  return (
    <div>
      <Header title={copy.nav.tracker} />
      <div className="p-4">
        <ModuleSlot id="tracker" />
      </div>
    </div>
  );
};

export default Tracker;

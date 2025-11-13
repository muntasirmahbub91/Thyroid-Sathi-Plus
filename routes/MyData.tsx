import React from 'react';
import ModuleSlot from '../components/ModuleSlot';
import Header from '../components/Header';
import { useCopy } from '../context/LanguageContext';

const MyData: React.FC = () => {
  const { copy } = useCopy();
  return (
    <div>
      <Header title={copy.nav.data} />
      <div className="p-4">
        <ModuleSlot id="data" />
      </div>
    </div>
  );
};

export default MyData;
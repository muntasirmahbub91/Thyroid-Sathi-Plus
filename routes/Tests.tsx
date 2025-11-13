import React from 'react';
import ModuleSlot from '../components/ModuleSlot';
import Header from '../components/Header';
import { useCopy } from '../context/LanguageContext';

const Tests: React.FC = () => {
  const { copy } = useCopy();
  return (
    <div>
      <Header title={copy.nav.tests} />
      <div className="p-4">
        <ModuleSlot id="tests" />
      </div>
    </div>
  );
};

export default Tests;
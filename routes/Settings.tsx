
import React from 'react';
import ModuleSlot from '../components/ModuleSlot';
import Header from '../components/Header';
import { useCopy } from '../context/LanguageContext';

const Settings: React.FC = () => {
  const { copy } = useCopy();
  return (
    <div>
      <Header title={copy.nav.settings} />
      <div className="p-4">
        <ModuleSlot id="settings" />
      </div>
    </div>
  );
};

export default Settings;

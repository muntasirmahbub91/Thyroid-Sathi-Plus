
import React from 'react';
import ModuleSlot from '../components/ModuleSlot';
import Header from '../components/Header';
import { useCopy } from '../context/LanguageContext';

const Profile: React.FC = () => {
  const { copy } = useCopy();
  return (
    <div>
      <Header title={copy.nav.profile} />
      <div className="p-4">
        <ModuleSlot id="profile" />
      </div>
    </div>
  );
};

export default Profile;

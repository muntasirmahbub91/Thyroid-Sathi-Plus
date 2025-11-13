
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppConfig } from '../context/AppContext';
import { getModule } from '../modules/registry';
import { type ModuleId } from '../types';
import { useCopy } from '../context/LanguageContext';
import { LockClosedIcon } from './icons';

interface ModuleSlotProps {
  id: ModuleId;
  isProFeature?: boolean;
}

const ModuleSlot: React.FC<ModuleSlotProps> = ({ id, isProFeature = false }) => {
  const navigate = useNavigate();
  const config = useAppConfig();
  const { copy } = useCopy();
  const ModuleComponent = getModule(id);

  if (isProFeature && !config.isPro) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 h-full">
        <div className="bg-thy-accent-weak p-4 rounded-full mb-4">
          <LockClosedIcon className="w-10 h-10 text-thy-accent" />
        </div>
        <h2 className="text-xl font-bold text-thy-ink mb-2">{copy.placeholders.pro}</h2>
        <p className="text-thy-ink-muted">{copy.placeholders.locked}</p>
      </div>
    );
  }

  if (ModuleComponent) {
    return <ModuleComponent navigate={navigate} config={config} />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full">
       <div className="bg-gray-200 p-4 rounded-full mb-4">
          <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
      <h2 className="text-xl font-bold text-thy-ink mb-2">{copy.placeholders.comingSoon}</h2>
      <p className="text-thy-ink-muted">{copy.placeholders.empty}</p>
    </div>
  );
};

export default ModuleSlot;

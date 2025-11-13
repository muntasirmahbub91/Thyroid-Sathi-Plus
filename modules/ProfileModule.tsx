import React, { useState, useEffect } from 'react';
import { type ModuleComponent } from '../types';
import { useProfile } from '../context/ProfileContext';
import { useCopy } from '../context/LanguageContext';

// Helper Input Component
interface InputProps {
    label: string;
    id: string;
    [key: string]: any;
}
const Input = ({ label, id, ...props }: InputProps) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-thy-ink-muted">{label}</label>
        <input id={id} {...props} className="mt-1 block w-full px-3 py-2 bg-thy-surface border border-thy-line rounded-xl shadow-sm focus-ring text-thy-ink" />
    </div>
);

// Helper Select Component
// FIX: Changed SelectProps to no longer explicitly require `children` and typed the component with `React.FC` to resolve TypeScript errors. `React.FC` makes the `children` prop optional, satisfying the compiler.
interface SelectProps {
    label: string;
    id: string;
    [key: string]: any;
}
const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-thy-ink-muted">{label}</label>
        <select id={id} {...props} className="mt-1 block w-full px-3 py-2 bg-thy-surface border border-thy-line rounded-xl shadow-sm focus-ring text-thy-ink">
            {children}
        </select>
    </div>
);

// Debug Tools Component
const DebugTools: React.FC = () => {
    const { copy } = useCopy();
    const { debug } = copy.profile;
    
    const handleTrigger = (eventName: string) => {
        window.dispatchEvent(new CustomEvent(eventName));
    };

    return (
        <div className="bg-thy-surface p-6 rounded-2xl shadow-thy-card space-y-4 mt-8 border-2 border-dashed border-thy-line">
            <h3 className="text-lg font-bold text-thy-ink text-center">{debug.title}</h3>
            <div className="space-y-3">
                <button onClick={() => handleTrigger('showDailyCheckinModal')} className="w-full bg-thy-bg text-thy-ink font-bold py-2 px-4 rounded-xl hover:bg-thy-line transition-all">
                    {debug.triggerDailyCheckin}
                </button>
                <button onClick={() => handleTrigger('showInactivityModal')} className="w-full bg-thy-bg text-thy-ink font-bold py-2 px-4 rounded-xl hover:bg-thy-line transition-all">
                    {debug.triggerInactivity}
                </button>
                <button onClick={() => handleTrigger('showConcernModal')} className="w-full bg-thy-bg text-thy-ink font-bold py-2 px-4 rounded-xl hover:bg-thy-line transition-all">
                    {debug.triggerConcern}
                </button>
            </div>
        </div>
    );
};


const ProfileModule: ModuleComponent = () => {
  const { profile, setProfile } = useProfile();
  const { copy } = useCopy();
  const { profile: profileCopy } = copy;

  const [formData, setFormData] = useState(profile);
  const [saved, setSaved] = useState(false);
  
  // Ensure form data is updated if the profile context changes from another source
  useEffect(() => {
    setFormData(profile);
  }, [profile]);


  const handleChange = (field: keyof typeof formData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    
    // If medication is changed to none or unselected, clear the dose
    if (field === 'medication' && (value === 'none' || value === '')) {
        newFormData.dose = '';
    }

    setFormData(newFormData);
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000); // Hide message after 2 seconds
  };
  
  const getDoseUnit = () => {
    if (formData.medication === 'thyroxine') {
        return profileCopy.doseUnits.mcg;
    }
    if (formData.medication === 'carbimazole' || formData.medication === 'ptu') {
        return profileCopy.doseUnits.mg;
    }
    return '';
  };
  const doseUnit = getDoseUnit();

  return (
    <div className="container mx-auto max-w-lg">
      <form onSubmit={handleSave} className="bg-thy-surface p-6 rounded-2xl shadow-thy-card space-y-4">
        <h2 className="text-xl font-bold text-thy-ink text-center mb-4">{profileCopy.title}</h2>
        
        <Input 
          label={profileCopy.nameLabel}
          id="name" 
          type="text" 
          placeholder={profileCopy.namePlaceholder}
          value={formData.name} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)} 
        />
        
        <Input 
          label={profileCopy.ageLabel}
          id="age" 
          type="number" 
          placeholder={profileCopy.agePlaceholder}
          value={formData.age} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('age', e.target.value)} 
        />

        <Select 
            label={profileCopy.sexLabel}
            id="sex" 
            value={formData.sex} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('sex', e.target.value)}
        >
            <option value="">{profileCopy.sexPlaceholder}</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </Select>

        <Input 
          label={profileCopy.weightLabel}
          id="weight" 
          type="number" 
          placeholder={profileCopy.weightPlaceholder}
          value={formData.weight} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('weight', e.target.value)} 
        />
        
        <Select 
            label={profileCopy.medicationLabel}
            id="medication" 
            value={formData.medication} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('medication', e.target.value)}
        >
            <option value="">{profileCopy.medicationPlaceholder}</option>
            <option value="none">{profileCopy.medicationOptions.none}</option>
            <option value="thyroxine">{profileCopy.medicationOptions.thyroxine}</option>
            <option value="carbimazole">{profileCopy.medicationOptions.carbimazole}</option>
            <option value="ptu">{profileCopy.medicationOptions.ptu}</option>
        </Select>

        <div className="relative">
            <Input 
              label={profileCopy.doseLabel}
              id="dose" 
              type="number" 
              placeholder={profileCopy.dosePlaceholder}
              value={formData.dose} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('dose', e.target.value)} 
              // FIX: Removed redundant check `|| formData.medication === ''` which caused a TypeScript error.
              // The check `!formData.medication` already covers the case where it's an empty string.
              disabled={!formData.medication || formData.medication === 'none'}
              className={doseUnit ? 'pr-14' : ''}
            />
            {doseUnit && (
                <span className="absolute right-3 bottom-2.5 text-thy-ink-muted font-semibold">
                    {doseUnit}
                </span>
            )}
        </div>
        
        <div className="pt-2">
            <button type="submit" className="w-full bg-thy-accent text-white font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-accent-strong transition-all">
                {profileCopy.saveButton}
            </button>
        </div>
        
        {saved && (
            <p className="text-center text-green-600 font-semibold animate-fade-in">
                {profileCopy.saveSuccess}
            </p>
        )}
      </form>

      <DebugTools />

    </div>
  );
};

export default ProfileModule;

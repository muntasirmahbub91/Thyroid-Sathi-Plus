
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

interface Profile {
  name: string;
  age: string;
  sex: 'male' | 'female' | 'other' | '';
  weight: string;
  medication: 'none' | 'thyroxine' | 'carbimazole' | 'ptu' | '';
  dose: string;
}

interface ProfileContextType {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'thyroidAppUserProfile';

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<Profile>({
    name: '',
    age: '',
    sex: '',
    weight: '',
    medication: '',
    dose: '',
  });

  // Load profile from localStorage on initial render
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedProfile) {
        setProfileState(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Failed to load profile from localStorage", error);
    }
  }, []);

  const setProfile = (newProfile: Profile) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProfile));
      setProfileState(newProfile);
    } catch (error) {
      console.error("Failed to save profile to localStorage", error);
    }
  };

  const value = useMemo(() => ({ profile, setProfile }), [profile]);

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

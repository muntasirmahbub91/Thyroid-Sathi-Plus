import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, TrackerIcon, DataIcon, ProfileIcon, TestTubeIcon } from './icons';
import { useCopy } from '../context/LanguageContext';

const BottomNav: React.FC = () => {
  const { copy } = useCopy();
  
  const navItems = [
    { path: '/', label: copy.nav.home, icon: HomeIcon },
    { path: '/tracker', label: copy.nav.tracker, icon: TrackerIcon },
    { path: '/tests', label: copy.nav.tests, icon: TestTubeIcon },
    { path: '/data', label: copy.nav.data, icon: DataIcon },
    { path: '/profile', label: copy.nav.profile, icon: ProfileIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-thy-surface border-t border-thy-line shadow-thy-card z-20">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto px-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            aria-label={label}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 w-1/5 transition-colors duration-200 ${
                isActive ? 'text-thy-accent' : 'text-thy-ink-muted hover:text-thy-accent'
              }`
            }
          >
            <Icon className="w-7 h-7" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
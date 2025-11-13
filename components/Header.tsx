
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from './icons';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-thy-surface/80 backdrop-blur-sm p-4 border-b border-thy-line">
      <div className="relative flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 p-2 text-thy-ink-muted hover:text-thy-accent transition-colors"
          aria-label="Go back"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-thy-ink">{title}</h1>
      </div>
    </header>
  );
};

export default Header;

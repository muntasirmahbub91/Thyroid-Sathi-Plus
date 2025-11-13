
import React from 'react';
import { Link } from 'react-router-dom';
import { useCopy } from '../context/LanguageContext';

interface FeatureCardProps {
  title: string;
  description: string;
  imagePath: string;
  path: string;
  isPro?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imagePath, path, isPro = false }) => {
  const { copy } = useCopy();
  return (
    <Link to={path} className="block bg-thy-surface p-4 rounded-2xl shadow-thy-card hover:shadow-thy-emphasis transition-shadow duration-200">
      <div className="relative">
        <img src={imagePath} alt={title} className="w-full h-24 object-cover rounded-xl mb-3 bg-thy-bg border border-thy-line" />
        {isPro && (
          <span className="absolute top-2 right-2 bg-thy-accent text-white text-xs font-bold px-2 py-1 rounded-full">
            {copy.featureCard.pro}
          </span>
        )}
      </div>
      <h3 className="font-bold text-thy-ink">{title}</h3>
      <p className="text-sm text-thy-ink-muted">{description}</p>
    </Link>
  );
};

export default FeatureCard;

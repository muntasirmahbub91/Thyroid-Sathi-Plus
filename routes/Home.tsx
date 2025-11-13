
import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { useCopy } from '../context/LanguageContext';
import { useProfile } from '../context/ProfileContext';
import { LogoIcon } from '../components/icons';

const Home: React.FC = () => {
  const { copy, language, setLanguage } = useCopy();
  const { profile } = useProfile();
  const displayName = profile.name ? `, ${profile.name}` : '';
  
  const features = [
    { id: 'quiz', title: copy.home.quizCard, desc: copy.home.quizDesc, path: '/quiz', image: '/images/placeholder-quiz.png' },
    { id: 'calculator', title: copy.home.calcCard, desc: copy.home.calcDesc, path: '/calculator', image: '/images/placeholder-calc.png' },
    { id: 'food', title: copy.home.foodCard, desc: copy.home.foodDesc, path: '/food', image: '/images/placeholder-food.png' },
    { id: 'doseDoctor', title: copy.home.doseCard, desc: copy.home.doseDesc, path: '/dose-doctor', image: '/images/placeholder-pro.png', isPro: true },
    { id: 'guide', title: copy.home.guideCard, desc: copy.home.guideDesc, path: '/guide', image: '/images/placeholder-guide.png', isPro: true },
  ];

  return (
    <div className="bg-thy-bg">
      <header className="sticky top-0 z-10 bg-thy-surface/95 backdrop-blur-sm px-6 py-4 flex justify-between items-center border-b border-thy-line">
        
        {language === 'bn' ? (
            <div>
                <h1 className="font-hind-siliguri font-bold text-thy-ink text-2xl">{copy.app.name}</h1>
                <p className="font-hind-siliguri text-thy-ink-muted">{copy.app.tagline}</p>
            </div>
        ) : (
            <div className="flex items-center space-x-4">
                <LogoIcon className="h-12 w-12" />
                <div>
                    <h1 className="text-2xl font-bold text-thy-ink">{copy.home.welcome}{displayName}</h1>
                    <p className="text-thy-ink-muted">{copy.app.tagline}</p>
                </div>
            </div>
        )}

        <div className="flex items-center bg-thy-accent-weak p-1 rounded-full">
            <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-1 text-sm font-bold rounded-full transition-all duration-300 ${
                    language === 'en' ? 'bg-white text-thy-accent shadow' : 'text-thy-ink-muted hover:bg-white/50'
                }`}
            >
                {copy.home.langSwitchEN}
            </button>
            <button
                onClick={() => setLanguage('bn')}
                className={`px-4 py-1 text-sm font-bold rounded-full transition-all duration-300 ${
                    language === 'bn' ? 'bg-white text-thy-accent shadow' : 'text-thy-ink-muted hover:bg-white/50'
                }`}
            >
                {copy.home.langSwitchBN}
            </button>
        </div>
      </header>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {features.map(feature => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.desc}
              path={feature.path}
              imagePath={feature.image}
              isPro={feature.isPro}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

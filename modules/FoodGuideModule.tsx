
import React, { useState, useMemo, useCallback } from 'react';
import { type ModuleComponent } from '../types';
import { useCopy, type Language } from '../context/LanguageContext';

// --- TYPE DEFINITIONS (from copy files) ---
interface FoodItem {
  id: number;
  category: string;
  image: string;
  name: string;
  line1: string;
  line2: string;
  line3: string;
  status: { key: string } | null;
}

// --- ICONS ---
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const GridIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


// --- SUB-COMPONENTS ---

const FoodDetailModal: React.FC<{
  food: FoodItem;
  ui: any;
  onClose: () => void;
}> = ({ food, ui, onClose }) => {
  const statusLabel = food.status ? ui.statusLabels[food.status.key] : null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`food-title-${food.id}`}
    >
      <div
        className="bg-thy-surface rounded-3xl shadow-thy-emphasis max-w-sm w-full m-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-1.5 hover:bg-black/60 transition-colors"
            aria-label={ui.closeModal}
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">
          <h2 id={`food-title-${food.id}`} className="text-2xl font-bold text-thy-ink">{food.name}</h2>
          {statusLabel && (
            <p className="mt-1 text-sm font-semibold text-yellow-800 bg-yellow-400/20 px-2 py-1 rounded-full inline-block">
              {statusLabel}
            </p>
          )}
          <div className="text-thy-ink-muted mt-4 space-y-2">
            <p>• {food.line1}</p>
            <p>• {food.line2}</p>
            <p className="font-semibold text-thy-accent">• {food.line3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN MODULE COMPONENT ---

const FoodGuideModule: ModuleComponent = () => {
  const { copy, language, setLanguage } = useCopy();
  const { foodGuide } = copy;
  
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const filteredFoods = useMemo(() => {
    let foods = foodGuide.foods;
    
    if (activeCategory !== 'All') {
      foods = foods.filter(food => food.category === activeCategory);
    }
    
    // Search both original English name from category key and localized name
    const allFoodsOriginalLang = enCopy.foodGuide.foods;
    const lowercasedTerm = searchTerm.toLowerCase();

    if (searchTerm.trim() !== '') {
      foods = foods.filter(food => {
        const originalFood = allFoodsOriginalLang.find(f => f.id === food.id);
        return food.name.toLowerCase().includes(lowercasedTerm) || 
               originalFood?.name.toLowerCase().includes(lowercasedTerm);
      });
    }
    
    return foods;
  }, [foodGuide.foods, activeCategory, searchTerm]);

  const handleLanguageToggle = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  }, [setLanguage]);

  const currentUI = foodGuide.ui;

  return (
    <div className="container mx-auto max-w-4xl">
      {/* Header & Controls */}
      <div className="p-4 sticky top-[60px] z-10 bg-thy-bg/90 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-thy-ink">{currentUI.appName}</h2>
          <button onClick={handleLanguageToggle} className="font-semibold text-thy-accent hover:underline">
            {foodGuide.toggleLang}
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder={currentUI.searchPlaceholder}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-thy-line rounded-xl focus-ring bg-thy-surface text-thy-ink"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-thy-ink-muted" />
        </div>
        
        <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-thy-ink-muted">
                {foodGuide.itemsFound(filteredFoods.length)}
            </div>
            <div className="flex items-center space-x-1 bg-thy-bg p-1 rounded-xl border border-thy-line">
                <button onClick={() => setViewMode('grid')} className={`p-1 rounded-lg ${viewMode === 'grid' ? 'bg-thy-surface text-thy-accent shadow-sm' : 'text-thy-ink-muted'}`} aria-label={currentUI.viewAsGrid}><GridIcon className="w-5 h-5"/></button>
                <button onClick={() => setViewMode('list')} className={`p-1 rounded-lg ${viewMode === 'list' ? 'bg-thy-surface text-thy-accent shadow-sm' : 'text-thy-ink-muted'}`} aria-label={currentUI.viewAsList}><ListIcon className="w-5 h-5"/></button>
            </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 pb-2 overflow-x-auto whitespace-nowrap">
        {Object.entries(currentUI.categories).map(([key, name]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`inline-block px-4 py-2 mr-2 mb-2 text-sm font-semibold rounded-full transition-colors ${
              activeCategory === key
                ? 'bg-thy-accent text-white'
                : 'bg-thy-accent-weak text-thy-accent-strong hover:bg-thy-accent-strong/20'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Food Items */}
      <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4' : 'space-y-3'}`}>
        {filteredFoods.map(food => {
          const statusLabel = food.status ? currentUI.statusLabels[food.status.key] : null;
          return (
            <div key={food.id} onClick={() => setSelectedFood(food)} className={`bg-thy-surface rounded-2xl shadow-thy-card hover:shadow-thy-emphasis transition-shadow cursor-pointer overflow-hidden ${viewMode === 'list' ? 'flex items-center space-x-4' : ''}`}>
              <img src={food.image} alt={food.name} className={`${viewMode === 'grid' ? 'w-full h-24 object-cover' : 'w-20 h-20 object-cover flex-shrink-0'}`} />
              <div className="p-3">
                <h3 className="font-bold text-thy-ink">{food.name}</h3>
                {statusLabel && <p className="text-xs font-semibold text-yellow-800 mt-1">{statusLabel}</p>}
              </div>
            </div>
          )
        })}
      </div>
      
      {filteredFoods.length === 0 && (
          <div className="text-center py-10 text-thy-ink-muted">
              <p>{foodGuide.noResults}</p>
          </div>
      )}

      {/* Modal */}
      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          ui={currentUI}
          onClose={() => setSelectedFood(null)}
        />
      )}
    </div>
  );
};
// Need to import enCopy to search original names
import { enCopy } from '../copy/en';
export default FoodGuideModule;

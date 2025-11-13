
import React, { useState } from 'react';
import { type ModuleComponent } from '../types';
import { useCopy, type Language } from '../context/LanguageContext';


// --- ICONS ---
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

// --- SUB-COMPONENTS ---

interface AccordionItemProps {
    question: string;
    answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-thy-line">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-thy-bg focus:outline-none"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-thy-ink">{question}</span>
                <ChevronDownIcon className={`w-5 h-5 text-thy-ink-muted transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="px-2 pb-4 text-thy-ink-muted animate-fade-in">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

// --- MAIN MODULE COMPONENT ---

const GuideModule: ModuleComponent = () => {
    const { copy, setLanguage } = useCopy();
    const { guide } = copy;

    return (
        <div className="container mx-auto max-w-4xl p-4">
            {/* Header & Language Toggle */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-thy-ink">
                    {guide.title}
                </h1>
                <button
                    onClick={() => setLanguage(prev => prev === 'en' ? 'bn' : 'en')}
                    className="font-semibold text-thy-accent hover:underline"
                >
                    {guide.toggleLang}
                </button>
            </div>

            {/* Q&A Sections */}
            <div className="space-y-8">
                {guide.data.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="bg-thy-surface p-4 rounded-2xl shadow-thy-card">
                        <h2 className="text-xl font-bold text-thy-accent mb-4 pb-2 border-b border-thy-line">
                            {section.title}
                        </h2>
                        <div>
                            {section.qa.map((item, qaIndex) => (
                                <AccordionItem
                                    key={qaIndex}
                                    question={item.question}
                                    answer={item.answer}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuideModule;

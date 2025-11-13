
import React from 'react';
import ModuleSlot from '../components/ModuleSlot';
import Header from '../components/Header';
import { useCopy } from '../context/LanguageContext';

const Quiz: React.FC = () => {
  const { copy } = useCopy();
  return (
    <div>
      <Header title={copy.home.quizCard} />
      <div className="p-4">
        <ModuleSlot id="quiz" />
      </div>
    </div>
  );
};

export default Quiz;

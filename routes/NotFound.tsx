
import React from 'react';
import { Link } from 'react-router-dom';
import { useCopy } from '../context/LanguageContext';

const NotFound: React.FC = () => {
  const { copy } = useCopy();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-4xl font-bold text-accent mb-4">{copy.placeholders.notFoundHeading}</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{copy.placeholders.notFoundTitle}</h2>
      <p className="text-gray-600 mb-6">{copy.placeholders.notFoundMessage}</p>
      <Link
        to="/"
        className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-colors"
      >
        {copy.placeholders.goHome}
      </Link>
    </div>
  );
};

export default NotFound;

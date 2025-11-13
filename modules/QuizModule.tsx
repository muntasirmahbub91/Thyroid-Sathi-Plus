import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { type ModuleComponent } from '../types';
import { useCopy } from '../context/LanguageContext';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, CrossIcon, RefreshIcon, PhoneIcon } from '../components/icons';

const LOCAL_STORAGE_KEY = 'thyroidQuizState';

// --- SUB-COMPONENTS ---

const SplashScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const { copy } = useCopy();
  return (
    <div className="text-center p-4 flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold text-thy-ink mb-4">{copy.quiz.splashTitle}</h2>
      <p className="text-thy-ink-muted mb-8 max-w-md">{copy.quiz.splashDesc}</p>
      <button
        onClick={onStart}
        className="bg-thy-accent text-white font-bold py-3 px-8 rounded-xl shadow-thy-card hover:bg-thy-accent-strong transition-all transform hover:scale-105"
      >
        {copy.quiz.startQuiz}
      </button>
    </div>
  );
};

const QuestionScreen: React.FC<{
  question: { id: string; text: string };
  index: number;
  totalQuestions: number;
  onAnswer: (answer: boolean) => void;
  onBack: () => void;
  onReset: () => void;
}> = ({ question, index, totalQuestions, onAnswer, onBack, onReset }) => {
  const { copy } = useCopy();
  const progressPercent = ((index + 1) / totalQuestions) * 100;

  return (
    <div className="bg-thy-surface rounded-3xl shadow-thy-card p-4 sm:p-6 flex flex-col min-h-[80vh] border-t-4 border-thy-accent relative overflow-hidden">
      <button
        onClick={onReset}
        className="absolute top-4 right-4 text-thy-ink-muted hover:text-thy-accent transition-colors z-10"
        aria-label={copy.quiz.reset}
      >
        <RefreshIcon className="w-6 h-6" />
      </button>
      
      {/* Progress */}
      <div className="mb-6">
        <p className="text-center text-sm font-medium text-thy-ink-muted mb-2">{copy.quiz.questionLabel(index + 1, totalQuestions)}</p>
        <div className="w-full bg-thy-line rounded-full h-2">
          <div className="bg-thy-accent h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-grow flex items-center justify-between my-4">
        <button
          onClick={onBack}
          disabled={index === 0}
          className="text-gray-300 hover:text-thy-ink-muted disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          aria-label={copy.quiz.back}
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <p className="text-2xl text-center font-semibold text-thy-ink flex-1 mx-2">
          {question.text}
        </p>
        <button className="text-gray-300 cursor-default" aria-hidden="true" tabIndex={-1}>
          <ChevronRightIcon className="w-8 h-8 opacity-0" />
        </button>
      </div>

      {/* Answers */}
      <div className="flex justify-around items-center my-6">
        <button
          onClick={() => onAnswer(false)}
          aria-label={copy.quiz.no}
          className="bg-red-500/10 rounded-full w-28 h-28 flex items-center justify-center shadow-thy-card transition-transform transform hover:scale-105 active:scale-95"
        >
          <CrossIcon className="w-12 h-12 text-red-500" />
        </button>
        <button
          onClick={() => onAnswer(true)}
          aria-label={copy.quiz.yes}
          className="bg-thy-accent-weak rounded-full w-28 h-28 flex items-center justify-center shadow-thy-card transition-transform transform hover:scale-105 active:scale-95"
        >
          <CheckIcon className="w-12 h-12 text-thy-accent-strong" />
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-thy-ink-muted mt-auto">
        {copy.quiz.questionDisclaimer}
      </p>
    </div>
  );
};

const ResultScreen: React.FC<{
  score: number;
  onRestart: () => void;
  onBack: () => void;
}> = ({ score, onRestart, onBack }) => {
  const { copy } = useCopy();
  const { quiz } = copy;
  
  const classification = useMemo(() => {
    if (score >= quiz.thresholds.hyper) return quiz.classifications.hyper;
    if (score <= quiz.thresholds.hypo) return quiz.classifications.hypo;
    return quiz.classifications.mixed;
  }, [score, quiz]);

  const handleHelpClick = () => {
    window.location.href = 'tel:+8801303801712';
  };

  return (
    <div className="p-4 bg-thy-surface rounded-2xl shadow-thy-card animate-fade-in">
       <button
          onClick={onBack}
          className="flex items-center text-thy-ink-muted hover:text-thy-accent transition-colors mb-4"
          aria-label={quiz.back}
        >
          <ChevronLeftIcon className="w-6 h-6 mr-1" />
          <span className="font-semibold">{quiz.back}</span>
        </button>
      <h2 className="text-2xl font-bold text-center text-thy-ink mb-4">{quiz.resultTitle}</h2>
      <div className="bg-thy-accent-weak p-4 rounded-xl text-center mb-6">
        <p className="text-thy-ink-muted font-semibold">{quiz.totalScore}</p>
        <p className="text-4xl font-bold text-thy-accent">{score}</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg text-thy-ink mb-2">{quiz.interpretation}</h3>
        <p className="text-thy-ink-muted">{classification}</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg text-thy-ink mb-2">{quiz.nextSteps}</h3>
        <p className="text-thy-ink-muted">{quiz.nextStepsAdvice}</p>
      </div>
      <div className="bg-yellow-400/10 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-8 rounded-r-lg" role="alert">
         <p className="font-bold">{quiz.disclaimer}</p>
         <p>{quiz.disclaimerText}</p>
      </div>
      <div className="space-y-3">
        <button
          onClick={onRestart}
          className="w-full bg-thy-accent text-white font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-accent-strong transition-all"
        >
          {quiz.restartQuiz}
        </button>
        <button
          onClick={handleHelpClick}
          className="w-full flex items-center justify-center bg-thy-bg text-thy-ink font-bold py-3 px-6 rounded-xl hover:bg-thy-line transition-all"
        >
            <PhoneIcon className="w-5 h-5 mr-2" />
            {quiz.callForHelp}
        </button>
      </div>
    </div>
  );
};


// --- MAIN MODULE COMPONENT ---

const QuizModule: ModuleComponent = () => {
  const { copy } = useCopy();
  const quizData = copy.quiz;

  type QuizState = 'splash' | 'question' | 'result';
  type Answers = Record<string, boolean>;

  const [gameState, setGameState] = useState<QuizState>('splash');
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedState) {
        const { savedAnswers, savedIndex } = JSON.parse(savedState);
        if (savedAnswers && typeof savedIndex === 'number') {
          setAnswers(savedAnswers);
          setCurrentIndex(savedIndex);
          if (savedIndex >= quizData.questions.length) {
            setGameState('result');
          } else if (Object.keys(savedAnswers).length > 0 || savedIndex > 0) {
            setGameState('question');
          }
        }
      }
    } catch (error) {
      console.error("Failed to load quiz state from localStorage", error);
    }
  }, [quizData.questions.length]);

  useEffect(() => {
    try {
      const stateToSave = JSON.stringify({ savedAnswers: answers, savedIndex: currentIndex });
      localStorage.setItem(LOCAL_STORAGE_KEY, stateToSave);
    } catch (error) {
      console.error("Failed to save quiz state to localStorage", error);
    }
  }, [answers, currentIndex]);
  
  const handleStart = useCallback(() => {
    setGameState('question');
  }, []);

  const handleAnswer = useCallback((answer: boolean) => {
    const questionId = quizData.questions[currentIndex].id;
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    if (currentIndex < quizData.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(quizData.questions.length); // Mark as complete
      setGameState('result');
    }
  }, [currentIndex, answers, quizData.questions]);

  const handleBack = useCallback(() => {
    if (gameState === 'result') {
        setCurrentIndex(quizData.questions.length - 1);
        setGameState('question');
    } else if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex, gameState, quizData.questions.length]);

  const handleReset = useCallback(() => {
    if (window.confirm(copy.quiz.resetConfirm)) {
      setAnswers({});
      setCurrentIndex(0);
      setGameState('question');
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [copy.quiz.resetConfirm]);

  const handleRestart = useCallback(() => {
    setAnswers({});
    setCurrentIndex(0);
    setGameState('question');
     localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  const score = useMemo(() => {
    return quizData.questions.reduce((total, question) => {
      if (answers[question.id]) {
        return total + question.weight;
      }
      return total;
    }, 0);
  }, [answers, quizData.questions]);

  const renderContent = () => {
    switch (gameState) {
      case 'question':
        const question = quizData.questions[currentIndex];
        return question ? (
          <QuestionScreen
            question={question}
            index={currentIndex}
            totalQuestions={quizData.questions.length}
            onAnswer={handleAnswer}
            onBack={handleBack}
            onReset={handleReset}
          />
        ) : null; // Should not happen if logic is correct
      case 'result':
        return <ResultScreen score={score} onRestart={handleRestart} onBack={handleBack} />;
      case 'splash':
      default:
        return <SplashScreen onStart={handleStart} />;
    }
  };

  return <div className="container mx-auto max-w-lg p-4">{renderContent()}</div>;
};

export default QuizModule;
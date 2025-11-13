
import React, { useState, useMemo } from 'react';
import { type ModuleComponent } from '../types';
import { useCopy } from '../context/LanguageContext';
import { PhoneIcon, PlayIcon } from '../components/icons';

// --- REFERENCE RANGES (Standard) ---
const referenceRanges = {
  tsh: { min: 0.4, max: 4.5 }, // mIU/L
  ft4: {
    'pmol/L': { min: 12, max: 22 },
    'ng/dL': { min: 0.93, max: 1.7 }
  },
  ft3: {
    'pmol/L': { min: 3.1, max: 6.8 },
    'pg/mL': { min: 2.0, max: 4.4 }
  },
};

type ResultKey = 
  | 'invalid' 
  | 'hypo_overt' 
  | 'hypo_subclinical' 
  | 'hypo_likely' 
  | 'hyper_overt' 
  | 'hyper_overt_t3' 
  | 'hyper_subclinical' 
  | 'hyper_likely' 
  | 'normal_tsh_low_ft4' 
  | 'normal_tsh_high_ft4' 
  | 'euthyroid' 
  | 'error';

interface CalculationResult {
    key: ResultKey;
    headline: string;
    advisory: string;
}

// --- HELP MODAL COMPONENT ---
const HelpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { copy } = useCopy();
    const { helpModal } = copy.calculator;

    return (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-60 animate-fade-in"
          aria-modal="true"
          role="dialog"
        >
            <div className="bg-thy-surface rounded-3xl shadow-thy-emphasis p-6 max-w-sm w-full text-center">
                <h3 className="text-xl font-bold text-thy-ink mb-6">{helpModal.title}</h3>
                <div className="space-y-4">
                    <a
                        href="https://www.youtube.com/@drmuntasirmahbub2385"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full bg-thy-accent text-white font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-accent-strong transition-all"
                    >
                        <PlayIcon className="w-6 h-6 mr-3" />
                        {helpModal.youtube}
                    </a>
                    <a
                        href="tel:+8801303801712"
                        className="flex items-center justify-center w-full bg-thy-accent text-white font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-accent-strong transition-all"
                    >
                        <PhoneIcon className="w-6 h-6 mr-3" />
                        {helpModal.call}
                    </a>
                </div>
                <div className="mt-8">
                    <button
                        onClick={onClose}
                        className="w-full bg-thy-bg text-thy-ink font-bold py-3 px-6 rounded-xl hover:bg-thy-line transition-all"
                    >
                        {helpModal.closeButton}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- UI COMPONENT ---
const CalculatorModule: ModuleComponent = () => {
  const { copy } = useCopy();
  const { calculator: calculatorCopy } = copy;

  const [tsh, setTsh] = useState<string>('');
  const [ft4, setFt4] = useState<string>('');
  const [ft3, setFt3] = useState<string>('');
  const [ft4Unit, setFt4Unit] = useState<'pmol/L' | 'ng/dL'>('pmol/L');
  const [ft3Unit, setFt3Unit] = useState<'pmol/L' | 'pg/mL'>('pmol/L');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // --- DECISION LOGIC ---
  const calculateThyroidStatus = (
      tsh: number | null,
      ft4: number | null,
      ft3: number | null,
      ft4Unit: 'pmol/L' | 'ng/dL',
      ft3Unit: 'pmol/L' | 'pg/mL'
  ): CalculationResult => {
      const { results: resultCopy } = calculatorCopy;
      const ft4Range = referenceRanges.ft4[ft4Unit];
      const ft3Range = referenceRanges.ft3[ft3Unit];

      const createResult = (key: ResultKey): CalculationResult => ({
          key,
          headline: resultCopy[key].headline,
          advisory: resultCopy[key].advisory,
      });

      if (tsh === null || isNaN(tsh)) {
          return createResult('invalid');
      }

      // --- Hypothyroidism Pathway (High TSH) ---
      if (tsh > referenceRanges.tsh.max) {
          if (ft4 !== null && ft4 < ft4Range.min) return createResult('hypo_overt');
          if (ft4 !== null && ft4 >= ft4Range.min && ft4 <= ft4Range.max) return createResult('hypo_subclinical');
          return createResult('hypo_likely'); // Only TSH is high
      }
      
      // --- Hyperthyroidism Pathway (Low TSH) ---
      if (tsh < referenceRanges.tsh.min) {
          if (ft4 !== null && ft4 > ft4Range.max) return createResult('hyper_overt');
          // A low TSH with a low FT4 is a red flag for secondary hypothyroidism
          if (ft4 !== null && ft4 < ft4Range.min) return createResult('normal_tsh_low_ft4');
          // Check for T3 toxicosis if FT4 is normal or not provided
          if (ft3 !== null && ft3 > ft3Range.max) return createResult('hyper_overt_t3');
          // If FT4 and FT3 (if available) are normal, it's subclinical
          const isFt4Normal = ft4 !== null && ft4 >= ft4Range.min && ft4 <= ft4Range.max;
          const isFt3Normal = ft3 !== null && ft3 >= ft3Range.min && ft3 <= ft3Range.max;
          if (isFt4Normal || isFt3Normal) return createResult('hyper_subclinical');
          
          return createResult('hyper_likely'); // Only TSH is low
      }

      // --- Euthyroid / Atypical Pathway (Normal TSH) ---
      if (tsh >= referenceRanges.tsh.min && tsh <= referenceRanges.tsh.max) {
          if (ft4 !== null && ft4 < ft4Range.min) return createResult('normal_tsh_low_ft4');
          if (ft4 !== null && ft4 > ft4Range.max) return createResult('normal_tsh_high_ft4');
          // If FT4 is normal, and FT3 (if present) is also normal, it's euthyroid. An isolated high FT3 is rare but would need investigation.
          return createResult('euthyroid');
      }

      return createResult('error'); // Fallback
  }

  const handleCalculate = () => {
    const tshNum = tsh ? parseFloat(tsh) : null;
    const ft4Num = ft4 ? parseFloat(ft4) : null;
    const ft3Num = ft3 ? parseFloat(ft3) : null;
    const calcResult = calculateThyroidStatus(tshNum, ft4Num, ft3Num, ft4Unit, ft3Unit);
    setResult(calcResult);
  };
  
  const handleReset = () => {
    setTsh('');
    setFt4('');
    setFt3('');
    setResult(null);
    setFt4Unit('pmol/L');
    setFt3Unit('pmol/L');
  }

  const resultDetails = useMemo(() => {
    if (!result) return null;
    const { key } = result;
    
    const hyperKeys = ['hyper_overt', 'hyper_overt_t3', 'hyper_subclinical', 'hyper_likely', 'normal_tsh_high_ft4'];
    const hypoKeys = ['hypo_overt', 'hypo_subclinical', 'hypo_likely', 'normal_tsh_low_ft4'];

    if (hyperKeys.includes(key)) return { icon: '🔥', borderColor: 'border-red-500', textColor: 'text-red-600', nextSteps: calculatorCopy.nextSteps.consultDoctor };
    if (hypoKeys.includes(key)) return { icon: '❄️', borderColor: 'border-blue-500', textColor: 'text-blue-600', nextSteps: calculatorCopy.nextSteps.consultDoctor };
    if (key === 'euthyroid') return { icon: '👍', borderColor: 'border-thy-accent-strong', textColor: 'text-thy-accent-strong', nextSteps: calculatorCopy.nextSteps.followUp };
    return { icon: '⚠️', borderColor: 'border-thy-line', textColor: 'text-thy-ink', nextSteps: null };
  }, [result, calculatorCopy]);

  return (
    <div className="container mx-auto max-w-lg space-y-6 p-4">
      <div className="bg-thy-surface rounded-2xl shadow-thy-card p-6">
        <h2 className="text-xl font-bold text-thy-ink text-center mb-6">{calculatorCopy.title}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="tsh" className="block text-sm font-medium text-thy-ink-muted">
              {calculatorCopy.tshLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="tsh"
              value={tsh}
              onChange={(e) => setTsh(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-thy-surface border border-thy-line rounded-xl shadow-sm focus-ring text-thy-ink"
            />
          </div>
          <div>
            <label htmlFor="ft4" className="block text-sm font-medium text-thy-ink-muted">
              {calculatorCopy.ft4Label}
            </label>
            <div className="mt-1 flex rounded-xl shadow-sm">
                <input
                  type="number"
                  id="ft4"
                  value={ft4}
                  onChange={(e) => setFt4(e.target.value)}
                  className="block w-full px-3 py-2 bg-thy-surface border border-thy-line rounded-l-xl focus-ring text-thy-ink"
                />
                <select
                  aria-label="Free T4 unit"
                  value={ft4Unit}
                  onChange={(e) => setFt4Unit(e.target.value as 'pmol/L' | 'ng/dL')}
                  className="block w-auto pl-3 pr-8 py-2 bg-thy-bg border-y border-r border-thy-line rounded-r-xl focus-ring text-thy-ink-muted text-sm"
                >
                  <option value="pmol/L">pmol/L</option>
                  <option value="ng/dL">ng/dL</option>
                </select>
            </div>
          </div>
          <div>
            <label htmlFor="ft3" className="block text-sm font-medium text-thy-ink-muted">
              {calculatorCopy.ft3Label}
            </label>
             <div className="mt-1 flex rounded-xl shadow-sm">
                <input
                  type="number"
                  id="ft3"
                  value={ft3}
                  onChange={(e) => setFt3(e.target.value)}
                  className="block w-full px-3 py-2 bg-thy-surface border border-thy-line rounded-l-xl focus-ring text-thy-ink"
                />
                <select
                  aria-label="Free T3 unit"
                  value={ft3Unit}
                  onChange={(e) => setFt3Unit(e.target.value as 'pmol/L' | 'pg/mL')}
                  className="block w-auto pl-3 pr-8 py-2 bg-thy-bg border-y border-r border-thy-line rounded-r-xl focus-ring text-thy-ink-muted text-sm"
                >
                  <option value="pmol/L">pmol/L</option>
                  <option value="pg/mL">pg/mL</option>
                </select>
            </div>
          </div>
        </div>
        <div className="mt-8 flex space-x-4">
            <button
                onClick={handleCalculate}
                className="w-full bg-thy-accent text-white font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-accent-strong transition-all disabled:bg-thy-disabled-bg disabled:text-thy-disabled-text disabled:cursor-not-allowed"
                disabled={!tsh}
            >
                {calculatorCopy.calculateButton}
            </button>
            <button
                onClick={handleReset}
                className="w-full bg-thy-bg text-thy-ink font-bold py-3 px-6 rounded-xl hover:bg-thy-line transition-all"
            >
                {calculatorCopy.resetButton}
            </button>
        </div>
      </div>

      {result && resultDetails && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in"
          aria-modal="true"
          role="dialog"
        >
          <div className={`bg-thy-surface rounded-3xl shadow-thy-emphasis p-6 border-l-8 ${resultDetails.borderColor} max-w-md w-full`}>
            <div className="flex items-start mb-3">
              <span className="text-3xl mr-4 mt-1" aria-hidden="true">{resultDetails.icon}</span>
              <div>
                <h3 className={`text-2xl font-bold ${resultDetails.textColor}`}>{result.headline}</h3>
                <p className="text-thy-ink-muted mt-1">{result.advisory}</p>
              </div>
            </div>
            
            {resultDetails.nextSteps && (
              <div className="mt-4 pt-4 border-t border-thy-line">
                <h4 className="font-bold text-thy-ink mb-1">{calculatorCopy.nextStepsTitle}</h4>
                <p className="text-thy-ink-muted">{resultDetails.nextSteps}</p>
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-thy-line">
                <p className="text-xs text-thy-ink-muted">{calculatorCopy.disclaimerTitle}: {calculatorCopy.disclaimerText}</p>
            </div>

            <div className="mt-6 flex space-x-4">
                <button
                    onClick={() => {
                        setResult(null);
                        setIsHelpModalOpen(true);
                    }}
                    className="w-full bg-thy-accent-weak text-thy-accent-strong font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-accent-strong/20 transition-all"
                >
                    {calculatorCopy.helpButton}
                </button>
                <button
                    onClick={handleReset}
                    className="w-full bg-thy-accent-strong text-white font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-accent-strong/90 transition-all"
                >
                    {calculatorCopy.finishButton}
                </button>
            </div>
          </div>
        </div>
      )}

      {isHelpModalOpen && <HelpModal onClose={() => setIsHelpModalOpen(false)} />}
    </div>
  );
};

export default CalculatorModule;

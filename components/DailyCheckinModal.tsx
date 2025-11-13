import React, { useState, useEffect, useMemo } from 'react';
import { useCopy } from '../context/LanguageContext';
import { type DailyLog, type DoseStatus, type DailyFeeling, type Course } from '../modules/database';

const EmojiToggle: React.FC<{ value: DailyFeeling | undefined; onChange: (newValue: DailyFeeling | undefined) => void; }> = ({ value, onChange }) => {
  const handleClick = () => onChange(value === 'happy' ? 'neutral' : value === 'neutral' ? 'sad' : value === 'sad' ? undefined : 'happy');
  const emoji = useMemo(() => (value === 'happy' ? '😊' : value === 'neutral' ? '😐' : value === 'sad' ? '😔' : ''), [value]);
  // Use a placeholder for empty state to make it a clickable area
  const displayContent = emoji || <div className="w-8 h-8"></div>;
  const baseClasses = "w-16 h-16 rounded-2xl flex items-center justify-center text-4xl transition-all duration-200 transform hover:scale-105";
  const selectedClasses = "bg-thy-accent-weak ring-2 ring-thy-accent";
  const unselectedClasses = "bg-thy-bg hover:bg-thy-line";
  
  return <button onClick={handleClick} className={`${baseClasses} ${value ? selectedClasses : unselectedClasses}`}>{displayContent}</button>;
};


interface DailyCheckinModalProps {
  onSave: (log: DailyLog) => void;
  onClose: () => void;
  activeCourse: Course;
}

const DailyCheckinModal: React.FC<DailyCheckinModalProps> = ({ onSave, onClose, activeCourse }) => {
    const { copy } = useCopy();
    const { dailyCheckin: modalCopy, tracker: trackerCopy } = copy;

    const [log, setLog] = useState<DailyLog>({});
    
    useEffect(() => {
        // Pre-fill with today's existing log if any
        const todayKey = new Date().toISOString().split('T')[0];
        if (activeCourse.logs[todayKey]) {
            setLog(activeCourse.logs[todayKey]);
        }
    }, [activeCourse]);

    // FIX: Used generics to create a type-safe relationship between the category and value, resolving the "not assignable to never" error.
    const handleUpdate = <K extends keyof DailyLog>(category: K, value: DailyLog[K]) => {
        const newLog = { ...log };
        if (value === undefined) {
            delete newLog[category];
        } else {
            newLog[category] = value;
        }
        setLog(newLog);
    };

    const handleSave = () => {
        onSave(log);
        onClose();
    };
    
    const DoseButton: React.FC<{ status: DoseStatus | undefined, label: string }> = ({ status, label }) => {
        const isSelected = log.dose === status;
        return (
            <button
                onClick={() => handleUpdate('dose', status)}
                className={`flex-1 py-3 px-4 rounded-xl text-center font-bold transition-all duration-200 transform hover:scale-105 ${
                    isSelected ? 'bg-thy-accent text-white shadow-md' : 'bg-thy-bg text-thy-ink hover:bg-thy-line'
                }`}
            >
                {label}
            </button>
        );
    };


    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-thy-surface rounded-3xl shadow-thy-emphasis max-w-sm w-full m-4 p-6" onClick={e => e.stopPropagation()}>
                
                {/* Medicine Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-thy-ink text-center mb-4">{modalCopy.medicineTitle}</h3>
                    <div className="flex justify-center space-x-3">
                        <DoseButton status="taken" label={modalCopy.yes} />
                        <DoseButton status="skipped" label={modalCopy.no} />
                        <DoseButton status={undefined} label={modalCopy.later} />
                    </div>
                </div>

                {/* Separator */}
                <hr className="border-thy-line my-6"/>

                {/* Feeling Section */}
                <div>
                    <h3 className="text-lg font-bold text-thy-ink text-center mb-4">{modalCopy.feelingTitle}</h3>
                    <div className="flex justify-around items-center">
                        <div className="text-center">
                            <p className="text-sm font-semibold text-thy-ink-muted mb-2">💪 {trackerCopy.bodyHeader}</p>
                            <EmojiToggle value={log.body} onChange={v => handleUpdate('body', v)} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-thy-ink-muted mb-2">🧠 {trackerCopy.mindHeader}</p>
                            <EmojiToggle value={log.mind} onChange={v => handleUpdate('mind', v)} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-thy-ink-muted mb-2">😴 {trackerCopy.sleepHeader}</p>
                            <EmojiToggle value={log.sleep} onChange={v => handleUpdate('sleep', v)} />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button 
                        onClick={handleSave}
                        className="w-full bg-thy-ink text-white font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-ink/90 transition-all"
                    >
                        {modalCopy.saveButton}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DailyCheckinModal;

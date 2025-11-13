
import React, { useEffect, useMemo, useState } from 'react';
import { type ModuleComponent } from '../types';
import { useCopy } from '../context/LanguageContext';
import { PlusIcon, ChevronDownIcon } from '../components/icons';
import { getCourses, saveCourses, getActiveCourseId, saveActiveCourseId, checkConsecutiveSadDaysAndNotify, type Course, type DailyLog, type DoseStatus, type DailyFeeling } from './database';

// --- ICONS ---
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const CrossIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- TOGGLE COMPONENTS ---
const DoseToggle: React.FC<{ value: DoseStatus | undefined; onChange: (newValue: DoseStatus | undefined) => void; }> = ({ value, onChange }) => {
  const handleClick = () => onChange(value === 'taken' ? 'skipped' : value === 'skipped' ? undefined : 'taken');
  const icon = value === 'taken' ? (
    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600" aria-label="Dose taken">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    </div>
  ) : value === 'skipped' ? (
    <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center" aria-label="Dose skipped"><CrossIcon className="w-3 h-3 text-white" /></div>
  ) : <div className="w-7 h-7 rounded-full border-2 border-thy-line bg-thy-bg" aria-label="Dose not logged"></div>;
  return <button onClick={handleClick} className="flex items-center justify-center">{icon}</button>;
};

const EmojiToggle: React.FC<{ value: DailyFeeling | undefined; onChange: (newValue: DailyFeeling | undefined) => void; }> = ({ value, onChange }) => {
  const handleClick = () => onChange(value === 'happy' ? 'neutral' : value === 'neutral' ? 'sad' : value === 'sad' ? undefined : 'happy');
  const emoji = useMemo(() => (value === 'happy' ? '😊' : value === 'neutral' ? '😐' : value === 'sad' ? '😔' : '—'), [value]);
  return <button onClick={handleClick} className="p-1 flex items-center justify-center text-2xl" aria-label={`Current feeling: ${value || 'not set'}. Tap to change.`}>{emoji}</button>;
};

// --- SUB-COMPONENTS ---
const AddCourseForm: React.FC<{ onSave: (data: Omit<Course, 'id' | 'name' | 'logs'>) => void; onCancel: () => void; }> = ({ onSave, onCancel }) => {
  const { copy } = useCopy();
  const { tracker: trackerCopy } = copy;
  const [formData, setFormData] = useState({ 
      startDate: new Date().toISOString().split('T')[0], 
      medicationName: '', 
      medicationDose: '',
      preCourseTsh: '',
      preCourseFt4: '',
      preCourseFt3: '',
  });
  const [isLabsExpanded, setIsLabsExpanded] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleSave = () => {
    if (formData.medicationName && formData.medicationDose) onSave(formData);
    else alert(trackerCopy.fillMedicationAlert);
  };

  return (
    <div className="bg-thy-surface p-4 rounded-2xl shadow-thy-card mb-4 space-y-4 animate-fade-in">
      <h3 className="text-lg font-bold text-thy-ink">{trackerCopy.addNewCourse}</h3>
      <div><label className="text-sm font-medium text-thy-ink-muted">{trackerCopy.startDate}</label><input type="date" value={formData.startDate} onChange={e => handleChange('startDate', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-thy-bg border border-thy-line rounded-xl focus-ring"/></div>
      <div><label className="text-sm font-medium text-thy-ink-muted">{trackerCopy.medication}</label><input type="text" placeholder={trackerCopy.medicationPlaceholder} value={formData.medicationName} onChange={e => handleChange('medicationName', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-thy-bg border border-thy-line rounded-xl focus-ring"/></div>
      <div><label className="text-sm font-medium text-thy-ink-muted">{trackerCopy.dose}</label><input type="text" placeholder={trackerCopy.dosePlaceholder} value={formData.medicationDose} onChange={e => handleChange('medicationDose', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-thy-bg border border-thy-line rounded-xl focus-ring"/></div>
      
      <fieldset className="border-t border-thy-line pt-4">
        <button type="button" onClick={() => setIsLabsExpanded(!isLabsExpanded)} className="w-full flex justify-between items-center">
            <legend className="text-md font-semibold text-thy-ink-muted">{trackerCopy.preCourseLabs}</legend>
            <ChevronDownIcon className={`w-5 h-5 text-thy-ink-muted transition-transform ${isLabsExpanded ? 'rotate-180' : ''}`} />
        </button>
        {isLabsExpanded && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 animate-fade-in">
                <div>
                    <label className="text-xs font-medium text-thy-ink-muted">{trackerCopy.tsh}</label>
                    <input type="number" placeholder={`${copy.tests.eg} 2.5`} value={formData.preCourseTsh} onChange={e => handleChange('preCourseTsh', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-thy-bg border border-thy-line rounded-xl focus-ring"/>
                </div>
                <div>
                    <label className="text-xs font-medium text-thy-ink-muted">{trackerCopy.ft4}</label>
                    <input type="number" placeholder={`${copy.tests.eg} 15`} value={formData.preCourseFt4} onChange={e => handleChange('preCourseFt4', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-thy-bg border border-thy-line rounded-xl focus-ring"/>
                </div>
                <div>
                    <label className="text-xs font-medium text-thy-ink-muted">{trackerCopy.ft3}</label>
                    <input type="number" placeholder={`${copy.tests.eg} 4.2`} value={formData.preCourseFt3} onChange={e => handleChange('preCourseFt3', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-thy-bg border border-thy-line rounded-xl focus-ring"/>
                </div>
            </div>
        )}
      </fieldset>
      
      <div className="flex space-x-3 pt-2"><button onClick={handleSave} className="w-full bg-thy-accent text-white font-bold py-2 px-4 rounded-xl shadow-md hover:bg-thy-accent-strong transition-all">{trackerCopy.saveCourse}</button><button onClick={onCancel} className="w-full bg-thy-bg text-thy-ink font-bold py-2 px-4 rounded-xl hover:bg-thy-line transition-all">{trackerCopy.cancel}</button></div>
    </div>
  );
};

const PastCourseItem: React.FC<{ course: Course; onSelect: (id: number) => void; }> = ({ course, onSelect }) => {
  const { language } = useCopy();
  const formattedDate = new Date(course.startDate).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
  return (
    <button onClick={() => onSelect(course.id)} className="w-full text-left bg-thy-bg p-3 rounded-xl hover:bg-thy-line transition-colors">
      <div className="flex justify-between items-center"><h4 className="font-bold text-thy-ink">{course.name}</h4><span className="text-xs font-medium text-thy-ink-muted">{formattedDate}</span></div>
      <p className="text-sm text-thy-ink-muted">{course.medicationName} - {course.medicationDose}</p>
    </button>
  );
};

// --- MAIN MODULE COMPONENT ---
const TrackerModule: ModuleComponent = () => {
  const { copy, language } = useCopy();
  const { tracker: trackerCopy } = copy;
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  useEffect(() => {
    const loadedCourses = getCourses();
    if (loadedCourses.length > 0) {
      setCourses(loadedCourses);
      const savedActiveId = getActiveCourseId();
      const latestCourse = loadedCourses.sort((a, b) => b.id - a.id)[0];
      setActiveCourseId(loadedCourses.some(c => c.id === savedActiveId) ? savedActiveId : latestCourse.id);
    } else {
      setIsAddingCourse(true); // Prompt to create the first course
    }
  }, []);

  const { activeCourse, inactiveCourses } = useMemo(() => {
    const sorted = [...courses].sort((a, b) => b.id - a.id);
    return {
      activeCourse: sorted.find(c => c.id === activeCourseId) || null,
      inactiveCourses: sorted.filter(c => c.id !== activeCourseId),
    };
  }, [courses, activeCourseId]);

  const handleSaveNewCourse = (data: Omit<Course, 'id' | 'name' | 'logs'>) => {
    const newCourseId = Date.now();
    const newCourse: Course = {
      ...data,
      id: newCourseId,
      name: `${trackerCopy.course} ${courses.length + 1}`,
      logs: {},
    };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    setActiveCourseId(newCourseId);
    saveCourses(updatedCourses);
    saveActiveCourseId(newCourseId);
    setIsAddingCourse(false);
  };

  const handleSelectCourse = (id: number) => {
    setActiveCourseId(id);
    saveActiveCourseId(id);
  };

  const handleLogUpdate = (dateKey: string, category: keyof DailyLog, value: DoseStatus | DailyFeeling | undefined) => {
    if (!activeCourse) return;
    const updatedCourses = courses.map(course =>
      course.id === activeCourseId ? { ...course, logs: { ...course.logs, [dateKey]: { ...(course.logs[dateKey] || {}), [category]: value } } } : course
    );
    // Cleanup empty log entries
    const targetLog = updatedCourses.find(c => c.id === activeCourseId)?.logs[dateKey];
    if (targetLog && value === undefined) delete targetLog[category];
    if (targetLog && Object.keys(targetLog).length === 0) delete updatedCourses.find(c => c.id === activeCourseId)!.logs[dateKey];
    
    setCourses(updatedCourses);
    saveCourses(updatedCourses);
    checkConsecutiveSadDaysAndNotify(dateKey);
  };

  const datesToRender = useMemo(() => {
    if (!activeCourse) return [];
    const dates = [];
    const courseStartDate = new Date(activeCourse.startDate);
    for (let i = 0; i < 30; i++) {
      const date = new Date(courseStartDate);
      date.setDate(courseStartDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, [activeCourse]);

  return (
    <div className="container mx-auto max-w-lg space-y-4">
      {!isAddingCourse && <div className="flex justify-end"><button onClick={() => setIsAddingCourse(true)} className="flex items-center text-sm font-semibold bg-thy-accent-weak text-thy-accent-strong px-3 py-2 rounded-lg hover:bg-thy-accent/20 transition-colors"><PlusIcon className="w-4 h-4 mr-1.5" />{trackerCopy.addNewCourse}</button></div>}
      
      {isAddingCourse && <AddCourseForm onSave={handleSaveNewCourse} onCancel={() => setIsAddingCourse(false)} />}
      
      {!isAddingCourse && inactiveCourses.length > 0 && (
        <div className="space-y-2"><h3 className="font-semibold text-thy-ink-muted px-2">{trackerCopy.pastCourses}</h3>{inactiveCourses.map(course => <PastCourseItem key={course.id} course={course} onSelect={handleSelectCourse} />)}</div>
      )}

      {!isAddingCourse && activeCourse && (
        <div>
          <h3 className="font-semibold text-thy-ink-muted px-2 mb-2">{trackerCopy.currentCourse}</h3>
          <div className="bg-thy-surface p-4 rounded-2xl shadow-thy-card">
            <div className="px-2 pb-2">
                <h4 className="font-bold text-lg text-thy-ink">{activeCourse.name}</h4>
                <p className="text-sm text-thy-ink-muted">{activeCourse.medicationName} - {activeCourse.medicationDose}</p>
                { (activeCourse.preCourseTsh || activeCourse.preCourseFt4 || activeCourse.preCourseFt3) &&
                    <p className="text-xs text-thy-accent-strong font-semibold mt-1">
                    {[
                        activeCourse.preCourseTsh && `TSH: ${activeCourse.preCourseTsh}`,
                        activeCourse.preCourseFt4 && `FT4: ${activeCourse.preCourseFt4}`,
                        activeCourse.preCourseFt3 && `FT3: ${activeCourse.preCourseFt3}`,
                    ].filter(Boolean).join(' • ')}
                    </p>
                }
            </div>
            <div className="grid grid-cols-5 gap-2 text-center text-xs font-bold text-thy-ink-muted px-2 py-2 border-y border-thy-line mt-2"><div className="text-left">{trackerCopy.dateHeader}</div><div>{trackerCopy.doseHeader}</div><div>{trackerCopy.bodyHeader}</div><div>{trackerCopy.mindHeader}</div><div>{trackerCopy.sleepHeader}</div></div>
            <div className="max-h-[50vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              {datesToRender.map(date => {
                const dateKey = date.toISOString().split('T')[0];
                const dayLog = activeCourse.logs[dateKey] || {};
                const formattedDate = date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', { day: '2-digit', month: 'short' });
                return (
                  <div key={dateKey} className="grid grid-cols-5 gap-2 items-center py-1.5 px-2 border-b border-thy-line last:border-b-0">
                    <div className="text-sm font-medium text-thy-ink text-left">{formattedDate}</div>
                    <div className="flex justify-center"><DoseToggle value={dayLog.dose} onChange={v => handleLogUpdate(dateKey, 'dose', v)} /></div>
                    <div className="flex justify-center"><EmojiToggle value={dayLog.body} onChange={v => handleLogUpdate(dateKey, 'body', v)} /></div>
                    <div className="flex justify-center"><EmojiToggle value={dayLog.mind} onChange={v => handleLogUpdate(dateKey, 'mind', v)} /></div>
                    <div className="flex justify-center"><EmojiToggle value={dayLog.sleep} onChange={v => handleLogUpdate(dateKey, 'sleep', v)} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {courses.length === 0 && !isAddingCourse && (
          <div className="text-center py-10 text-thy-ink-muted"><p>{trackerCopy.noCoursesPlaceholder}</p></div>
      )}
    </div>
  );
};

export default TrackerModule;

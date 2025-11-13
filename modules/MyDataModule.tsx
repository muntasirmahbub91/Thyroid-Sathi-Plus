import React, { useState, useEffect, useMemo } from 'react';
import { type ModuleComponent } from '../types';
import { useCopy } from '../context/LanguageContext';
import { getCourses, type Course } from './database';
import { ChevronDownIcon } from '../components/icons';

// --- VISUALIZATION COMPONENTS ---

const DonutChart: React.FC<{ percentage: number; copy: { taken: string } }> = ({ percentage, copy }) => {
  const radius = 45;
  const stroke = 9;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg height="100" width="100" viewBox="0 0 100 100" className="-rotate-90">
        <circle stroke="#E7E5E4" cx="50" cy="50" r={normalizedRadius} strokeWidth={stroke} fill="transparent" />
        <circle
          stroke="#6FAFA6"
          cx="50" cy="50"
          r={normalizedRadius}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-2xl font-bold text-thy-ink">{Math.round(percentage)}%</span>
        <p className="text-xs text-thy-ink-muted">{copy.taken}</p>
      </div>
    </div>
  );
};

const WellbeingBar: React.FC<{ happy: number; neutral: number; sad: number }> = ({ happy, neutral, sad }) => {
  const total = happy + neutral + sad;
  if (total === 0) return <div className="h-4 bg-thy-line rounded-full w-full"></div>;
  const happyPercent = (happy / total) * 100;
  const neutralPercent = (neutral / total) * 100;

  return (
    <div className="flex w-full h-4 rounded-full overflow-hidden bg-thy-line">
      <div className="bg-green-500" style={{ width: `${happyPercent}%` }} title={`Happy: ${happy} days`}></div>
      <div className="bg-yellow-400" style={{ width: `${neutralPercent}%` }} title={`Neutral: ${neutral} days`}></div>
      <div className="bg-red-400 flex-grow" title={`Sad: ${sad} days`}></div>
    </div>
  );
};

interface CourseSummaryCardProps {
    course: Course;
    copy: any;
    trackerCopy: any;
    isExpanded: boolean;
    onToggle: () => void;
}

const CourseSummaryCard: React.FC<CourseSummaryCardProps> = ({ course, copy, trackerCopy, isExpanded, onToggle }) => {
    const { logs } = course;
    const logKeys = Object.keys(logs);
    const { language } = useCopy();

    const doseStats = useMemo(() => {
        const stats = { taken: 0, skipped: 0 };
        logKeys.forEach(key => {
            if (logs[key]?.dose === 'taken') stats.taken++;
            if (logs[key]?.dose === 'skipped') stats.skipped++;
        });
        return stats;
    }, [logs]);

    const wellbeingStats = useMemo(() => {
        const stats = {
            body: { happy: 0, neutral: 0, sad: 0 },
            mind: { happy: 0, neutral: 0, sad: 0 },
            sleep: { happy: 0, neutral: 0, sad: 0 },
        };
        logKeys.forEach(key => {
            const log = logs[key];
            if (log?.body) stats.body[log.body]++;
            if (log?.mind) stats.mind[log.mind]++;
            if (log?.sleep) stats.sleep[log.sleep]++;
        });
        return stats;
    }, [logs]);

    const totalDoseLogs = doseStats.taken + doseStats.skipped;
    const adherencePercentage = totalDoseLogs > 0 ? (doseStats.taken / totalDoseLogs) * 100 : 0;
    const hasLogs = logKeys.length > 0;
    const formattedDate = new Date(course.startDate).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', { year: 'numeric', month: 'short' });

    return (
        <div className="bg-thy-surface rounded-2xl shadow-thy-card overflow-hidden">
             <button
                onClick={onToggle}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-thy-bg transition-colors"
                aria-expanded={isExpanded}
            >
                <div>
                    <h3 className="text-lg font-bold text-thy-ink">{course.name} <span className="text-sm font-normal text-thy-ink-muted">({formattedDate})</span></h3>
                    <p className="text-sm text-thy-ink-muted">{course.medicationName} - {course.medicationDose}</p>
                    { (course.preCourseTsh || course.preCourseFt4 || course.preCourseFt3) &&
                        <p className="text-xs text-thy-accent-strong font-semibold mt-1">
                        {[
                            course.preCourseTsh && `TSH: ${course.preCourseTsh}`,
                            course.preCourseFt4 && `FT4: ${course.preCourseFt4}`,
                            course.preCourseFt3 && `FT3: ${course.preCourseFt3}`,
                        ].filter(Boolean).join(' • ')}
                        </p>
                    }
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-thy-ink-muted transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isExpanded && (
                <div className="p-4 pt-0 animate-fade-in">
                    {hasLogs ? (
                        <div className="space-y-4">
                            {/* Dose Adherence */}
                            <div className="text-center border-t border-thy-line pt-4">
                                <h4 className="font-bold text-thy-ink mb-2">{copy.doseAdherence}</h4>
                                <div className="flex items-center justify-center space-x-6">
                                    <DonutChart percentage={adherencePercentage} copy={copy} />
                                    <div className="text-left space-y-1">
                                        <p className="font-semibold text-thy-ink text-sm"> <span className="inline-block w-3 h-3 rounded-full bg-thy-accent mr-2"></span> {doseStats.taken} {copy.taken}</p>
                                        <p className="font-semibold text-thy-ink text-sm"> <span className="inline-block w-3 h-3 rounded-full bg-thy-line mr-2"></span> {doseStats.skipped} {copy.skipped}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Wellbeing */}
                            <div className="border-t border-thy-line pt-4">
                                <h4 className="font-bold text-thy-ink mb-3 text-center">{copy.wellbeingOverview}</h4>
                                <div className="space-y-4">
                                    {[
                                        { label: trackerCopy.bodyHeader, stats: wellbeingStats.body, icon: '💪' },
                                        { label: trackerCopy.mindHeader, stats: wellbeingStats.mind, icon: '🧠' },
                                        { label: trackerCopy.sleepHeader, stats: wellbeingStats.sleep, icon: '😴' },
                                    ].map(item => (
                                        <div key={item.label}>
                                            <div className="flex justify-between items-center mb-1.5 px-1">
                                                <span className="text-sm font-bold text-thy-ink">{item.icon} {item.label}</span>
                                                <div className="text-xs text-thy-ink-muted space-x-2">
                                                    <span>😊{item.stats.happy}</span>
                                                    <span>😐{item.stats.neutral}</span>
                                                    <span>😔{item.stats.sad}</span>
                                                </div>
                                            </div>
                                            <WellbeingBar {...item.stats} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-thy-ink-muted py-4 border-t border-thy-line">{copy.noDataForCourse}</p>
                    )}
                </div>
            )}
        </div>
    );
};


// --- MAIN MODULE COMPONENT ---
const MyDataModule: ModuleComponent = () => {
  const { copy } = useCopy();
  const { data: dataCopy, tracker: trackerCopy } = copy;
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [expandedCourseId, setExpandedCourseId] = useState<number | null>(null);

  useEffect(() => {
    const loadedCourses = getCourses();
    const sorted = [...loadedCourses].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    setCourses(sorted);
    // Expand the first (most recent) course by default
    if (sorted.length > 0) {
        setExpandedCourseId(sorted[0].id);
    }
  }, []);

  const handleToggleCourse = (id: number) => {
    setExpandedCourseId(prevId => (prevId === id ? null : id));
  };
  
  return (
    <div className="container mx-auto max-w-lg space-y-4">
      {courses.length > 0 ? (
        <>
            <h2 className="text-xl font-bold text-thy-ink px-2">{dataCopy.courseSummaries}</h2>
            <div className="space-y-4">
                {courses.map(course => 
                    <CourseSummaryCard 
                        key={course.id} 
                        course={course} 
                        copy={dataCopy} 
                        trackerCopy={trackerCopy}
                        isExpanded={expandedCourseId === course.id}
                        onToggle={() => handleToggleCourse(course.id)} 
                    />
                )}
            </div>
        </>
      ) : (
        <div className="text-center pt-20">
            <h3 className="text-xl font-bold text-thy-ink">{dataCopy.noCoursesTitle}</h3>
            <p className="text-thy-ink-muted mt-2 max-w-xs mx-auto">{dataCopy.noCoursesMessage}</p>
        </div>
      )}
    </div>
  );
};

export default MyDataModule;
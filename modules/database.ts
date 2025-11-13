// --- TYPE DEFINITIONS ---
export type DoseStatus = 'taken' | 'skipped';
export type DailyFeeling = 'happy' | 'neutral' | 'sad';

export interface DailyLog {
  dose?: DoseStatus;
  body?: DailyFeeling;
  mind?: DailyFeeling;
  sleep?: DailyFeeling;
}

export interface Course {
  id: number;
  name: string;
  startDate: string; // YYYY-MM-DD
  medicationName: string;
  medicationDose: string;
  logs: Record<string, DailyLog>;
  preCourseTsh?: string;
  preCourseFt4?: string;
  preCourseFt3?: string;
}

export interface LabReport {
    id: number;
    date: string; // YYYY-MM-DD
    weight: string;
    tsh: string;
    ft4: string;
    ft3: string;
    cbc: string;
    creatinine: string;
    hba1c: string;
    rbs: string;
    calcium: string;
    vitaminD: string;
    pth: string;
}

const TRACKER_COURSES_KEY = 'thyroidTrackerCourses';
const ACTIVE_COURSE_ID_KEY = 'thyroidTrackerActiveCourseId';
const LAB_REPORTS_KEY = 'thyroidLabReports';
const LAST_NOTIFIED_STREAK_START_KEY = 'lastNotifiedStreakStartDate';

// --- Courses ---
export function getCourses(): Course[] {
  try {
    const savedCourses = localStorage.getItem(TRACKER_COURSES_KEY);
    return savedCourses ? JSON.parse(savedCourses) : [];
  } catch (e) {
    console.error("Failed to get courses from localStorage", e);
    return [];
  }
}

export function saveCourses(courses: Course[]): void {
  try {
    localStorage.setItem(TRACKER_COURSES_KEY, JSON.stringify(courses));
  } catch (e) {
    console.error("Failed to save courses to localStorage", e);
  }
}

// --- Active Course ID ---
export function getActiveCourseId(): number | null {
  try {
    const savedActiveId = localStorage.getItem(ACTIVE_COURSE_ID_KEY);
    return savedActiveId ? Number(savedActiveId) : null;
  } catch (e) {
    console.error("Failed to get active course ID from localStorage", e);
    return null;
  }
}

export function saveActiveCourseId(id: number): void {
  try {
    localStorage.setItem(ACTIVE_COURSE_ID_KEY, String(id));
  } catch (e) {
    console.error("Failed to save active course ID to localStorage", e);
  }
}

// --- Daily Log Helper ---
export function updateTodaysLogForActiveCourse(log: DailyLog): void {
    const courses = getCourses();
    const activeId = getActiveCourseId();
    if (!activeId) return;

    const todayKey = new Date().toISOString().split('T')[0];

    const updatedCourses = courses.map(course => {
        if (course.id === activeId) {
            const newLog = { ...course.logs[todayKey], ...log };
            // clean up empty log
            if (Object.keys(newLog).length === 0) {
                 const newLogs = { ...course.logs };
                 delete newLogs[todayKey];
                 return { ...course, logs: newLogs };
            }
            return { ...course, logs: { ...course.logs, [todayKey]: newLog } };
        }
        return course;
    });

    saveCourses(updatedCourses);
}

// --- Lab Reports ---
export function getLabReports(): LabReport[] {
    try {
        const savedReports = localStorage.getItem(LAB_REPORTS_KEY);
        return savedReports ? JSON.parse(savedReports) : [];
    } catch (e) {
        console.error("Failed to get lab reports from localStorage", e);
        return [];
    }
}

export function saveLabReports(reports: LabReport[]): void {
    try {
        localStorage.setItem(LAB_REPORTS_KEY, JSON.stringify(reports));
    } catch (e) {
        console.error("Failed to save lab reports to localStorage", e);
    }
}

// --- Concern Modal Logic ---
export function checkConsecutiveSadDaysAndNotify(updatedDateKey?: string): void {
    const courses = getCourses();
    const activeId = getActiveCourseId();
    const activeCourse = courses.find(c => c.id === activeId);

    if (!activeCourse) return;

    const isSad = (log?: DailyLog) => log && (log.body === 'sad' || log.mind === 'sad' || log.sleep === 'sad');

    const referenceDate = updatedDateKey 
        ? new Date(
            parseInt(updatedDateKey.substring(0, 4)),
            parseInt(updatedDateKey.substring(5, 7)) - 1,
            parseInt(updatedDateKey.substring(8, 10))
          )
        : new Date();
    
    referenceDate.setHours(12, 0, 0, 0);

    const d0 = new Date(referenceDate);
    const d1 = new Date(referenceDate); d1.setDate(d1.getDate() - 1);
    const d2 = new Date(referenceDate); d2.setDate(d2.getDate() - 2);
    const d3 = new Date(referenceDate); d3.setDate(d3.getDate() - 3);

    const key_d0 = d0.toISOString().split('T')[0];
    const key_d1 = d1.toISOString().split('T')[0];
    const key_d2 = d2.toISOString().split('T')[0];
    const key_d3 = d3.toISOString().split('T')[0];

    const log_d0 = activeCourse.logs[key_d0];
    const log_d1 = activeCourse.logs[key_d1];
    const log_d2 = activeCourse.logs[key_d2];
    const log_d3 = activeCourse.logs[key_d3];

    // Trigger ONLY on the 3rd day of a new streak.
    // Condition: The last 3 days were sad, but the 4th day back was not.
    if (isSad(log_d0) && isSad(log_d1) && isSad(log_d2) && !isSad(log_d3)) {
        const streakStartDateKey = key_d2;
        const lastNotifiedStreakStart = localStorage.getItem(LAST_NOTIFIED_STREAK_START_KEY);

        // Only show the modal if we haven't already notified for this specific streak.
        if (lastNotifiedStreakStart !== streakStartDateKey) {
            window.dispatchEvent(new CustomEvent('showConcernModal'));
            localStorage.setItem(LAST_NOTIFIED_STREAK_START_KEY, streakStartDateKey);
        }
    }
}

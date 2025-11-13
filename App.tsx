
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppConfigProvider } from './context/AppContext';
import { ProfileProvider } from './context/ProfileContext';
import { LanguageProvider, useCopy } from './context/LanguageContext';
import { getCourses, getActiveCourseId, updateTodaysLogForActiveCourse, checkConsecutiveSadDaysAndNotify, type Course, type DailyLog } from './modules/database';
import DailyCheckinModal from './components/DailyCheckinModal';
import InactivityModal from './components/InactivityModal';
import ConcernModal from './components/ConcernModal';
import ChatMessageModal from './components/ChatMessageModal';

// Import the module registry to ensure modules are registered on app start.
import './modules/index';

import Layout from './components/Layout';
import Home from './routes/Home';
import Quiz from './routes/Quiz';
import Calculator from './routes/Calculator';
import FoodGuide from './routes/FoodGuide';
import DoseDoctor from './routes/DoseDoctor';
import ThyroidGuide from './routes/ThyroidGuide';
import Settings from './routes/Settings';
import Profile from './routes/Profile';
import Tracker from './routes/Tracker';
import MyData from './routes/MyData';
import Tests from './routes/Tests';
import NotFound from './routes/NotFound';

const AppContent: React.FC = () => {
  const { copy } = useCopy();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [splashOpacity, setSplashOpacity] = useState('opacity-0');
  
  const [isCheckinModalVisible, setIsCheckinModalVisible] = useState(false);
  const [isInactivityModalVisible, setIsInactivityModalVisible] = useState(false);
  const [isConcernModalVisible, setIsConcernModalVisible] = useState(false);
  const [activeCourseForModal, setActiveCourseForModal] = useState<Course | null>(null);
  const [isChatMessageModalVisible, setIsChatMessageModalVisible] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    // Splash screen logic
    const fadeInTimer = setTimeout(() => setSplashOpacity('opacity-100'), 100);
    const fadeOutTimer = setTimeout(() => setSplashOpacity('opacity-0'), 3500); // Extended by 2s
    const visibilityTimer = setTimeout(() => setIsSplashVisible(false), 4000); // Extended by 2s

    // Inactivity and Daily check-in modal logic
    const mainAppLogicTimeout = setTimeout(() => {
      try {
        const today = new Date();
        const todayKey = today.toISOString().split('T')[0];
        const lastVisitKey = localStorage.getItem('lastVisitDate');

        let showInactivity = false;
        if (lastVisitKey) {
            const lastVisitDate = new Date(lastVisitKey);
            const diffTime = today.getTime() - lastVisitDate.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays >= 3) {
                showInactivity = true;
            }
        }
        
        // Always set the last visit date to today after checking
        localStorage.setItem('lastVisitDate', todayKey);

        if (showInactivity) {
            setIsInactivityModalVisible(true);
        } else {
            // Only check for daily check-in if inactivity modal is not shown
            triggerDailyCheckin(true); // Call with 'onlyIfNotDoneToday' flag
        }
      } catch (e) {
          console.warn("Could not access localStorage for daily/inactivity check:", e);
      }
    }, 7000); // Show 3 seconds after splash screen (4s splash + 3s delay)

    // Chat message modal logic
    const chatModalTimeout = setTimeout(() => {
        try {
            const hasSeenMessage = sessionStorage.getItem('sessionChatMessageShown');
            if (hasSeenMessage) {
                return;
            }

            const messages = copy.chatMessages;
            if (messages && messages.length > 0) {
                const randomIndex = Math.floor(Math.random() * messages.length);
                setChatMessage(messages[randomIndex]);
                setIsChatMessageModalVisible(true);
            }
        } catch (e) {
            console.warn("Could not access sessionStorage for chat message check:", e);
        }
    }, 30000); // Show after 30 seconds

    // Event listeners for debug triggers
    const showConcernModal = () => setIsConcernModalVisible(true);
    const showInactivityModal = () => setIsInactivityModalVisible(true);
    const showDailyCheckinModal = () => triggerDailyCheckin(false); // Call without flag for forced trigger

    window.addEventListener('showConcernModal', showConcernModal);
    window.addEventListener('showInactivityModal', showInactivityModal);
    window.addEventListener('showDailyCheckinModal', showDailyCheckinModal);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(visibilityTimer);
      clearTimeout(mainAppLogicTimeout);
      clearTimeout(chatModalTimeout);
      window.removeEventListener('showConcernModal', showConcernModal);
      window.removeEventListener('showInactivityModal', showInactivityModal);
      window.removeEventListener('showDailyCheckinModal', showDailyCheckinModal);
    };
  }, [copy.chatMessages]);
  
  const triggerDailyCheckin = (onlyIfNotDoneToday: boolean) => {
      try {
          const todayKey = new Date().toISOString().split('T')[0];
          if (onlyIfNotDoneToday) {
              const lastCheckinDate = localStorage.getItem('lastDailyCheckin');
              if (lastCheckinDate === todayKey) return;
          }

          const courses = getCourses();
          const activeId = getActiveCourseId();
          let activeCourse: Course | undefined | null = courses.find(c => c.id === activeId);
          
          if (!activeCourse && !onlyIfNotDoneToday) {
              activeCourse = {
                  id: 0,
                  name: "Preview Course",
                  startDate: new Date().toISOString().split('T')[0],
                  medicationName: 'Thyroxine',
                  medicationDose: '100mcg',
                  logs: {}
              };
          }
          
          if (activeCourse) {
              setActiveCourseForModal(activeCourse);
              setIsCheckinModalVisible(true);
          } else if (!onlyIfNotDoneToday) {
              alert(copy.app.noActiveCourseAlert);
          }
      } catch (e) {
          console.warn("Could not trigger daily check-in:", e);
      }
  };

  const handleSaveCheckin = (log: DailyLog) => {
    updateTodaysLogForActiveCourse(log);
    checkConsecutiveSadDaysAndNotify();
  };
  
  const handleCloseCheckin = () => {
    try {
      localStorage.setItem('lastDailyCheckin', new Date().toISOString().split('T')[0]);
    } catch(e) {
      console.warn("Could not access localStorage to set daily check-in date:", e);
    }
    setIsCheckinModalVisible(false);
  }

  const handleCloseInactivityModal = () => {
      setIsInactivityModalVisible(false);
  };

  const handleCloseChatMessage = () => {
      try {
          sessionStorage.setItem('sessionChatMessageShown', 'true');
      } catch (e) {
          console.warn("Could not access sessionStorage to set chat message flag:", e);
      }
      setIsChatMessageModalVisible(false);
  };

  const handleCallFromChat = () => {
      window.location.href = 'tel:+8801303801712';
  };

  return (
    <>
      {isSplashVisible && (
        <div
          className={`fixed inset-0 z-50 bg-thy-bg transition-opacity duration-500 ease-in-out flex items-center justify-center ${splashOpacity}`}
          aria-hidden="true"
        >
          <div className="text-center p-4">
              <img 
                src="/images/doctor-splash.png" 
                alt="Friendly Doctor Icon" 
                className="w-32 h-32 mx-auto mb-6 rounded-full bg-thy-accent-weak border-4 border-white object-cover shadow-lg" 
              />
              <h1 className="font-hind-siliguri font-bold text-thy-ink text-5xl">{copy.app.splashTitle}</h1>
              <p className="font-hind-siliguri text-thy-ink-muted text-xl mt-2">{copy.app.splashTagline}</p>
          </div>
        </div>
      )}
      
      {isInactivityModalVisible && (
          <InactivityModal onClose={handleCloseInactivityModal} />
      )}

      {isConcernModalVisible && (
          <ConcernModal onClose={() => setIsConcernModalVisible(false)} />
      )}
      
      {isCheckinModalVisible && activeCourseForModal && (
          <DailyCheckinModal 
              onSave={handleSaveCheckin}
              onClose={handleCloseCheckin}
              activeCourse={activeCourseForModal}
          />
      )}

      {isChatMessageModalVisible && chatMessage && (
          <ChatMessageModal 
              message={chatMessage}
              onClose={handleCloseChatMessage}
              onCall={handleCallFromChat}
          />
      )}

      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tracker" element={<Tracker />} />
            <Route path="data" element={<MyData />} />
            <Route path="tests" element={<Tests />} />
            <Route path="profile" element={<Profile />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="food" element={<FoodGuide />} />
            <Route path="dose-doctor" element={<DoseDoctor />} />
            <Route path="guide" element={<ThyroidGuide />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  );
}

const App: React.FC = () => {
  return (
    <AppConfigProvider>
      <ProfileProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ProfileProvider>
    </AppConfigProvider>
  );
};

export default App;

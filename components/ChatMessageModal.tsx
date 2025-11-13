import React from 'react';
import { PhoneIcon, CrossIcon } from './icons';

interface ChatMessageModalProps {
  message: string;
  onClose: () => void;
  onCall: () => void;
}

const ChatMessageModal: React.FC<ChatMessageModalProps> = ({ message, onClose, onCall }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 pointer-events-none animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div className="fixed bottom-24 left-4 max-w-sm w-full pointer-events-auto">
        <div className="flex items-end space-x-3">
          {/* Chat Head */}
          <div className="flex-shrink-0">
            <img 
              src="/images/placeholder-chat-head.png" 
              alt="Doctor" 
              className="w-16 h-16 rounded-2xl bg-thy-accent-weak border-4 border-white object-cover shadow-thy-emphasis"
            />
          </div>

          {/* Message and Buttons */}
          <div className="flex-grow">
            {/* Speech Bubble */}
            <div className="relative bg-thy-surface p-4 rounded-2xl rounded-bl-none shadow-thy-emphasis mb-2">
              <p className="text-thy-ink">{message}</p>
              {/* Speech bubble tail */}
              <div className="absolute left-0 bottom-0 transform translate-y-full -translate-x-full">
                  <div className="w-4 h-4 bg-thy-surface" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button 
                onClick={onClose}
                aria-label="Close message"
                className="bg-thy-accent-strong text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-md hover:bg-opacity-80 transition-all"
              >
                <CrossIcon className="w-5 h-5" />
              </button>
              <button
                onClick={onCall}
                aria-label="Call for help"
                className="bg-thy-accent-strong text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-md hover:bg-opacity-80 transition-all"
              >
                <PhoneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageModal;
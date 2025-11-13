import React, { useState, useEffect } from 'react';
import { useCopy } from '../context/LanguageContext';
import { ExclamationIcon, PhoneIcon } from './icons';

interface ConcernModalProps {
  onClose: () => void;
}

const ConcernModal: React.FC<ConcernModalProps> = ({ onClose }) => {
    const { copy } = useCopy();
    const { concernModal: modalCopy } = copy;
    
    const [randomMessage, setRandomMessage] = useState('');

    useEffect(() => {
        const messages = modalCopy.messages;
        const randomIndex = Math.floor(Math.random() * messages.length);
        setRandomMessage(messages[randomIndex]);
    }, [modalCopy.messages]);

    const handleDoctorClick = () => {
        window.location.href = 'tel:+8801303801712';
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-thy-surface rounded-3xl shadow-thy-emphasis max-w-sm w-full m-4 p-6 text-center" onClick={e => e.stopPropagation()}>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-400/20 mb-4">
                    <ExclamationIcon className="h-6 w-6 text-yellow-600" />
                </div>
                
                <h3 className="text-lg font-bold text-thy-ink mb-2">{modalCopy.title}</h3>
                <p className="text-thy-ink-muted mb-6">{randomMessage}</p>

                <div className="space-y-3">
                    <button 
                        onClick={onClose}
                        className="w-full bg-thy-accent text-white font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-accent-strong transition-all"
                    >
                        {modalCopy.betterButton}
                    </button>
                    <button
                        onClick={handleDoctorClick}
                        className="w-full flex items-center justify-center bg-thy-bg text-thy-ink font-bold py-3 px-6 rounded-xl hover:bg-thy-line transition-all"
                    >
                        <PhoneIcon className="w-5 h-5 mr-2" />
                        {modalCopy.doctorButton}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConcernModal;
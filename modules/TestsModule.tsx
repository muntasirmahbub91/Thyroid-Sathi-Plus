import React, { useState, useEffect } from 'react';
import { type ModuleComponent } from '../types';
import { useCopy } from '../context/LanguageContext';
import { getLabReports, saveLabReports, type LabReport } from './database';
import { PlusIcon, TrashIcon, ChevronDownIcon } from '../components/icons';

// --- SUB-COMPONENTS ---

interface InputProps {
    label: string; id: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string; type?: string;
}
const Input: React.FC<InputProps> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-thy-ink-muted">{label}</label>
        <input id={id} {...props} className="mt-1 block w-full px-3 py-2 bg-thy-bg border border-thy-line rounded-xl shadow-sm focus-ring text-thy-ink" />
    </div>
);

const AddReportModal: React.FC<{ onSave: (report: Omit<LabReport, 'id'>) => void; onClose: () => void; }> = ({ onSave, onClose }) => {
    const { copy } = useCopy();
    const { tests: testsCopy } = copy;
    
    const initialFormState = {
        date: new Date().toISOString().split('T')[0], weight: '', tsh: '', ft4: '', ft3: '',
        cbc: '', creatinine: '', hba1c: '', rbs: '', calcium: '', vitaminD: '', pth: '',
    };
    const [formData, setFormData] = useState(initialFormState);
    const [showOtherTests, setShowOtherTests] = useState(false);
    
    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-thy-surface rounded-3xl shadow-thy-emphasis max-w-md w-full m-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-thy-ink text-center mb-6">{testsCopy.addNewLogTitle}</h2>
                    <div className="space-y-4">
                        <Input label={testsCopy.date} id="date" type="date" value={formData.date} onChange={e => handleChange('date', e.target.value)} />
                        <Input label={testsCopy.weight} id="weight" type="number" placeholder={`${testsCopy.eg} 70`} value={formData.weight} onChange={e => handleChange('weight', e.target.value)} />
                        
                        <fieldset className="border-t border-thy-line pt-4">
                            <legend className="text-lg font-semibold text-thy-ink mb-2">{testsCopy.thyroidTests}</legend>
                            <Input label={testsCopy.tsh} id="tsh" type="number" placeholder={`${testsCopy.eg} 2.5`} value={formData.tsh} onChange={e => handleChange('tsh', e.target.value)} />
                            <Input label={testsCopy.ft4} id="ft4" type="number" placeholder={`${testsCopy.eg} 15`} value={formData.ft4} onChange={e => handleChange('ft4', e.target.value)} />
                            <Input label={testsCopy.ft3} id="ft3" type="number" placeholder={`${testsCopy.eg} 4.2`} value={formData.ft3} onChange={e => handleChange('ft3', e.target.value)} />
                        </fieldset>

                        <fieldset className="border-t border-thy-line pt-4">
                            <button onClick={() => setShowOtherTests(!showOtherTests)} className="w-full flex justify-between items-center text-lg font-semibold text-thy-ink">
                                {testsCopy.otherTests}
                                <ChevronDownIcon className={`w-5 h-5 transition-transform ${showOtherTests ? 'rotate-180' : ''}`} />
                            </button>
                            {showOtherTests && (
                                <div className="space-y-4 mt-4 animate-fade-in">
                                    <Input label={testsCopy.cbc} id="cbc" type="text" value={formData.cbc} onChange={e => handleChange('cbc', e.target.value)} />
                                    <Input label={testsCopy.creatinine} id="creatinine" type="text" value={formData.creatinine} onChange={e => handleChange('creatinine', e.target.value)} />
                                    <Input label={testsCopy.hba1c} id="hba1c" type="text" value={formData.hba1c} onChange={e => handleChange('hba1c', e.target.value)} />
                                    <Input label={testsCopy.rbs} id="rbs" type="text" value={formData.rbs} onChange={e => handleChange('rbs', e.target.value)} />
                                    <Input label={testsCopy.calcium} id="calcium" type="text" value={formData.calcium} onChange={e => handleChange('calcium', e.target.value)} />
                                    <Input label={testsCopy.vitaminD} id="vitaminD" type="text" value={formData.vitaminD} onChange={e => handleChange('vitaminD', e.target.value)} />
                                    <Input label={testsCopy.pth} id="pth" type="text" value={formData.pth} onChange={e => handleChange('pth', e.target.value)} />
                                </div>
                            )}
                        </fieldset>

                        <div className="pt-4">
                            <button onClick={handleSave} className="w-full bg-thy-accent text-white font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-accent-strong transition-all">{testsCopy.save}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReportListItem: React.FC<{ report: LabReport; onDelete: (id: number) => void; copy: any; }> = ({ report, onDelete, copy }) => {
    const { language } = useCopy();
    const formattedDate = new Date(report.date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    const fields = [
        { label: copy.weight, value: report.weight, unit: 'kg' },
        { label: copy.tsh, value: report.tsh, unit: '' },
        { label: copy.ft4, value: report.ft4, unit: '' },
        { label: copy.ft3, value: report.ft3, unit: '' },
        { label: copy.cbc, value: report.cbc, unit: '' },
        { label: copy.creatinine, value: report.creatinine, unit: '' },
        { label: copy.hba1c, value: report.hba1c, unit: '' },
        { label: copy.rbs, value: report.rbs, unit: '' },
        { label: copy.calcium, value: report.calcium, unit: '' },
        { label: copy.vitaminD, value: report.vitaminD, unit: '' },
        { label: copy.pth, value: report.pth, unit: '' },
    ].filter(field => field.value);

    return (
        <div className="bg-thy-surface rounded-2xl shadow-thy-card p-4">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-thy-ink">{formattedDate}</h3>
                <button onClick={() => onDelete(report.id)} className="text-thy-ink-muted hover:text-red-500 transition-colors">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                {fields.map(field => (
                    <div key={field.label}>
                        <p className="text-thy-ink-muted">{field.label}</p>
                        <p className="font-semibold text-thy-ink">{field.value} {field.unit}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- MAIN MODULE COMPONENT ---
const TestsModule: ModuleComponent = () => {
  const { copy } = useCopy();
  const { tests: testsCopy } = copy;
  
  const [reports, setReports] = useState<LabReport[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setReports(getLabReports());
  }, []);

  const handleSaveReport = (reportData: Omit<LabReport, 'id'>) => {
    const newReport: LabReport = { ...reportData, id: Date.now() };
    const updatedReports = [...reports, newReport];
    setReports(updatedReports);
    saveLabReports(updatedReports);
    setIsModalOpen(false);
  };

  const handleDeleteReport = (id: number) => {
    if (window.confirm(testsCopy.deleteConfirm)) {
        const updatedReports = reports.filter(r => r.id !== id);
        setReports(updatedReports);
        saveLabReports(updatedReports);
    }
  };
  
  const sortedReports = [...reports].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div className="container mx-auto max-w-lg space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-thy-ink">{testsCopy.labReports}</h2>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center text-sm font-semibold bg-thy-accent text-white px-3 py-2 rounded-lg shadow-md hover:bg-thy-accent-strong transition-all">
                <PlusIcon className="w-5 h-5" />
            </button>
        </div>

      {sortedReports.length > 0 ? (
        <div className="space-y-4">
            {sortedReports.map(report => (
                <ReportListItem key={report.id} report={report} onDelete={handleDeleteReport} copy={testsCopy} />
            ))}
        </div>
      ) : (
        <div className="text-center pt-20">
            <h3 className="text-xl font-bold text-thy-ink">{testsCopy.noReportsTitle}</h3>
            <p className="text-thy-ink-muted mt-2 max-w-xs mx-auto">{testsCopy.noReportsMessage}</p>
        </div>
      )}

      {isModalOpen && <AddReportModal onSave={handleSaveReport} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default TestsModule;
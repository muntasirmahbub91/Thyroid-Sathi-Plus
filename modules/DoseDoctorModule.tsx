

import React, { useState } from 'react';
import { type ModuleComponent } from '../types';
import { useCopy } from '../context/LanguageContext';
import { ChevronDownIcon } from '../components/icons';

// --- TYPE DEFINITIONS ---
type ViewState = 'form' | 'loading' | 'result' | 'error';

interface FormData {
    age_years: string;
    weight_kg: string;
    height_cm: string;
    sex: 'male' | 'female' | 'other';
    pregnancy_status: 'not_pregnant' | 'planning' | 'T1' | 'T2' | 'T3' | 'postpartum';
    heart_disease_or_HF: boolean;
    thyroidectomy_history: boolean;
    prior_RAI: boolean;
    ckd_present: boolean;
    liver_disease: boolean;
    tsh_value: string;
    tsh_ref_low: string;
    tsh_ref_high: string;
    ft4_value: string;
    ft4_ref_low: string;
    ft4_ref_high: string;
    t3_type: 'none' | 'FT3' | 'TT3';
    t3_value: string;
    t3_ref_low: string;
    t3_ref_high: string;
    trab_value: string;
    current_drug: 'none' | 'LT4' | 'carbimazole' | 'methimazole' | 'PTU';
    current_dose: string;
    adherence: 'good' | 'inconsistent' | 'poor';
    last_change_weeks: string;
}

interface ApiResponse {
    action: 'INCREASE' | 'DECREASE' | 'MAINTAIN' | 'START' | 'BLOCKED';
    drug: string;
    newDose: string;
    rationale: string;
    nextSteps: string;
    banners: {
        type: 'info' | 'warning' | 'pregnancy';
        text: string;
    }[];
}

// --- HELPER COMPONENTS ---
interface InputProps {
    label: string;
    id: string;
    [key: string]: any;
}
const Input = ({ label, id, ...props }: InputProps) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-thy-ink-muted">{label}</label>
        <input id={id} {...props} className="mt-1 block w-full px-3 py-2 bg-thy-surface border border-thy-line rounded-xl shadow-sm focus-ring text-thy-ink" />
    </div>
);

interface SelectProps {
    label: string;
    id: string;
    [key: string]: any;
}
const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-thy-ink-muted">{label}</label>
        <select id={id} {...props} className="mt-1 block w-full px-3 py-2 bg-thy-surface border border-thy-line rounded-xl shadow-sm focus-ring text-thy-ink">
            {children}
        </select>
    </div>
);

interface ToggleProps {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}
const Toggle = ({ label, checked, onChange }: ToggleProps) => (
    <div className="flex items-center justify-between bg-thy-bg p-2 rounded-xl">
        <span className="text-sm font-medium text-thy-ink">{label}</span>
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${checked ? 'bg-thy-accent' : 'bg-thy-line'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

// --- NEW RULES ENGINE ---
const roundToNearest = (value: number, step: number) => {
    return Math.round(value / step) * step;
};

const calculateDoseRecommendation = (data: FormData): ApiResponse => {
    const age = parseInt(data.age_years, 10);
    const weight = parseFloat(data.weight_kg);
    const tsh = parseFloat(data.tsh_value);
    const tshLow = parseFloat(data.tsh_ref_low);
    const tshHigh = parseFloat(data.tsh_ref_high);
    const ft4 = data.ft4_value ? parseFloat(data.ft4_value) : NaN;
    const ft4Low = data.ft4_ref_low ? parseFloat(data.ft4_ref_low) : NaN;
    const ft4High = data.ft4_ref_high ? parseFloat(data.ft4_ref_high) : NaN;
    const currentDose = data.current_dose ? parseFloat(data.current_dose) : 0;
    const lastChangeWeeks = parseInt(data.last_change_weeks, 10);

    const isPregnant = ['planning', 'T1', 'T2', 'T3'].includes(data.pregnancy_status);
    const cardiacRisk = age >= 65 || data.heart_disease_or_HF;
    
    let banners: ApiResponse['banners'] = [];
    const baseResponse: Omit<ApiResponse, 'action' | 'drug' | 'newDose' | 'rationale'> = {
        nextSteps: "Re-check TSH and FT4 in 4-6 weeks after any dose adjustment. For stable patients, check every 6-12 months.",
        banners: [],
    };

    // 1. BLOCKERS
    if (isNaN(tsh)) {
        return { ...baseResponse, action: 'BLOCKED', drug: '', newDose: '', rationale: "TSH value is missing. It is a critical parameter for dose calculation.", banners };
    }
    if (lastChangeWeeks < 4) {
        return { ...baseResponse, action: 'BLOCKED', drug: data.current_drug, newDose: data.current_dose, rationale: "The last dose change was less than 4 weeks ago. It is too early to assess the effect. Wait for steady state (4-6 weeks) before re-testing.", banners };
    }
    if (data.adherence === 'poor') {
        return { ...baseResponse, action: 'BLOCKED', drug: data.current_drug, newDose: data.current_dose, rationale: "Patient adherence is poor. Dose adjustments are unreliable without consistent medication intake. Focus on improving adherence first.", banners };
    }
    
    // Determine clinical state: Hypo vs Hyper
    const isHypothyroid = tsh > tshHigh || (data.current_drug === 'LT4');
    const isHyperthyroid = tsh < tshLow || ['carbimazole', 'methimazole', 'PTU'].includes(data.current_drug);

    // 2. LT4 PATHWAY (HYPOTHYROIDISM)
    if (isHypothyroid) {
        banners.push({ type: 'info', text: "Take LT4 on an empty stomach, 30-60 minutes before breakfast, with water. Separate by 4 hours from calcium, iron, or antacids." });

        if (isPregnant) {
             banners.push({ type: 'pregnancy', text: "Thyroid hormone needs increase during pregnancy. The dose has been adjusted accordingly to support both maternal and fetal health." });
        }
       
        // STARTING LT4
        if (data.current_drug === 'none') {
            if (cardiacRisk) {
                return { ...baseResponse, action: 'START', drug: 'Levothyroxine', newDose: '25 mcg', rationale: "Cautious start due to age or cardiac history. The initial dose is low to avoid cardiac strain.", banners };
            }
            if (!isNaN(weight)) {
                const calculatedDose = roundToNearest(1.6 * weight, 12.5);
                return { ...baseResponse, action: 'START', drug: 'Levothyroxine', newDose: `${calculatedDose} mcg`, rationale: `Standard starting dose calculated based on patient weight (1.6 mcg/kg).`, banners };
            }
             return { ...baseResponse, action: 'BLOCKED', drug: 'Levothyroxine', newDose: '', rationale: "Weight is required to calculate the standard starting dose of Levothyroxine.", banners };
        }
        
        // TITRATING LT4
        if (data.current_drug === 'LT4') {
            let newDose = currentDose;
            let rationale = "";

            if (tsh > 10) { newDose += 25; rationale = "TSH is significantly high, indicating under-replacement. A 25 mcg dose increase is recommended."; }
            else if (tsh > tshHigh) { newDose += 12.5; rationale = "TSH is mildly elevated. A small dose increase of 12.5 mcg is recommended to bring it within the target range."; }
            else if (tsh < 0.1 || (!isNaN(ft4) && ft4 > ft4High)) { newDose -= 25; rationale = "TSH is suppressed or FT4 is high, indicating over-replacement. A 25 mcg dose reduction is warranted."; }
            else if (tsh < tshLow) { newDose -= 12.5; rationale = "TSH is low, suggesting mild over-replacement. A small dose reduction of 12.5 mcg is recommended."; }
            else { 
                return { ...baseResponse, action: 'MAINTAIN', drug: 'Levothyroxine', newDose: `${currentDose} mcg`, rationale: "TSH is within the target range. The current dose is appropriate.", banners };
            }
            
            newDose = Math.max(0, newDose); // Ensure dose isn't negative
            const action = newDose > currentDose ? 'INCREASE' : 'DECREASE';
            
            if (isPregnant && action === 'INCREASE') {
                const weeklyIncrease = currentDose * 2; // ~30% increase
                const dailyEquivalentIncrease = roundToNearest(weeklyIncrease/7, 12.5);
                newDose = currentDose + dailyEquivalentIncrease;
                 rationale += " Additional adjustment for pregnancy is included."
            }

            return { ...baseResponse, action, drug: 'Levothyroxine', newDose: `${newDose} mcg`, rationale, banners };
        }
    }

    // 3. ATD PATHWAY (HYPERTHYROIDISM)
    if (isHyperthyroid) {
        banners.push({ type: 'info', text: "Consider beta-blockers (e.g., Propranolol) for symptomatic control of palpitations and tremor." });
        let drug = data.current_drug !== 'none' ? data.current_drug : 'Methimazole';
        if (data.pregnancy_status === 'T1') drug = 'PTU';
        
        if (data.current_drug === 'none') {
            if (isNaN(ft4) || isNaN(ft4High)) return { ...baseResponse, action: 'BLOCKED', drug, newDose: '', rationale: "FT4 value and reference range are required to determine the starting dose of anti-thyroid medication.", banners };
            const ft4UlnMultiple = ft4 / ft4High;
            let newDose = '5-10 mg';
            let rationale = "Mild hyperthyroidism based on FT4 levels. Starting with a low dose of Methimazole.";
            if (ft4UlnMultiple > 2) { newDose = '30-40 mg'; rationale = "Significant hyperthyroidism. Starting with a high dose of Methimazole is recommended."; }
            else if (ft4UlnMultiple > 1.5) { newDose = '10-20 mg'; rationale = "Moderate hyperthyroidism. Starting with a medium dose of Methimazole is appropriate."; }
            return { ...baseResponse, action: 'START', drug, newDose, rationale, banners, nextSteps: "Re-check FT4 +/- T3 in 2-4 weeks to assess response and titrate dose." };
        }

        // TITRATING ATD
        if (!isNaN(ft4) && ft4 < ft4Low) {
            return { ...baseResponse, action: 'DECREASE', drug, newDose: `${currentDose / 2} mg`, rationale: "Patient is now hypothyroid (iatrogenic). Dose should be reduced by 50%. Consider holding the drug for 3-5 days before restarting at the lower dose.", banners };
        }
        if (!isNaN(ft4) && ft4 >= ft4Low && ft4 <= ft4High) {
            return { ...baseResponse, action: 'DECREASE', drug, newDose: `${roundToNearest(currentDose / 2, 2.5)} mg`, rationale: "FT4 is now in the normal range. The dose should be reduced by approximately 50% to move towards a maintenance phase.", banners };
        }
        if (!isNaN(ft4) && ft4 > ft4High) {
             return { ...baseResponse, action: 'MAINTAIN', drug, newDose: `${currentDose} mg`, rationale: "FT4 remains high. Continue the current dose and re-evaluate in 2-4 weeks. If there is no improvement, a dose increase may be needed.", banners };
        }
    }

    // 4. Euthyroid (Normal)
    if (tsh >= tshLow && tsh <= tshHigh && data.current_drug === 'none') {
        return { ...baseResponse, action: 'MAINTAIN', drug: 'None', newDose: 'N/A', rationale: "Thyroid function tests are within the normal range. No medication is indicated at this time." };
    }

    // Fallback
    return { ...baseResponse, action: 'BLOCKED', drug: '', newDose: '', rationale: "The provided data does not fit a standard clinical pathway. Manual review by a clinician is required." };
}


const DoseDoctorModule: ModuleComponent = () => {
    const { copy } = useCopy();
    const { doseDoctor: text } = copy;

    const initialFormState: FormData = {
        age_years: '45', weight_kg: '70', height_cm: '165', sex: 'female',
        pregnancy_status: 'not_pregnant', heart_disease_or_HF: false, thyroidectomy_history: false,
        prior_RAI: false, ckd_present: false, liver_disease: false, tsh_value: '',
        tsh_ref_low: '0.4', tsh_ref_high: '4.5', ft4_value: '', ft4_ref_low: '12',
        ft4_ref_high: '22', t3_type: 'none', t3_value: '', t3_ref_low: '3.1', t3_ref_high: '6.8',
        trab_value: '', current_drug: 'none', current_dose: '', adherence: 'good', last_change_weeks: '12',
    };

    const [formData, setFormData] = useState<FormData>(initialFormState);
    const [view, setView] = useState<ViewState>('form');
    const [result, setResult] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [areRefRangesVisible, setAreRefRangesVisible] = useState(false);
    
    const handleChange = (field: keyof FormData, value: string | boolean | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        setView('loading');
        setError(null);
        setResult(null);
        window.scrollTo(0, 0);

        // Simulate processing time for better UX
        setTimeout(() => {
            try {
                const recommendation = calculateDoseRecommendation(formData);
                setResult(recommendation);
                setView('result');
            } catch (e) {
                console.error("Rules engine failed:", e);
                setError(text.error.message);
                setView('error');
            }
        }, 500);
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setView('form');
        setResult(null);
        setError(null);
    };

    const renderForm = () => (
        <div className="bg-thy-surface p-4 sm:p-6 rounded-2xl shadow-thy-card space-y-6">
            <fieldset>
                <legend className="w-full text-lg font-semibold text-thy-ink border-b border-thy-line pb-2 mb-4">{text.form.patientHistory.title}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <Input label={text.form.patientHistory.age} id="age" type="number" value={formData.age_years} onChange={e => handleChange('age_years', e.target.value)} />
                    <Input label={text.form.patientHistory.weight} id="weight" type="number" value={formData.weight_kg} onChange={e => handleChange('weight_kg', e.target.value)} />
                    <Input label={text.form.patientHistory.height} id="height" type="number" value={formData.height_cm} onChange={e => handleChange('height_cm', e.target.value)} />
                    <Select label={text.form.patientHistory.sex} id="sex" value={formData.sex} onChange={e => handleChange('sex', e.target.value)}>
                        <option value="female">{text.form.patientHistory.sexOptions.female}</option>
                        <option value="male">{text.form.patientHistory.sexOptions.male}</option>
                        <option value="other">{text.form.patientHistory.sexOptions.other}</option>
                    </Select>
                    <Select label={text.form.patientHistory.pregnancy} id="pregnancy" value={formData.pregnancy_status} onChange={e => handleChange('pregnancy_status', e.target.value)} className="sm:col-span-2">
                        <option value="not_pregnant">{text.form.patientHistory.pregnancyOptions.not_pregnant}</option>
                        <option value="planning">{text.form.patientHistory.pregnancyOptions.planning}</option>
                        <option value="T1">{text.form.patientHistory.pregnancyOptions.T1}</option>
                        <option value="T2">{text.form.patientHistory.pregnancyOptions.T2}</option>
                        <option value="T3">{text.form.patientHistory.pregnancyOptions.T3}</option>
                        <option value="postpartum">{text.form.patientHistory.pregnancyOptions.postpartum}</option>
                    </Select>
                    <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <Toggle label={text.form.patientHistory.heartDisease} checked={formData.heart_disease_or_HF} onChange={v => handleChange('heart_disease_or_HF', v)} />
                        <Toggle label={text.form.patientHistory.thyroidectomy} checked={formData.thyroidectomy_history} onChange={v => handleChange('thyroidectomy_history', v)} />
                        <Toggle label={text.form.patientHistory.rai} checked={formData.prior_RAI} onChange={v => handleChange('prior_RAI', v)} />
                        <Toggle label={text.form.patientHistory.ckd} checked={formData.ckd_present} onChange={v => handleChange('ckd_present', v)} />
                        <Toggle label={text.form.patientHistory.liverDisease} checked={formData.liver_disease} onChange={v => handleChange('liver_disease', v)} />
                    </div>
                </div>
            </fieldset>

             <fieldset>
                <legend className="w-full text-lg font-semibold text-thy-ink border-b border-thy-line pb-2 mb-4">{text.form.labResults.title}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <Input label={text.form.labResults.tsh} id="tsh" type="number" value={formData.tsh_value} onChange={e => handleChange('tsh_value', e.target.value)} />
                    <Input label={text.form.labResults.ft4} id="ft4" type="number" value={formData.ft4_value} onChange={e => handleChange('ft4_value', e.target.value)} />

                    <div className="sm:col-span-2">
                        <button type="button" onClick={() => setAreRefRangesVisible(!areRefRangesVisible)} className="flex items-center text-sm font-semibold text-thy-accent hover:text-thy-accent-strong transition-colors py-1">
                            <span>{areRefRangesVisible ? text.form.labResults.hideRefRanges : text.form.labResults.editRefRanges}</span>
                            <ChevronDownIcon className={`w-4 h-4 ml-1.5 transition-transform ${areRefRangesVisible ? 'rotate-180' : ''}`} />
                        </button>

                        {areRefRangesVisible && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-3 animate-fade-in border-t border-thy-line pt-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <Input label={text.form.labResults.tshRefLow} id="tsh_ref_low" type="number" value={formData.tsh_ref_low} onChange={e => handleChange('tsh_ref_low', e.target.value)} />
                                    <Input label={text.form.labResults.tshRefHigh} id="tsh_ref_high" type="number" value={formData.tsh_ref_high} onChange={e => handleChange('tsh_ref_high', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input label={text.form.labResults.ft4RefLow} id="ft4_ref_low" type="number" value={formData.ft4_ref_low} onChange={e => handleChange('ft4_ref_low', e.target.value)} />
                                    <Input label={text.form.labResults.ft4RefHigh} id="ft4_ref_high" type="number" value={formData.ft4_ref_high} onChange={e => handleChange('ft4_ref_high', e.target.value)} />
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <Select label={text.form.labResults.t3Type} id="t3_type" value={formData.t3_type} onChange={e => handleChange('t3_type', e.target.value)}>
                        <option value="none">{text.form.labResults.t3Options.none}</option>
                        <option value="FT3">{text.form.labResults.t3Options.FT3}</option>
                        <option value="TT3">{text.form.labResults.t3Options.TT3}</option>
                    </Select>
                    {formData.t3_type !== 'none' && <>
                        <Input label={text.form.labResults.t3Value} id="t3_val" type="number" value={formData.t3_value} onChange={e => handleChange('t3_value', e.target.value)} />
                    </>}
                    <Input label={text.form.labResults.trab} id="trab" type="number" value={formData.trab_value} onChange={e => handleChange('trab_value', e.target.value)} />
                </div>
            </fieldset>

            <fieldset>
                <legend className="w-full text-lg font-semibold text-thy-ink border-b border-thy-line pb-2 mb-4">{text.form.medication.title}</legend>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <Select label={text.form.medication.drug} id="drug" value={formData.current_drug} onChange={e => handleChange('current_drug', e.target.value)}>
                        <option value="none">{text.form.medication.drugOptions.none}</option>
                        <option value="LT4">{text.form.medication.drugOptions.LT4}</option>
                        <option value="carbimazole">{text.form.medication.drugOptions.carbimazole}</option>
                        <option value="methimazole">{text.form.medication.drugOptions.methimazole}</option>
                        <option value="PTU">{text.form.medication.drugOptions.PTU}</option>
                    </Select>
                    <Input label={text.form.medication.dose} id="dose" type="number" value={formData.current_dose} onChange={e => handleChange('current_dose', e.target.value)} disabled={formData.current_drug === 'none'} />
                    <Select label={text.form.medication.adherence} id="adherence" value={formData.adherence} onChange={e => handleChange('adherence', e.target.value)}>
                        <option value="good">{text.form.medication.adherenceOptions.good}</option>
                        <option value="inconsistent">{text.form.medication.adherenceOptions.inconsistent}</option>
                        <option value="poor">{text.form.medication.adherenceOptions.poor}</option>
                    </Select>
                    <Input label={text.form.medication.lastChange} id="weeks" type="number" value={formData.last_change_weeks} onChange={e => handleChange('last_change_weeks', e.target.value)} />
                </div>
            </fieldset>

            <div className="col-span-full pt-4">
                <button onClick={handleSubmit} disabled={!formData.tsh_value} className="w-full bg-thy-accent text-white font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-accent-strong transition-all disabled:bg-thy-disabled-bg disabled:text-thy-disabled-text disabled:cursor-not-allowed">
                    {text.generateButton}
                </button>
            </div>
        </div>
    );

    const renderResult = () => {
        if (!result) return null;

        const actionColors = {
            INCREASE: { bg: 'bg-orange-400/10', text: 'text-orange-800', border: 'border-orange-500' },
            DECREASE: { bg: 'bg-blue-400/10', text: 'text-blue-800', border: 'border-blue-500' },
            MAINTAIN: { bg: 'bg-thy-accent-weak', text: 'text-thy-accent-strong', border: 'border-thy-accent' },
            START: { bg: 'bg-indigo-400/10', text: 'text-indigo-800', border: 'border-indigo-500' },
            BLOCKED: { bg: 'bg-red-400/10', text: 'text-red-800', border: 'border-red-500' },
        };
        const colors = actionColors[result.action] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-500' };

        const bannerColors = {
            info: 'bg-blue-400/10 border-blue-500 text-blue-800',
            warning: 'bg-yellow-400/10 border-yellow-500 text-yellow-800',
            pregnancy: 'bg-pink-400/10 border-pink-500 text-pink-800',
        };

        return (
            <div className="bg-thy-surface p-4 sm:p-6 rounded-2xl shadow-thy-card animate-fade-in space-y-4">
                <div className={`p-4 rounded-xl border-l-4 ${colors.border} ${colors.bg}`}>
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${colors.text}`}>{text.result.title(result.action)}</h3>
                    {result.action !== 'BLOCKED' && result.action !== 'MAINTAIN' &&
                        <p className="text-2xl font-bold text-thy-ink mt-1">{text.result.newDose(result.drug, result.newDose)}</p>
                    }
                     {result.action === 'MAINTAIN' &&
                        <p className="text-2xl font-bold text-thy-ink mt-1">{text.result.maintainDose(formData.current_drug, formData.current_dose, formData.current_drug === 'LT4' ? 'mcg' : 'mg')}</p>
                    }
                </div>
                
                <div>
                    <h4 className="font-semibold text-thy-ink">{text.result.rationale}</h4>
                    <p className="text-thy-ink-muted text-sm mt-1">{result.rationale}</p>
                </div>

                <div>
                    <h4 className="font-semibold text-thy-ink">{text.result.nextSteps}</h4>
                    <p className="text-thy-ink-muted text-sm mt-1">{result.nextSteps}</p>
                </div>
                
                {result.banners && result.banners.length > 0 && (
                    <div className="space-y-3">
                        {result.banners.map((banner, index) => (
                            <div key={index} className={`p-3 border-l-4 rounded-r-lg ${bannerColors[banner.type]}`}>
                                <p className="text-sm font-medium">{banner.text}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="pt-4">
                    <button onClick={handleReset} className="w-full bg-thy-ink text-white font-bold py-3 px-6 rounded-xl shadow-thy-card hover:bg-thy-ink/90 transition-all">
                        {text.startNewCaseButton}
                    </button>
                </div>
            </div>
        );
    };

    const renderPage = () => {
        switch (view) {
            case 'loading':
                return <div className="flex flex-col items-center justify-center min-h-[60vh] bg-thy-surface p-6 rounded-2xl shadow-thy-card"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-thy-accent"></div><p className="mt-4 text-thy-ink-muted">{text.loading}</p></div>;
            case 'result':
                return renderResult();
            case 'error':
                 return <div className="bg-thy-surface p-6 rounded-2xl shadow-thy-card text-center"><h3 className="text-xl font-bold text-red-600">{text.error.title}</h3><p className="text-thy-ink-muted my-4">{error}</p><button onClick={handleReset} className="bg-thy-accent text-white font-bold py-2 px-6 rounded-xl">{text.error.tryAgain}</button></div>;
            case 'form':
            default:
                return renderForm();
        }
    }

    return (
        <div className="p-4">
            <main className="max-w-2xl mx-auto">
                {renderPage()}
            </main>
            <footer className="text-center mt-8 pb-4">
                <p className="text-xs text-thy-ink-muted max-w-2xl mx-auto">
                    <strong>{text.disclaimer.split(':')[0]}:</strong> {text.disclaimer.split(':')[1]}
                </p>
            </footer>
        </div>
    );
};

export default DoseDoctorModule;
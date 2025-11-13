import { registerModule } from './registry';
import QuizModule from './QuizModule';
import CalculatorModule from './CalculatorModule';
import FoodGuideModule from './FoodGuideModule';
import DoseDoctorModule from './DoseDoctorModule';
import GuideModule from './GuideModule';
import ProfileModule from './ProfileModule';
import TrackerModule from './TrackerModule';
import MyDataModule from './MyDataModule';
import TestsModule from './TestsModule';

// Register all app modules here
registerModule('quiz', QuizModule);
registerModule('calculator', CalculatorModule);
registerModule('food', FoodGuideModule);
registerModule('doseDoctor', DoseDoctorModule);
registerModule('guide', GuideModule);
registerModule('profile', ProfileModule);
registerModule('tracker', TrackerModule);
registerModule('data', MyDataModule);
registerModule('tests', TestsModule);
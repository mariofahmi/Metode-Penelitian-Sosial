export type ActiveTab = 
  | 'dashboard'
  | 'kualitatif' 
  | 'kuantitatif' 
  | 'masalah' 
  | 'komparasi' 
  | 'lab';


export interface ComparisonPoint {
  num: number;
  title: string;
  icon: string;
}

export interface ComparisonDimension {
  dimensi: string;
  kuantitatif: string;
  kualitatif: string;
  penjelasan?: string;
}

export interface MethodItem {
  id: string;
  title: string;
  subtitle: string;
  color: 'orange' | 'emerald' | 'cyan' | 'rose' | 'blue' | 'indigo' | 'amber';
  icon: string;
  description: string;
  characteristics: string[];
  stages: {
    title: string;
    description: string;
  }[];
  example: string;
  strengths: string[];
  limitations: string[];
}

export interface QualitativeSimulationState {
  method: 'wawancara' | 'observasi' | 'studi_kasus';
  interviewMode: 'tatap_muka' | 'telepon';
  questionsAsked: number[];
  observationMode: 'terstruktur' | 'partisipan' | 'lingkungan';
  observedData: string[];
  caseDocumentsCollected: string[];
}

export interface QuantitativeExperimentState {
  independentVar: string;
  dependentVar: string;
  controlGroupCount: number;
  treatmentGroupCount: number;
  treatmentIntensity: number; // 1 to 10
  surveySampleCount: number;
  correlationX: string;
  correlationY: string;
}

export interface PitfallSimulationState {
  filterBias: 'objective' | 'confirmation_bias';
  analystPerspective: 'neutral' | 'personal_interest';
  sampleSize: number;
  totalPopulation: number;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  topic: 'kualitatif' | 'kuantitatif' | 'bias' | 'subjektivitas' | 'generalisasi';
}

export interface GlossaryTerm {
  term: string;
  category: 'Kualitatif' | 'Kuantitatif' | 'Etika & Validitas';
  definition: string;
  example: string;
}

// Gamification & Badges
export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'dasar' | 'kualitatif' | 'kuantitatif' | 'kritis' | 'master';
  requiredXp?: number;
}

// User Global Progress State
export interface UserProgress {
  xp: number;
  level: string;
  levelIndex: number;
  unlockedBadgeIds: string[];
  audioMuted: boolean;
}


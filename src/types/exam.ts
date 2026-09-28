export type RecurrenceProbability = 'Very High (90%+)' | 'High (75-89%)' | 'Moderate (50-74%)';

export type QuestionType =
  | 'All'
  | 'Short Answer (2-5m)'
  | 'Medium Answer (6-10m)'
  | 'Long / Essay (12-20m)'
  | 'Derivation / Proof'
  | 'Numerical / Problem Solving'
  | 'Case Study';

export interface HighYieldTopic {
  title: string;
  moduleOrUnit: string;
  estimatedWeightagePercent: number;
  recurrenceProbability: RecurrenceProbability;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  recommendedHours: number;
  whyHighYield: string;
  mustMasterConcepts: string[];
}

export interface ImportantQuestion {
  id: string;
  questionText: string;
  type: string;
  expectedMarks: number;
  frequencyPastYears: string;
  coreKeywordsRequired: string[];
  markingSchemeSteps: string[];
  modelAnswerOutline: string;
  commonStudentMistakes: string;
}

export interface KeyFormulaDiagram {
  title: string;
  detail: string;
  priority: 'Critical' | 'Important';
}

export interface ExamSectionAllocation {
  sectionName: string;
  marks: number;
  allocatedMinutes: number;
  tip: string;
}

export interface ExamTimeAllocationStrategy {
  readingTimeMinutes: number;
  sections: ExamSectionAllocation[];
  revisionBufferMinutes: number;
  strategyNotes: string;
}

export interface Flashcard {
  front: string;
  back: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ExamAnalysis {
  summary: string;
  highYieldTopics: HighYieldTopic[];
  importantQuestions: ImportantQuestion[];
  keyFormulasAndDiagrams: KeyFormulaDiagram[];
  examTimeAllocationStrategy: ExamTimeAllocationStrategy;
  flashcards: Flashcard[];
}

export interface DailyTimingSlot {
  timeSlot: string;
  energyLevel: string;
  activityType: string;
  chronobiologyTip: string;
}

export interface DayStudyPlan {
  dayNumber: number;
  relativeDay: string;
  primarySubject: string;
  focusTopics: string[];
  targetQuestionsCount: number;
  estimatedHours: number;
  milestone: string;
  completed?: boolean;
}

export interface StudyScheduleData {
  overview: {
    totalStudyHoursPlanned: number;
    strategySummary: string;
    recommendedPomodoroInterval: string;
  };
  dailyTimingBlueprint: DailyTimingSlot[];
  daysPlan: DayStudyPlan[];
  examDayPacingGuide: string[];
}

export interface SemesterSubject {
  id: string;
  code: string;
  name: string;
  category: string;
  examDate: string; // YYYY-MM-DD
  totalMarks: number;
  durationMinutes: number;
  targetScore: number;
  syllabusSnippet: string;
  pyqSnippet: string;
  analysis: ExamAnalysis;
}

export type Chronotype = 'morning' | 'afternoon' | 'night';

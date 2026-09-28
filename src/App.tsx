import React, { useState, useEffect } from 'react';
import { DEFAULT_SUBJECTS } from './data/defaultSubjects';
import { SemesterSubject } from './types/exam';
import { Navbar } from './components/Navbar';
import { SubjectHeader } from './components/SubjectHeader';
import { TopicAnalyzer } from './components/TopicAnalyzer';
import { QuestionBank } from './components/QuestionBank';
import { StudyTimingSchedule } from './components/StudyTimingSchedule';
import { StudyTimer } from './components/StudyTimer';
import { FlashcardDeck } from './components/FlashcardDeck';
import { CustomSubjectModal } from './components/CustomSubjectModal';
import { PrintSummaryModal } from './components/PrintSummaryModal';

export default function App() {
  // Load saved subjects and merge any newly added default subjects
  const [subjects, setSubjects] = useState<SemesterSubject[]>(() => {
    try {
      const saved = localStorage.getItem('examforge_subjects');
      if (saved) {
        const parsed: SemesterSubject[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge to ensure new CS engineering subjects are accessible
          const existingIds = new Set(parsed.map(s => s.id));
          const missingDefaults = DEFAULT_SUBJECTS.filter(d => !existingIds.has(d.id));
          return [...parsed, ...missingDefaults];
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SUBJECTS;
  });

  const [activeSubjectId, setActiveSubjectId] = useState<string>(() => {
    return subjects[0]?.id || DEFAULT_SUBJECTS[0].id;
  });

  const [activeTab, setActiveTab] = useState<'topics' | 'questions' | 'timing' | 'timer' | 'flashcards'>('topics');

  // Track mastered questions IDs per subject
  const [masteredQuestionIds, setMasteredQuestionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('examforge_mastered_qs');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['os-q1'];
  });

  // Modal states
  const [isNewSubjectModalOpen, setIsNewSubjectModalOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Sync subjects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('examforge_subjects', JSON.stringify(subjects));
    } catch {}
  }, [subjects]);

  // Sync mastered questions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('examforge_mastered_qs', JSON.stringify(masteredQuestionIds));
    } catch {}
  }, [masteredQuestionIds]);

  const activeSubject = subjects.find(s => s.id === activeSubjectId) || subjects[0];

  const handleToggleMastered = (qId: string) => {
    setMasteredQuestionIds(prev =>
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const handleSubjectAdded = (newSubject: SemesterSubject) => {
    setSubjects(prev => [newSubject, ...prev]);
    setActiveSubjectId(newSubject.id);
  };

  const currentSubjectMasteredCount = activeSubject.analysis.importantQuestions.filter(q =>
    masteredQuestionIds.includes(q.id)
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        subjects={subjects}
        activeSubjectId={activeSubjectId}
        onSelectSubject={setActiveSubjectId}
        onOpenNewSubjectModal={() => setIsNewSubjectModalOpen(true)}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
      />

      {/* Active Subject Context Bar */}
      <SubjectHeader
        subject={activeSubject}
        masteredCount={currentSubjectMasteredCount}
        totalQuestions={activeSubject.analysis.importantQuestions.length}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'topics' && (
          <TopicAnalyzer
            topics={activeSubject.analysis.highYieldTopics}
            formulas={activeSubject.analysis.keyFormulasAndDiagrams}
            subjectName={activeSubject.name}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionBank
            questions={activeSubject.analysis.importantQuestions}
            masteredIds={masteredQuestionIds}
            onToggleMastered={handleToggleMastered}
            subjectName={activeSubject.name}
          />
        )}

        {activeTab === 'timing' && (
          <StudyTimingSchedule
            currentSubject={activeSubject}
            allSubjects={subjects}
          />
        )}

        {activeTab === 'timer' && (
          <StudyTimer currentSubject={activeSubject} />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardDeck
            flashcards={activeSubject.analysis.flashcards}
            subjectName={activeSubject.name}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">ExamForge</span>
            <span aria-hidden="true">&middot;</span>
            <span>Semester Examination Preparation &amp; Academic Chronobiology Engine</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>High-Yield 80/20 Rule</span>
            <span aria-hidden="true">&middot;</span>
            <span>Spaced Repetition</span>
            <span aria-hidden="true">&middot;</span>
            <span>Real Exam Pacing</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CustomSubjectModal
        isOpen={isNewSubjectModalOpen}
        onClose={() => setIsNewSubjectModalOpen(false)}
        onSubjectAdded={handleSubjectAdded}
      />

      <PrintSummaryModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        subject={activeSubject}
      />
    </div>
  );
}

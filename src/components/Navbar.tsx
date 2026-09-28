import React from 'react';
import { BookOpen, Clock, BrainCircuit, Sparkles, Printer, Plus, Calendar, Target } from 'lucide-react';
import { SemesterSubject } from '../types/exam';

interface NavbarProps {
  activeTab: 'topics' | 'questions' | 'timing' | 'timer' | 'flashcards';
  setActiveTab: (tab: 'topics' | 'questions' | 'timing' | 'timer' | 'flashcards') => void;
  subjects: SemesterSubject[];
  activeSubjectId: string;
  onSelectSubject: (id: string) => void;
  onOpenNewSubjectModal: () => void;
  onOpenPrintModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  subjects,
  activeSubjectId,
  onSelectSubject,
  onOpenNewSubjectModal,
  onOpenPrintModal,
}) => {
  const currentSubject = subjects.find(s => s.id === activeSubjectId) || subjects[0];

  // Calculate days remaining to active subject exam
  const calculateDaysLeft = (dateStr: string) => {
    const exam = new Date(dateStr).getTime();
    const today = new Date().getTime();
    const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const daysLeft = currentSubject ? calculateDaysLeft(currentSubject.examDate) : 0;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white">
      {/* Top Banner with Subject Switcher & Exam Countdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold text-lg">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">ExamForge</span>
                <span className="text-xs text-blue-400 font-medium hidden sm:inline">Semester Preparation Engine</span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">High-Yield Analysis &middot; Chronobiology Timings &middot; Exam Pacing</p>
            </div>
          </div>

          {/* Subject Switcher Bar */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200">
              <span className="text-slate-400 font-medium hidden lg:inline">Subject:</span>
              <select
                value={activeSubjectId}
                onChange={(e) => onSelectSubject(e.target.value)}
                className="bg-transparent font-medium text-white focus:outline-none cursor-pointer max-w-[160px] sm:max-w-[240px] truncate"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-slate-100">
                    {s.code}: {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Days Countdown Tag */}
            <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
              daysLeft <= 7 
                ? 'bg-red-950/70 border border-red-800 text-red-300' 
                : daysLeft <= 21 
                  ? 'bg-amber-950/70 border border-amber-800 text-amber-300' 
                  : 'bg-emerald-950/70 border border-emerald-800 text-emerald-300'
            }`}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{daysLeft > 0 ? `${daysLeft} Days to Exam` : daysLeft === 0 ? 'Exam Today!' : 'Exam Passed'}</span>
            </div>

            {/* Quick Actions */}
            <button
              onClick={onOpenNewSubjectModal}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors"
              title="Analyze New Syllabus or Past Papers"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Analyze Syllabus</span>
              <span className="sm:hidden">Add</span>
            </button>

            <button
              onClick={onOpenPrintModal}
              className="hidden lg:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
              title="Print Revision Sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Cheat Sheet</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 overflow-x-auto no-scrollbar border-t border-slate-800/80 pt-1 pb-1">
          <button
            onClick={() => setActiveTab('topics')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'topics'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>High-Yield Topics</span>
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'questions'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Past Exam Questions & Marking Schemes</span>
          </button>

          <button
            onClick={() => setActiveTab('timing')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'timing'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Study Timings & Chronotype</span>
          </button>

          <button
            onClick={() => setActiveTab('timer')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'timer'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Exam Simulator & Focus Timer</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'flashcards'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Active Recall Flashcards</span>
          </button>
        </div>
      </div>
    </header>
  );
};

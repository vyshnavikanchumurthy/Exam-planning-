import React, { useState } from 'react';
import { ImportantQuestion, QuestionType } from '../types/exam';
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  HelpCircle,
  Search,
  Filter,
  Check,
  ChevronDown,
  ChevronUp,
  Tag,
  Award,
  BookMarked
} from 'lucide-react';

interface QuestionBankProps {
  questions: ImportantQuestion[];
  masteredIds: string[];
  onToggleMastered: (questionId: string) => void;
  subjectName: string;
}

export const QuestionBank: React.FC<QuestionBankProps> = ({
  questions,
  masteredIds,
  onToggleMastered,
  subjectName,
}) => {
  const [selectedType, setSelectedType] = useState<QuestionType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(questions[0]?.id || null);

  const questionTypes: QuestionType[] = [
    'All',
    'Long / Essay (12-20m)',
    'Medium Answer (6-10m)',
    'Short Answer (2-5m)',
    'Derivation / Proof',
    'Numerical / Problem Solving',
    'Case Study'
  ];

  const filteredQuestions = questions.filter(q => {
    const matchesType = selectedType === 'All' || q.type === selectedType;
    const matchesSearch =
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.coreKeywordsRequired.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.frequencyPastYears.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const masteredCount = questions.filter(q => masteredIds.includes(q.id)).length;
  const masteryPercentage = questions.length > 0 ? Math.round((masteredCount / questions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner with Mastery Progress & Search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <BookMarked className="w-4 h-4" />
              <span>Evaluator-Curated Question Bank</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Most Probable Semester Exam Questions
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Extracted from recurring university question papers with complete evaluator marking criteria, keyword checklists, and model answer structure.
            </p>
          </div>

          {/* Mastery Progress Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-600">Exam Question Readiness</span>
              <span className="text-blue-600 font-bold">{masteredCount} of {questions.length} Mastered</span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
              <span>Mark questions as mastered after timed practice</span>
              <span className="font-semibold text-slate-700">{masteryPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Question Type Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full md:w-auto p-1 bg-slate-100 rounded-lg border border-slate-200">
            {questionTypes.map((type) => {
              const count = type === 'All' ? questions.length : questions.filter(q => q.type === type).length;
              if (type !== 'All' && count === 0) return null;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    selectedType === type
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{type}</span>
                  <span className="ml-1 text-[10px] text-slate-400 font-normal">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-slate-800">No questions found matching criteria</h4>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting a different question type.</p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isMastered = masteredIds.includes(q.id);
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className={`bg-white border rounded-2xl transition-all duration-200 ${
                  isMastered
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-slate-200 hover:border-blue-300 shadow-xs'
                }`}
              >
                {/* Header row */}
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      {/* Meta info tags */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-blue-600">{q.type}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {q.expectedMarks} Marks
                        </span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium text-[11px]">
                          {q.frequencyPastYears}
                        </span>
                      </div>

                      {/* Question Text */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        Q{idx + 1}. {q.questionText}
                      </h3>

                      {/* Required Core Keywords preview */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-semibold text-slate-500 mr-1">Evaluator Keywords:</span>
                        {q.coreKeywordsRequired.map((kw, kwIdx) => (
                          <span
                            key={kwIdx}
                            className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-mono"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions: Mark Mastered & Expand */}
                    <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
                      <button
                        onClick={() => onToggleMastered(q.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          isMastered
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {isMastered ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Mastered</span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-4 h-4 text-slate-400" />
                            <span>Mark Mastered</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : q.id)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label="Expand question details"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Model Answer & Marking Scheme */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-slate-200 space-y-6">
                      {/* Step-by-Step Marking Scheme */}
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span>Evaluator Marking Scheme ({q.expectedMarks} Marks Total)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.markingSchemeSteps.map((step, sIdx) => (
                            <div
                              key={sIdx}
                              className="bg-slate-50 border border-slate-200/90 rounded-lg p-3 text-xs text-slate-700 flex items-start gap-2"
                            >
                              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                                {sIdx + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Model Answer Outline */}
                      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                        <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-1.5">
                          High-Scoring Model Answer Blueprint:
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                          {q.modelAnswerOutline}
                        </p>
                      </div>

                      {/* Common Student Mistakes / Examiner Trap */}
                      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                            Common Examiner Penalty Trap:
                          </span>
                          <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                            {q.commonStudentMistakes}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

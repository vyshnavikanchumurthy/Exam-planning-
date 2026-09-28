import React from 'react';
import { X, Printer, Download, Sparkles, BookOpen, Clock, Award } from 'lucide-react';
import { SemesterSubject } from '../types/exam';

interface PrintSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: SemesterSubject;
}

export const PrintSummaryModal: React.FC<PrintSummaryModalProps> = ({
  isOpen,
  onClose,
  subject,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const { analysis } = subject;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              High-Yield Exam Revision Cheat Sheet (Print Ready)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div id="printable-exam-sheet" className="p-8 overflow-y-auto space-y-6 text-slate-900">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-600">{subject.code} &middot; {subject.category}</span>
                <h1 className="text-2xl font-black text-slate-900 mt-0.5">{subject.name}</h1>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">{analysis.summary}</p>
              </div>
              <div className="text-right text-xs font-medium text-slate-600">
                <div>Exam Date: <strong className="text-slate-900">{subject.examDate}</strong></div>
                <div>Marks: <strong className="text-slate-900">{subject.totalMarks}</strong> ({subject.durationMinutes} mins)</div>
                <div>Target Score: <strong className="text-blue-600">{subject.targetScore}%</strong></div>
              </div>
            </div>
          </div>

          {/* 1. High-Yield Topics Priority List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-3">
              01. High-Yield Modules & Probability Distribution
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {analysis.highYieldTopics.map((topic, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-900">{idx + 1}. {topic.title}</span>
                    <span className="font-mono font-bold text-blue-700">{topic.estimatedWeightagePercent}%</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mb-1">{topic.moduleOrUnit} &middot; {topic.recurrenceProbability}</div>
                  <div className="text-[11px] text-slate-700 font-medium">
                    Must Master: {topic.mustMasterConcepts.join('; ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Most Probable Exam Questions & Marking Keys */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-3">
              02. High-Yield Questions & Marking Scheme Blueprint
            </h3>
            <div className="space-y-3">
              {analysis.importantQuestions.slice(0, 5).map((q, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-3 text-xs">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="font-bold text-slate-900">Q{idx + 1}: {q.questionText}</span>
                    <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[10px] shrink-0">
                      {q.expectedMarks} Marks
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-700 font-semibold mb-1">
                    Past Frequency: {q.frequencyPastYears}
                  </div>
                  <div className="text-[11px] text-slate-600 mb-1">
                    <strong className="text-slate-800">Keywords:</strong> {q.coreKeywordsRequired.join(', ')}
                  </div>
                  <div className="bg-slate-50 p-2 rounded text-[11px] text-slate-700">
                    <strong className="text-slate-800 block">Model Answer Outline:</strong>
                    {q.modelAnswerOutline}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Formulas & Diagrams */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-3">
              03. Critical Formulas, Theorems & Architecture
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {analysis.keyFormulasAndDiagrams.map((f, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-2.5 bg-slate-50">
                  <span className="font-bold text-slate-900 block">{f.title}</span>
                  <span className="font-mono text-[11px] text-slate-700 mt-1 block">{f.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Exam Hall Pacing */}
          <div className="border-t border-slate-200 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
              04. 180-Minute Exam Hall Pacing Protocol
            </h3>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              {analysis.examTimeAllocationStrategy.sections.map((sec, idx) => (
                <div key={idx} className="border border-slate-200 p-2 rounded">
                  <div className="font-bold text-slate-800">{sec.sectionName}</div>
                  <div className="text-blue-700 font-semibold">{sec.allocatedMinutes} mins &middot; {sec.marks} Marks</div>
                  <div className="text-slate-500 mt-0.5">{sec.tip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Sparkles, BookOpen, Clock, Calendar, AlertCircle, RotateCw } from 'lucide-react';
import { SemesterSubject } from '../types/exam';

interface CustomSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubjectAdded: (subject: SemesterSubject) => void;
}

export const CustomSubjectModal: React.FC<CustomSubjectModalProps> = ({
  isOpen,
  onClose,
  onSubjectAdded,
}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('Computer Science');
  const [examDate, setExamDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 18);
    return d.toISOString().split('T')[0];
  });
  const [totalMarks, setTotalMarks] = useState<number>(100);
  const [durationMinutes, setDurationMinutes] = useState<number>(180);
  const [targetScore, setTargetScore] = useState<number>(90);
  const [syllabusText, setSyllabusText] = useState('');
  const [pyqText, setPyqText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter a subject name.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/analyze-syllabus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: name,
          syllabusText,
          pyqText,
          examFormat: `Total Marks: ${totalMarks}, Duration: ${durationMinutes} minutes`,
          totalMarks,
          durationMinutes
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze exam syllabus');
      }

      const data = await response.json();
      const analysisResult = data.analysis;

      const newSubject: SemesterSubject = {
        id: `custom-${Date.now()}`,
        code: code.trim() || 'SUB-101',
        name: name.trim(),
        category,
        examDate,
        totalMarks: Number(totalMarks),
        durationMinutes: Number(durationMinutes),
        targetScore: Number(targetScore),
        syllabusSnippet: syllabusText.slice(0, 150) + (syllabusText.length > 150 ? '...' : ''),
        pyqSnippet: pyqText.slice(0, 150) + (pyqText.length > 150 ? '...' : ''),
        analysis: analysisResult
      };

      onSubjectAdded(newSubject);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg('An error occurred during analysis. Using local exam analysis model.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePreloadSample = () => {
    setName('Database Management Systems & SQL');
    setCode('CS-304');
    setCategory('Computer Science');
    setSyllabusText(`Unit 1: ER Modeling, Relational Algebra, Tuple Calculus.
Unit 2: SQL, Nested Queries, Triggers, Views.
Unit 3: Normalization (1NF, 2NF, 3NF, BCNF, 4NF, 5NF), Dependency Preservation.
Unit 4: Transaction Processing, ACID, Serializability (Conflict & View), Concurrency Control (2PL, Timestamp, Graph-based).
Unit 5: Crash Recovery, WAL, ARIES Algorithm, Indexing (B+ Trees, Hashing).`);
    setPyqText(`1. Explain BCNF and prove why every BCNF relation is in 3NF. (Repeated 2021, 2023, 2024)
2. Explain Two-Phase Locking (2PL) and prove how Strict 2PL prevents cascading rollbacks. (Repeated 4/5 yrs)
3. Write complex SQL queries for correlated subqueries and group by having clauses.
4. Construct B+ tree insertion of order 4 with node splits.`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100 bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>AI Exam Evaluator Engine</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Analyze New Subject or Semester Syllabus
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Paste your curriculum or past exam questions to generate high-yield topics, marking schemes, and chronobiology study timings.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleAnalyze} className="p-6 sm:p-8 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Need quick testing?</span>
            <button
              type="button"
              onClick={handlePreloadSample}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Fill Sample (DBMS Course)
            </button>
          </div>

          {/* Subject Title & Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subject Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Distributed Systems & Cloud Computing"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Course Code
              </label>
              <input
                type="text"
                placeholder="e.g. CS-401"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Exam Details Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Exam Date
              </label>
              <input
                type="date"
                required
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Total Marks
              </label>
              <input
                type="number"
                min="20"
                max="200"
                value={totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Duration (Mins)
              </label>
              <input
                type="number"
                min="30"
                max="300"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target %
              </label>
              <input
                type="number"
                min="50"
                max="100"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Syllabus Text Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Syllabus Units / Lecture Topics
            </label>
            <textarea
              rows={4}
              placeholder="Paste units, chapters, modules, or key concepts from your course syllabus..."
              value={syllabusText}
              onChange={(e) => setSyllabusText(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
            />
          </div>

          {/* Past Questions / PYQs Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Previous Year Questions (PYQs) or Teacher Focus Notes (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Paste past exam questions or topics emphasized by your professor..."
              value={pyqText}
              onChange={(e) => setPyqText(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <RotateCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{isAnalyzing ? 'Analyzing Syllabus & Papers...' : 'Generate High-Yield Blueprint'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

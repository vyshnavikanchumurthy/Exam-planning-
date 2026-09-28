import React from 'react';
import { Calendar, Clock, Award, FileText, CheckCircle2 } from 'lucide-react';
import { SemesterSubject } from '../types/exam';

interface SubjectHeaderProps {
  subject: SemesterSubject;
  masteredCount: number;
  totalQuestions: number;
}

export const SubjectHeader: React.FC<SubjectHeaderProps> = ({
  subject,
  masteredCount,
  totalQuestions,
}) => {
  const examDateFormatted = new Date(subject.examDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const daysLeft = Math.ceil(
    (new Date(subject.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const masteryPercent = totalQuestions > 0 ? Math.round((masteredCount / totalQuestions) * 100) : 0;

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <span>{subject.code}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{subject.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {subject.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-3xl leading-relaxed">
              {subject.analysis.summary}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center min-w-[100px]">
              <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Exam Date</span>
              <div className="flex items-center justify-center gap-1.5 mt-0.5 font-bold text-slate-800 text-sm">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>{examDateFormatted}</span>
              </div>
              <span className="text-[10px] text-slate-500">
                {daysLeft > 0 ? `${daysLeft} days remaining` : 'Exam today!'}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center min-w-[100px]">
              <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Format</span>
              <div className="flex items-center justify-center gap-1.5 mt-0.5 font-bold text-slate-800 text-sm">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{subject.durationMinutes} mins</span>
              </div>
              <span className="text-[10px] text-slate-500">{subject.totalMarks} Total Marks</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center min-w-[100px]">
              <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Target Score</span>
              <div className="flex items-center justify-center gap-1.5 mt-0.5 font-bold text-blue-600 text-sm">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>{subject.targetScore}%</span>
              </div>
              <span className="text-[10px] text-slate-500">Grade A / Distinction</span>
            </div>

            <div className="bg-blue-50/60 border border-blue-200 rounded-xl px-4 py-2.5 text-center min-w-[110px]">
              <span className="block text-[11px] font-semibold text-blue-700 uppercase tracking-wider">Mastered Qs</span>
              <div className="flex items-center justify-center gap-1.5 mt-0.5 font-bold text-blue-900 text-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{masteredCount} / {totalQuestions}</span>
              </div>
              <span className="text-[10px] text-blue-600 font-medium">{masteryPercent}% Prepared</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

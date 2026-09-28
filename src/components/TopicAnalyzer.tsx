import React, { useState } from 'react';
import { HighYieldTopic, KeyFormulaDiagram } from '../types/exam';
import { Sparkles, Clock, AlertTriangle, CheckSquare, Square, ChevronRight, BarChart2, BookOpen } from 'lucide-react';

interface TopicAnalyzerProps {
  topics: HighYieldTopic[];
  formulas: KeyFormulaDiagram[];
  subjectName: string;
}

export const TopicAnalyzer: React.FC<TopicAnalyzerProps> = ({
  topics,
  formulas,
  subjectName,
}) => {
  const [completedConcepts, setCompletedConcepts] = useState<Record<string, boolean>>({});
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const toggleConcept = (conceptKey: string) => {
    setCompletedConcepts(prev => ({
      ...prev,
      [conceptKey]: !prev[conceptKey]
    }));
  };

  const filteredTopics = topics.filter(t => {
    if (filterDifficulty === 'all') return true;
    return t.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
  });

  const totalWeightage = topics.reduce((acc, curr) => acc + curr.estimatedWeightagePercent, 0);
  const totalRecommendedHours = topics.reduce((acc, curr) => acc + curr.recommendedHours, 0);

  return (
    <div className="space-y-8">
      {/* Overview & High-Yield Strategy Callout */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span>Pareto 80/20 High-Yield Exam Breakdown</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Core Modules Driving ~{totalWeightage}% of Total Exam Marks
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Based on historical semester exam frequency, mastery of these {topics.length} core focus areas ensures maximum mark yield with optimal revision time investment.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 shrink-0">
            <div className="text-center px-2">
              <span className="text-xs text-slate-400 font-medium block">Total High-Yield Hours</span>
              <span className="text-2xl font-bold text-white mt-0.5">{totalRecommendedHours} hrs</span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div className="text-center px-2">
              <span className="text-xs text-slate-400 font-medium block">Estimated Weightage</span>
              <span className="text-2xl font-bold text-amber-400 mt-0.5">~{totalWeightage}%</span>
            </div>
          </div>
        </div>

        {/* Aggregate Weightage Visual Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
            <span>Module Weightage Distribution Across Paper</span>
            <span>100% Total Syllabus</span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
            {topics.map((t, idx) => {
              const colors = [
                'bg-blue-500',
                'bg-emerald-500',
                'bg-amber-500',
                'bg-indigo-400',
                'bg-rose-400',
                'bg-purple-400'
              ];
              const color = colors[idx % colors.length];
              return (
                <div
                  key={t.title}
                  style={{ width: `${t.estimatedWeightagePercent}%` }}
                  className={`${color} h-full transition-all duration-300 hover:opacity-80`}
                  title={`${t.title}: ${t.estimatedWeightagePercent}%`}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2.5 text-xs text-slate-400">
            {topics.map((t, idx) => {
              const dots = [
                'text-blue-400',
                'text-emerald-400',
                'text-amber-400',
                'text-indigo-400',
                'text-rose-400',
                'text-purple-400'
              ];
              return (
                <div key={t.title} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${dots[idx % dots.length].replace('text-', 'bg-')}`} />
                  <span className="text-slate-300">{t.title}</span>
                  <span className="font-semibold text-slate-400">({t.estimatedWeightagePercent}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter Tabs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Detailed Topic Breakdown & Must-Master Concepts
          </h3>
          <p className="text-xs text-slate-500">
            Prioritize Challenging & Very High probability topics during your peak chronotype focus hours.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setFilterDifficulty('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filterDifficulty === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Difficulties
          </button>
          <button
            onClick={() => setFilterDifficulty('challenging')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filterDifficulty === 'challenging'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Challenging
          </button>
          <button
            onClick={() => setFilterDifficulty('medium')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filterDifficulty === 'medium'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilterDifficulty('easy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filterDifficulty === 'easy'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Easy (Quick Wins)
          </button>
        </div>
      </div>

      {/* Topic Cards List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTopics.map((topic, index) => {
          return (
            <div
              key={topic.title}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200"
            >
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-blue-600">{topic.moduleOrUnit}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {topic.recommendedHours} hrs recommended
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span className={`font-medium ${
                      topic.difficulty === 'Challenging' ? 'text-rose-600' : topic.difficulty === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {topic.difficulty} Difficulty
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900">
                    {index + 1}. {topic.title}
                  </h4>
                </div>

                {/* Weightage & Recurrence Badges */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Weightage</div>
                    <div className="text-lg font-bold text-slate-900">
                      {topic.estimatedWeightagePercent}%
                    </div>
                  </div>

                  <div className="h-8 w-px bg-slate-200" />

                  <div className="text-right">
                    <div className="text-xs text-slate-500">Past Recurrence</div>
                    <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      {topic.recurrenceProbability}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rationale & Why High Yield */}
              <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
                      Examiner Pattern & High-Yield Rationale:
                    </span>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {topic.whyHighYield}
                    </p>
                  </div>
                </div>
              </div>

              {/* Must Master Concepts Checklist */}
              <div className="mt-5">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
                  Must-Master Concepts Checklist:
                </span>
                <div className="space-y-2">
                  {topic.mustMasterConcepts.map((concept, cIdx) => {
                    const conceptKey = `${topic.title}-${cIdx}`;
                    const isChecked = !!completedConcepts[conceptKey];
                    return (
                      <button
                        key={conceptKey}
                        onClick={() => toggleConcept(conceptKey)}
                        className={`w-full text-left flex items-start gap-3 p-2.5 rounded-lg border transition-all text-xs ${
                          isChecked
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                            : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <span className={isChecked ? 'line-through text-slate-500' : 'font-medium'}>
                          {concept}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Formulas & Architecture Diagrams Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <BookOpen className="w-4 h-4" />
              <span>High-Yield Memorization Blueprint</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Key Formulas, Theorems & Architecture Schematics
            </h3>
            <p className="text-xs text-slate-500">
              Examiners award immediate partial credit when these formulas and labeled diagrams are presented accurately at the beginning of an answer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formulas.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-blue-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-semibold text-slate-900 text-sm">{item.title}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    item.priority === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-3 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

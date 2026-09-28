import React, { useState } from 'react';
import { Chronotype, StudyScheduleData, SemesterSubject } from '../types/exam';
import {
  Sun,
  Moon,
  Clock,
  Zap,
  Calendar,
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  RotateCw
} from 'lucide-react';

interface StudyTimingScheduleProps {
  currentSubject: SemesterSubject;
  allSubjects: SemesterSubject[];
}

export const StudyTimingSchedule: React.FC<StudyTimingScheduleProps> = ({
  currentSubject,
  allSubjects,
}) => {
  const [chronotype, setChronotype] = useState<Chronotype>('morning');
  const [dailyHours, setDailyHours] = useState<number>(6);
  const [targetScore, setTargetScore] = useState<number>(currentSubject.targetScore || 90);
  const [daysRemaining, setDaysRemaining] = useState<number>(() => {
    const diff = Math.ceil(
      (new Date(currentSubject.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(1, diff);
  });

  const [isLoadingAiSchedule, setIsLoadingAiSchedule] = useState(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // Default initial schedule based on chronotype
  const [scheduleData, setScheduleData] = useState<StudyScheduleData>(() =>
    generateScheduleLocal(chronotype, dailyHours, daysRemaining, targetScore, allSubjects.map(s => s.name))
  );

  function generateScheduleLocal(
    type: Chronotype,
    hours: number,
    days: number,
    target: number,
    subjects: string[]
  ): StudyScheduleData {
    const isMorn = type === 'morning';
    const isNight = type === 'night';

    const blueprint = [
      {
        timeSlot: isMorn ? '06:30 - 08:30' : isNight ? '20:00 - 22:00' : '14:00 - 16:00',
        energyLevel: 'Peak Deep Work (Optimal Cortisol)',
        activityType: 'Challenging Derivations, Complex Proofs & Core Algorithms',
        chronobiologyTip: isMorn
          ? 'Morning cortisol peak maximizes abstract synthesis and short-term working memory capacity.'
          : isNight
          ? 'Quiet night environment eliminates sensory distractions for sustained deep algorithmic problem solving.'
          : 'Afternoon post-lunch wakefulness peak enables strong mathematical focus.'
      },
      {
        timeSlot: isMorn ? '09:30 - 11:30' : isNight ? '22:30 - 00:30' : '16:30 - 18:30',
        energyLevel: 'High Analytical Speed',
        activityType: 'Timed Previous Year Question (PYQ) Mock Solving',
        chronobiologyTip: 'Matches actual semester examination time window; conditions your brain to operate under time pressure.'
      },
      {
        timeSlot: isMorn ? '14:30 - 16:00' : isNight ? '16:00 - 17:30' : '10:00 - 11:30',
        energyLevel: 'Moderate Energy (Active Recall)',
        activityType: 'Flashcards, Labeled Diagrams & Terminology Drills',
        chronobiologyTip: 'Visual and recognition tasks require lower verbal working memory during post-circadian dips.'
      },
      {
        timeSlot: isMorn ? '17:30 - 19:00' : isNight ? '18:00 - 19:30' : '19:30 - 21:00',
        energyLevel: 'Second Focus Peak',
        activityType: 'Marking Scheme Self-Evaluation & Mistake Analysis',
        chronobiologyTip: 'Critical analytical thinking is refreshed; perfect for assessing where marks were lost.'
      },
      {
        timeSlot: isMorn ? '21:00 - 21:30' : isNight ? '01:00 - 01:30' : '22:00 - 22:30',
        energyLevel: 'Low Energy (Pre-Sleep Consolidation)',
        activityType: 'Formula Sheet Review & Tomorrow Priority Mapping',
        chronobiologyTip: 'Reviewing key formulas directly before slow-wave sleep enhances memory consolidation.'
      }
    ];

    const daysCount = Math.min(days, 14);
    const subList = subjects.length > 0 ? subjects : [currentSubject.name];
    const daysPlan = [];

    for (let i = 1; i <= daysCount; i++) {
      const subj = subList[(i - 1) % subList.length];
      const isMockDay = i % 4 === 0 || i === daysCount;

      daysPlan.push({
        dayNumber: i,
        relativeDay: `Day ${i} (${isMockDay ? 'Full Mock & High-Yield Sprint' : 'Core Topic Deep Dive'})`,
        primarySubject: subj,
        focusTopics: isMockDay
          ? ['Full 3-Hour Timed Question Paper', 'Common Pitfalls & Examiner Trap Review']
          : [`High-Yield Unit ${(i % 3) + 1} Questions`, 'Formula & Derivation Memorization'],
        targetQuestionsCount: isMockDay ? 12 : 7,
        estimatedHours: hours,
        milestone: isMockDay
          ? `Score ${target}% on timed practice paper under exam hall conditions`
          : `Master top 30% weightage questions for ${subj}`
      });
    }

    return {
      overview: {
        totalStudyHoursPlanned: hours * daysCount,
        strategySummary: `Optimized for ${type} chronotype. Spaced intervals prioritize highest weightage modules during peak focus windows.`,
        recommendedPomodoroInterval: '50 min Deep Work + 10 min Active Recovery'
      },
      dailyTimingBlueprint: blueprint,
      daysPlan,
      examDayPacingGuide: [
        'Minute 0 - 15: Read full question paper. Star questions with highest confidence and plan optional section choices.',
        'Minute 15 - 45: Section A short answers. Maximum 3 mins per question with direct technical definitions.',
        'Minute 45 - 110: Section B medium analytical questions. Include neat labeled diagram and comparison tables.',
        'Minute 110 - 165: Section C comprehensive derivations/problems. Start each on a fresh page; box final equations.',
        'Minute 165 - 180: Final revision buffer. Double check question numbering, sub-part letters, and unit labels.'
      ]
    };
  }

  // Generate with AI
  const handleRegenerateSchedule = async () => {
    setIsLoadingAiSchedule(true);
    try {
      const res = await fetch('/api/generate-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjects: allSubjects.map(s => s.name),
          dailyHours,
          chronotype,
          daysRemaining,
          targetScore
        })
      });
      const data = await res.json();
      if (data.schedule) {
        setScheduleData(data.schedule);
      } else {
        setScheduleData(generateScheduleLocal(chronotype, dailyHours, daysRemaining, targetScore, allSubjects.map(s => s.name)));
      }
    } catch {
      setScheduleData(generateScheduleLocal(chronotype, dailyHours, daysRemaining, targetScore, allSubjects.map(s => s.name)));
    } finally {
      setIsLoadingAiSchedule(false);
    }
  };

  const toggleDayCompleted = (dayNum: number) => {
    setCompletedDays(prev =>
      prev.includes(dayNum) ? prev.filter(d => d !== dayNum) : [...prev, dayNum]
    );
  };

  return (
    <div className="space-y-8">
      {/* Control Panel: Chronotype, Daily Hours, Target Score */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <Zap className="w-4 h-4" />
              <span>Academic Chronobiology & Pacing</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Study Timing Optimizer & Daily Schedule
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Aligning your most cognitively demanding exam topics with your natural biological alertness cycles increases retention by up to 40%.
            </p>
          </div>

          <button
            onClick={handleRegenerateSchedule}
            disabled={isLoadingAiSchedule}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all disabled:opacity-50 shrink-0"
          >
            {isLoadingAiSchedule ? (
              <RotateCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isLoadingAiSchedule ? 'Optimizing Plan...' : 'Recalculate Timing Plan'}</span>
          </button>
        </div>

        {/* Configuration Sliders & Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Chronotype Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Your Chronotype (Peak Focus)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setChronotype('morning')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  chronotype === 'morning'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Sun className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                <span className="text-xs block">Morning Lark</span>
                <span className="text-[10px] text-slate-400 block">6am - 11am</span>
              </button>

              <button
                onClick={() => setChronotype('afternoon')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  chronotype === 'afternoon'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <TrendingUp className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                <span className="text-xs block">Afternoon</span>
                <span className="text-[10px] text-slate-400 block">1pm - 6pm</span>
              </button>

              <button
                onClick={() => setChronotype('night')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  chronotype === 'night'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Moon className="w-4 h-4 mx-auto mb-1 text-indigo-500" />
                <span className="text-xs block">Night Owl</span>
                <span className="text-[10px] text-slate-400 block">8pm - 1am</span>
              </button>
            </div>
          </div>

          {/* Daily Study Hours Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Daily Study Hours
              </label>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {dailyHours} Hours/Day
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              step="1"
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>2 hrs (Light)</span>
              <span>6 hrs (Balanced)</span>
              <span>12 hrs (Sprint)</span>
            </div>
          </div>

          {/* Days Left Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Days Remaining Until Exams
              </label>
              <span className="text-xs font-bold text-slate-900">
                {daysRemaining} Days
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={daysRemaining}
              onChange={(e) => setDaysRemaining(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1 Day (Emergency)</span>
              <span>14 Days (Standard)</span>
              <span>30 Days (Full Prep)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Chronobiology Timing Blueprint */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <Clock className="w-4 h-4" />
              <span>Your Ideal 24-Hour Cycle</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Daily Study Timing Slots & Focus Intensity
            </h3>
            <p className="text-xs text-slate-500">
              Matches high-yield exam tasks to circadian alertness phases.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 text-blue-900 text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-100 self-start sm:self-auto">
            <span>Interval: 50m Deep Work + 10m Pause</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {scheduleData.dailyTimingBlueprint.map((slot, sIdx) => {
            const isPeak = slot.energyLevel.includes('Peak');
            return (
              <div
                key={sIdx}
                className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                  isPeak
                    ? 'border-blue-200 bg-blue-50/30'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-start md:items-center gap-3">
                  <div className={`px-2.5 py-1.5 rounded-lg text-xs font-bold font-mono shrink-0 ${
                    isPeak ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {slot.timeSlot}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{slot.activityType}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isPeak ? 'bg-blue-100 text-blue-800' : 'bg-slate-200/80 text-slate-700'
                      }`}>
                        {slot.energyLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {slot.chronobiologyTip}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-medium shrink-0 self-end md:self-center">
                  Slot #{sIdx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Multi-Day Milestone Plan */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Step-by-Step Roadmap</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {scheduleData.daysPlan.length}-Day Semester Exam Preparation Schedule
            </h3>
            <p className="text-xs text-slate-500">
              Track your day-by-day high-yield milestones leading directly into the examination hall.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500 block">Completed</span>
            <span className="text-sm font-bold text-blue-600">
              {completedDays.length} of {scheduleData.daysPlan.length} Days
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scheduleData.daysPlan.map((day) => {
            const isCompleted = completedDays.includes(day.dayNumber);

            return (
              <div
                key={day.dayNumber}
                onClick={() => toggleDayCompleted(day.dayNumber)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-slate-200 hover:border-blue-300 hover:shadow-xs bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                    )}
                    <span className={`text-sm font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {day.relativeDay}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                    {day.estimatedHours} hrs
                  </span>
                </div>

                <div className="ml-7 space-y-2">
                  <div className="text-xs text-blue-600 font-semibold">
                    {day.primarySubject}
                  </div>

                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    {day.focusTopics.map((topic, tIdx) => (
                      <li key={tIdx} className="truncate">{topic}</li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Target: {day.targetQuestionsCount} Qs</span>
                    <span className="text-emerald-700 font-semibold">{day.milestone}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exam Hall Pacing Guide */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Examiner Protocol</span>
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight mb-4">
          Exam Hall Pacing Strategy (180-Minute Master Plan)
        </h3>

        <div className="space-y-3">
          {scheduleData.examDayPacingGuide.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-200 flex items-start gap-3"
            >
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

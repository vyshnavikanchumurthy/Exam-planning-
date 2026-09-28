import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Clock, Target, AlertCircle, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { SemesterSubject } from '../types/exam';

interface StudyTimerProps {
  currentSubject: SemesterSubject;
}

export const StudyTimer: React.FC<StudyTimerProps> = ({ currentSubject }) => {
  const [mode, setMode] = useState<'study' | 'exam'>('study');

  // Study Pomodoro State
  const [pomodoroDuration, setPomodoroDuration] = useState<number>(50); // minutes
  const [breakDuration, setBreakDuration] = useState<number>(10);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [studySecondsLeft, setStudySecondsLeft] = useState<number>(50 * 60);
  const [isStudyRunning, setIsStudyRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [isAmbientOn, setIsAmbientOn] = useState<boolean>(false);

  // Exam Simulator State
  const examSections = currentSubject.analysis.examTimeAllocationStrategy.sections || [
    { sectionName: 'Reading & Question Selection', marks: 0, allocatedMinutes: 15, tip: 'Scan all questions. Circle optional questions with highest familiarity.' },
    { sectionName: 'Section A (Short Questions)', marks: 20, allocatedMinutes: 30, tip: 'Stick to 3 mins per question. Write crisp definitions.' },
    { sectionName: 'Section B (Medium Analytical)', marks: 40, allocatedMinutes: 65, tip: 'Ensure a structured comparative table and clean diagram for each.' },
    { sectionName: 'Section C (Long Derivations)', marks: 40, allocatedMinutes: 60, tip: 'Start each on fresh page. Highlight final boxed equations.' },
    { sectionName: 'Final Inspection & Revision', marks: 0, allocatedMinutes: 10, tip: 'Check question numbering matches answer sheet and unit notations.' },
  ];

  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [sectionSecondsLeft, setSectionSecondsLeft] = useState<number>(
    (examSections[0]?.allocatedMinutes || 15) * 60
  );
  const [isExamRunning, setIsExamRunning] = useState<boolean>(false);

  // Study Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStudyRunning && studySecondsLeft > 0) {
      interval = setInterval(() => {
        setStudySecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (isStudyRunning && studySecondsLeft === 0) {
      // Transition between study and break
      soundManager.playChime('complete');
      if (!isBreak) {
        setIsBreak(true);
        setStudySecondsLeft(breakDuration * 60);
        setCompletedSessions(prev => prev + 1);
      } else {
        setIsBreak(false);
        setStudySecondsLeft(pomodoroDuration * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStudyRunning, studySecondsLeft, isBreak, pomodoroDuration, breakDuration]);

  // Exam Simulator Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isExamRunning && sectionSecondsLeft > 0) {
      interval = setInterval(() => {
        setSectionSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (isExamRunning && sectionSecondsLeft === 0) {
      soundManager.playChime('complete');
      if (currentSectionIndex < examSections.length - 1) {
        const nextIdx = currentSectionIndex + 1;
        setCurrentSectionIndex(nextIdx);
        setSectionSecondsLeft(examSections[nextIdx].allocatedMinutes * 60);
      } else {
        setIsExamRunning(false);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isExamRunning, sectionSecondsLeft, currentSectionIndex, examSections]);

  const toggleStudyTimer = () => {
    if (!isStudyRunning) {
      soundManager.playChime('start');
    }
    setIsStudyRunning(!isStudyRunning);
  };

  const resetStudyTimer = () => {
    setIsStudyRunning(false);
    setIsBreak(false);
    setStudySecondsLeft(pomodoroDuration * 60);
  };

  const handleDurationChange = (workMins: number, restMins: number) => {
    setPomodoroDuration(workMins);
    setBreakDuration(restMins);
    setIsBreak(false);
    setIsStudyRunning(false);
    setStudySecondsLeft(workMins * 60);
  };

  const toggleAmbientSound = () => {
    const newState = !isAmbientOn;
    setIsAmbientOn(newState);
    soundManager.toggleAmbient(newState);
  };

  const toggleExamSimulator = () => {
    if (!isExamRunning) {
      soundManager.playChime('start');
    }
    setIsExamRunning(!isExamRunning);
  };

  const resetExamSimulator = () => {
    setIsExamRunning(false);
    setCurrentSectionIndex(0);
    setSectionSecondsLeft(examSections[0].allocatedMinutes * 60);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Current Exam Section stats
  const activeSection = examSections[currentSectionIndex] || examSections[0];
  const sectionTotalSeconds = activeSection.allocatedMinutes * 60;
  const sectionProgressPercent = Math.round(
    ((sectionTotalSeconds - sectionSecondsLeft) / sectionTotalSeconds) * 100
  );

  return (
    <div className="space-y-8">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center">
        <div className="bg-slate-100 p-1.5 rounded-xl border border-slate-200 flex items-center gap-1">
          <button
            onClick={() => setMode('study')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'study'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Chronobiology Deep Focus Timer</span>
          </button>
          <button
            onClick={() => setMode('exam')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'exam'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4 text-amber-600" />
            <span>3-Hour Semester Exam Hall Pacer</span>
          </button>
        </div>
      </div>

      {mode === 'study' ? (
        /* FOCUS TIMER MODE */
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 text-center shadow-xs">
            {/* Header & Focus interval selector */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                isBreak ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {isBreak ? 'Active Pause / Hydration' : 'High-Yield Deep Work'}
              </span>

              {/* Focus Intervals */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => handleDurationChange(50, 10)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${
                    pomodoroDuration === 50 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  50 / 10 min
                </button>
                <button
                  onClick={() => handleDurationChange(25, 5)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded ${
                    pomodoroDuration === 25 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  25 / 5 min
                </button>
              </div>
            </div>

            {/* Giant Digital Time Display */}
            <div className="py-8">
              <div className="text-7xl sm:text-8xl font-mono font-bold tracking-tight text-slate-900">
                {formatTime(studySecondsLeft)}
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Targeting: <span className="text-blue-600 font-semibold">{currentSubject.name}</span>
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleStudyTimer}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md shadow-blue-500/20 text-sm transition-all active:scale-95"
              >
                {isStudyRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                <span>{isStudyRunning ? 'Pause Session' : 'Start Focus Block'}</span>
              </button>

              <button
                onClick={resetStudyTimer}
                className="p-3 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {/* Ambient Brown Noise Toggle */}
              <button
                onClick={toggleAmbientSound}
                className={`p-3 rounded-2xl border transition-colors ${
                  isAmbientOn
                    ? 'bg-amber-50 border-amber-300 text-amber-700 shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
                title={isAmbientOn ? 'Mute Focus Hum' : 'Play Ambient Brown Noise'}
              >
                {isAmbientOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>

            {/* Sessions count */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Completed Focus Sessions Today:</span>
              <span className="font-bold text-slate-800 text-sm">{completedSessions} blocks ({completedSessions * pomodoroDuration} mins)</span>
            </div>
          </div>
        </div>
      ) : (
        /* EXAM HALL PACING SIMULATOR MODE */
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Simulated Examination Hall Timer
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentSubject.name} &middot; {currentSubject.durationMinutes} Mins Exam
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleExamSimulator}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md active:scale-95"
                >
                  {isExamRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isExamRunning ? 'Pause Exam' : 'Start Timed Exam'}</span>
                </button>

                <button
                  onClick={resetExamSimulator}
                  className="p-2.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl border border-slate-700 transition-colors"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Current Section Pacing Card */}
            <div className="py-8 text-center">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
                Current Section ({currentSectionIndex + 1} of {examSections.length})
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {activeSection.sectionName}
              </h4>
              <div className="text-6xl sm:text-7xl font-mono font-bold tracking-tight text-amber-400">
                {formatTime(sectionSecondsLeft)}
              </div>
              <p className="text-xs text-slate-300 mt-3 max-w-lg mx-auto bg-slate-800/90 border border-slate-700/80 rounded-xl p-3">
                <span className="font-semibold text-amber-300">Pacing Rule: </span>
                {activeSection.tip}
              </p>
            </div>

            {/* Section Phase Stepper */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-6 border-t border-slate-800">
              {examSections.map((sec, idx) => {
                const isPassed = idx < currentSectionIndex;
                const isCurrent = idx === currentSectionIndex;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentSectionIndex(idx);
                      setSectionSecondsLeft(sec.allocatedMinutes * 60);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isCurrent
                        ? 'border-amber-400 bg-amber-400/10'
                        : isPassed
                        ? 'border-emerald-600/60 bg-emerald-950/20 text-slate-400'
                        : 'border-slate-800 bg-slate-800/50 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold">{idx + 1}. Part {String.fromCharCode(65 + idx)}</span>
                      <span>{sec.allocatedMinutes}m</span>
                    </div>
                    <div className="text-[11px] font-medium text-slate-200 truncate">
                      {sec.sectionName}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Flashcard } from '../types/exam';
import { RotateCw, CheckCircle2, XCircle, ArrowLeft, ArrowRight, Shuffle, Sparkles, BrainCircuit } from 'lucide-react';

interface FlashcardDeckProps {
  flashcards: Flashcard[];
  subjectName: string;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ flashcards, subjectName }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredCards, setMasteredCards] = useState<number[]>([]);
  const [cards, setCards] = useState<Flashcard[]>(flashcards);

  const currentCard = cards[currentIndex] || cards[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const toggleMastered = (idx: number) => {
    setMasteredCards(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
    handleNext();
  };

  const isCurrentMastered = masteredCards.includes(currentIndex);
  const masteryPercent = cards.length > 0 ? Math.round((masteredCards.length / cards.length) * 100) : 0;

  if (!currentCard) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
        <p className="text-slate-500 text-sm">No flashcards available for this subject.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <BrainCircuit className="w-4 h-4" />
            <span>Active Recall & Spaced Repetition</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            High-Yield Flashcard Deck
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Test yourself before viewing the model answer points.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-500 block">Mastery</span>
          <span className="text-lg font-bold text-blue-600">
            {masteredCards.length} / {cards.length} ({masteryPercent}%)
          </span>
        </div>
      </div>

      {/* Flip Card Container */}
      <div
        onClick={handleFlip}
        className="min-h-[320px] bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md select-none relative"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
              {currentCard.category}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              currentCard.difficulty === 'Hard' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {currentCard.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 font-mono">
            <span>{currentIndex + 1}</span>
            <span>/</span>
            <span>{cards.length}</span>
          </div>
        </div>

        {/* Card Center Content */}
        <div className="my-auto py-6 text-center">
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-3">
            {isFlipped ? 'Evaluator Expected Answer' : 'Exam Concept Question'}
          </div>

          <p className={`text-slate-900 leading-relaxed font-semibold transition-all ${
            isFlipped ? 'text-base sm:text-lg font-normal text-slate-800 whitespace-pre-line text-left bg-slate-50 p-6 rounded-2xl border border-slate-200' : 'text-xl sm:text-2xl'
          }`}>
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
        </div>

        {/* Card Footer Hint */}
        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <RotateCw className="w-3.5 h-3.5" />
          <span>Click anywhere to flip card</span>
        </div>
      </div>

      {/* Navigation & Mastery Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors shadow-xs"
            title="Previous Card"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleShuffle}
            className="p-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors shadow-xs"
            title="Shuffle Deck"
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="p-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors shadow-xs"
            title="Next Card"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Self-Rating Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleMastered(currentIndex)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all shadow-xs ${
              isCurrentMastered
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCurrentMastered ? 'Mastered!' : 'Mark Mastered'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

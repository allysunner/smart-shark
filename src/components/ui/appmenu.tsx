"use client";

import { useState } from "react";
import CalculatorModal from "@/components/apps/calculator";
import StickyNoteModal from "@/components/apps/postit";
import ChalkboardModal from "@/components/apps/chalkboard";

interface AppMenuProps {
  onClose: () => void;
}

export default function AppMenu({ onClose }: AppMenuProps) {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showStickyNote, setShowStickyNote] = useState(false);
  const [showChalkboard, setShowChalkboard] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);

  const handleCalculatorClick = () => {
    setMenuVisible(false);
    setTimeout(() => setShowCalculator(true), 200);
  };

  const handleStickyNoteClick = () => {
    setMenuVisible(false);
    setTimeout(() => setShowStickyNote(true), 200);
  };

  const handleChalkboardClick = () => {
    setMenuVisible(false);
    setTimeout(() => setShowChalkboard(true), 200);
  };

  const handleCloseCalculator = () => {
    setShowCalculator(false);
    setMenuVisible(true);
  };

  const handleCloseStickyNote = () => {
    setShowStickyNote(false);
    setMenuVisible(true);
  };

  const handleCloseChalkboard = () => {
    setShowChalkboard(false);
    setMenuVisible(true);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[999] bg-black/20 flex items-center justify-center transition-opacity duration-200 ${
          menuVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <div
          className={`backdrop-blur-sm shadow-border border-2 bg-white rounded-md w-1/2 h-4/5 relative transition-all duration-200 ${
            menuVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full bg-retrogreen h-7 border-b-2">
            <button
              onClick={onClose}
              className="absolute transition-all right-2 text-retroyellow hover:text-yellow-500 text-2xl font-bold cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="grid w-full grid-cols-5 py-10 justify-items-center gap-y-13">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex w-30 h-30 text-red-500 flex-col justify-center items-center space-y-[-5px] rounded-2xl bg-white border-2 shadow-border cursor-pointer">
                <i className="las la-stopwatch text-8xl"></i>
              </div>
              <div>
                <p className="text-md font-semibold text-[#262626] tracking-tight">
                  Pomodoro
                </p>
              </div>
            </div>

            <div className="flex w-30 h-30 text-amber-500 flex-col justify-center items-center space-y-[-5px] rounded-2xl bg-white border-2 shadow-border cursor-pointer">
              <i className="las la-copy text-8xl "></i>
              <p className="text-xs text-black/90 tracking-tight">Flashcards</p>
            </div>

            <div className="flex w-30 h-30  text-cyan-500 flex-col justify-center items-center space-y-[-5px] rounded-2xl bg-white border-2 shadow-border cursor-pointer">
              <i className="las la-history text-8xl"></i>
              <p className="text-xs text-black/90 tracking-tight">
                Repetição Espaç.
              </p>
            </div>

            <div
              className="flex w-30 h-30 flex-col text-yellow-500 justify-center items-center space-y-[-5px] rounded-2xl bg-white border-2 shadow-border cursor-pointer"
              onClick={handleStickyNoteClick}
            >
              <i className="las la-sticky-note text-8xl "></i>
              <p className="text-xs text-black/90 tracking-tight">Post-It</p>
            </div>

            <div className="flex w-30 h-30 text-purple-500 flex-col justify-center items-center space-y-[-5px] rounded-2xl bg-white border-2 shadow-border cursor-pointer">
              <i className="las la-comments text-8xl "></i>
              <p className="text-xs text-black/90 tracking-tight">Feynman</p>
            </div>

            <div className="flex w-30 h-30 text-indigo-500 flex-col justify-center items-center space-y-[-5px] rounded-2xl bg-white border-2 shadow-border cursor-pointer">
              <i className="las la-brain text-8xl"></i>
              <p className="text-xs text-black/90 tracking-tight">
                Inteligência Art.
              </p>
            </div>

            <div
              className="flex w-30  text-rose-500 h-30 flex-col justify-center items-center space-y-[-5px] rounded-2xl bg-white border-2 shadow-border cursor-pointer"
              onClick={handleCalculatorClick}
            >
              <i className="las la-calculator text-8xl"></i>
              <p className="text-xs text-black/90 tracking-tight">
                Calculadora
              </p>
            </div>

            <div className="flex w-30 h-30  text-blue-500 flex-col justify-center items-center space-y-[-5px] rounded-2xl bg-white border-2 shadow-border cursor-pointer">
              <i className="las la-calendar text-8xl"></i>
              <p className="text-xs text-black/90 tracking-tight">Cronograma</p>
            </div>

            <div
              className="flex w-30 h-30  text-green-800 flex-col justify-center items-center space-y-[-5px] rounded-2xl bg-white border-2 shadow-border cursor-pointer"
              onClick={handleChalkboardClick}
            >
              <i className="las la-chalkboard-teacher text-8xl"></i>
              <p className="text-xs text-black/90 tracking-tight">
                Quadro Escolar
              </p>
            </div>
          </div>
        </div>
      </div>

      {showCalculator && (
        <div className="fixed inset-0 z-[1000]">
          <CalculatorModal onClose={handleCloseCalculator} />
        </div>
      )}

      {showStickyNote && (
        <div className="fixed inset-0 z-[1000]">
          <StickyNoteModal isOpen={true} onClose={handleCloseStickyNote} />
        </div>
      )}

      {showChalkboard && (
        <div className="fixed inset-0 z-[1000]">
          <ChalkboardModal isOpen={true} onClose={handleCloseChalkboard} />
        </div>
      )}
    </>
  );
}

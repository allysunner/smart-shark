"use client";

import { useState } from "react";
import CalculatorModal from "@/components/apps/calculator";
import StickyNoteModal from "@/components/apps/postit";
import ChalkboardModal from "@/components/apps/chalkboard";
import Image from "next/image";

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
          className={`backdrop-blur-sm shadow-border border-2 bg-white w-1/2 h-4/5 relative transition-all duration-200 ${
            menuVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`w-full flex justify-end p-1 border-b font-pixel text-xl gap-1 bg-[#2596be] transition-all duration-300 `}>               
            <span className="cursor-pointer shadow-[1px_1px_0px_0px_black] h-5 w-5 border flex items-center justify-center bg-retrored hover:bg-red-600"
                  onClick={onClose}>x</span>
          </div>

          <div className="grid w-full grid-cols-5 py-10 justify-items-center gap-y-13">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex w-30 h-30 text-red-500 flex-col justify-center items-center cursor-pointer">
                <img className="rounded" src={'/img/pomodoro-icon.jpg'} alt="haha" />
              </div>
              <div>
                <p className="text-lg font-pixel font-semibold text-[#262626] tracking-tight">
                  Pomodoro
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex w-30 h-30 text-red-500 flex-col justify-center items-center cursor-pointer">
                <img className="rounded" src={'/img/img1.jpg'} alt="haha" />
              </div>
              <div>
                <p className="text-lg font-pixel font-semibold text-[#262626] tracking-tight">
                  Calculadora
                </p>
              </div>
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

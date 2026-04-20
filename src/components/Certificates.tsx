/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CERTIFICATES } from "../constants";
import { Award, LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageOverlay } from "./ImageOverlay";

interface CertItem {
  title: string;
  issuer: string;
  date: string;
  file: string;
  image: string;
}

interface StackCardProps {
  cert: CertItem;
  position: number;
  total: number;
  onSelect: () => void;
  onFullscreen: () => void;
}

function StackCard({ cert, position, onSelect, onFullscreen }: StackCardProps) {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      animate={{
        x: `${position * 28}%`,
        scale: 1 - Math.abs(position) * 0.14,
        zIndex: 100 - Math.ceil(Math.abs(position) * 10),
        opacity: Math.abs(position) > 2 ? 0 : 1,
        filter: isActive ? "blur(0px)" : "blur(0.5px)",
      }}
      transition={{ type: "spring", damping: 30, stiffness: 150 }}
      onClick={(e) => {
        if (!isActive) {
          e.stopPropagation();
          onSelect();
        }
      }}
      className={`absolute inset-0 bg-white rounded-[2.5rem] border-4 border-navy/5 shadow-xl p-6 md:p-8 flex flex-col justify-between overflow-hidden cursor-pointer ${isActive ? "shadow-navy/10" : ""}`}
    >
      {!isActive && <div className="absolute inset-0 bg-white/50 z-[101]" />}

      {/* Background frame */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none p-8">
        <div className="w-full h-full border border-navy/20 relative rounded-2xl">
          <div className="absolute top-4 left-4 w-12 h-1 bg-navy/20" />
          <div className="absolute bottom-4 right-4 w-12 h-1 bg-navy/20" />
        </div>
      </div>

      <div className="relative z-10 flex justify-between items-start mb-4">
        <div className="space-y-1 pr-10">
          <div className="flex items-center gap-3">
            <Award size={18} className="text-gold" />
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-navy/40">
              {cert.issuer}
            </h4>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-navy leading-tight font-serif italic">
            {cert.title}
          </h3>
        </div>
        {isActive && (
          <button
            onClick={(e) => { e.stopPropagation(); onFullscreen(); }}
            className="absolute top-0 right-0 w-10 h-10 bg-paper border border-navy/5 text-navy rounded-full flex items-center justify-center shadow-sm hover:bg-navy hover:text-white transition-all active:scale-90"
          >
            <LayoutGrid size={16} />
          </button>
        )}
      </div>

      <div className="relative flex-1 bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-inner mb-2 bg-paper group/preview">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-contain pointer-events-none"
        />
        {isActive && (
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex justify-end opacity-0 group-hover/preview:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); onFullscreen(); }}
              className="px-4 py-2 bg-navy text-white rounded-full text-xs font-bold flex items-center gap-2 hover:bg-gold transition-colors shadow-lg"
            >
              <LayoutGrid size={14} />
              Enlarge Preview
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10 min-h-[0.5rem]" />
    </motion.div>
  );
}

const CATEGORY_META = [
  {
    description: "A rigorous pathway starting with FMVA®, followed by full specialization modules. Click adjacent cards or swipe to browse.",
  },
  {
    description: "Verified terminal expertise including Market Concepts, Spreadsheet Analysis, and ESG.",
  },
  {
    description: "Advanced technical proficiency in VBA, Python, and data visualization tools.",
  },
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  // Per-category active card index
  const [steps, setSteps] = useState([0, 0, 0]);

  const dragStartX = useRef<number | null>(null);

  const totalCategories = CERTIFICATES.length;
  const currentItems = CERTIFICATES[activeCategory].items;
  const currentStep = steps[activeCategory];

  const setStep = (cat: number, step: number) => {
    setSteps((prev) => {
      const next = [...prev];
      next[cat] = step;
      return next;
    });
  };

  const goNextCard = () => setStep(activeCategory, (currentStep + 1) % currentItems.length);
  const goPrevCard = () => setStep(activeCategory, (currentStep - 1 + currentItems.length) % currentItems.length);

  const goNextCategory = () => setActiveCategory((prev) => (prev + 1) % totalCategories);
  const goPrevCategory = () => setActiveCategory((prev) => (prev - 1 + totalCategories) % totalCategories);

  // Mouse swipe on stack
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = x;
  };

  const onDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const x = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const delta = x - dragStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? goNextCard() : goPrevCard();
    }
    dragStartX.current = null;
  };

  return (
    <section id="credentials" className="py-24 md:py-40 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          className="mb-20 text-center lg:text-left"
        >
          <div className="flex justify-center lg:justify-start items-center gap-3 text-gold mb-6">
            <Award size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Validation of Expertise</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold text-navy tracking-tight leading-[0.9]">
            Professional <br /> <span className="text-gold italic font-serif">Credentials.</span>
          </h2>
        </motion.div>

        {/* Unified carousel */}
        <div className="relative flex items-start justify-center gap-4 md:gap-8">

          {/* Left category arrow */}
          <button
            onClick={goPrevCategory}
            className="mt-[200px] flex-shrink-0 w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-navy hover:border-navy transition-all duration-200 active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Center: animated heading + card stack */}
          <div className="flex flex-col items-center gap-10 flex-1 min-w-0 max-w-2xl">

            {/* Animated category heading */}
            <div className="text-center space-y-4 w-full min-h-[120px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-navy tracking-tight">
                    {CERTIFICATES[activeCategory].category}
                  </h3>
                  <p className="text-gray-500 text-base leading-relaxed max-w-lg mx-auto">
                    {CATEGORY_META[activeCategory].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Card nav arrows */}
              <div className="flex gap-3">
                <button
                  onClick={goPrevCard}
                  className="w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center hover:bg-navy hover:text-white transition-all text-navy active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={goNextCard}
                  className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center hover:bg-gold transition-all active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Stack */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div
                  className="relative h-[460px] w-full flex items-center justify-center"
                  onMouseDown={onDragStart}
                  onMouseUp={onDragEnd}
                  onTouchStart={onDragStart}
                  onTouchEnd={onDragEnd}
                >
                  <div className="w-full max-w-[400px] h-full relative">
                    {currentItems.map((cert, idx) => {
                      let pos = idx - currentStep;
                      const half = currentItems.length / 2;
                      if (pos > half) pos -= currentItems.length;
                      if (pos < -half) pos += currentItems.length;

                      return (
                        <StackCard
                          key={`${cert.title}-${idx}`}
                          cert={cert}
                          position={pos}
                          total={currentItems.length}
                          onSelect={() => setStep(activeCategory, idx)}
                          onFullscreen={() => setSelectedCert(cert)}
                        />
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Category indicator dots */}
            <div className="flex items-center gap-3 mt-2">
              {CERTIFICATES.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(i)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeCategory
                        ? "w-8 bg-navy"
                        : "w-4 bg-gray-300 group-hover:bg-gray-400"
                    }`}
                  />
                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-200 ${
                      i === activeCategory ? "text-navy" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  >
                    {cat.category.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Card counter */}
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.3em] -mt-2">
              {currentStep + 1} / {currentItems.length}
            </p>
          </div>

          {/* Right category arrow */}
          <button
            onClick={goNextCategory}
            className="mt-[200px] flex-shrink-0 w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-navy hover:border-navy transition-all duration-200 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <ImageOverlay cert={selectedCert} onClose={() => setSelectedCert(null)} />
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CERTIFICATES } from "../constants";
import { revealVariants, staggerContainer } from "../lib/animations";
import { Award, FileText, ChevronRight, LayoutGrid, BarChart, Rocket } from "lucide-react";
import { ImageOverlay } from "./ImageOverlay";

interface StackItemProps {
  cert: any;
  position: number;
  total: number;
  onSelect: () => void;
  onFullscreen: () => void;
  key?: React.Key;
}

function StackCard({ cert, position, onSelect, onFullscreen }: StackItemProps) {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      animate={{
        x: `${position * 30}%`,
        scale: 1 - Math.abs(position) * 0.15,
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
      className={`absolute inset-0 bg-white rounded-[2.5rem] border-4 border-navy/5 shadow-xl p-6 md:p-8 flex flex-col justify-between overflow-hidden cursor-pointer ${isActive ? 'shadow-navy/10' : ''}`}
    >
      {/* 50% White Overlay for non-active layers to draw attention to center */}
      {!isActive && (
        <div className="absolute inset-0 bg-white/50 z-[101]" />
      )}

      {/* Background Stylized Frame */}
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
        {/* Helper fallback overlay for environments that block nested iframes */}
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

      <div className="flex items-end justify-between relative z-10 min-h-[0.5rem]">
         {/* Date removed as per request */}
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  
  const [cfiStep, setCfiStep] = useState(0);
  const [analyticalStep, setAnalyticalStep] = useState(0);
  const [bloombergStep, setBloombergStep] = useState(0);

  const cfi = CERTIFICATES[0];
  const bloomberg = CERTIFICATES[1];
  const analytical = CERTIFICATES[2];

  const allCfi = cfi.items || [];
  const allBloomberg = bloomberg.items || [];
  const allAnalytical = analytical.items || [];

  return (
    <section id="credentials" className="py-24 md:py-40 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.1 }} 
          variants={staggerContainer} 
          className="mb-24 text-center lg:text-left"
        >
          <div className="flex justify-center lg:justify-start items-center gap-3 text-gold mb-6">
            <Award size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Validation of Expertise</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold text-navy tracking-tight leading-[0.9]">
            Professional <br /> <span className="text-gold italic font-serif">Credentials.</span>
          </h2>
        </motion.div>

        <div className="space-y-40">
          {/* CFI Section */}
          <div className="flex flex-col items-center gap-12">
            <div className="text-center space-y-6 max-w-3xl">
              <h3 className="text-4xl font-bold text-navy tracking-tight">CFI Executive Suite</h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                A rigorous circular pathway starting with FMVA®, followed by full specialization modules. Click adjacent cards to focus.
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setCfiStep((prev) => (prev - 1 + allCfi.length) % allCfi.length)}
                  className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center hover:bg-navy hover:text-white transition-all text-navy"
                >
                  <ChevronRight size={20} className="rotate-180" />
                </button>
                <button 
                  onClick={() => setCfiStep((prev) => (prev + 1) % allCfi.length)}
                  className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center hover:bg-gold transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="relative h-[480px] w-full flex items-center justify-center overflow-visible">
               <div className="w-full max-w-[420px] h-full relative">
                 {allCfi.map((cert, idx) => {
                    let pos = idx - cfiStep;
                    if (pos > allCfi.length / 2) pos -= allCfi.length;
                    if (pos < -allCfi.length / 2) pos += allCfi.length;

                    return (
                      <StackCard 
                        key={`${cert.title}-${idx}`} 
                        cert={cert} 
                        position={pos} 
                        total={allCfi.length}
                        onSelect={() => setCfiStep(idx)}
                        onFullscreen={() => setSelectedCert(cert)}
                      />
                    );
                 })}
               </div>
            </div>
          </div>

          {/* Bloomberg Specialist Section */}
          <div className="flex flex-col items-center gap-12">
            <div className="text-center space-y-6 max-w-3xl">
              <h3 className="text-4xl font-bold text-navy tracking-tight">Bloomberg Specialist</h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Verified terminal expertise including Market Concepts, Spreadsheet Analysis, and ESG.
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setBloombergStep((prev) => (prev - 1 + allBloomberg.length) % allBloomberg.length)}
                  className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center hover:bg-navy hover:text-white transition-all text-navy"
                >
                  <ChevronRight size={20} className="rotate-180" />
                </button>
                <button 
                  onClick={() => setBloombergStep((prev) => (prev + 1) % allBloomberg.length)}
                  className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center hover:bg-gold transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="relative h-[480px] w-full flex items-center justify-center overflow-visible">
               <div className="w-full max-w-[420px] h-full relative">
                 {allBloomberg.map((cert, idx) => {
                    let pos = idx - bloombergStep;
                    if (pos > allBloomberg.length / 2) pos -= allBloomberg.length;
                    if (pos < -allBloomberg.length / 2) pos += allBloomberg.length;

                    return (
                      <StackCard 
                        key={`${cert.title}-${idx}`} 
                        cert={cert} 
                        position={pos} 
                        total={allBloomberg.length}
                        onSelect={() => setBloombergStep(idx)}
                        onFullscreen={() => setSelectedCert(cert)}
                      />
                    );
                 })}
               </div>
            </div>
          </div>

          {/* Analytical Skills Section */}
          <div className="flex flex-col items-center gap-12">
            <div className="text-center space-y-6 max-w-3xl">
              <h3 className="text-4xl font-bold text-navy tracking-tight">Analytical Skills</h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Advanced technical proficiency in VBA, Python, and data visualization tools.
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setAnalyticalStep((prev) => (prev - 1 + allAnalytical.length) % allAnalytical.length)}
                  className="w-12 h-12 rounded-full border border-navy/10 flex items-center justify-center hover:bg-navy hover:text-white transition-all text-navy"
                >
                  <ChevronRight size={20} className="rotate-180" />
                </button>
                <button 
                  onClick={() => setAnalyticalStep((prev) => (prev + 1) % allAnalytical.length)}
                  className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center hover:bg-gold transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="relative h-[480px] w-full flex items-center justify-center overflow-visible">
               <div className="w-full max-w-[420px] h-full relative">
                 {allAnalytical.map((cert, idx) => {
                    let pos = idx - analyticalStep;
                    if (pos > allAnalytical.length / 2) pos -= allAnalytical.length;
                    if (pos < -allAnalytical.length / 2) pos += allAnalytical.length;

                    return (
                      <StackCard 
                        key={`${cert.title}-${idx}`} 
                        cert={cert} 
                        position={pos} 
                        total={allAnalytical.length}
                        onSelect={() => setAnalyticalStep(idx)}
                        onFullscreen={() => setSelectedCert(cert)}
                      />
                    );
                 })}
               </div>
            </div>
          </div>
        </div>

        <ImageOverlay cert={selectedCert} onClose={() => setSelectedCert(null)} />
      </div>
    </section>
  );
}

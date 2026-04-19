"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  ChevronRight, 
  BarChart, 
  ShieldCheck, 
  Globe, 
  Trophy, 
  ExternalLink, 
  Mail
} from 'lucide-react';

// Custom LinkedIn Icon
const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function ElitePortfolio() {
  // THE FIX: Explicitly tell TypeScript this can be anything
  const [activeDeck, setActiveDeck] = useState<any>(null);

  const projects = [
    {
      id: 'acesis',
      title: "Acesis (AWARD) ETF",
      subtitle: "Global Equity Strategy | ESG Social Pillar",
      impact: "Champion, Eurasia Asset Management Challenge 2026",
      desc: "Architected a 50-stock global portfolio targeting 'Employee Welfare' as a financial factor. Outperformed MSCI World Social Leaders Index by 6.59%.",
      file: "/acesis-deck.pdf"
    },
    {
      id: 'sunway',
      title: "Sunway Healthcare (SUNMED)",
      subtitle: "Equity Research | 'SELL' Recommendation",
      impact: "37% Implied Downside Analysis",
      desc: "Conducted a rigorous DCF and Scenario Analysis on a RM2.9bn IPO. Identified valuation overstretch and cost-pressure divergence.",
      file: "/sunway-deck.pdf"
    }
  ];

  return (
    <main className="bg-[#FBFBFD] text-[#1D1D1F] antialiased selection:bg-[#C4964D]/30">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <span className="font-bold tracking-tighter text-xl text-[#0F3057]">W. LIM</span>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
          <a href="#experience" className="hover:text-[#0F3057] transition-colors">Experience</a>
          <a href="#projects" className="hover:text-[#0F3057] transition-colors">Investment Work</a>
          <a href="#resume" className="hover:text-[#0F3057] transition-colors">Resume</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="relative w-72 h-72 md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[1px] border-gray-200"
          >
            <img src="/headshot.jpg" alt="Warren Lim" className="w-full h-full object-cover" />
          </motion.div>

          <div className="flex-1 space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[#C4964D] font-bold tracking-widest text-sm uppercase">
              <Trophy size={16} /> Eurasia AM Challenge Champion 2026
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-[#0F3057] leading-[1.1]"
            >
              Warren <br />Lim Zhan Feng
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-500 font-light max-w-lg leading-relaxed"
            >
              Banking & Finance @ NTU. GPA: 4.61/5.00. Quantifying Human-Capital Alpha in global markets.
            </motion.p>
            
            <div className="flex gap-6 pt-4">
               <div className="flex items-center gap-2 text-sm text-gray-400">
                 <Mail size={18} /> <span>Contact</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-gray-400">
                 <LinkedInIcon size={18} /> <span>LinkedIn</span>
               </div>
            </div>

            <div className="pt-8 flex gap-4">
              <a href="#projects" className="px-10 py-4 bg-[#0F3057] text-white rounded-full font-semibold hover:shadow-xl transition-all active:scale-95 text-center">View Investment Work</a>
              <a href="#resume" className="px-10 py-4 border border-gray-200 rounded-full font-semibold hover:bg-white transition-all text-center">Resume</a>
            </div>
          </div>
        </div>
      </section>

      {/* WORKING EXPERIENCE */}
      <section id="experience" className="py-32 px-6 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-bold text-[#C4964D] uppercase tracking-[0.3em] mb-12">Professional Experience</h2>
          <div className="space-y-24">
            <div className="group">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <h3 className="text-3xl font-bold text-[#0F3057]">Whitman Independent Advisors</h3>
                <span className="text-gray-400 font-medium">May 2025 — Aug 2025</span>
              </div>
              <p className="text-xl font-semibold mb-6 text-gray-700 underline decoration-[#C4964D] decoration-2 underline-offset-8">Wealth Management Assistant</p>
              <ul className="space-y-6 text-lg text-gray-500">
                <li className="flex gap-4 items-start leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#C4964D] mt-3 flex-shrink-0" />
                  <span>Automated fund factsheet extraction via **AI Builder**, reducing processing time by **89%**.</span>
                </li>
                <li className="flex gap-4 items-start leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-[#C4964D] mt-3 flex-shrink-0" />
                  <span>Developed **Excel VBA tools** to analyze 200+ unit trusts, improving risk visibility by **80%**.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT PROJECTS */}
      <section id="projects" className="py-32 px-6 bg-[#0F3057]">
        <div className="max-w-6xl mx-auto">
          <header className="mb-20 text-center md:text-left">
            <h2 className="text-[#C4964D] font-bold tracking-[0.3em] uppercase text-sm mb-4">Investment & Pitch Decks</h2>
            <p className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">High-Conviction <br />Market Analysis.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project: any) => (
              <div 
                key={project.id}
                onClick={() => setActiveDeck(project)}
                className="bg-white/5 border border-white/10 p-10 rounded-[40px] cursor-pointer hover:bg-white/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-4 py-1 rounded-full border border-[#C4964D] text-[#C4964D] text-xs font-bold mb-8 uppercase tracking-widest text-center">
                    {project.impact}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-[#C4964D] font-medium mb-6 uppercase text-sm tracking-widest">{project.subtitle}</p>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">{project.desc}</p>
                </div>
                <div className="flex items-center gap-3 text-white font-semibold">
                  View Full Investment Deck <ChevronRight size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {activeDeck && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10">
            <div className="bg-white w-full max-w-7xl h-full rounded-3xl overflow-hidden flex flex-col relative">
              <button 
                onClick={() => setActiveDeck(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                ✕ Close
              </button>
              <iframe src={`${activeDeck.file}#toolbar=0`} className="w-full flex-1 border-none" />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* RESUME */}
      <section id="resume" className="py-32 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0F3057] mb-4">Curriculum Vitae</h2>
          <p className="text-gray-500 mb-8 font-light italic text-lg">First-Class Honours (NTU) • FMVA® • Bloomberg Certified</p>
          <a href="/resume.pdf" download className="inline-flex items-center gap-3 px-10 py-4 bg-[#0F3057] text-white rounded-full font-bold transition-all">
            <Download size={20} /> Download Professional CV
          </a>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-4 aspect-[1/1.4] hidden md:block border border-gray-200">
           <iframe src="/resume.pdf#toolbar=0" className="w-full h-full rounded-xl border-none" />
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-xs tracking-widest uppercase font-medium">© 2026 Warren Lim Zhan Feng</p>
      </footer>
    </main>
  );
}
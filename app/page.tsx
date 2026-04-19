"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronRight, Users, BarChart2, Briefcase } from 'lucide-react';

// --- SYSTEM SPECIFICATIONS (Apple Standard) ---
const MOTION_CURVE = [0.25, 0.1, 0.25, 1]; 
const SPRING_UI = { type: "spring", stiffness: 120, damping: 20 };

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: MOTION_CURVE } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

interface Project {
  title: string;
  category: string;
  description: React.ReactNode;
  file: string;
  thumbnail: string;
}

export default function WarrenFinalLaunch() {
  const [activeDeck, setActiveDeck] = useState<any>(null);

  const keyProjects: Project[] = [
    {
      title: "Acesis (AWARD) ETF",
      category: "Asset Management | EAMC 2026",
      thumbnail: "/acesis-icon.png", 
      description: (
        <>
          Proposed a 50-stock globally diversified portfolio focused on the <span className="font-bold text-gray-900">Social Pillar (Employee Welfare)</span>. Recorded <span className="font-bold text-gray-900">97.1% returns</span> in back-testing, outperforming the benchmark by <span className="font-bold text-gray-900">6.59%</span>.
        </>
      ),
      file: "/acesis-deck.pdf"
    },
    {
      title: "Sunway Healthcare (SUNMED)",
      category: "Equity Research | Case Study",
      thumbnail: "/sunway-icon.png",
      description: (
        <>
          Analysed a RM2.9bn IPO valuation, identifying a <span className="font-bold text-gray-900">37% potential downside</span>. Utilised DCF and scenario modelling to evaluate cost-pressure and operational risks.
        </>
      ),
      file: "/sunway-deck.pdf"
    }
  ];

  return (
    <main className="relative bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-[#C4964D]/20 overflow-x-hidden scroll-smooth">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-white/60 backdrop-blur-xl border-b border-gray-100 px-8 py-5 flex justify-between items-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold tracking-tight text-base text-[#0F3057]">
          Warren, Lim Zhan Feng
        </motion.span>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
          <a href="#experience" className="hover:text-[#0F3057] transition-colors duration-300">Experience</a>
          <a href="#work" className="hover:text-[#0F3057] transition-colors duration-300">Work</a>
          <a href="#resume" className="hover:text-[#0F3057] transition-colors duration-300">Resume</a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: MOTION_CURVE }}
            className="w-64 h-80 md:w-[380px] md:h-[480px] flex-shrink-0 overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-white"
          >
            <img src="/headshot.jpg" alt="Warren, Lim Zhan Feng" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false }} className="flex-1 space-y-10 text-center md:text-left">
            <motion.div variants={revealVariants} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#0F3057] leading-[1.1]">
                Warren, <br /> Lim Zhan Feng
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-lg">
                Penultimate Banking & Finance Undergraduate <br />
                <span className="text-[#1D1D1F] font-medium text-lg">Nanyang Technological University</span>
              </p>
            </motion.div>

            <motion.div variants={revealVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 pt-10 border-t border-gray-100">
               <a href="mailto:warrenlimzf@gmail.com" className="flex items-center justify-center md:justify-start gap-4 text-gray-600 group">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl p-2 shadow-sm"><img src="/email-icon.png" className="w-full h-full object-contain" /></div>
                  <span className="text-sm font-medium hover:underline">warrenlimzf@gmail.com</span>
               </a>
               <a href="https://www.linkedin.com/in/warrenlimzf/" target="_blank" className="flex items-center justify-center md:justify-start gap-4 text-gray-600 group">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl p-2 shadow-sm"><img src="/linkedin-icon.png" className="w-full h-full object-contain" /></div>
                  <span className="text-sm font-medium hover:underline">linkedin.com/in/warrenlimzf</span>
               </a>
               <div className="flex items-center justify-center md:justify-start gap-4 text-gray-600 font-medium">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl p-2 shadow-sm"><img src="/phone-icon.png" className="w-full h-full object-contain" /></div>
                  <span className="text-sm">+65 9454 0155</span>
               </div>
            </motion.div>

            <motion.div variants={revealVariants} className="flex gap-4 pt-4 justify-center md:justify-start">
              <motion.a href="#experience" whileHover={{ scale: 1.03 }} transition={SPRING_UI} className="px-10 py-4 bg-[#0F3057] text-white rounded-full text-sm font-bold shadow-xl">Experience</motion.a>
              <motion.a href="/resume.pdf" download="Warren_Lim_Resume.pdf" whileHover={{ scale: 1.03 }} transition={SPRING_UI} className="px-10 py-4 border border-gray-200 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white"><Download size={16} /> Download CV</motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. EXPERIENCE */}
      <section id="experience" className="py-40 px-6 bg-white">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={revealVariants} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-20 text-center md:text-left">
            <Briefcase size={28} className="text-[#C4964D]" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3057] tracking-tight">Experience.</h2>
          </div>
          
          <div className="relative pl-12 border-l-2 border-gray-100 space-y-32">
             {[
               {
                 company: "Whitman Independent Advisors",
                 role: "Wealth Management Assistant",
                 date: "MAY — AUG 2025",
                 bullets: [
                   <>Assisted in automating fund factsheets using <span className="font-bold text-gray-900">Power Automate</span>, contributing to an <span className="font-bold text-gray-900">89% reduction</span> in manual processing cycles.</>,
                   <>Supported development of <span className="font-bold text-gray-900">Excel VBA tools</span> for cross-fund holdings analysis to identify overlapping equity exposures.</>
                 ]
               },
               {
                 company: "PropNex Malaysia",
                 role: "Real Estate Negotiator",
                 date: "JAN — JUL 2024",
                 bullets: [
                   <>Advised on pricing and negotiation strategies for <span className="font-bold text-gray-900">25+ residential transactions</span> via data-driven market benchmarking.</>,
                   <>Streamlined sourcing for Airbnb operators, improving potential rental yields by <span className="font-bold text-gray-900">8–12%</span> through targeted asset matching.</>
                 ]
               }
             ].map((exp, idx) => (
               <div key={idx} className="relative">
                  <div className="absolute -left-[54px] top-0 w-3 h-3 rounded-full bg-[#0F3057]" />
                  <div className="flex flex-col md:flex-row justify-between mb-10">
                    <div>
                       <h4 className="text-3xl font-bold text-[#0F3057]">{exp.company}</h4>
                       <p className="text-[#C4964D] font-bold text-sm uppercase tracking-widest mt-3">{exp.role}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-400 mt-4 tracking-widest uppercase">{exp.date}</span>
                  </div>
                  <ul className="space-y-8">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-gray-500 text-lg font-light leading-relaxed max-w-2xl flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C4964D] mt-3 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
               </div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* 4. CASE COMPETITION */}
      <section className="py-40 bg-[#F5F5F7] px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={revealVariants} className="mb-20 text-center space-y-6">
             <p className="text-[#C4964D] font-bold uppercase tracking-[0.4em] text-xs">Collaborative Achievement</p>
             <h2 className="text-4xl md:text-6xl font-bold text-[#0F3057]">Team Omicron.</h2>
             <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light italic leading-relaxed">
              "Grateful for the opportunity to have worked with Team Omicron. Our collective effort resulted in being awarded the top place in the 2026 challenge."
            </p>
          </motion.div>
          
          <div className="flex flex-col gap-12">
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((num) => (
                <motion.div key={num} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 1, delay: num * 0.1 }} className="aspect-[16/10] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-white">
                  <img src={`/win-${num}.jpg`} alt="Team Success" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. INVESTMENT WORK */}
      <section id="work" className="py-40 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={revealVariants} className="flex items-center justify-between mb-24">
            <h2 className="text-4xl font-bold text-[#0F3057] tracking-tight">Work.</h2>
            <div className="h-px bg-gray-100 flex-1 ml-12" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {keyProjects.map((proj) => (
              <motion.div key={proj.title} onClick={() => setActiveDeck(proj)} whileHover={{ y: -10, scale: 1.01 }} transition={SPRING_UI} className="group relative p-12 rounded-[3.5rem] bg-[#FBFBFD] border border-gray-50 hover:border-gray-200 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all cursor-pointer flex flex-col h-[520px]">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden p-4 group-hover:scale-105 transition-transform duration-500">
                    <img src={proj.thumbnail} alt="Project Icon" className="w-full h-full object-contain" />
                  </div>
                  <div className="p-3 rounded-full bg-white text-gray-300 group-hover:text-[#C4964D] group-hover:bg-[#C4964D]/5 transition-colors">
                    <BarChart2 size={24} />
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">{proj.category}</p>
                <h3 className="text-4xl font-bold text-[#0F3057] mb-8">{proj.title}</h3>
                <div className="text-gray-500 text-lg leading-relaxed font-light flex-1">{proj.description}</div>
                <div className="flex items-center gap-3 text-xs font-black text-[#C4964D] uppercase tracking-widest mt-8 group-hover:gap-5 transition-all">View Presentation <ChevronRight size={16} /></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROFESSIONAL PROFILE (REFINED & CENTERED) */}
      <section id="resume" className="py-48 bg-[#FBFBFD] px-6 text-center border-t border-gray-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={revealVariants} className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="mb-20 space-y-8">
            <h2 className="text-5xl font-bold text-[#0F3057] tracking-tight">Professional Profile.</h2>
            <p className="text-gray-400 text-xl font-light italic">NTU First-Class Honours | GPA 4.61/5.00</p>
            <motion.a 
              href="/resume.pdf" download="Warren_Lim_Resume.pdf"
              whileHover={{ scale: 1.05 }} transition={SPRING_UI}
              className="inline-flex items-center gap-4 px-12 py-5 bg-[#0F3057] text-white rounded-full font-bold shadow-2xl active:scale-95"
            >
              <Download size={20} /> Obtain Official CV
            </motion.a>
          </div>

          <div className="w-full max-w-4xl aspect-[1/1.414] rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-gray-100 hidden md:block bg-white relative pointer-events-none">
            <iframe src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH" className="w-full h-full border-none" title="Professional CV" />
            <div className="absolute inset-0 z-10 bg-transparent" />
          </div>
        </motion.div>
      </section>

      {/* PDF MODAL */}
      <AnimatePresence>
        {activeDeck && (
          <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-7xl h-full rounded-[3rem] overflow-hidden flex flex-col relative">
              <div className="p-8 border-b flex justify-between items-center bg-white">
                <div>
                  <h3 className="font-bold text-xl text-[#0F3057]">{activeDeck.title}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{activeDeck.category}</p>
                </div>
                <button onClick={() => setActiveDeck(null)} className="px-8 py-3 bg-gray-50 hover:bg-gray-100 rounded-full font-bold text-xs uppercase tracking-widest transition-colors">Close</button>
              </div>
              <iframe src={`${activeDeck.file}#toolbar=0`} className="w-full flex-1 border-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-24 text-center text-xs text-gray-300 uppercase tracking-[0.5em] font-medium bg-white border-t border-gray-50">
        © 2026 Warren, Lim Zhan Feng
      </footer>
    </main>
  );
}
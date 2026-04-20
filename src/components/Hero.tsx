/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import { motion } from "motion/react";
import { Download, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "../constants";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const slideFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 max-w-7xl mx-auto w-full overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24 w-full">
        {/* Static Headshot */}
        <motion.div 
          initial="hidden" 
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
          className="flex flex-col gap-12 lg:gap-16 w-full"
        >
          {/* Top Row: Text and Image Side by Side */}
          <div className="flex flex-col-reverse lg:flex-row items-center lg:items-stretch justify-between gap-12 lg:gap-24 w-full">
            <motion.div variants={slideFromLeft} className="flex-1 flex flex-col justify-center space-y-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-gold font-bold text-[10px] md:text-xs tracking-[0.25em] uppercase">
                <Sparkles size={14} />
                <span>Finance Enthusiast</span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-navy leading-[0.9] lg:-ml-1">
                Warren, <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy via-navy to-gold/60">
                  Lim Zhan Feng
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-500 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                Penultimate Banking and Finance Undergraduate
                <span className="block mt-1 text-navy font-medium italic">Nanyang Technological University</span>
              </p>
            </motion.div>

            <motion.div variants={slideFromLeft} className="z-10 flex-shrink-0 flex items-center justify-center">
              <div 
                className="w-full max-w-[280px] h-[360px] md:max-w-[320px] lg:h-auto overflow-hidden rounded-[2rem] border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] bg-white relative flex-1"
              >
                <img 
                  src={PERSONAL_INFO.headshot} 
                  alt={PERSONAL_INFO.fullName} 
                  className="w-full h-full object-cover" 
                  
                />
              </div>
            </motion.div>
          </div>

          {/* Contact Details in Rectangular One-Row Format */}
          <motion.div id="contacts" variants={slideFromLeft} className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-10 border-t border-gray-100 w-full">
             <a 
               href={`mailto:${PERSONAL_INFO.email}`} 
               className="group flex flex-row items-center gap-5 p-6 bg-[#FBFBFD] border border-gray-100 rounded-3xl hover:bg-[#D93025] hover:text-white transition-all duration-300 w-full shadow-sm hover:shadow-md"
             >
                <div className="w-14 h-14 flex-shrink-0 bg-white shadow-sm rounded-2xl flex items-center justify-center p-3.5 group-hover:scale-110 transition-transform duration-300">
                  <img src="/email-icon.png" className="w-full h-full object-contain"  />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white/60">Email Address</p>
                  <p className="text-sm sm:text-base font-bold tracking-tight truncate w-full">{PERSONAL_INFO.email}</p>
                </div>
             </a>

             <a 
               href={`https://${PERSONAL_INFO.linkedin}`} 
               target="_blank" 
               rel="noreferrer"
               className="group flex flex-row items-center gap-5 p-6 bg-[#FBFBFD] border border-gray-100 rounded-3xl hover:bg-[#0077B5] hover:text-white transition-all duration-300 w-full shadow-sm hover:shadow-md"
             >
                <div className="w-14 h-14 flex-shrink-0 bg-white shadow-sm rounded-2xl flex items-center justify-center p-3.5 group-hover:scale-110 transition-transform duration-300">
                  <img src="/linkedin-icon.png" className="w-full h-full object-contain"  />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white/60">LinkedIn Profile</p>
                  <p className="text-[13px] sm:text-sm md:text-[15px] font-bold tracking-tighter truncate w-full">https://www.linkedin.com/in/warrenlimzf/</p>
                </div>
             </a>

             <a 
               href={`tel:${PERSONAL_INFO.phone}`} 
               className="group flex flex-row items-center gap-5 p-6 bg-[#FBFBFD] border border-gray-100 rounded-3xl hover:bg-[#22C55E] hover:text-white transition-all duration-300 w-full shadow-sm hover:shadow-md"
             >
                <div className="w-14 h-14 flex-shrink-0 bg-white shadow-sm rounded-2xl flex items-center justify-center p-3.5 group-hover:scale-110 transition-transform duration-300">
                  <img src="/phone-icon.png" className="w-full h-full object-contain"  />
                </div>
                <div className="space-y-1 min-w-0">
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white/60">Mobile Contact</p>
                   <p className="text-sm sm:text-base font-bold tracking-tight truncate w-full">{PERSONAL_INFO.phone}</p>
                </div>
             </a>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={slideFromLeft} className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <motion.a 
              href="#experience" 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 bg-navy text-white rounded-2xl text-xs font-black tracking-[0.2em] uppercase shadow-[0_20px_40px_-10px_rgba(15,48,87,0.3)] flex items-center justify-center"
            >
              My Work Experience
            </motion.a>
            <motion.a 
              href="/resume.pdf" 
              download="Warren_Lim_Resume.pdf" 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 border-2 border-gray-100 rounded-2xl text-xs font-black tracking-[0.2em] uppercase flex items-center gap-2 hover:border-navy transition-all justify-center text-navy bg-white shadow-sm"
            >
              <Download size={16} strokeWidth={3} /> Download CV
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

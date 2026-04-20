/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { SKILLS } from "../constants";
import { revealVariants, staggerContainer, SPRING_PREMIUM } from "../lib/animations";
import { ShieldCheck, Cpu } from "lucide-react";

export default function TechnicalToolkit() {
  return (
    <section className="py-32 bg-white px-6 border-y border-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.2 }} 
          variants={staggerContainer} 
          className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24"
        >
          <motion.div variants={revealVariants} className="flex-1 space-y-8 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start items-center gap-3 text-gold">
               <div className="p-3 bg-gold/5 rounded-xl border border-gold/10">
                 <ShieldCheck size={24} />
               </div>
               <span className="text-xs font-black uppercase tracking-[0.3em]">Verified Competencies</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-navy tracking-tighter leading-[0.9]">
              Technical <br /> <span className="text-gold italic font-serif leading-normal tracking-tight">Toolkit</span> & Credentials.
            </h2>
            <p className="text-gray-500 text-xl font-light leading-relaxed max-w-xl">
              Equipped with industry-standard certifications and advanced financial modelling capabilities to drive data-led investment decisions.
            </p>
          </motion.div>

          <div className="flex-[1.2] grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            {SKILLS.map((set, idx) => (
              <motion.div 
                key={idx} 
                variants={revealVariants}
                whileHover={{ y: -5 }}
                transition={SPRING_PREMIUM}
                className="group p-10 bg-[#FBFBFD] border border-gray-100 rounded-[2.5rem] space-y-8 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-colors duration-500">
                    <Cpu size={20} />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-navy/30 group-hover:text-gold transition-colors">
                    {set.label}
                  </h4>
                </div>
                
                <ul className="space-y-4">
                  {set.items.map((item, i) => (
                    <li key={i} className="text-base font-bold text-navy flex items-center gap-3 group/item">
                       <div className="w-1.5 h-1.5 rounded-full bg-gold/20 group-hover/item:bg-gold group-hover/item:scale-125 transition-all duration-300" />
                       <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                        {item}
                       </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


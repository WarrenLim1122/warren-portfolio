/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { PROJECTS } from "../constants";
import { BarChart2, ChevronRight, Projector } from "lucide-react";
import { slideUpVariants, staggerContainer, revealVariants } from "../lib/animations";
import { AnimatedCard } from "./AnimatedCard";

interface ProjectsProps {
  onSelectProject: (project: any) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  return (
    <section id="work" className="py-40 px-6 bg-[#FBFBFD] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.1 }} 
          variants={staggerContainer} 
        >
          <motion.div variants={revealVariants} className="flex flex-col md:flex-row items-end justify-between mb-32 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold font-bold text-xs md:text-sm tracking-[0.3em] uppercase">
                <Projector size={16} />
                <span>Selected Works</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-navy tracking-tight">Active Case <br /> Portfolio.</h2>
            </div>
            <p className="text-gray-400 text-lg font-light max-w-sm text-right leading-relaxed hidden md:block">
              A curated selection of championship-winning asset management frameworks and critical equity research.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {PROJECTS.map((proj, idx) => (
              <motion.div 
                key={proj.title}
                custom={idx}
                variants={slideUpVariants}
                viewport={{ once: false }}
                onClick={() => window.open(proj.file, '_blank')} 
                className="group cursor-pointer"
              >
                 <div className="aspect-[16/10] bg-white rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white group relative mb-8 flex items-center justify-center p-12">
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-700 z-10" />
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center relative z-20">
                      <img src={proj.thumbnail} alt={proj.title} className="max-w-[70%] max-h-[70%] object-contain"  />
                    </div>
                 </div>
                 
                 <div className="space-y-4 px-4 text-center md:text-left">
                    <p className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">
                      {proj.category}
                    </p>
                    <h3 className="text-2xl font-bold text-navy group-hover:text-gold transition-colors leading-tight">
                      {proj.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                       {proj.description}
                    </p>
                    <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
                       <span className="text-[9px] font-black text-navy uppercase tracking-widest group-hover:gap-2 transition-all flex items-center gap-1">
                         View Research <ChevronRight size={12} />
                       </span>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


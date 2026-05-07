/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { PROJECTS } from "../constants";
import { ChevronRight, Projector } from "lucide-react";
import { slideUpVariants, staggerContainer, revealVariants } from "../lib/animations";

interface ProjectsProps {
  onSelectProject: (project: unknown) => void;
}

export default function Projects({ onSelectProject: _onSelectProject }: ProjectsProps) {
  return (
    <section id="work" className="py-40 px-6 bg-void overflow-hidden">
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
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">Active Case <br /> Portfolio.</h2>
            </div>
            <p className="text-white/30 text-lg font-light max-w-sm text-right leading-relaxed hidden md:block">
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
                <div className="aspect-[16/10] bg-glass rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-white/8 group relative mb-8 flex items-center justify-center p-12 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/4 transition-colors duration-700 z-10" />
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center relative z-20">
                    <img src={proj.thumbnail} alt={proj.title} className="max-w-[70%] max-h-[70%] object-contain" />
                  </div>
                </div>

                <div className="space-y-4 px-4 text-center md:text-left">
                  <p className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">
                    {proj.category}
                  </p>
                  <h3 className="text-2xl font-bold text-white group-hover:text-gold transition-colors leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-white/35 text-sm leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                  <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
                    <span className="text-[9px] font-black text-white/50 uppercase tracking-widest group-hover:text-gold transition-colors flex items-center gap-1">
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

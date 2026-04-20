/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { EXPERIENCE } from "../constants";
import { Briefcase, Calendar } from "lucide-react";
import { slideUpVariants, staggerContainer, revealVariants } from "../lib/animations";

const entryVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20, delay: i * 0.15 }
  })
};

const bulletVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 18, delay: 0.2 + i * 0.08 }
  })
};

export default function Experience() {
  return (
    <section id="experience" className="py-40 px-6 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="relative"
        >
          <motion.div variants={revealVariants} className="flex items-center gap-4 mb-24 justify-center md:justify-start">
            <div className="w-14 h-14 rounded-2xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 shadow-sm">
              <Briefcase size={28} />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-navy tracking-tight">Professional History.</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line — draws once on enter */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="absolute left-6 md:left-6 top-4 w-[2px] h-full bg-gradient-to-b from-gold via-navy to-gray-100 hidden sm:block"
            />

            <div className="space-y-40">
              {EXPERIENCE.map((exp, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={entryVariants}
                  viewport={{ once: true }}
                  className="relative pl-0 sm:pl-24"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 + idx * 0.15 }}
                    className="absolute left-4 md:left-[18px] top-3 w-5 h-5 rounded-full bg-white border-4 border-gold shadow-md z-10 hidden sm:block"
                  />

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 w-full gap-4">
                    <div className="space-y-2">
                      <h4 className="text-4xl font-bold text-navy tracking-tight">{exp.company}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-gold font-black text-xs uppercase tracking-[0.2em] px-3 py-1 bg-gold/5 rounded-full border border-gold/10">
                          {exp.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs tracking-widest uppercase bg-gray-50 px-4 py-2 rounded-xl">
                      <Calendar size={14} className="text-gray-300" />
                      {exp.duration}
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 gap-6">
                    {exp.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        custom={i}
                        variants={bulletVariants}
                        viewport={{ once: true }}
                        className="text-gray-500 text-lg font-light leading-relaxed max-w-3xl flex items-start gap-5 group"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gold mt-3.5 flex-shrink-0 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(196,150,77,0.4)]" />
                        <div className="group-hover:text-navy transition-colors duration-300">{bullet}</div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Download } from "lucide-react";
import { revealVariants, SPRING_UI } from "../lib/animations";

export default function ResumeViewer() {
  return (
    <section id="resume" className="py-48 bg-deep px-6 text-center border-t border-white/5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={revealVariants}
        className="max-w-6xl mx-auto flex flex-col items-center"
      >
        <div className="mb-20 space-y-8">
          <h2 className="text-5xl font-bold text-white tracking-tight">Professional Profile.</h2>
          <p className="text-xl font-light italic text-white/40">NTU First-Class Honours · GPA 4.61/5.00</p>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            download="Warren_Lim_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            transition={SPRING_UI}
            className="inline-flex items-center gap-4 px-12 py-5 bg-gold text-[#0B0E1A] rounded-full font-black text-sm tracking-widest uppercase shadow-[0_20px_50px_-10px_rgba(196,150,77,0.4)] active:scale-95 transition-shadow hover:shadow-[0_20px_60px_-8px_rgba(196,150,77,0.6)]"
          >
            <Download size={20} /> Obtain Official CV
          </motion.a>
        </div>

        <div className="w-full max-w-4xl mx-auto rounded-[2rem] border border-white/8 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="border-b border-white/8 px-6 py-4 flex items-center justify-between"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.1em]">Warren_Lim_Resume.pdf</p>
            <div className="w-9 h-9" />
          </div>

          <div className="w-full relative p-2 sm:p-8" style={{ background: "#0B0E1A" }}>
            <img
              src="/resume.jpg"
              alt="Warren Lim Resume"
              className="w-full h-auto object-contain rounded-lg border border-white/8"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

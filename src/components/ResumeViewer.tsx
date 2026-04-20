/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Download } from "lucide-react";
import { revealVariants, SPRING_UI } from "../lib/animations";

export default function ResumeViewer() {
  return (
    <section id="resume" className="py-48 bg-white px-6 text-center border-t border-gray-100">
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={revealVariants} 
        className="max-w-6xl mx-auto flex flex-col items-center"
      >
        <div className="mb-20 space-y-8">
          <h2 className="text-5xl font-bold text-navy tracking-tight">Professional Profile.</h2>
          <p className="text-xl font-light italic text-gray-900">NTU First-Class Honours | GPA 4.61/5.00</p>
          <motion.a 
            href="/resume.pdf" 
            target="_blank"
            download="Warren_Lim_Resume.pdf"
            whileHover={{ scale: 1.05 }} 
            transition={SPRING_UI}
            className="inline-flex items-center gap-4 px-12 py-5 bg-navy text-white rounded-full font-bold shadow-2xl active:scale-95 transition-shadow hover:shadow-navy/40"
          >
            <Download size={20} /> Obtain Official CV
          </motion.a>
        </div>

        {/* Straightforward Image Display for the Resume */}
        <div className="w-full max-w-4xl mx-auto rounded-[2rem] border border-gray-200 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white">
          {/* Document Header Mockup */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.1em]">Warren_Lim_Resume.pdf</p>
            <div className="w-9 h-9"></div> {/* spacer for centering */}
          </div>
          
          {/* Main Resume Image */}
          <div className="w-full relative bg-gray-100 p-2 sm:p-8">
            <img 
              src="/resume.jpg" 
              alt="Warren Lim Resume" 
              className="w-full h-auto object-contain rounded-lg shadow-sm border border-gray-200 bg-white" 
              
            />
          </div>
        </div>

      </motion.div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { CASE_COMPETITION } from "../constants";
import { revealVariants, staggerContainer } from "../lib/animations";
import { Users2, Quote } from "lucide-react";
import { ImageOverlay } from "./ImageOverlay";

export default function CaseCompetition() {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <section className="py-40 bg-deep px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-32 text-center space-y-10"
        >
          <motion.div variants={revealVariants} className="flex justify-center items-center gap-3 text-gold">
            <Users2 size={18} />
            <p className="text-gold font-black uppercase tracking-[0.4em] text-[10px]">Collaborative Achievement</p>
          </motion.div>

          <motion.h2 variants={revealVariants} className="text-5xl md:text-8xl font-bold text-white tracking-tight">
            {CASE_COMPETITION.team}.
          </motion.h2>

          <motion.div variants={revealVariants} className="relative max-w-2xl mx-auto">
            <Quote className="absolute -top-6 -left-8 text-gold/15 w-16 h-16 -z-10" />
            <p className="text-white/35 text-2xl md:text-3xl font-light italic leading-snug">
              {CASE_COMPETITION.quote}
            </p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            onClick={() => setFullscreenImage(CASE_COMPETITION.images[0])}
            className="aspect-[16/10] bg-glass rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-white/8 group relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-700 z-10" />
            <img
              src={CASE_COMPETITION.images[0]}
              alt="Team Success 1"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            onClick={() => setFullscreenImage(CASE_COMPETITION.images[1])}
            className="aspect-[16/10] bg-glass rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-white/8 group relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-700 z-10" />
            <img
              src={CASE_COMPETITION.images[1]}
              alt="Team Success 2"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
            />
          </motion.div>
        </div>

        <ImageOverlay src={fullscreenImage} onClose={() => setFullscreenImage(null)} />
      </div>
    </section>
  );
}

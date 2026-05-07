/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Download, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "../constants";
import { ContactConnect } from "./ui/connect-with-us";

const blurReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: {
    duration: 0.85,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

const springBtn = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headShotY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 max-w-7xl mx-auto w-full overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20 w-full">

        {/* LEFT: name / subtitle / contact card */}
        <motion.div
          className="flex-1 flex flex-col justify-between gap-10 min-w-0"
          style={{ y: prefersReduced ? 0 : textY }}
        >
          <div className="space-y-6 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              {...(prefersReduced ? {} : blurReveal(0.1))}
              className="flex items-center justify-center lg:justify-start gap-2 text-gold font-bold text-[10px] md:text-xs tracking-[0.25em] uppercase"
            >
              <Sparkles size={14} />
              <span>Finance Enthusiast</span>
            </motion.div>

            {/* Headline — line-level blur reveal */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-navy leading-[0.9] lg:-ml-1">
              <motion.span
                className="block"
                {...(prefersReduced ? {} : blurReveal(0.2))}
              >
                Warren,
              </motion.span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-navy via-navy to-gold/60"
                {...(prefersReduced ? {} : blurReveal(0.33))}
              >
                Lim Zhan Feng
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-2xl text-gray-500 font-light leading-relaxed max-w-xl mx-auto lg:mx-0"
              {...(prefersReduced ? {} : blurReveal(0.45))}
            >
              Penultimate Banking and Finance Undergraduate
              <span className="block mt-1 text-navy font-medium italic">
                Nanyang Technological University
              </span>
            </motion.p>
          </div>

          {/* Contact card */}
          <motion.div id="contacts" {...(prefersReduced ? {} : blurReveal(0.55))}>
            <ContactConnect />
          </motion.div>
        </motion.div>

        {/* RIGHT: headshot + buttons — parallax at a faster rate */}
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ y: prefersReduced ? 0 : headShotY }}
          className="flex-shrink-0 flex flex-col items-center lg:items-stretch gap-5 w-full lg:w-[300px] xl:w-[320px]"
        >
          {/* Headshot */}
          <div className="w-full max-w-[300px] lg:max-w-none mx-auto lg:mx-0 aspect-[5/6] overflow-hidden rounded-[2rem] border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] bg-white flex-1">
            <img
              src={PERSONAL_INFO.headshot}
              alt={PERSONAL_INFO.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-[300px] lg:max-w-none mx-auto lg:mx-0">
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={springBtn}
              className="w-full py-5 bg-navy text-white rounded-2xl text-xs font-black tracking-[0.2em] uppercase shadow-[0_20px_40px_-10px_rgba(15,48,87,0.3)] flex items-center justify-center cursor-pointer"
            >
              My Work Experience
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download="Warren_Lim_Resume.pdf"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={springBtn}
              className="w-full py-5 border-2 border-gray-100 rounded-2xl text-xs font-black tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:border-navy transition-colors text-navy bg-white shadow-sm cursor-pointer"
            >
              <Download size={16} strokeWidth={3} /> Download CV
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

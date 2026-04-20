export const MOTION_CURVE = [0.25, 0.1, 0.25, 1];
export const SPRING_UI = { type: "spring", stiffness: 120, damping: 20 };
export const SPRING_PREMIUM = { type: "spring", stiffness: 80, damping: 15, mass: 1 };

export const revealVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: MOTION_CURVE } 
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
};

export const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

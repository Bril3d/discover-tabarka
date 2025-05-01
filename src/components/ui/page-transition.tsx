'use client';

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  /**
   * The components to be wrapped with the transition effect
   */
  children: ReactNode;
  
  /**
   * The mode for the transitions
   * @default "wait"
   */
  mode?: "wait" | "sync" | "popLayout";
  
  /**
   * The direction of the slide animation
   * @default "right"
   */
  direction?: "left" | "right" | "up" | "down";
  
  /**
   * The duration of the animation in seconds
   * @default 0.3
   */
  duration?: number;
  
  /**
   * Whether to fade in addition to sliding
   * @default true
   */
  withFade?: boolean;
}

const PageTransition = ({
  children,
  mode = "wait",
  direction = "right",
  duration = 0.3,
  withFade = true,
}: PageTransitionProps) => {
  const pathname = usePathname();
  
  const getDirectionOffset = () => {
    const offset = 50;
    switch (direction) {
      case "left": return { x: -offset };
      case "right": return { x: offset };
      case "up": return { y: -offset };
      case "down": return { y: offset };
      default: return { x: offset };
    }
  };
  
  const slideVariants = {
    initial: {
      ...getDirectionOffset(),
      opacity: withFade ? 0 : 1,
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      ...getDirectionOffset(),
      opacity: withFade ? 0 : 1,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <AnimatePresence mode={mode} initial={false}>
      <motion.div
        key={pathname}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export { PageTransition }; 
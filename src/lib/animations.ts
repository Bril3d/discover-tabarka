/**
 * Animation utilities using Tailwind CSS v4 theme variables for color values
 */

import { Variants } from "framer-motion";

/**
 * Fade in animation
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

/**
 * Scale animation
 */
export const scale: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

/**
 * Slide up animation
 */
export const slideUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    y: 20, 
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

/**
 * Slide down animation
 */
export const slideDown: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    y: -20, 
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

/**
 * Staggered children animation
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

/**
 * Button hover animation with shadow using theme variables
 */
export const buttonHover = {
  scale: 1.05,
  boxShadow: "0 0 15px var(--color-tabarka-blue-500) / 0.5",
  transition: {
    duration: 0.2
  }
};

/**
 * Card hover animation with shadow using theme variables
 */
export const cardHover = {
  scale: 1.02,
  boxShadow: "0 10px 30px var(--color-foreground) / 0.1",
  y: -5,
  transition: {
    duration: 0.2
  }
};

/**
 * Scale animation with shadow using theme variables
 */
export const scaleWithShadow: Variants = {
  hidden: { 
    scale: 0.9, 
    opacity: 0,
    boxShadow: "0 0 0 transparent" 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    boxShadow: "0 10px 25px var(--color-tabarka-blue-900) / 0.1",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    boxShadow: "0 0 0 transparent",
    transition: {
      duration: 0.2
    }
  }
};

/**
 * Custom rotate animation
 */
export const rotate: Variants = {
  hidden: { 
    rotate: -5, 
    opacity: 0 
  },
  visible: { 
    rotate: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  exit: { 
    rotate: 5, 
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

/**
 * Pulse animation for hover effects
 */
export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 1,
    repeat: Infinity
  }
};

/**
 * Scroll reveal animation (for sections)
 */
export const scrollReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 75
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/**
 * Page transition animation
 */
export const pageTransition: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.15
    }
  },
  exit: { 
    opacity: 0, 
    x: -50,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/**
 * Slide in from left animation
 */
export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      duration: 0.5
    }
  }
};

/**
 * Slide in from right animation
 */
export const slideInRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      duration: 0.5
    }
  }
};

/**
 * Scale animation variants
 */
export const scaleUp: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      duration: 0.5
    }
  }
};

/**
 * Rotate and scale animation
 */
export const rotateIn: Variants = {
  hidden: { rotate: -10, scale: 0.9, opacity: 0 },
  visible: { 
    rotate: 0, 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      duration: 0.5
    }
  }
}; 
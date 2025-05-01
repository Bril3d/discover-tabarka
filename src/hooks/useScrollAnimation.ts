'use client';

import { useEffect } from "react";
import { useInView, useAnimation, type AnimationControls } from "framer-motion";
import { useRef } from "react";

interface UseScrollAnimationProps {
  /**
   * Threshold for triggering the animation (0 to 1)
   * @default 0.1
   */
  threshold?: number;
  
  /**
   * Determines if the animation should trigger once or every time element enters viewport
   * @default true
   */
  triggerOnce?: boolean;
  
  /**
   * Delay in seconds before animation starts after element is in view
   * @default 0
   */
  delay?: number;
}

/**
 * Custom hook for scroll-triggered animations
 * @param options Animation options
 * @returns [ref, controls] Tuple with the ref to attach to your component and animation controls
 */
const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  triggerOnce = true,
  delay = 0
}: UseScrollAnimationProps = {}): [React.RefObject<T>, AnimationControls] => {
  const controls = useAnimation();
  const ref = useRef<T>(null);
  const inView = useInView(ref, {
    once: triggerOnce,
    amount: threshold
  });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible", { delay });
    } else if (!triggerOnce) {
      controls.start("hidden");
    }
  }, [controls, inView, delay, triggerOnce]);
  
  return [ref, controls];
};

export default useScrollAnimation; 
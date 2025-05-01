'use client';

import { HTMLMotionProps, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"section">, "style" | "variants" | "initial" | "animate" | "exit" | "transition"> {
  /**
   * Direction of entrance animation
   * @default "up"
   */
  from?: "up" | "down" | "left" | "right" | "none";
  
  /**
   * Distance of entrance animation in pixels
   * @default 50
   */
  distance?: number;
  
  /**
   * Duration of animation in seconds
   * @default 0.5
   */
  duration?: number;
  
  /**
   * Delay of animation in seconds
   * @default 0
   */
  delay?: number;
  
  /**
   * Whether to only animate once
   * @default true
   */
  once?: boolean;
  
  /**
   * Amount of element that needs to be in view before animation triggers
   * @default 0.1
   */
  amount?: number;
  
  /**
   * Stagger children animations (in seconds)
   * @default 0
   */
  staggerChildren?: number;
  
  /**
   * Background gradient effect
   * @default false
   */
  withGradient?: boolean;
  
  /**
   * Gradient direction
   * @default "to-r"
   */
  gradientDirection?: "to-r" | "to-l" | "to-t" | "to-b" | "to-tr" | "to-tl" | "to-br" | "to-bl";
  
  /**
   * Gradient from color (using Tabarka palette)
   * @default "blue"
   */
  gradientFrom?: "blue" | "coral" | "sand" | "earth";
  
  /**
   * Gradient to color (using Tabarka palette)
   * @default "coral"
   */
  gradientTo?: "blue" | "coral" | "sand" | "earth";
  
  /**
   * Gradient opacity (0-1)
   * @default 0.05
   */
  gradientOpacity?: number;
  
  /**
   * Color intensity for from color (50-950)
   * @default 100
   */
  fromIntensity?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
  
  /**
   * Color intensity for to color (50-950)
   * @default 100
   */
  toIntensity?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
  
  /**
   * Whether to add a solid color background
   * @default false
   */
  withBackground?: boolean;
  
  /**
   * Background color (using Tabarka palette)
   * @default "blue"
   */
  backgroundColor?: "blue" | "coral" | "sand" | "earth";
  
  /**
   * Background color intensity (50-950)
   * @default 50
   */
  backgroundIntensity?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
}

const AnimatedSection = ({
  className,
  children,
  from = "up",
  distance = 50,
  duration = 0.5,
  delay = 0,
  once = true,
  amount = 0.1,
  staggerChildren = 0,
  withGradient = false,
  gradientDirection = "to-r",
  gradientFrom = "blue",
  gradientTo = "coral",
  gradientOpacity = 0.05,
  fromIntensity = 100,
  toIntensity = 100,
  withBackground = false,
  backgroundColor = "blue",
  backgroundIntensity = 50,
  ...props
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount });
  
  const getInitialPosition = () => {
    switch (from) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: -distance };
      case "right":
        return { opacity: 0, x: distance };
      case "none":
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance };
    }
  };
  
  // Convert gradient opacity to decimal for Tailwind's opacity modifier
  const opacityValue = Math.round(gradientOpacity * 100);
  
  const variants = {
    hidden: getInitialPosition(),
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        duration,
        delay,
        staggerChildren: staggerChildren > 0 ? staggerChildren : undefined
      }
    }
  };
  
  return (
    <motion.section
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden rounded-lg",
        withGradient && `bg-gradient-${gradientDirection} from-tabarka-${gradientFrom}-${fromIntensity}/[${opacityValue}] to-tabarka-${gradientTo}-${toIntensity}/[${opacityValue}]`,
        withBackground && `bg-tabarka-${backgroundColor}-${backgroundIntensity}`,
        className
      )}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export { AnimatedSection }; 
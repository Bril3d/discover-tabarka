'use client';

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "style" | "variants" | "transition" | "initial" | "whileHover" | "whileTap"> {
  /**
   * Scale factor when hovering
   * @default 1.03
   */
  hoverScale?: number;
  
  /**
   * Scale factor when tapping
   * @default 0.97
   */
  tapScale?: number;
  
  /**
   * Duration of animation in seconds
   * @default 0.2
   */
  duration?: number;
  
  /**
   * Whether to add a hover glow effect
   * @default false
   */
  withGlow?: boolean;
  
  /**
   * Color of the glow (using Tabarka palette)
   * @default "blue"
   */
  glowColor?: "blue" | "coral" | "sand" | "earth";
  
  /**
   * Intensity of the glow effect
   * @default 0.4
   */
  glowIntensity?: number;
  
  /**
   * Whether to add a hover lift effect with shadow
   * @default false
   */
  withLift?: boolean;
  
  /**
   * Whether to add a background with the theme color
   * @default false
   */
  withColorBg?: boolean;
  
  /**
   * Color intensity for background (0-950)
   * @default 50
   */
  colorIntensity?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
}

const AnimatedCard = ({
  className,
  children,
  hoverScale = 1.03,
  tapScale = 0.97,
  duration = 0.2,
  withGlow = false,
  glowColor = "blue",
  glowIntensity = 0.4,
  withLift = false,
  withColorBg = false,
  colorIntensity = 50,
  ...props
}: AnimatedCardProps) => {
  const getGlowShadow = () => {
    const glowColorMap = {
      blue: `var(--color-tabarka-blue-500) / ${glowIntensity}`,
      coral: `var(--color-tabarka-coral-500) / ${glowIntensity}`,
      sand: `var(--color-tabarka-sand-500) / ${glowIntensity}`,
      earth: `var(--color-tabarka-earth-500) / ${glowIntensity}`
    };
    
    return `0 0 20px ${glowColorMap[glowColor]}`;
  };
  
  const getLiftShadow = () => {
    return "0 10px 25px var(--color-foreground) / 0.1";
  };
  
  return (
    <motion.div
      className={cn(
        "border border-border rounded-lg overflow-hidden transition-colors bg-card text-card-foreground shadow-sm",
        withColorBg && `bg-tabarka-${glowColor}-${colorIntensity}`,
        className
      )}
      whileHover={{
        scale: hoverScale,
        boxShadow: withGlow 
          ? getGlowShadow() 
          : withLift 
            ? getLiftShadow() 
            : undefined,
        y: withLift ? -5 : 0,
      }}
      whileTap={{ scale: tapScale }}
      transition={{ duration }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

AnimatedCard.displayName = "AnimatedCard";

const AnimatedCardHeader = React.forwardRef<
  HTMLDivElement, 
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

AnimatedCardHeader.displayName = "AnimatedCardHeader";

const AnimatedCardTitle = React.forwardRef<
  HTMLParagraphElement, 
  HTMLMotionProps<"h3">
>(({ className, ...props }, ref) => (
  <motion.h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));

AnimatedCardTitle.displayName = "AnimatedCardTitle";

const AnimatedCardDescription = React.forwardRef<
  HTMLParagraphElement, 
  HTMLMotionProps<"p">
>(({ className, ...props }, ref) => (
  <motion.p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

AnimatedCardDescription.displayName = "AnimatedCardDescription";

const AnimatedCardContent = React.forwardRef<
  HTMLDivElement, 
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
  <motion.div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

AnimatedCardContent.displayName = "AnimatedCardContent";

const AnimatedCardFooter = React.forwardRef<
  HTMLDivElement, 
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

AnimatedCardFooter.displayName = "AnimatedCardFooter";

export {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardFooter,
  AnimatedCardTitle,
  AnimatedCardDescription,
  AnimatedCardContent,
}; 
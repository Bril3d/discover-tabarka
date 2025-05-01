'use client';

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "style" | "variants" | "type" | "transition" | "initial" | "whileHover" | "whileTap"> {
  /**
   * Variant of the button
   * @default "default"
   */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  
  /**
   * Size of the button
   * @default "default"
   */
  size?: "default" | "sm" | "lg" | "icon";
  
  /**
   * Scale factor when hovering
   * @default 1.05
   */
  hoverScale?: number;
  
  /**
   * Scale factor when tapping
   * @default 0.95
   */
  tapScale?: number;
  
  /**
   * Type of button
   * @default "button"
   */
  type?: "button" | "submit" | "reset";
  
  /**
   * Duration of animation in seconds
   * @default 0.2
   */
  duration?: number;
  
  /**
   * Whether to disable the button
   * @default false
   */
  disabled?: boolean;
  
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
   * @default 0.6
   */
  glowIntensity?: number;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(({
  className,
  variant = "default",
  size = "default",
  hoverScale = 1.05,
  tapScale = 0.95,
  type = "button",
  duration = 0.2,
  disabled = false,
  withGlow = false,
  glowColor = "blue",
  glowIntensity = 0.6,
  children,
  ...props
}, ref) => {
  const getGlowShadow = () => {
    const glowColorMap = {
      blue: `var(--color-tabarka-blue-500) / ${glowIntensity}`,
      coral: `var(--color-tabarka-coral-500) / ${glowIntensity}`,
      sand: `var(--color-tabarka-sand-500) / ${glowIntensity}`,
      earth: `var(--color-tabarka-earth-500) / ${glowIntensity}`,
    };
    
    return `0 0 15px ${glowColorMap[glowColor]}`;
  };
  
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(className)}
      disabled={disabled}
      type={type}
      ref={ref}
    >
      <motion.button
        whileHover={!disabled ? { 
          scale: hoverScale,
          boxShadow: withGlow ? getGlowShadow() : undefined
        } : undefined}
        whileTap={!disabled ? { scale: tapScale } : undefined}
        transition={{ duration }}
        {...props}
      >
        {children}
      </motion.button>
    </Button>
  );
});

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton }; 
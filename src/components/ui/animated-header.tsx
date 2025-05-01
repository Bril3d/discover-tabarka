'use client';

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedHeaderProps extends Omit<HTMLMotionProps<"header">, "style"> {
  /**
   * Offset at which header transformation starts
   * @default 50
   */
  scrollThreshold?: number;
  
  /**
   * Whether to add shadow when scrolled
   * @default true
   */
  withShadow?: boolean;
  
  /**
   * Whether to make header transparent at top and opaque when scrolled
   * @default true
   */
  transparentAtTop?: boolean;
  
  /**
   * Whether to shrink header on scroll
   * @default true
   */
  shrinkOnScroll?: boolean;
  
  /**
   * Color theme for header
   * @default "blue"
   */
  color?: "blue" | "coral" | "sand" | "earth" | "default";
}

const AnimatedHeader = ({
  className,
  scrollThreshold = 50,
  withShadow = true,
  transparentAtTop = true, 
  shrinkOnScroll = true,
  color = "blue",
  children,
  ...props
}: AnimatedHeaderProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(
    scrollY, 
    [0, scrollThreshold], 
    transparentAtTop ? [0.6, 1] : [1, 1]
  );
  
  const headerHeight = useTransform(
    scrollY, 
    [0, scrollThreshold], 
    shrinkOnScroll ? ["4rem", "3rem"] : ["4rem", "4rem"]
  );
  
  const headerPadding = useTransform(
    scrollY, 
    [0, scrollThreshold], 
    shrinkOnScroll ? ["1.5rem", "0.75rem"] : ["1.5rem", "1.5rem"]
  );
  
  const getBackgroundColor = () => {
    if (color === "default") return "var(--color-background)";
    
    const colorMap = {
      blue: "var(--color-tabarka-blue-50)",
      coral: "var(--color-tabarka-coral-50)",
      sand: "var(--color-tabarka-sand-50)",
      earth: "var(--color-tabarka-earth-50)",
    };
    
    return colorMap[color];
  };
  
  const headerBackgroundColor = useTransform(
    scrollY,
    [0, scrollThreshold],
    transparentAtTop ? 
      [`${getBackgroundColor()} / 0`, `${getBackgroundColor()} / 0.9`] : 
      [`${getBackgroundColor()} / 0.9`, `${getBackgroundColor()} / 0.9`]
  );
  
  const getShadowColor = () => {
    if (color === "default") return "var(--color-foreground)";
    
    const colorMap = {
      blue: "var(--color-tabarka-blue-900)",
      coral: "var(--color-tabarka-coral-900)",
      sand: "var(--color-tabarka-sand-900)",
      earth: "var(--color-tabarka-earth-900)",
    };
    
    return colorMap[color];
  };
  
  const headerShadow = useTransform(
    scrollY,
    [0, scrollThreshold],
    withShadow ? 
      ["0 0 0 transparent", `0 2px 10px ${getShadowColor()} / 0.1`] : 
      ["0 0 0 transparent", "0 0 0 transparent"]
  );
  
  useEffect(() => {
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > scrollThreshold);
    };
    
    window.addEventListener("scroll", updateScrollState);
    
    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, [scrollThreshold]);
  
  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center w-full",
        hasScrolled ? "backdrop-blur-md" : "",
        className
      )}
      style={{
        opacity: headerOpacity,
        height: headerHeight,
        paddingTop: headerPadding,
        paddingBottom: headerPadding,
        backgroundColor: headerBackgroundColor,
        boxShadow: headerShadow,
      }}
      {...props}
    >
      {children}
    </motion.header>
  );
};

export { AnimatedHeader }; 
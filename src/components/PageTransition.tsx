import React from 'react';
import { motion } from 'framer-motion';
interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}
/**
 * Shared motion wrapper for snappy, neobrutalist page transitions.
 * Uses fast duration and easeOut for a technical, responsive feel.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.995 }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
      className={className}
      role="region"
    >
      {children}
    </motion.div>
  );
}
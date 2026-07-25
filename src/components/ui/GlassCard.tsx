import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

type GlowColor = 'primary' | 'secondary' | 'none';

export interface GlassCardProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** Which accent the hover glow should use. */
  glow?: GlowColor;
  /** Disable the hover lift/glow entirely (e.g. for static decorative cards). */
  interactive?: boolean;
  className?: string;
}

const glowShadow: Record<GlowColor, string> = {
  primary: '0 0 0 1px rgba(139,92,246,0.35), 0 20px 60px -15px rgba(139,92,246,0.35)',
  secondary: '0 0 0 1px rgba(16,185,129,0.35), 0 20px 60px -15px rgba(16,185,129,0.35)',
  none: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px -15px rgba(3,7,18,0.6)',
};

/**
 * GlassCard
 * A reusable glassmorphic container built on top of the `.glass-card`
 * utility defined in global.css. Adds a smooth hover lift and a
 * border-glow that matches the Brikwerk accent system.
 */
const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, glow = 'primary', interactive = true, className = '', ...rest }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        className={`glass-card p-6 ${className}`}
        initial={false}
        whileHover={
          interactive && !prefersReducedMotion
            ? {
                y: -6,
                boxShadow: glowShadow[glow],
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }
            : undefined
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;

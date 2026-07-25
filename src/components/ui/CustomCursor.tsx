import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Elements that trigger the cursor's "hover" (enlarged) state. */
const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, .glass-card, [data-cursor]';

/**
 * CustomCursor
 * A two-layer cursor overlay: a small dot that tracks the pointer
 * exactly, and a larger spring-lagged ring with an electric-violet glow
 * that trails behind it and scales up over interactive elements.
 *
 * Mount this once, near the root of the app (e.g. in BaseLayout with
 * `client:load`). It renders nothing on touch/coarse-pointer devices and
 * never hides the native cursor for them.
 */
export default function CustomCursor() {
  const [isSupported, setIsSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  // Raw pointer position — updated outside React state to avoid re-renders
  // on every mousemove. The dot binds to these directly.
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // The ring trails the raw position through a spring for the "drag" feel.
  const ringX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const cannotHover = window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Bail out entirely for touch devices or reduced-motion preference —
    // never attach listeners, never hide the system cursor.
    if (isCoarsePointer || cannotHover || prefersReducedMotion) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.<HTMLElement>(HOVER_SELECTOR);
      if (target) {
        setIsHovering(true);
        setLabel(target.dataset.cursor ?? null);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest?.(HOVER_SELECTOR)) {
        setIsHovering(false);
        setLabel(null);
      }
    };

    const handleWindowLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleWindowLeave);
    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.documentElement.removeEventListener('mouseleave', handleWindowLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [mouseX, mouseY]);

  if (!isSupported) return null;

  const ringSize = isHovering ? 64 : 32;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden="true">
      {/* Dot: exact pointer position, no lag */}
      <motion.div
        className="fixed left-0 top-0 rounded-full bg-white"
        style={{
          width: 6,
          height: 6,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring: spring-lagged, glows and scales on hover */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-primary/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          background:
            'radial-gradient(circle, rgba(var(--cursor-glow-rgb), 0.18) 0%, transparent 72%)',
          boxShadow: `0 0 24px 2px rgba(var(--cursor-glow-rgb), ${isHovering ? 0.55 : 0.3})`,
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      >
        {label && (
          <span className="select-none whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-white">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}

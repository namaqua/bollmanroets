/**
 * Shared animation variants for Framer Motion
 * Use these across components for consistent motion design
 */

import type { Variants, Transition } from 'framer-motion'

// Spring presets
export const springs = {
  gentle: { type: 'spring', stiffness: 120, damping: 14 } as Transition,
  snappy: { type: 'spring', stiffness: 300, damping: 24 } as Transition,
  bouncy: { type: 'spring', stiffness: 400, damping: 10 } as Transition,
  stiff: { type: 'spring', stiffness: 500, damping: 30 } as Transition,
}

// Fade variants
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

// Slide up variants (for cards, modals, dropdowns)
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.snappy,
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 },
  },
}

// Slide down variants (for dropdowns, menus)
export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.snappy,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15 },
  },
}

// Scale variants (for modals, popovers)
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.snappy,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
}

// Stagger container (for lists)
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

// Stagger item (use with staggerContainerVariants)
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.gentle,
  },
}

// Page transition variants
export const pageVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

// Button tap animation props
export const buttonTapProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: springs.stiff,
}

// Skeleton shimmer variants
export const shimmerVariants: Variants = {
  hidden: { backgroundPosition: '-200% 0' },
  visible: {
    backgroundPosition: '200% 0',
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear',
    },
  },
}

// Collapse/expand variants
export const collapseVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
}

// Rotate variants (for icons, chevrons)
export const rotateVariants: Variants = {
  collapsed: { rotate: 0 },
  expanded: { rotate: 180 },
}

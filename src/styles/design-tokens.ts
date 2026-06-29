/**
 * BORNO Design System - Design Tokens
 * Premium futuristic dark mode with cinematic gradients
 */

export const colors = {
  // Primary gradient colors (purple palette)
  primary: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b4",
    900: "#4c1d95",
  },

  // Accent colors
  accent: {
    blue: "#3b82f6",
    cyan: "#06b6d4",
    pink: "#ec4899",
    rose: "#f43f5e",
  },

  // Semantic colors
  background: "#0a0a0a",
  foreground: "#fafafa",
  card: "rgba(255, 255, 255, 0.03)",
  border: "rgba(255, 255, 255, 0.1)",
  input: "rgba(255, 255, 255, 0.05)",
  ring: "#8b5cf6",

  // Glass morphism
  glass: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    dark: "rgba(0, 0, 0, 0.25)",
  },
} as const;

// Spacing scale (rem values)
export const spacing = {
  0: "0px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
} as const;

// Typography scale
export const typography = {
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
} as const;

export const gradients = {
  primary: "linear-gradient(135deg, #a855f7, #8b5cf6, #7c3aed)",
  accent: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  rainbow: "linear-gradient(135deg, #a855f7, #3b82f6, #06b6d4)",
} as const;

export const animations = {
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 30,
  },
  smooth: {
    type: "spring",
    stiffness: 300,
    damping: 25,
  },
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
} as const;

export const blur = {
  xs: "blur(4px)",
  sm: "blur(8px)",
  md: "blur(16px)",
  lg: "blur(24px)",
  xl: "blur(32px)",
} as const;

export const shadows = {
  glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
  glow: "0 0 20px rgba(139, 92, 246, 0.15)",
  glowLg: "0 0 40px rgba(139, 92, 246, 0.2)",
} as const;

// Border radius scale
export const borderRadius = {
  none: "0px",
  sm: "calc(var(--radius) - 6px)",
  default: "var(--radius)", // 16px
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)", // 16px
  xl: "calc(var(--radius) + 2px)",
  "2xl": "calc(var(--radius) + 4px)",
  "3xl": "calc(var(--radius) + 8px)",
  full: "9999px",
} as const;

// Z-index layers
export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  notification: 1700,
  max: 2147483647,
} as const;

// Component style presets
export const components = {
  button: {
    base: "font-medium transition-all duration-300 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",
    variants: {
      primary: "relative overflow-hidden bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:translate-x-[-100%] before:transition-transform before:duration-500 hover:before:translate-x-[100%]",
      secondary: "glass-premium text-gray-200 hover:text-white",
      ghost: "text-gray-400 hover:text-purple-400 hover:bg-white/5",
      glass: "glass-premium text-gray-200 border-purple-500/20",
      premium: "relative overflow-hidden bg-gradient-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-xl border border-purple-500/30 text-white shadow-lg shadow-purple-500/20",
    },
    sizes: {
      sm: "px-4 py-2 text-sm rounded-full",
      md: "px-6 py-3 text-base rounded-full",
      lg: "px-8 py-4 text-lg rounded-full",
    },
  },
  card: {
    base: "border-white/10 backdrop-blur-xl transition-all duration-300",
    variants: {
      default: "glass-premium",
      dark: "glass-dark",
      accent: "glass-accent",
    },
  },
} as const;
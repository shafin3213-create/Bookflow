# BORNO Design System

A premium futuristic dark mode design system with cinematic gradients and glass morphism aesthetics.

## Design Principles

- **Dark by default**: Immersive dark theme experience
- **Glass morphism**: Frosted glass effect with backdrop blur
- **Cinematic gradients**: Purple-to-blue gradient palette
- **Smooth animations**: Spring-based motion for natural interactions
- **Premium feel**: Subtle shadows and glow effects

## Color Tokens

### Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--purple-50` | `#f5f3ff` | Lightest tint (rarely used in dark mode) |
| `--purple-500` | `#8b5cf6` | Primary accent color |
| `--purple-600` | `#7c3aed` | Hover states |

### Semantic Colors

```css
--background: #0a0a0a;    /* Main background */
--foreground: #fafafa;    /* Primary text */
--card: rgba(255, 255, 255, 0.03);  /* Card backgrounds */
--border: rgba(255, 255, 255, 0.1); /* Borders */
--ring: #8b5cf6;        /* Focus rings */
```

### Gradient Presets

```css
--gradient-primary: linear-gradient(135deg, #a855f7, #8b5cf6, #7c3aed);
--gradient-accent: linear-gradient(135deg, #3b82f6, #06b6d4);
--gradient-rainbow: linear-gradient(135deg, #a855f7, #3b82f6, #06b6d4);
```

## Typography

```css
--font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
--radius: 16px;  /* Border radius for rounded elements */
```

### Text Utilities

| Class | Effect |
|-------|--------|
| `.gradient-text` | Animated purple-blue-cyan gradient |
| `.gradient-text-purple` | Static purple gradient |
| `.gradient-text-blue` | Static blue gradient |
| `.text-glow` | Strong text glow effect |
| `.text-glow-subtle` | Subtle text glow |

## Spacing Scale

Based on Tailwind's spacing scale:

| Scale | Value |
|-------|-------|
| 0 | 0px |
| 1 | 0.25rem (4px) |
| 2 | 0.5rem (8px) |
| 3 | 0.75rem (12px) |
| 4 | 1rem (16px) |
| 5 | 1.25rem (20px) |
| 6 | 1.5rem (24px) |
| 8 | 2rem (32px) |
| 10 | 2.5rem (40px) |
| 12 | 3rem (48px) |

## Animation Tokens

```typescript
// Spring animations
spring: {
  type: "spring",
  stiffness: 400,
  damping: 30,
}

// Smooth spring
smooth: {
  type: "spring",
  stiffness: 300,
  damping: 25,
}

// Duration presets
fast: 150ms
normal: 300ms
slow: 500ms
```

## Glass Morphism Utilities

### `.glass-premium`
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.08);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

### `.glass-dark`
Darker variant for deeper glass effect.

### `.glass-accent`
Purple-blue tinted glass variant.

## Components

### Button

```tsx
import { Button } from "@/components/ui/Button";

// Variants
<Button variant="primary">Primary</Button>   // Gradient with shine effect
<Button variant="secondary">Secondary</Button> // Glass morphism
<Button variant="ghost">Ghost</Button>        // Minimal
<Button variant="glass">Glass</Button>        // Glass with border
<Button variant="premium">Premium</Button>    // Premium glass variant

// Sizes
<Button size="sm">Small</Button>  // px-4 py-2 text-sm
<Button size="md">Medium</Button>  // px-6 py-3 text-base
<Button size="lg">Large</Button>   // px-8 py-4 text-lg
```

### GlassCard

```tsx
import { GlassCard } from "@/components/ui/GlassCard";

// Variants
<GlassCard variant="default">Default glass</GlassCard>
<GlassCard variant="dark">Dark glass</GlassCard>
<GlassCard variant="accent">Accent glass</GlassCard>
<GlassCard variant="premium">Premium glass</GlassCard>

// Props
hover={true}  // Enable hover scale effect (default: true)
```

### LoadingSpinner

```tsx
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

<LoadingSpinner />
```

## Usage

### Importing Design Tokens

```typescript
import { colors, gradients, animations, blur, shadows } from "@/styles";
```

### Applying Glass Effect

```tsx
<div className="glass-premium rounded-2xl p-6">
  Content with glass effect
</div>
```

### Using Gradients

```tsx
<h1 className="gradient-text-purple text-4xl font-bold">
  Heading
</h1>
```

## Best Practices

1. Use `glass-premium` for cards and elevated surfaces
2. Apply `backdrop-blur-xl` for glass morphism effects
3. Use gradient text sparingly for emphasis
4. Keep animations smooth with spring physics
5. Maintain consistent 16px border radius for premium feel
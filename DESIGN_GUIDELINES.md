# Tempora Labs Design System Guidelines

## Overview
This document defines the design system for Tempora Labs frontend. All UI components must follow these guidelines to maintain consistency and brand identity.

---

## Color System

### Primary Colors
- **tem-dark-1** (`#0B1524`) - Primary dark background, default page background
- **tem-dark-2** (`#142536`) - Secondary dark background, cards in dark sections
- **tem-dark-3** (`#1C3244`) - Tertiary dark background, elevated surfaces

### Accent Colors
- **tem-accent** (`#13C7C4`) - Primary accent color, CTAs, highlights
- **tem-accent-soft** (`#55D5D1`) - Soft accent variant, hover states
- **tem-accent-deep** (`#267B87`) - Deep accent variant, cards in light sections

### Neutral Colors
- **tem-neutral-light** (`#E1E7EA`) - Light neutral background
- **tem-neutral-muted** (`#8DA7B3`) - Muted text, secondary UI elements

### Usage Rules
- **Dark Sections**: Use `bg-tem-dark-1`, `bg-tem-dark-2`, or `bg-tem-dark-3`
- **Light Sections**: Use `bg-white` or `bg-tem-neutral-light`
- **Cards in Light Sections**: May use `bg-tem-accent-deep`, `bg-tem-accent-soft`, or `bg-white`
- **Accent UI**: Use `bg-tem-accent` or gradient with `shadow-tem-glow`

---

## Typography

### Primary Font: Plus Jakarta Sans
- **Usage**: All UI, headings, body text
- **Weights**: 400, 500, 600, 700, 800
- **Class**: `font-sans`

### Mono Font: IBM Plex Mono
- **Usage**: On-chain data, agent logs, code UI, technical displays
- **Weights**: 400, 500, 600, 700
- **Class**: `font-mono`

### Typography Scale
- **H1**: `text-4xl md:text-5xl lg:text-6xl font-bold`
- **H2**: `text-3xl md:text-4xl lg:text-5xl font-semibold`
- **H3**: `text-2xl md:text-3xl font-semibold`
- **H4**: `text-xl md:text-2xl font-semibold`
- **Body**: `text-base md:text-lg`

---

## Gradients

### Available Gradients
- **bg-tem-hero**: `linear-gradient(135deg,#0B1524 0%,#142536 60%,#1C3244 100%)`
  - Usage: Hero section backgrounds
  
- **bg-tem-light**: `linear-gradient(180deg,#E1E7EA,#FFFFFF)`
  - Usage: Light content sections
  
- **bg-tem-accent-gradient**: `linear-gradient(90deg,#13C7C4,#55D5D1)`
  - Usage: Accent buttons, highlights

---

## Shadows & Effects

### Glow Shadow
- **shadow-tem-glow**: `0 0 40px rgba(19,199,196,0.45)`
- Usage: Accent buttons, highlighted elements

### Border Radius
- **rounded-xl2**: `1.25rem` (20px)
- Usage: Cards, containers, buttons

---

## Layout Rules

### Default Page Styling
```css
- Background: bg-tem-dark-1
- Text: text-white
- Font: font-sans
```

### Light Content Sections
- Background: `bg-white` or `bg-tem-neutral-light`
- Text: `text-tem-dark-1` or `text-tem-dark-2`
- Cards: `bg-white`, `bg-tem-accent-deep`, or `bg-tem-accent-soft`

### Dark Content Sections
- Background: `bg-tem-dark-1`, `bg-tem-dark-2`, or `bg-tem-dark-3`
- Text: `text-white` or `text-tem-neutral-muted`
- Cards: `bg-tem-dark-2` or `bg-tem-dark-3`

---

## Component Standards

### Buttons
- **Primary**: `bg-tem-accent text-tem-dark-1 font-semibold rounded-lg shadow-tem-glow`
- **Gradient**: `bg-tem-accent-gradient text-tem-dark-1 font-semibold rounded-lg shadow-tem-glow`
- **Outline**: `border-2 border-tem-accent text-tem-accent font-semibold rounded-lg`

### Cards
- **Dark Section**: `bg-tem-dark-2 rounded-xl2 p-6 border border-tem-dark-3`
- **Light Section**: `bg-white rounded-xl2 p-6` or accent variants

### Stat Cards
- Background: `bg-tem-dark-3`
- Border: `border border-tem-accent/20`
- Label: `text-tem-accent font-mono text-sm`
- Value: `text-4xl font-bold`
- Subtext: `text-tem-neutral-muted text-sm`

---

## Rules for Development

### ✅ DO
- Use configured Tailwind classes (e.g., `bg-tem-accent`, `text-tem-dark-1`)
- Follow the color system for backgrounds and text
- Use `font-mono` only for logs, technical UI, or data visualizations
- Apply `shadow-tem-glow` to accent elements
- Use `rounded-xl2` for cards and containers

### ❌ DON'T
- Introduce new colors without adding them to `tailwind.config.ts` first
- Use hardcoded hex codes (e.g., `#13C7C4`) - use `bg-tem-accent` instead
- Mix font families inappropriately (mono for UI text, sans for code)
- Create custom colors outside the design system
- Use arbitrary values when a design token exists

---

## For Cursor AI

When generating UI components for Tempora Labs:

1. **Always use design tokens** from `tailwind.config.ts` - never hardcode colors
2. **Default page styling**: `bg-tem-dark-1 text-white font-sans`
3. **Light sections**: `bg-white` or `bg-tem-neutral-light` with dark text
4. **Accent elements**: Use `bg-tem-accent` or `bg-tem-accent-gradient` with `shadow-tem-glow`
5. **Technical data**: Use `font-mono` for addresses, logs, code
6. **Cards**: Use `rounded-xl2` and appropriate background colors
7. **Check `DESIGN_GUIDELINES.md`** before introducing new colors or patterns

---

## Reference

- **Design System Page**: `/design-system` - Visual reference for all tokens
- **Tailwind Config**: `tailwind.config.ts` - Source of truth for design tokens
- **Global Styles**: `src/app/globals.css` - Base typography and utilities







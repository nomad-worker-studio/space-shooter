# UI/UX Design Skill

## Design Philosophy
Build interfaces that feel modern today and won't look dated tomorrow.
Prioritize timeless design principles over trend-chasing.

## Core Principles

### Visual Hierarchy
- Establish clear typographic scale (heading, subheading, body, caption)
- Use font weight and size contrast, not just color, to create hierarchy
- Limit to 2 font families maximum (1 for headings, 1 for body)

### Spacing & Layout
- Use 8px grid system for all spacing and sizing
- Generous whitespace: content should breathe
- Consistent padding and margins across all components
- Responsive layout: mobile-first, then scale up

### Color
- Define a minimal palette: 1 primary, 1 secondary, 1 accent, neutrals
- Meet WCAG 2.1 AA contrast requirements (4.5:1 for text, 3:1 for large text)
- Design for both light and dark mode from the start
- Use color meaningfully: success, warning, error, info

### Components
- Consistent component API across the entire app
- Unified button styles, input fields, cards, modals
- Interaction states for all interactive elements: default, hover, active, focus, disabled
- Touch targets minimum 44x44px on mobile

## What NOT to Do
- No gratuitous gradients or drop shadows
- No excessive animations (max 200ms for micro-interactions)
- No font sizes below 14px for body text
- No low-contrast text

## Design Tokens (Starting Point)
```
Spacing:    4, 8, 12, 16, 24, 32, 48, 64, 96
Font sizes: 12, 14, 16, 18, 20, 24, 30, 36, 48
Radius:     4, 8, 12, 16, 9999 (pill)
Shadows:    sm (subtle), md (card), lg (modal/overlay)
```

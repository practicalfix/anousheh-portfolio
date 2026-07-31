---
name: Cosmic Desktop
colors:
  surface: '#131317'
  surface-dim: '#131317'
  surface-bright: '#39393e'
  surface-container-lowest: '#0e0e12'
  surface-container-low: '#1b1b20'
  surface-container: '#1f1f24'
  surface-container-high: '#2a292e'
  surface-container-highest: '#353439'
  on-surface: '#e4e1e8'
  on-surface-variant: '#c8c5ce'
  inverse-surface: '#e4e1e8'
  inverse-on-surface: '#303035'
  outline: '#928f98'
  outline-variant: '#47464d'
  surface-tint: '#c5c3e5'
  primary: '#c5c3e5'
  on-primary: '#2e2e48'
  primary-container: '#12122b'
  on-primary-container: '#7d7c9b'
  inverse-primary: '#5c5c79'
  secondary: '#c9beff'
  on-secondary: '#311c7e'
  secondary-container: '#4a3998'
  on-secondary-container: '#bbaeff'
  tertiary: '#c6c6c6'
  on-tertiary: '#2f3131'
  tertiary-container: '#131515'
  on-tertiary-container: '#7e7f7f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c5c3e5'
  on-primary-fixed: '#191932'
  on-primary-fixed-variant: '#444460'
  secondary-fixed: '#e6deff'
  secondary-fixed-dim: '#c9beff'
  on-secondary-fixed: '#1b0062'
  on-secondary-fixed-variant: '#483795'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131317'
  on-background: '#e4e1e8'
  surface-variant: '#353439'
typography:
  window-title:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-pixel:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-handwritten:
    fontFamily: Bricolage Grotesque
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 22px
spacing:
  window-padding: 1.5rem
  grid-gutter: 1rem
  desktop-margin: 2rem
  icon-stack: 2.5rem
  stack-sm: 0.5rem
---

## Brand & Style

The design system is built on a narrative of "Digital Nostalgia in Deep Space." It blends the structured utility of a 90s desktop operating system with the dreamy, lo-fi aesthetic of a late-night telescope session. The target audience includes creative collaborators and employers looking for personality over corporate polish.

The style is **Retro-Futuristic Lo-fi**. It rejects the sterile perfection of modern SaaS in favor of "charming imperfections"—think slightly pixelated borders, hand-drawn folder icons, and windows that feel like physical objects floating in a vacuum. The emotional response should be one of "cozy isolation"—a private, safe terminal among the stars.

## Colors

The palette is anchored in a **Midnight Navy** (#12122b) and **Obsidian Black** (#08080c) foundation to simulate the vastness of space. 

- **Primary & Secondary:** Muted Purples (#9d8df1) provide a ghostly, nebula-like glow for active states and highlights.
- **Neutral/Surface:** Deep blacks are used for window backgrounds, ensuring high contrast for content.
- **Accents:** Silver (#c0c0c8) is reserved for structural elements like window borders and title bars, while Off-White/Star-Yellow (#fdfcf0) is used for "sparkle" moments—icon glints, notifications, or decorative star-field particles.

## Typography

This design system uses a triple-font strategy to balance readability with thematic flavor.

1.  **Functional Reading:** **Hanken Grotesk** serves as the primary body face. It is clean and modern, ensuring that portfolio descriptions and professional info are legible.
2.  **Structural Identity:** **Space Grotesk** is used for window titles and large headlines, offering a geometric, slightly "tech" feel that grounds the space theme.
3.  **Thematic Texture:** **Space Mono** (acting as the pixel-font proxy) is used for system labels, coordinates, and "metadata." For a "handwritten" touch in decorative notes or tooltips, **Bricolage Grotesque** is utilized for its quirky, organic curves that look like ink on a screen.

## Layout & Spacing

The layout follows a **Fixed Desktop Paradigm**. Instead of a traditional web scroll, the UI is treated as a 100vh viewport where "Windows" can be positioned.

- **The Desktop:** A 12-column fluid grid serves as the snap-target for draggable windows.
- **Margins:** A generous 32px (2rem) "safe area" surrounds the viewport edges where the taskbar and desktop icons reside.
- **Window Internals:** Content inside windows should use a 24px (1.5rem) padding. 
- **The "Icon Grid":** Desktop icons (Folders/Files) are arranged in a vertical stack on the right or left, using a 40px (2.5rem) rhythm to mimic classic OS spacing.

## Elevation & Depth

Depth is achieved through **Structural Layering** rather than realistic shadows.

- **Window Stack:** Windows use a hard 2px border in Silver (#c0c0c8). 
- **Shadows:** Use "Desktop Shadows"—hard, non-blurred offsets. Instead of soft glows, use a 4px offset (bottom-right) in #000000 at 50% opacity to "lift" windows off the star-field background.
- **Active State:** The focused window gains a subtle outer glow of Primary Purple (#9d8df1) to distinguish it from background processes.
- **Inner Depth:** Input fields and "wells" use an inner shadow (inset) to appear carved into the window surface.

## Shapes

The design system adopts a **Sharp (0)** roundedness philosophy. 

All windows, buttons, and input fields have 0px corner radii. This reinforces the "legacy OS" feel and provides a crisp contrast against the organic, circular shapes of hand-drawn stars or planet illustrations in the background. The only exceptions are "Icon" highlights, which may use a 2px radius for a softer selection box.

## Components

- **Windows:** Must include a title bar with a Silver (#c0c0c8) background and dark text. Include three square buttons on the right: [_] [口] [X] for minimize, maximize, and close.
- **Desktop Icons:** Hand-drawn/Pixel folders with a label underneath using `label-pixel`. On hover, the icon should "jiggle" or show a 1px dotted selection outline.
- **Buttons:** Styled as "beveled" blocks. Use a light silver top/left border and a dark navy bottom/right border to create a tactile, pressed effect.
- **Scrollbars:** Custom ultra-thin silver tracks with a square purple thumb. No rounded ends.
- **Taskbar:** A semi-transparent black bar at the bottom of the screen with a "Start" (or "Launch") button and a digital clock in `label-pixel`.
- **Modals:** Treat as "System Alerts" with a thicker 4px border and a centered, restricted width.
---
name: LYS Salon & Spa
colors:
  surface: '#fafaf4'
  surface-dim: '#dadad5'
  surface-bright: '#fafaf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4ee'
  surface-container: '#eeeee9'
  surface-container-high: '#e8e8e3'
  surface-container-highest: '#e3e3dd'
  on-surface: '#1a1c19'
  on-surface-variant: '#424844'
  inverse-surface: '#2f312d'
  inverse-on-surface: '#f1f1eb'
  outline: '#727974'
  outline-variant: '#c2c8c2'
  surface-tint: '#4b6456'
  primary: '#0e261b'
  on-primary: '#ffffff'
  primary-container: '#243c30'
  on-primary-container: '#8ca697'
  inverse-primary: '#b1cdbc'
  secondary: '#53634f'
  on-secondary: '#ffffff'
  secondary-container: '#d6e8cf'
  on-secondary-container: '#586955'
  tertiary: '#1b241c'
  on-tertiary: '#ffffff'
  tertiary-container: '#303930'
  on-tertiary-container: '#99a397'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cde9d8'
  primary-fixed-dim: '#b1cdbc'
  on-primary-fixed: '#072015'
  on-primary-fixed-variant: '#344c3f'
  secondary-fixed: '#d6e8cf'
  secondary-fixed-dim: '#baccb4'
  on-secondary-fixed: '#111f10'
  on-secondary-fixed-variant: '#3b4b39'
  tertiary-fixed: '#dbe5d8'
  tertiary-fixed-dim: '#bfc9bd'
  on-tertiary-fixed: '#151e16'
  on-tertiary-fixed-variant: '#404940'
  background: '#fafaf4'
  on-background: '#1a1c19'
  surface-variant: '#e3e3dd'
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: 0em
  title-lg:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0.01em
  title-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  eyebrow:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.22em
  label-md:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 2rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-mobile: 1.5rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.5rem
  space-lg: 2.5rem
  space-xl: 4rem
---

## Brand & Style

This design system embodies high-fashion tactile luxury for an elite urban sanctuary in Lower Parel, Mumbai. The experience evokes the serenity of restorative wellness filtered through an architectural, editorial lens. It fuses the tactile warmth of limestone, fluted glass, and botanical botanicals with editorial restraint.

The aesthetic philosophy draws on two primary movements:
- **Tactile Organic Luxury:** Unhurried negative space, warm textural materiality, sculptural forms, and botanical depth replace clinical salon interfaces.
- **Modern Editorial Glassmorphism:** Micro-surfaces borrow the optics of heavy fluted glass and translucent frosted crystal, casting ambient botanical refractions over warm ivory foundations.

The interface should feel like turning the pages of an oversized, heavy-stock fashion quarterly: composed, quiet, confident, and deeply sensory.

## Colors

The palette pairs restorative botanical undertones with architectural depth. The primary background is never cold digital white, but an organic, luminous ivory (`#F7F6F0`).

- **Canvas Foundation (`#F7F6F0`):** The default root background. Emulates raw handmade paper and honed travertine.
- **Deep Forest Green (`#243C30`):** The primary authority color. Used for dominant headlines, primary interactive states, key iconography, and solid structural accents.
- **Rich Black (`#111310`):** Neutral dark for high-precision body copy, hairline rules, and high-contrast display text.
- **Pastel Sage Green (`#C6D8C0`):** Secondary accent. Used for elevated interactive chip selections, secondary callout banners, and soft borders.
- **Soft Mint (`#E3EDE0`):** Tertiary tint. Provides tinted container fills, subtle card backgrounds, and active state highlights.
- **Muted Grey (`#777C75`):** Structural neutral for supporting metadata, inactive states, hairline dividers, and secondary captions.
- **Pure White (`#FFFFFF`):** Reserved strictly for frosted glass surfaces, card elevations, and high-contrast button labels against forest green.

## Typography

The type system balances classical haute couture with contemporary rational clarity:

- **Playfair Display** introduces romantic, statuesque high-contrast letterforms for hero titles, section headlines, and treatment naming.
- **Manrope** provides an ultra-legible, geometric, and modern foundation for editorial body copy, booking tables, pricing schedules, and operational states.
- **Uppercase Micro-Eyebrows:** All category flags, location tags, treatment pre-titles, and badges strictly utilize the `eyebrow` token (Manrope, uppercase, tracking `0.22em`) to evoke luxury atelier engraving.
- **Editorial Balance:** Maintain high line-heights on body copy (`1.6`–`1.7`) to protect breathability and an unhurried cadence.

## Layout & Spacing

The layout is built upon an asymmetrical, magazine-inspired grid structure rather than a dense, rigid application framework:

- **Desktop (1024px+):** 12-column fluid grid with `4rem` outer margins and `2rem` gutters. Content frequently breaks balance intentionally (e.g., a 7-column editorial visual paired with an offset 4-column typographic description).
- **Tablet (768px – 1023px):** 8-column layout with `2.5rem` margins and `1.5rem` gutters.
- **Mobile (<768px):** 4-column layout with `1.5rem` margins and `1rem` gutters. Elements reflow cleanly into linear stacks while maintaining expansive vertical padding.
- **Rhythm:** Vertical section separations must utilize generous gaps (`space-xl` to `6rem`) to mirror the relaxed, decompression experience of entering a bespoke wellness retreat.

## Elevation & Depth

Visual depth is achieved through optical atmosphere rather than harsh synthetic shadows:

- **Translucent Glass Refractions:** Floating headers, quick-booking drawers, and overlay cards utilize `rgba(247, 246, 240, 0.72)` or `rgba(255, 255, 255, 0.65)` layered with `backdrop-filter: blur(16px)` and a subtle interior highlight edge (`inset 0 1px 0 rgba(255, 255, 255, 0.8)`).
- **Ambient Botanical Shadows:** When elevation is necessary (e.g., interactive appointment pickers, elevated service dossiers), shadows are tinted with deep forest tones instead of flat pitch black: `0 20px 40px -15px rgba(36, 60, 48, 0.08)`.
- **Architectural Hairlines:** Layer differentiation relies primarily on thin `1px` translucent borders (`rgba(36, 60, 48, 0.12)` or `rgba(198, 216, 192, 0.5)`) mimicking fine brass and steel interior joinery.

## Shapes

The geometric vocabulary balances clean architectural linearity with sculptural, organic curvature:

- **Base Radius (0.5rem / 8px):** Applied to form fields, service tags, and structural inputs.
- **Large Radius (1rem / 16px):** Standard for editorial cards, appointment slots, and interactive containers.
- **Extra-Large & Sculptural Radius (1.5rem / 24px):** Used on featured treatment hero imagery, botanical photography frames, and modal sheets.
- **Asymmetric Sculptural Arches:** For premier treatment showcases and salon showcase galleries, cards may employ an arched top silhouette (`border-radius: 999px 999px 16px 16px`) echoing classical spa entryways.

## Components

### Buttons & Interactive CTAs
- **Primary:** Solid Deep Forest Green (`#243C30`) with Pure White (`#FFFFFF`) text, subtle inner border shimmer, and pill or soft-corner geometry. On hover, background shifts to a richer saturation with a delicate lift.
- **Secondary (Ghost Atelier):** Transparent fill bordered with a hairline Deep Forest Green rule (`#243C30`), displaying text in `#243C30`. On hover, fills with Soft Mint (`#E3EDE0`).
- **Text Action:** `eyebrow` typography token paired with an extended organic arrow (`→`), transitioning 4px on hover.

### Chips & Filter Pills
- Compact height (36px), rounded pill architecture, set with `label-sm` typography.
- Inactive: `#F7F6F0` fill with `rgba(119, 124, 117, 0.3)` border.
- Active: Soft Mint (`#E3EDE0`) fill with Deep Forest Green (`#243C30`) border and copy.

### Service Dossier Cards
- Background: Luminous white (`#FFFFFF`) or frosted glass over warm ivory.
- Border: `1px` solid `rgba(36, 60, 48, 0.08)`.
- Features generous internal padding (`space-md` to `space-lg`), asymmetric imagery pairing, treatment duration micro-eyebrow, title in `headline-sm`, and pricing anchored subtly in `title-md`.

### Input Fields & Selectors
- Flat ivory base with a single bottom hairline or full light outline (`#C6D8C0`).
- Placeholder text in `#777C75`.
- Active focus state dissolves smoothly into Deep Forest Green (`#243C30`) border with no harsh browser outline rings.

### Checkboxes & Radio Controls
- Circular, delicate silhouette.
- Unchecked: Fine outline in `#777C75`.
- Checked: Solid Deep Forest Green (`#243C30`) with a pure white miniature leaf or dot motif.

### Bespoke Additional Components
- **Curated Time-Slot Carousel:** Floating pill tiles featuring day/time availability, utilizing Soft Mint highlights for selected concierge bookings.
- **Sensory Notes Badge:** Micro-tagging system for treatment profiles (e.g., "Bergamot & Cedarwood", "Deep Lymphatic", "60 Mins") wrapped in soft pastel sage outlines.
# UI Generation Context Pack

Status: candidate context pack, generated from candidate UX/design-system artifacts plus canonical AI interaction artifacts. Use for Figma Make, Google Stitch, Galileo, Framer AI, or similar tools. Do not treat generated UI as final without review and human approval.

## Screen Goal

Design Solodko, a premium mobile app for calm, fast carbohydrate intelligence. The primary screen is the Home Hub: an anticipatory meal moment surface where recurring meals are ready before input, and a bottom-anchored AI orb receives new food input. The user goal is to log a recurring meal in 2 taps, or start text, voice, photo, or barcode input in 1 tap.

Core product promise: reduce the cognitive and emotional cost of carb counting. The app must feel like premium lifestyle software, not a medical tool, tracker, chatbot, or nutrition dashboard.

## Required Content

- Home Hub: upper Stage (~70%) with 1-3 time-of-day recurring meal cards, editorial time header such as "Morning", and generous breathing space.
- Lower Console (~30%) with permanent bottom-center orb and input access for voice, text, camera/photo, barcode.
- Meal Result Card overlay: food name, dominant carb value, portion, carb per 100g, source badge, confidence state, quick actions.
- Disambiguation Card: 2-4 tappable food options with short descriptors and carb comparison.
- Clarification Prompt: one phrase above the orb, usually "How much?", no modal and no reset.
- Memory surfaces: saved foods, recurring meals, recipes, and recent log objects as cards, not text lists.
- Onboarding: warm atmospheric brand moment, minimal setup, optional permissions, no feature checklist.

## States

Home states: loading, empty, populated, offline/local-memory. Empty state uses space first, optionally one quiet line; no mascot, dashboard zeros, instructions, or checklist.

Orb states: idle breathing; listening expanded; processing with gentle rotation; clarification dimmed and patient; result-ready morphing into card; low-confidence muted/cool. The orb is the only primary AI status indicator: no spinner, progress bar, or "AI is thinking" text.

Meal card states: exact, from_library, recurring, ai_estimated, estimated_similar, not_found, offline. Exact/library cards feel crisp and solid. Estimated cards are softer and labeled "Estimated - adjust if needed." Not found is muted with "Add manually" and "Search with AI." Offline prioritizes saved foods, recent meals, cached time-of-day suggestions, and manual entry.

Success state: task completes, card dissolves back to calm/home/log memory, no toast for routine actions, no confetti.

## Layout Constraints

Use object-centric UX. The meal card is the canonical object and every input resolves to it. Quick actions attach to the card, not a global toolbar. Primary flow stays on Home; camera can be a focused modal but returns to the orb/card loop.

Navigation is minimal: 3 tabs only: Home, Log, Memory. Settings is a header icon, not a primary tab. Paywall screens are candidate and monetization is not locked; avoid hard gates, countdowns, or aggressive sales patterns.

One-handed table use is mandatory. Touch targets minimum 44x44pt. Critical values must remain readable in restaurants, sunlight, and larger Dynamic Type. Carb value must be the largest number on the card and meet 7:1 contrast; primary text 4.5:1. Layouts must reflow without truncating critical carb values.

## Design DNA

Emotional direction: calm, warm, atmospheric, materially premium, structured, quietly intelligent. The app should feel emotionally safe and low-cognitive-load. Human-liked signals: Headspace-like large spacing, calm warm gradients, soft emotional safety; Revolut-like card layering, subtle depth, elegant typography, strong hierarchy. Do not copy Headspace childish illustration or Revolut financial density.

Visual system: warm atmospheric mesh gradient background as the "sky"; frosted glass only for primary elevated objects; soft solids for secondary surfaces. Background shifts by time of day: morning peach/cream/sage; afternoon warm neutral; evening muted plum/restrained indigo. Evening is dusk, not full dark mode.

Typography: editorial serif for time/mood anchors; bold operational sans for food names and carb values; light sans for one-line microcopy. Hierarchy comes from type, spacing, and material, not borders or data colors.

Depth: Z:0 atmospheric background, Z:1 floating recurring/log cards, Z:2 active orb/card/composer. Active objects elevate smoothly; no hard route jumps.

Motion: calm decelerated spring physics, no bounce. Orb to meal card is a shared-element morph around 350-450ms. Card content staggers: container, then food/carb value, then actions. Reduced Motion must use fades/opacity and preserve clarity.

## Tokens

Colors: morning `#FFD6B4`, `#FFF3E0`, `#C8E6C9`; afternoon `#FFF8F0`, `#F5F0E8`, `#E8F5E9`; evening `#D1C4E9`, `#B0BEC5`, `#263238`. Text: primary `#1F2422`, secondary `#5F6661`, tertiary `#8B918C`.

Surfaces: primary glass `rgba(255,255,255,0.40)`, active glass `rgba(255,255,255,0.52)`, secondary solid `rgba(255,255,255,0.75)`, quiet solid `rgba(255,248,240,0.82)`. Blur: glass 32px, active glass 40px. Radius: meal cards 20-24px, secondary surfaces 16px, pills full radius. Spacing: minimum card padding 20px; 16-24px between cards; stage gap 24px.

Type scale: time header 34/40, meal name 24/30, carb value 44/48 bold, body 17/24, microcopy 14/20, badge 12/16.

Shadows: soft acoustic only, e.g. `0 12px 32px -8px rgba(0,0,0,0.04)` and active `0 20px 40px -10px rgba(0,0,0,0.05)`.

## Do-Not-Copy Rules

No chatbot bubbles, message streams, AI paragraphs, mascot/face/robot orb, generic FAB, dense nutrition tables, home dashboards, daily carb rings, macro charts, calorie-first hierarchy, streaks, points, badges, task checkboxes, progress quotas, red/orange/green traffic lights, confidence percentages, alarm colors, harsh error states, divider lines, stock food placeholders, sterile clinical white/grey, neon or saturated gradients, fintech density, full-screen modal takeovers in the primary loop, standard loading spinners beside the orb, motivational praise, or "AI found your food!" announcements.

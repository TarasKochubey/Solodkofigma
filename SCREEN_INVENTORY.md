# Screen Inventory Context

Status: derived AI-generation context. Not canonical. Source: `product-brain/05_screens/SCREEN_INVENTORY.yaml`.

## Catalog Logic

The screen set supports one core job: make carbohydrate logging fast, calm, and repeatable. Screens are organized by user intent, not by feature density.

Priority levels should guide visual weight:

- Critical screens must be highly polished and low-friction.
- High-priority screens support repeated use and personal memory.
- Medium-priority screens should stay quiet and utility-focused.
- Monetization screens remain candidate and should not dominate the product atmosphere.

## Critical Screens

- Launch / Splash: brand trust through atmosphere.
- Onboarding Welcome: emotional buy-in before functionality.
- Onboarding Quick Setup: optional configuration without pressure.
- Onboarding Permissions: benefit-framed permissions with fallbacks.
- Auth: simple account continuity and data recovery.
- Home Hub: main interaction surface; recurring meals plus orb.
- Meal Result Card: primary AI output and carb decision object.
- Disambiguation Card: ambiguity resolution in one tap.
- Clarification Prompt: one missing piece, no reset.
- Camera Input: focused capture, quick return to Home.
- Today's Log: calm view of today's meal objects.

## High-Priority Screens

- Compensation Calculator: helps when planned and eaten carbs differ.
- Memory: personal food library and recurring meal acceleration.
- Food Detail: correct and control remembered foods.
- My Recipes: saved custom meals for reuse.
- Recipe Builder: one-time recipe setup for repeated logging.
- Recipe Detail / Use: portion-based recipe logging.
- Settings Hub: low-frequency control center.
- Profile & Health Info: preferences that shape AI behavior.

## Medium-Priority Screens

- Log History: past meals for reference and re-logging.
- Meal Log Detail: detail control for older meal objects.
- Preferences: language, units, notification timing.
- Allergen & Sensitivity Profile: quiet safety context.
- Connected Devices & Health: Apple Health and future device support.
- Subscription & Plan: candidate plan management.
- Data & Privacy: export, delete, privacy.
- Paywall / Upgrade: candidate monetization prompt.

## JTBD Mapping

- `jtbd-001`: identify carbs at a meal moment. Supported by Home, Meal Result Card, Disambiguation, Clarification, Camera.
- `jtbd-002`: build and reuse recipes. Supported by Recipes, Recipe Builder, Recipe Detail.
- `jtbd-003`: scan food or labels. Supported by Camera and Meal Result Card.
- `jtbd-004`: compensate when actual eating differs from plan. Supported by Compensation Calculator.
- `jtbd-005`: reuse personal food memory. Supported by Home recurring cards, Memory, Food Detail, Log Detail.
- `jtbd-006`: review logged meals. Supported by Today's Log, History, Log Detail.
- `jtbd-007`: protect account and data continuity. Supported by Auth.

## Emotional Roles

Home should feel anticipatory. Log should feel settled. Memory should feel personal. Settings should feel quiet and controlled. Onboarding should feel warm and low-pressure. Paywall should feel premium but not persuasive in a pushy way.

## Visual Generation Guidance

Do not design every screen as a dashboard. Most screens should be card-object surfaces with strong whitespace, editorial section anchors, and minimal controls. The repeated object is the meal card, not a table row, message bubble, or analytic widget.

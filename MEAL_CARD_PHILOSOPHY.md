# Meal Card Philosophy

Status: derived AI-generation context. Not canonical. Sources: `MEAL_OBJECT_MODEL.md`, `meal_card.yaml`, and `INTERACTION_PHILOSOPHY.yaml`.

## Core Idea

The meal card is Solodko's primary object. Every food input resolves to this object: photo, label scan, barcode, text, voice, recipe, saved food, or recurring meal tap.

The card is not a message, table, dashboard widget, or search result. It is the user's answer, with enough structure to act immediately.

## Object-Centric UX

A meal card can be:

- Logged.
- Saved to Memory.
- Recalled as a recurring meal.
- Edited.
- Used in a recipe.
- Reopened from the log.

Quick actions attach to the card because the card is the object being acted on. Avoid global toolbars or disconnected action menus.

## Information Hierarchy

The carb value is the largest and most important number. The hierarchy should read:

1. Food name.
2. Carb grams for the portion.
3. Portion and carbs per 100g.
4. Source and confidence.
5. Quick actions.

Calories are optional and secondary. Food imagery is optional and supportive. The card remains premium without images; never use empty grey placeholders.

## Recurring Meal Acceleration

Recurring cards are the strongest expression of product memory. They appear before the user asks, based on time of day and past behavior.

Recurring meal behavior:

- Card is pre-rendered on the Home stage.
- Previous portion is pre-filled.
- Tap elevates the card to active state.
- One confirm action logs it.
- The card dissolves back into memory.

This should feel like the app quietly remembered, not like a recommendation engine shouting.

## Confidence Handling

Confidence is material, not numerical.

- Exact: crisp glass, sharp edge, warm stability, no qualifier.
- From library: crisp glass plus warmer memory glow, previous portion ready.
- Recurring: familiar object, usually no explicit source badge.
- AI estimated: softer glass, cooler glow, "Estimated - adjust if needed."
- Similar estimate: same softness, with a route to try another match.
- Not found: muted minimal card with Add manually and Search with AI.
- Offline: softened local-memory state with Open Memory and Add manually.

Never show confidence percentages or traffic-light badges.

## Clarification

If the food is known but portion is missing, do not show a partial card. Hold the context in the orb and ask one short inline question such as "How much?" When the user answers, resolve directly into the full meal card.

Clarification is continuation, not failure.

## Quick Actions

Use up to four visible actions. One primary action only.

Common actions:

- Add to log.
- Log portion.
- Save to Memory.
- Adjust portion.
- Use again.
- Try another match.
- Add manually.

Labels are verb-first and short. Destructive actions stay secondary. Low-stakes actions do not need confirmation.

## Emotional Clarity

The card should feel like a helpful answer, not an audit. It must never judge food choices, flag high carbs with alarm colors, or imply failure. Restaurant meals, sweets, home cooking, packaged foods, and unusual meals all receive the same calm treatment.

## Visual Guidance

Use generous padding, high-radius glass, soft acoustic shadow, and clear typography. Avoid dense nutritional tables, macro grids, calorie-first layouts, chat bubbles, badges that compete with carb values, and routine success toasts after logging.

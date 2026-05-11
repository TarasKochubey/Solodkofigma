# Navigation Rules Context

Status: derived AI-generation context. Not canonical. Source: `product-brain/02_ux/navigation/NAVIGATION_RULES.yaml`.

## Core Model

Navigation is a calm spatial stage, not a stack of destinations. The Home Hub remains the persistent context for food input. Voice, text, photo, barcode, and recurring meal taps all resolve back into the home spatial layer.

The key feeling: the user is not "going somewhere" to log food. The meal object appears where the user already is.

## Modal Philosophy

Use modals only when focus truly matters:

- Camera input: full-focus capture, then direct return to Home.
- Paywall: full-screen modal only for high-intent upgrade moments; always dismissible.
- Settings entry: low-frequency access, quiet and contained.

Never use a modal to ask for a missing portion, show AI progress, display a routine error, or confirm a normal log action.

## Bottom Console Philosophy

The console is the permanent lower interaction zone. It contains the orb and input access. It should feel stable, thumb-reachable, and always available.

Console behavior:

- Orb stays bottom center.
- Input methods expand from or around the orb.
- Clarification appears above the orb, not in a sheet.
- Manual entry remains reachable in degraded states.
- The console does not grow to fill the screen when the stage is empty.

## Overlay Behavior

Meal result cards, disambiguation cards, and clarification prompts are not route changes. They are states within the Home Hub.

- Meal result card expands from the orb using shared spatial continuity.
- Disambiguation card floats above the console while the stage blurs subtly.
- Clarification prompt is a short typographic question above the orb.
- Compensation calculator can be a bottom sheet because it is triggered from a meal card.

## Deep Links

Deep links should land users in the closest stable surface:

- `/home` opens the Home Hub.
- `/log` opens today's log.
- `/log/history` opens history.
- `/memory` opens Memory.
- `/memory/recipes` opens recipes.
- `/settings` opens settings.
- `/settings/subscription` opens subscription management.

Deep links should not create a sense of app disorientation. Push into the relevant stack only when the destination is a secondary detail surface.

## Flow Continuity

Food input should feel continuous:

1. User begins from Home.
2. Orb receives input or recurring card is tapped.
3. AI resolves or asks one missing question.
4. Meal result card appears from the same spatial origin.
5. User logs or adjusts.
6. Card dissolves; Home returns to calm.

No route jumps, full-screen errors, forced retries, or chatbot transcripts should interrupt this loop.

## Interaction Calmness

Navigation must never create urgency. Avoid notification badges, promotional destinations, deep menu structures, animated tab changes, forced paywall traps, and full-screen error pages. Standard iOS swipe-back behavior is allowed for nested Log, Memory, and Settings screens because those areas are secondary and predictable.

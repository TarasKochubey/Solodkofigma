# State Systems Context

Status: derived AI-generation context. Not canonical. Sources: Phase 05 state YAML files plus `state_surfaces.yaml`.

## State Philosophy

States in Solodko are not interruptions. They are calm variations of the same operational surface. The current screen remains visible whenever possible. The orb, material quality, and a single clear recovery path carry most state communication.

State design should feel like a premium object changing condition, not an app throwing alerts.

## Empty States

Empty states are breathing-space states.

- Home empty: open stage, idle orb, optional quiet line: "Nothing yet. What are you eating?"
- Today's Log empty: "No meals logged today."
- Log History empty: "No meals logged yet."
- Memory empty: "Your Memory is empty. Foods you log will appear here."
- Recipes empty: "Recipes you create will appear here."
- Disambiguation empty: minimal card with "No matches found." and practical actions.

Avoid mascots, illustrations, checklists, zeros, progress framing, and instructional paragraphs. Empty should feel as premium as populated.

## Loading States

For AI food resolution, the orb is the loading indicator. No spinner, progress bar, or "AI is thinking" copy should appear beside it.

- AI resolution: orb processing state, gentle rotation or reduced-motion opacity pulse.
- Home load: soft recurring meal skeleton cards, then populated stage.
- Photo recognition: scoped camera message, "Identifying meal...", with alternative after about 8 seconds.
- Recipe calculation, pagination, and auth: small inline loading only, scoped to the affected element.

Loading must preserve user agency. Manual entry remains reachable when AI is slow.

## Error States

Errors are inline, factual, and recoverable.

- Food lookup failure: muted orb plus "Couldn't reach our database. Try again?" with Try again and Add manually.
- Timeout: "Taking longer than usual." with Keep waiting and Add manually.
- Photo unclear: "Photo not clear enough." with Retake and Type instead.
- Barcode not found: "Product not found." with Add manually and Try another barcode.
- Recipe missing data: "One ingredient is missing carb data." with Edit ingredient.

No red, no full-screen error page, no generic "Something went wrong", no blame, no alarm icon.

## Offline States

Offline mode is a quieter version of normal, not a broken mode.

Always available offline:

- Personal food memory.
- Cached recurring meals.
- Today's log and local history.
- Recipes.
- Manual entry.

Unavailable offline:

- New AI recognition.
- Uncached barcode lookup.
- Cloud sync.
- Account changes.

Use quiet language such as "Using saved foods" or "Logging from memory." Recovery from offline is silent. Do not announce reconnection.

## Permission States

Permissions are contextual and benefit-framed.

- Camera denial falls back to text input.
- Microphone denial falls back to text input.
- Notifications are optional and never repeatedly prompted.
- Apple Health is user-initiated from settings and never required.

Never ask for unrelated permissions at launch. Never request multiple system permissions at once. Permission denial must not block core logging.

## Success States

Success is felt through completion and return to calm.

- Meal logged: card scales down, drops in Z, dissolves, orb returns to idle. No toast.
- Food saved: source badge quietly becomes "Your food."
- Recipe saved: new row appears naturally in the list.
- Profile saved: button briefly confirms, then normal navigation resumes.
- Onboarding complete: Home appears calmly, no welcome overlay.
- Subscription activated: paywall dismisses, no celebration.
- Sync complete: entirely silent.

No confetti, motivational copy, large checkmarks, sound effects, streaks, progress bars, or routine success toasts.

## Continuity Rule

All states must keep the user oriented. The screen should not disappear. The action path should remain clear. If AI cannot help, Memory and manual entry should.

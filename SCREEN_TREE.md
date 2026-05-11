# Screen Tree Context

Status: derived AI-generation context. Not canonical. Source: `product-brain/02_ux/navigation/SCREEN_TREE.yaml` because `product-brain/05_screens/SCREEN_TREE.yaml` does not exist.

## Navigation Shape

Solodko uses a minimal 3-tab shell: Home, Log, and Memory. Settings is reached through a quiet header icon, not a fourth tab. Onboarding and auth happen before the tab shell. Paywall remains candidate and monetization-dependent.

The product should feel spatial rather than route-heavy. The Home Hub is the persistent context for the core meal interaction. Most primary food-input events resolve as overlays, inline prompts, or orb-to-card transformations instead of full screen transitions.

## Screen Hierarchy

### Pre-App

- Launch / Splash: a warm atmospheric brand moment while app state initializes. Emotional role: trust begins through calm, not spectacle.
- Onboarding - Welcome: introduces the value of calm, intelligent carb support. Emotional role: lifestyle-quality first impression, not feature education.
- Onboarding - Quick Setup: optional personalization for carb units and insulin type. Emotional role: control without cognitive load.
- Onboarding - Permissions: benefit-framed access for camera, notifications, and Apple Health. Emotional role: agency, never coercion.
- Auth - Sign In / Sign Up: Apple ID first, email secondary. Emotional role: protect personal food memory without friction.

### Home

- Home Hub: the primary surface. Upper stage contains time-of-day recurring meal cards; lower console holds the orb. Emotional role: arrival into a place that already understands the meal moment.
- Meal Result Card: in-place expansion from the orb. Emotional role: structured answer, instantly actionable, never conversational.
- Disambiguation Card: overlay with 2-4 plausible food options. Emotional role: resolve ambiguity without making the user feel wrong.
- Clarification Prompt: one inline phrase above the orb, usually "How much?" Emotional role: continuation, not failure.
- Camera Input: focused modal for food photo, label scan, or barcode scan. Emotional role: momentary focus that returns directly to the home loop.
- Compensation Calculator: bottom sheet from a logged meal card. Emotional role: practical support when the eaten amount differs from plan.

### Log

- Today's Log: cards for meals logged today. Emotional role: quiet reference, not a dashboard.
- Log History: date-paginated history with editorial date headers. Emotional role: memory and retrieval, not analytics.
- Meal Log Detail: full card for a previous entry. Emotional role: object control: re-log, adjust, or delete.

### Memory

- Memory: saved foods, recurring meals, and frequently used items. Emotional role: personal food memory, not database management.
- Food Detail: edit or correct a saved food. Emotional role: user control over remembered data.
- My Recipes: saved recipes with quick-log access. Emotional role: repeatable home cooking made easier.
- Recipe Builder: multi-ingredient creation surface. Emotional role: invest once, reuse calmly.
- Recipe Detail / Use: portion-based recipe logging. Emotional role: known object, one-step reuse.

### Settings

- Settings Hub: low-frequency preferences surface.
- Profile & Health Info: health preferences that shape AI behavior.
- Preferences: language, units, notifications.
- Allergen & Sensitivity Profile: calm inline warning setup.
- Connected Devices & Health: Apple Health and future CGM placeholder.
- Subscription & Plan: candidate monetization surface.
- Data & Privacy: export, delete account, policy.

### Paywall

- Paywall / Upgrade: candidate modal. Emotional role: explain value without urgency, countdowns, or pressure.

## Primary Flow

The default flow is Home Hub -> orb or recurring card -> meal result card -> log -> return to calm home.

Recurring meals are the fastest path: tap the visible card, confirm portion, logged. New foods enter through text, voice, photo, or barcode, but every path resolves to the same meal card structure. Ambiguity uses a small disambiguation card. Missing portion uses a one-line clarification prompt. The user should never feel they moved into a chatbot, a form, or an error path.

## Screen Design Principle

Every screen should ask: what object is the user trying to resolve, recall, or control? The answer should be a card, inline state, or quiet navigation surface. Avoid generic mobile screen templates that add density, charts, tabs, or instructional copy.

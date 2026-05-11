# AI Interaction Model

Status: derived AI-generation context. Not canonical. Sources: `AI_PERSONALITY.md`, `INTERACTION_PHILOSOPHY.yaml`, `UX_PRINCIPLES.md`, and clarification flow logic.

## Core Model

Soft input becomes structured output. Users can speak, type, photograph, scan, or tap a recurring meal. The AI resolves that input into a card, not a conversation.

The interaction pattern is:

Input -> resolution -> meal card or one clarification -> quick action -> return to calm.

## Invisible AI

AI should feel like calm competence, not a feature being performed. Do not brand successful results as AI achievements. Do not show reasoning steps, analysis paragraphs, or "I found..." copy.

When the AI works well, the user sees the answer and acts.

## Clarification Continuation

When one piece is missing, ask for only that piece.

Example:

- User: "borscht"
- System: "How much?"
- User: "300g"
- Result: full meal card.

Rules:

- One question only.
- Inline above the orb.
- No modal.
- No form.
- No reset.
- Do not repeat the known food identity.
- After the user answers, resolve directly into the card.

## No Chatbot Behavior

Natural language input is allowed. Chatbot output is not.

Forbidden:

- Left/right message bubbles.
- Assistant avatar.
- Conversation history.
- Paragraph answers.
- AI messages that start with "I".
- Follow-up chatter after logging.
- "AI is thinking" or "based on my analysis" language.

## Structured Surfaces

AI can appear only through:

- Meal Result Card.
- Disambiguation Card.
- Clarification Prompt.
- Inline Suggestion.
- Contextual Warning.
- Compensation Suggestion Card.

Every surface should be short, actionable, and visually object-based.

## Disambiguation

When multiple matches exist, show 2-4 options with short descriptors and carb per 100g. The user taps one. Do not ask them to type more detail unless no usable options exist.

## Uncertainty

Uncertainty should be usable, not dramatic.

- Show the best estimate when available.
- Label it quietly as estimated.
- Keep portion editing prominent.
- Offer Add manually or Try another match when needed.
- Never show confidence percentages.
- Never use alarm colors.

## Object Resolution Flow

Every input should end as an object the user can act on. The object carries source, confidence, portion, carb value, and actions. Once logged, the object updates Memory and can become faster next time.

The goal is compounding familiarity, not conversational engagement.

## Tone

Use short, calm, factual copy. The product does not praise, coach, judge, motivate, or explain unless the user asks. Food is information, not a verdict.

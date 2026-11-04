# Contributing to WorldEye

WorldEye sits at the intersection of interface design, public data, and responsible interpretation. Contributions are welcome when they make the observatory more useful without making it more certain than the underlying evidence.

## Development loop

1. Fork the repository and create a focused branch.
2. Run `npm install` and `npm run dev`.
3. Keep UI, data-model, and connector changes separate when possible.
4. Run `npm run build` before opening a pull request.
5. Explain what a user can now see, what source supports it, and what remains uncertain.

## Data rules

Never label simulated or illustrative values as live. Connector work should document source terms, update cadence, geographic coverage, failure modes, and provenance. Prefer a clear unavailable state over a fabricated value.

## Design rules

Preserve keyboard focus visibility, responsive behavior, readable contrast, reduced-motion respect, and the spatial hierarchy between world context, signal detail, and source context. Motion should communicate a state change or an active scan.

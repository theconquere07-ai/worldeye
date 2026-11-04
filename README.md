# WorldEye

> See the world in motion.

WorldEye is an open-source global signal observatory for exploring what is happening across countries, regions, sectors, and fields. The first release is a high-fidelity interface prototype: a cinematic spatial command center with a world lens, signal filters, a watchlist-ready event feed, and a foundation for real source-backed connectors.

## Important scope note

The current interface uses clearly labeled **demo signals** so the experience can be explored safely without pretending to provide live intelligence. Real-time claims, source provenance, alerting, historical timelines, and automated analysis belong to the connector and data-governance layers planned below.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3002`.

## Build

```bash
npm run build
npm run preview
```

## Product map

- `src/main.jsx` — dashboard composition, signal model, filter state, and interactive world lens.
- `src/styles.css` — the atmospheric observatory design system, spatial layout, and motion rules.
- `public/manus-routes.json` — route declaration for future managed preview hosting.

## Roadmap

1. **Source registry:** connectors for trusted public datasets, news, weather, markets, health, conflict, science, and technology feeds.
2. **Provenance graph:** source, timestamp, confidence, geography, methodology, and update cadence for every signal.
3. **Temporal lens:** replay a region or sector across time with event clustering and change detection.
4. **Personal observatory:** watchlists, thresholds, saved views, annotations, and alert routing.
5. **Responsible intelligence layer:** uncertainty labels, source disagreement, bias notes, and human review workflows.
6. **Collaborative workspaces:** shared lenses, briefings, permissions, and exportable situation rooms.

## Design principles

WorldEye is designed to orient before it explains, show uncertainty instead of hiding it, keep global scale legible, and make every future signal traceable to its source. Motion indicates change; it should never be used as decoration that implies certainty.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Start with small, source-aware improvements and preserve the distinction between demo data and verified external data.

## License

MIT. See [LICENSE](LICENSE).

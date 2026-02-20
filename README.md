# pf2e_charactermanager.github.io

1. Project Overview

2. Features

3. Folder Structure

4. Architecture Overview

This project is built using a modular, scalable architecture inspired by modern frontend patterns (React/Vue‑style separation of concerns). Each module has a single responsibility, making the codebase easy to extend and maintain.

js/
│
├── builder.js                ← Entry point (page initializer)
│
├── state/
│   └── character.js          ← Character data + ability score math
│
├── ui/
│   ├── preview.js            ← Updates preview UI
│   ├── boosts.js             ← Renders ability boost UI
│   └── heritage.js           ← Heritage dropdown helpers
│
├── events/
│   └── bindings.js           ← Input → state bindings
│
└── data/
    └── loaders.js            ← Loads ancestries, backgrounds, classes, heritages

builder.js — The Orchestrator
Coordinates the entire page:
- Initializes the builder
- Loads data

Sets up input bindings

Triggers ancestry boost rendering

Updates the ability score preview on load

Does not contain UI logic, state logic, or data parsing.
5. How to Run

6. How to Develop / Contribute

7. Future Roadmap
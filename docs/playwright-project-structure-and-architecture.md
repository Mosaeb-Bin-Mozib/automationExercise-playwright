# Playwright JavaScript Project Structure and Architecture

Create the new project in **JavaScript**. Keep the same separation by test type and purpose. Use `.js` files instead of `.ts`; omit TypeScript-only files such as `tsconfig.json` and type definitions.

```text
qa-automation/
├── package.json
├── playwright.config.js
├── .env.example
├── README.md
├── config/
│   ├── environments/
│   │   └── dev.env.js
│   ├── validation/
│   │   └── env.schema.js
│   └── project-names.json
├── docs/
│   └── coding-standards.md
├── reporters/
│   └── custom-reporter.js
├── scripts/
│   └── run-project.js
└── tests/
    ├── api/
    │   ├── assertions/
    │   ├── clients/
    │   ├── constants/
    │   ├── data/
    │   │   └── payloads/
    │   ├── fixtures/
    │   ├── generators/
    │   ├── schemas/
    │   ├── specs/
    │   │   └── <service>/<feature>/
    │   └── utils/
    ├── ui/
    │   ├── assertions/
    │   ├── components/
    │   ├── constants/
    │   ├── data/
    │   │   └── test-data/
    │   ├── helpers/
    │   ├── pages/
    │   └── specs/
    │       └── <feature>/
    ├── e2e/
    │   ├── flows/
    │   ├── helpers/
    │   └── specs/
    └── shared/
        ├── assets/
        ├── constants/
        ├── fixtures/
        ├── generators/
        ├── helpers/
        ├── test-data/
        └── utils/
```

## Naming instructions

- Use `.js` for source files and specs.
- Name specs by test type: `login.api.spec.js`, `signup.ui.spec.js`, `registration-flow.spec.js`.
- Use **kebab-case** for file and folder names.
- Name folders by purpose or feature, such as `api/specs/<service>/<feature>/`.
- Keep API code under `tests/api/`, browser code under `tests/ui/`, full user journeys under `tests/e2e/`, and genuinely shared code under `tests/shared/`.

## Architecture instructions

- **Specs** describe test scenarios and assertions.
- **API clients** send requests; **payloads** provide request data; **assertions** check responses.
- **Page objects** hold UI locators and actions; **helpers** combine reusable steps.
- **E2E flows** combine pages and helpers to test a complete user journey.
- Put reusable setup in **fixtures** and reusable data in **data** or **generators**.
- Keep each file in the layer that owns it; share code only when multiple layers need it.

## Unresolved Review Findings

This document retains only findings that remain reproducible in the current branch. Resolved findings—including the default `baseURL`, API constants, response/pass/diagnostic log removal, unique API account data, customer-registration cleanup, and final newlines—have been removed.

#### [MEDIUM] Page objects contain assertions and end-to-end test behavior

- **Confidence:** High
- **Category:** Architecture
- **Files:** `pages/HomePage.js:1`, `pages/CartPage.js:1`, `pages/ProductsPage.js:1`, `pages/PaymentPage.js:1`
- **Issue:** Page objects import `expect` and expose `verify*` methods that mix clicks, navigation, and assertions. For example, `HomePage.verifySignupLoginPage()` asserts URL and heading, while `verifyBlueTopProductDetails()` performs navigation and multiple product assertions.
- **Impact:** Test intent and failure ownership are split between specs and page objects, which makes the objects less reusable for setup and alternate outcomes.
- **Recommendation:** Keep page objects to locators and user actions. Move assertions and scenario orchestration to the relevant specs, or return locators/data from page-object methods for the spec to assert.

#### [LOW] Inactive executable code remains commented out

- **Confidence:** High
- **Category:** Style
- **File:** `playwright.config.js:9`
- **Issue:** The configuration retains commented-out imports, an alternate `baseURL`, browser project definitions, and a `webServer` block.
- **Impact:** Inactive alternatives obscure the active configuration and create maintenance noise; Git history already retains them.
- **Recommendation:** Delete obsolete commented-out code. Keep optional browser coverage as active, parameterized configuration only when it is supported by the suite.

#### [LOW] Narrating comments still repeat the code they precede

- **Confidence:** High
- **Category:** Style
- **Files:** `tests/smoke/home.spec.js:65`, `pages/ProductsPage.js:385`, `pages/CartPage.js:200`
- **Issue:** Comments such as “Women → Dress,” “Verify product search with a valid keyword,” and “Verify confirmation” restate the immediately following interaction or method name.
- **Impact:** Step-by-step narration makes the tests harder to scan without providing behavioral context.
- **Recommendation:** Remove comments that are apparent from the code. Retain only comments that explain a business rule, workaround, or non-obvious decision.

#### [HIGH] API account cleanup is not guaranteed when a test fails

- **Confidence:** High
- **Category:** Testing
- **File:** `tests/API/login-api.spec.js:42`
- **Issue:** The create and update tests now generate unique account data, but call `deleteAccount()` only after their assertions. If account creation succeeds and a later assertion or update fails, cleanup is skipped. The account-deletion scenario similarly has no fallback cleanup if its deletion assertion fails.
- **Impact:** Failed runs can still leave persistent accounts in the shared environment, causing data pollution and eventual instability.
- **Recommendation:** Use `try`/`finally`, `afterEach`, or a fixture teardown that deletes the exact account after creation. Make cleanup idempotent so it does not mask the original test failure.

#### [MEDIUM] Page-object workflows still embed scenario data and credentials

- **Confidence:** High
- **Category:** Maintainability
- **Files:** `pages/CartPage.js:275`, `pages/ProductsPage.js:388`, `pages/ProductsPage.js:664`, `tests/API/login-api.spec.js:12`
- **Issue:** Page objects and API specs still contain literal credentials, search values, review data, product names, prices, and address values. For example, `CartPage` logs in with a literal account and `ProductsPage` fills a literal review email.
- **Impact:** Updating account or scenario data requires edits in implementation files, prevents environment-specific credential injection, and leaves shared-account state coupled to unrelated tests.
- **Recommendation:** Centralize scenario inputs in test-data factories and environment-backed credential configuration. Pass the required data into page-object actions and keep page objects data-agnostic.

#### [MEDIUM] Product expectations remain duplicated across page-object workflows

- **Confidence:** High
- **Category:** Maintainability
- **Files:** `pages/HomePage.js:346`, `pages/CartPage.js:103`, `pages/ProductsPage.js:189`, `tests/smoke/login.spec.js:127`
- **Issue:** `Blue Top`, `Men Tshirt`, and their expected prices are copied into locators and assertions throughout page objects and specs. `test-data/routes.js` centralizes routes, but no equivalent product fixture module is used.
- **Impact:** A seeded-catalog change requires broad manual edits and can leave contradictory product expectations across workflows.
- **Recommendation:** Add immutable structured product fixtures (for example, name, id, and price) under `test-data/`, and pass them to reusable page-object actions while keeping locator construction encapsulated.

## Final Verdict

- `CHANGES_REQUESTED`
- The highest residual risk is persistent API test data after a failed assertion. The remaining architecture and test-data findings also reduce reuse and make the suite harder to maintain.

## Unresolved Review Findings

This document retains only findings that remain reproducible in the current branch. Resolved findings—including the default `baseURL`, API constants, response/pass/diagnostic log removal, unique API account data, customer-registration cleanup, and final newlines—have been removed.

#### [LOW] A page object still contains a UI assertion

- **Confidence:** High
- **Category:** Architecture
- **File:** `pages/ProductsPage.js:1,115`
- **Issue:** `ProductsPage.waitForPageLoad()` imports and calls `expect` to assert that the page heading is visible.
- **Impact:** This is a small remaining breach of the locator/action-only page-object convention and makes assertion ownership less consistent.
- **Recommendation:** Expose the heading locator and assert its visibility in the calling spec (or rename/document the method as an assertion helper and apply that convention consistently).
- **Status:** Solved

#### [LOW] Inactive executable code remains commented out

- **Confidence:** High
- **Category:** Style
- **File:** `playwright.config.js:9`
- **Issue:** The configuration retains commented-out imports, an alternate `baseURL`, browser project definitions, and a `webServer` block.
- **Impact:** Inactive alternatives obscure the active configuration and create maintenance noise; Git history already retains them.
- **Recommendation:** Delete obsolete commented-out code. Keep optional browser coverage as active, parameterized configuration only when it is supported by the suite.
- **Status:** Solved

#### [MEDIUM] Page-object workflows still embed scenario data and credentials

- **Confidence:** High
- **Category:** Maintainability
- **Files:** `pages/CartPage.js:10`, `pages/CartPage.js:33`, `pages/ProductsPage.js:13`, `test-data/loginData.js:2`, `test-data/userAccountData.js:23`
- **Issue:** Although scenario data is now centralized in `test-data/`, page-object locators still embed catalog names, prices, and checkout-address values. `loginData.js` and `userAccountData.js` also retain literal credentials and personal-style data rather than reading environment-backed configuration where appropriate.
- **Impact:** Updating account or scenario data requires edits in implementation files, prevents environment-specific credential injection, and leaves shared-account state coupled to unrelated tests.
- **Recommendation:** Centralize scenario inputs in test-data factories and environment-backed credential configuration. Pass the required data into page-object actions and keep page objects data-agnostic.
- **Status:** I use XPATH as a locator that's why it can't be changed

#### [MEDIUM] Product expectations remain duplicated across page-object workflows

- **Confidence:** High
- **Category:** Maintainability
- **Files:** `pages/HomePage.js:22`, `pages/CartPage.js:10`, `pages/ProductsPage.js:13`, `test-data/productData.js:1`
- **Issue:** `productData.js` now centralizes product values for specs, but `Blue Top`, `Men Tshirt`, and expected prices are still copied throughout page-object locators. The page objects do not consume a shared product model or offer parameterized product locators.
- **Impact:** A seeded-catalog change requires broad manual edits and can leave contradictory product expectations across workflows.
- **Recommendation:** Use the existing product data factory as the shared source of expected values, and add parameterized page-object locators/actions that accept a product name or id while keeping locator construction encapsulated.
- **Status:** Solved

## Final Verdict

- `CHANGES_REQUESTED`
- The remaining risks are maintainability and consistency: embedded scenario data, duplicated product definitions, and the residual page-object assertion make the suite harder to update and reuse.

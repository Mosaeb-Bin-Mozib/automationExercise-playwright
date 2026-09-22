## Unresolved Review Findings

Only findings that remain reproducible against the current branch are retained below. Resolved findings, including the default `baseURL`, API constants, log removal, unique API account data, customer-registration cleanup, final newlines, and the commented-out configuration alternatives, have been removed.

#### [LOW] A page object still contains a UI assertion

- **Confidence:** High
- **Category:** Architecture
- **File:** `pages/BasePage.js:1,18`
- **Issue:** `BasePage.login()` imports and calls `expect` to assert that the "Logged in as" text is visible after submitting the login form.
- **Impact:** The page object owns both the login action and a test assertion, so assertion ownership is inconsistent and callers cannot reuse the action when a different outcome is expected.
- **Recommendation:** Keep `login()` limited to navigation and form submission. Expose the logged-in indicator as a locator and assert it in the calling spec.

#### [LOW] Inactive executable code remains commented out

- **Confidence:** High
- **Category:** Style
- **File:** `pages/HomePage.js:23-26`
- **Issue:** Four obsolete `blueTopDetails*` locators remain commented out in the constructor.
- **Impact:** These inactive alternatives add maintenance noise and make the active locator model less clear; Git history already preserves them.
- **Recommendation:** Delete the commented-out locators. Reintroduce them only as active, maintained locators if a test needs them.

#### [MEDIUM] Page-object workflows still embed scenario data and credentials

- **Confidence:** High
- **Category:** Maintainability
- **Files:** `pages/CartPage.js:10-11,31-44,48-94`, `pages/ProductsPage.js:13,25-33,49-63,88`, `pages/HomePage.js:136-170`, `test-data/loginData.js:2-3`, `test-data/userAccountData.js:7-21`
- **Issue:** Page-object locators still embed product names, prices, and checkout-address values. Login and account data also include literal credentials and personal-style values rather than environment-backed configuration where appropriate.
- **Impact:** Catalog, account, or checkout-data changes require edits across implementation files, inhibit environment-specific credential injection, and retain coupling to shared account state.
- **Recommendation:** Pass scenario data into parameterized page-object actions/locators from centralized test-data factories. Read reusable login credentials from environment-backed configuration.

#### [MEDIUM] Product expectations remain duplicated across page-object workflows

- **Confidence:** High
- **Category:** Maintainability
- **Files:** `pages/HomePage.js:136-170`, `pages/CartPage.js:10-11,48-94`, `pages/ProductsPage.js:13,25-33,49-63,88`, `pages/PaymentPage.js:8`, `test-data/productData.js:3-15`, `test-data/cartData.js:5-8`
- **Issue:** `Blue Top`, `Men Tshirt`, and their expected prices are duplicated in page-object locators even though product values are also defined in `productData.js` and `cartData.js`.
- **Impact:** A seeded-catalog change requires broad manual updates and can leave workflows with inconsistent expectations.
- **Recommendation:** Define one structured product model and use parameterized page-object locators/actions that accept its name or id while keeping locator construction encapsulated.

## Final Verdict

- `CHANGES_REQUESTED`
- The remaining risks are maintainability and consistency: page-object assertions, inactive code, and embedded/duplicated scenario data make the suite harder to reuse and update.

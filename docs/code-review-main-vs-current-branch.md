## Unresolved Review Findings

Only findings that remain reproducible against the current branch are retained below. The page-object assertion and commented-out locator findings have been verified as fixed and removed.

#### [MEDIUM] Checkout address expectations remain embedded in a page object

- **Confidence:** High
- **Category:** Maintainability
- **File:** `pages/CartPage.js:32-45`
- **Issue:** The delivery and billing address locators contain literal account-specific values, including the name, company, address, country, and phone number, even though related checkout data is defined in `test-data/cartData.js`.
- **Impact:** Changing account or checkout data requires editing locator implementation, and the page object cannot be reused for another account or environment.
- **Recommendation:** Build the address locators from expected checkout data passed into the page object/action, or expose generic address-field locators and make assertions in the calling spec.
- **Status:** Solve

#### [MEDIUM] Product expectations remain duplicated across page-object workflows

- **Confidence:** High
- **Category:** Maintainability
- **Files:** `test-data/productData.js:3-16`, `test-data/cartData.js:5-8`, `pages/CartPage.js:12,64,91,101`, `pages/ProductsPage.js:15`
- **Issue:** `Blue Top`, `Men Tshirt`, and their prices are defined in both `productData.js` and `cartData.js`; several page-object locators also embed these values directly.
- **Impact:** A seeded-catalog change requires broad manual updates and can leave workflows with inconsistent expectations.
- **Recommendation:** Define one structured product model and use parameterized page-object locators/actions that accept its name or id while keeping locator construction encapsulated.
- **Status:** Solve

#### [LOW] A shared-account password remains committed in test data

- **Confidence:** High
- **Category:** Security / Maintainability
- **File:** `test-data/userAccountData.js:25-30`
- **Issue:** `validLoginData.password` contains a literal password for the shared account.
- **Impact:** The credential is exposed in source control and cannot be changed per environment without editing the repository.
- **Recommendation:** Read the shared account email and password from environment-backed configuration, validate that required values are set, and keep only non-sensitive invalid-credential cases in test data.
- **Status:** Solve

## Final Verdict

- `CHANGES_REQUESTED`
- The remaining risks are data coupling and a committed shared-account credential. Centralizing product data, parameterizing checkout expectations, and moving credentials to environment configuration would resolve them.

import {test, expect} from '../../fixtures/login.fixture.js';
import { getLoginData } from '../../test-data/loginData.js';
const loginData = getLoginData();

test.describe('Login', () => {
        // AE-011
        test('AE-011 - Verify that the Login page is displayed correctly', async ({ loginPage }) => {

                await loginPage.verifyLoginPage();

            }
        );
    // AE-012
        test('AE-012 - Verify that a registered user can log in using valid credentials', async ({ loginPage }) => {

                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.password);
                // Verify email was entered correctly
                await expect(loginPage.emailField).toHaveValue(loginData.email);
                // Verify password was entered correctly
                await expect(loginPage.passwordField).toHaveValue(loginData.password);
                await loginPage.clickLogin();
                // Verify user is logged in
                await loginPage.verifyLoggedInUser(loginData.username);
             }
        );

    // AE-013
        test('AE-013 - Verify login fails with incorrect email and password', async ({ loginPage }) => {

                await loginPage.enterEmail(loginData.incorrectEmail);
                await loginPage.enterPassword(loginData.incorrectPassword);
                await loginPage.clickLogin();
                await loginPage.verifyLoginErrorMessage();
            }
        );

        // AE-014
        test('AE-014 - Verify login fails with valid email and incorrect password', async ({ loginPage }) => {
                    await loginPage.enterEmail(loginData.email);
                    await loginPage.enterPassword(loginData.incorrectPassword);
                    await loginPage.clickLogin();
                    await loginPage.verifyLoginErrorMessage();
            }
        );

        // AE-015
        test('AE-015 - Verify login fails with unregistered email and password', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.unregisteredEmail);
                await loginPage.enterPassword(loginData.password);
                await loginPage.clickLogin();
                await loginPage.verifyLoginErrorMessage();

            }
        );

        // AE-016
        test('AE-016 - Verify login cannot be submitted with empty email and password', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.emptyEmail);
                await loginPage.enterPassword(loginData.emptyPassword);
                await loginPage.clickLogin();
                await expect(loginPage.emailField).toHaveJSProperty('validity.valueMissing', true);
                await expect(loginPage.passwordField).toHaveJSProperty('validity.valueMissing', true);
            }
        );

        // AE-017
        test('AE-017 - Verify login fails when email is empty and password is provided', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.emptyEmail);
                await loginPage.enterPassword(loginData.password);
                await loginPage.clickLogin();
                await expect(loginPage.emailField).toHaveJSProperty('validity.valueMissing', true);
            }
        );

        // AE-018
        test('AE-018 - Verify login fails when password is empty and valid email is provided', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.emptyPassword);
                await loginPage.clickLogin();
                await expect(loginPage.passwordField).toHaveJSProperty('validity.valueMissing', true);
            }
        );

        // AE-019
        test('AE-019 - Verify login fails with invalid email format', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.invalidEmailFormat);
                await loginPage.enterPassword(loginData.password);
                await loginPage.clickLogin();
                await expect(loginPage.emailField).toHaveJSProperty('validity.typeMismatch', true);
            }
        );

        // AE-020
        test('AE-020 - Verify that the Password field masks the entered password', async ({ loginPage }) => {
                await loginPage.enterPassword(loginData.password);
                await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
            }
        );

        // AE-021
        test('AE-021 - Verify user can log in by pressing Enter', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.password);
                await loginPage.passwordField.press('Enter');
                await loginPage.verifyLoggedInUser(loginData.username);
            }
        );

        // AE-022
        test('AE-022 - Verify authenticated state is maintained when navigating to Products and Cart', async ({ loginPage }) => {
                    await loginPage.enterEmail(loginData.email);
                    await loginPage.enterPassword(loginData.password);
                    await loginPage.clickLogin();
                    // Verify user is logged in
                    await loginPage.verifyLoggedInUser(loginData.username);
                    await loginPage.page.goto('/products');
                    await loginPage.page.getByText('All Products').waitFor({state: 'visible', timeout: 10000});
                    await loginPage.verifyLoggedInUser(loginData.username);
                    // Navigate to Cart page
                    await loginPage.page.goto('/view_cart');
                    // Verify authenticated state is maintained
                    await loginPage.verifyLoggedInUser(loginData.username);
            }
        );

        // AE-023
        test('AE-023 - Verify that a logged-in user can log out successfully', async ({ loginPage }) => {

            // Login with valid credentials
                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.password);
                await loginPage.clickLogin();
                // Verify user is logged in
                await loginPage.verifyLoggedInUser(loginData.username);
                // Click Log out
                await loginPage.clickLogout();
                // Verify Login page is displayed
                await expect(loginPage.loginHeading).toBeVisible();

                // Verify the user is no longer logged in
                await expect(loginPage.loggedInAs).not.toBeVisible();
                // Verify URL
                await expect(loginPage.page).toHaveURL("/login");
            }
        );

        // AE-025
        test('AE-025 - Verify logged-out user cannot proceed to checkout', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.password);
                await loginPage.clickLogin();

                // 2. Verify authenticated state
                 await loginPage.verifyLoggedInUser(loginData.username);

                // 3. Navigate to the Products page
                await loginPage.page.goto('/products');

                // 4. Wait for Products page
                await expect(loginPage.page.getByText('All Products')).toBeVisible();

                // Find the Blue Top product card
                const product = loginPage.page.locator('.product-image-wrapper').filter({ hasText: 'Blue Top' }).first();

                // Verify the Blue Top product is visible
                await expect(product).toBeVisible();

                 // Click Blue Top's Add to cart
                await product.locator('a.add-to-cart[data-product-id="1"]').first().click();

                // 8. Navigate to Cart
                await loginPage.page.goto('/view_cart');

                // 9. Verify Blue Top is in the cart
                await expect(loginPage.page.getByText('Blue Top')).toBeVisible();

                // 10. Verify Proceed To Checkout is available
                await expect(loginPage.page.getByText('Proceed To Checkout')).toBeVisible();

                // 11. Logout
                await loginPage.clickLogout();

                // 12. Verify Login page is displayed
                await expect(loginPage.loginHeading).toBeVisible();

                // 13. Verify the user is no longer logged in
                await expect(loginPage.loggedInAs).not.toBeVisible();

                // 14. Go back to Cart after logout
                await loginPage.page.goto('/view_cart');

                // 15. Verify the user is still logged out
                await expect(loginPage.loggedInAs).not.toBeVisible();

                // 16. Check whether Proceed To Checkout is available
                const checkoutButton = loginPage.page.getByText('Proceed To Checkout', { exact: true }
                );

                // 17. If checkout is available, attempt to access it
                if (await checkoutButton.isVisible()) {await checkoutButton.click();
                    // User must not be treated as authenticated
                    await expect(loginPage.loggedInAs).not.toBeVisible();
                }
            }
        );
    }
);
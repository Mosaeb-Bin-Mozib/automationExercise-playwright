import {test, expect} from '../fixtures/login.fixture.js';

test.describe('Login', () => {
        // AE-011
        test('AE-011 - Verify that the Login page is displayed correctly', async ({ loginPage }) => {

            // Verify Login page

                await loginPage.verifyLoginPage();

                // Verify URL
                await expect(loginPage.page).toHaveURL('https://automationexercise.com/login'
                );
            }
        );
    // AE-012
        test('AE-012 - Verify that a registered user can log in using valid credentials', async ({ loginPage }) => {

                const email = 'mosaeb009@gmail.com';

                const password = '1234';

                const username = 'Mosaeb Bin Mozib';


                // Enter valid email
                await loginPage.enterEmail(email);


                // Enter valid password
                await loginPage.enterPassword(password);


                // Verify email was entered correctly
                await expect(loginPage.emailField).toHaveValue(email);

                // Verify password was entered correctly
                await expect(loginPage.passwordField).toHaveValue(password);

                 // Click Login
                 await loginPage.clickLogin();

                // Verify user is logged in
                await loginPage.verifyLoggedInUser(username);
             }
        );

    // AE-013
        test('AE-013 - Verify login fails with incorrect email and password', async ({ loginPage }) => {

                const incorrectEmail = 'user_12345@gmail.com';

                const incorrectPassword = 'Password@123';


                // Enter incorrect email
                await loginPage.enterEmail(incorrectEmail);


                // Enter incorrect password
                await loginPage.enterPassword(incorrectPassword);


                // Click Login
                await loginPage.clickLogin();


                // Verify error message
                await loginPage.verifyLoginErrorMessage();


                // Verify the user is NOT logged in
                await expect(loginPage.loggedInAs).not.toBeVisible();
            }
        );

        // AE-014
        test('AE-014 - Verify login fails with valid email and incorrect password', async ({ loginPage }) => {

                    const validEmail = 'mosaeb009@gmail.com';

                    const incorrectPassword = 'Password@123';


                    // Enter valid registered email
                    await loginPage.enterEmail(validEmail);

                    // Enter incorrect password
                    await loginPage.enterPassword(incorrectPassword);

                    // Click Login
                    await loginPage.clickLogin();


                    // Verify login error message
                    await loginPage.verifyLoginErrorMessage();

                    // Verify the user is NOT logged in
                    await expect(loginPage.loggedInAs).not.toBeVisible();
            }
        );

        // AE-015
        test('AE-015 - Verify login fails with unregistered email and password', async ({ loginPage }) => {

                const unregisteredEmail = 'mosaeb@gmail.com';

                const password = '1234';

                // Enter unregistered email
                await loginPage.enterEmail(unregisteredEmail);

                // Enter password
                await loginPage.enterPassword(password);

                // Click Login
                await loginPage.clickLogin();


                // Verify login error message
                await loginPage.verifyLoginErrorMessage();

                // Verify the user is NOT logged in
                await expect(loginPage.loggedInAs).not.toBeVisible();
            }
        );

        // AE-016
        test('AE-016 - Verify login cannot be submitted with empty email and password', async ({ loginPage }) => {

                const email = '';
                const password = '';

                // Enter empty email
                await loginPage.enterEmail(email);

                // Enter an empty password
                await loginPage.enterPassword(password);

                // Click Login
                await loginPage.clickLogin();

                // Verify the user is NOT logged in
                await expect(loginPage.loggedInAs).not.toBeVisible();
            }
        );

        // AE-017
        test('AE-017 - Verify login fails when email is empty and password is provided', async ({ loginPage }) => {

                const email = '';
                const password = '1234';

                // Leave Email empty
                await loginPage.enterEmail(email);


                // Enter valid password
                await loginPage.enterPassword(password);


                // Click Login
                await loginPage.clickLogin();


                // Verify the user is NOT logged in
                await expect(loginPage.loggedInAs).not.toBeVisible();

                // Verify Email is still empty
                await expect(loginPage.emailField).toHaveValue('');
            }
        );

        // AE-018
        test('AE-018 - Verify login fails when password is empty and valid email is provided', async ({ loginPage }) => {

                const email = 'mosaeb009@gmail.com';
                const password = '';


                // Enter valid registered email
                await loginPage.enterEmail(email);

                // Leave the password empty
                await loginPage.enterPassword(password);

                // Click Login
                await loginPage.clickLogin();

                // Verify the user is NOT logged in
                await expect(loginPage.loggedInAs).not.toBeVisible();

                // Verify password is still empty
                await expect(loginPage.passwordField).toHaveValue('');
            }
        );

        // AE-019
        test('AE-019 - Verify login fails with invalid email format', async ({ loginPage }) => {

                const invalidEmail = 'testexample.com';
                const password = '1234';

                // Enter invalid email
                await loginPage.enterEmail(invalidEmail);

                // Enter password
                await loginPage.enterPassword(password);

                // Click Login
                await loginPage.clickLogin();

                // Verify user is NOT logged in
                await expect(loginPage.loggedInAs).not.toBeVisible();
            }
        );

        // AE-020
        test('AE-020 - Verify that the Password field masks the entered password', async ({ loginPage }) => {

                const password = 'Test@1234';

                // Enter password
                await loginPage.enterPassword(password);

                // Verify a password field type is password
                await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
            }
        );

        // AE-021
        test('AE-021 - Verify user can log in by pressing Enter', async ({ loginPage }) => {

                const email = 'mosaeb009@gmail.com';
                const password = '1234';

                // Enter valid email
                await loginPage.enterEmail(email);

                // Enter valid password
                await loginPage.enterPassword(password);

                // Press Enter from the password field
                await loginPage.passwordField.press('Enter');

                // Verify user is logged in
                await expect(loginPage.loggedInAs).toBeVisible();
            }
        );

        // AE-022
        test('AE-022 - Verify authenticated state is maintained when navigating to Products and Cart', async ({ loginPage }) => {

                    const email = 'mosaeb009@gmail.com';
                    const password = '1234';

                    // Login with valid credentials
                    await loginPage.enterEmail(email);
                    await loginPage.enterPassword(password);
                    await loginPage.clickLogin();

                    // Verify user is logged in
                    await expect(loginPage.loggedInAs).toBeVisible();

                    // Navigate to the Products page
                    await loginPage.page.goto('https://automationexercise.com/products');

                    // Wait for Products page
                    await loginPage.page.getByText('All Products').waitFor({state: 'visible', timeout: 10000});

                    // Verify authenticated state is maintained
                    await expect(loginPage.loggedInAs).toBeVisible();

                    // Navigate to Cart page
                    await loginPage.page.goto('https://automationexercise.com/view_cart');

                    // Verify authenticated state is maintained
                    await expect(loginPage.loggedInAs).toBeVisible();
            }
        );

        // AE-023
        test('AE-023 - Verify that a logged-in user can log out successfully', async ({ loginPage }) => {

                const email = 'mosaeb009@gmail.com';
                const password = '1234';

                // Login with valid credentials
                await loginPage.enterEmail(email);

                await loginPage.enterPassword(password);

                await loginPage.clickLogin();


                // Verify user is logged in
                await expect(loginPage.loggedInAs).toBeVisible();


                // Click Logout
                await loginPage.clickLogout();


                // Verify Login page is displayed
                await expect(loginPage.loginHeading).toBeVisible();


                // Verify the user is no longer logged in
                await expect(loginPage.loggedInAs).not.toBeVisible();


                // Verify URL
                await expect(loginPage.page).toHaveURL(/.*\/login/);
            }
        );

        // AE-024
        test('AE-024 - Verify Signup / Login navigation opens the Login page', async ({ loginPage }) => {

                // Click Signup / Login
                await loginPage.signupLoginLink.click();

                // Verify Login page URL
                await expect(loginPage.page).toHaveURL(/.*\/login/);

                // Verify Login to your account is displayed
                await expect(loginPage.loginHeading).toBeVisible();
            }
        );

        // AE-025
        test('AE-025 - Verify logged-out user cannot proceed to checkout', async ({ loginPage }) => {

                const email = 'mosaeb009@gmail.com';
                const password = '1234';

                // 1. Login with valid credentials
                await loginPage.enterEmail(email);
                await loginPage.enterPassword(password);
                await loginPage.clickLogin();

                // 2. Verify authenticated state
                await expect(loginPage.loggedInAs).toBeVisible();

                // 3. Navigate to the Products page
                await loginPage.page.goto('https://automationexercise.com/products');

                // 4. Wait for Products page
                await expect(loginPage.page.getByText('All Products')).toBeVisible();

                // Find the Blue Top product card
                const product = loginPage.page
                    .locator('.product-image-wrapper')
                    .filter({ hasText: 'Blue Top' })
                    .first();

                // Verify the Blue Top product is visible
                await expect(product).toBeVisible();

                 // Click Blue Top's Add to cart
                await product
                .locator('a.add-to-cart[data-product-id="1"]')
                .first()
                .click();

                // 8. Navigate to Cart
                await loginPage.page.goto('https://automationexercise.com/view_cart');

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
                await loginPage.page.goto('https://automationexercise.com/view_cart');

                // 15. Verify the user is still logged out
                await expect(loginPage.loggedInAs).not.toBeVisible();

                // 16. Verify user is still logged out
                await expect(
                    loginPage.loggedInAs
                ).not.toBeVisible();

                // 17. Check whether Proceed To Checkout is available
                const checkoutButton = loginPage.page.getByText(
                    'Proceed To Checkout',
                    { exact: true }
                );

                // 18. If checkout is available, attempt to access it
                if (await checkoutButton.isVisible()) {
                    await checkoutButton.click();

                    // User must not be treated as authenticated
                    await expect(
                        loginPage.loggedInAs
                    ).not.toBeVisible();
                }
            }
        );
    }
);
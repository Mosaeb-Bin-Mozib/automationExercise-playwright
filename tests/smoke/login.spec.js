import {test, expect} from '../../fixtures/login.fixture.js';
import { getLoginData } from '../../test-data/loginData.js';
import {ROUTES} from "../../test-data/routes";

const loginData = getLoginData();

test.describe('Login', () => {
        test('AE-011 - Verify that the Login page is displayed correctly', async ({ loginPage }) => {
                await loginPage.verifyLoginPage();
            }
        );
        test('AE-012 - Verify that a registered user can log in using valid credentials', async ({ loginPage }) => {

                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.password);
                await expect(loginPage.emailField).toHaveValue(loginData.email);
                await expect(loginPage.passwordField).toHaveValue(loginData.password);
                await loginPage.clickLogin();
                await loginPage.verifyLoggedInUser(loginData.username);
             }
        );

        test('AE-013 - Verify login fails with incorrect email and password', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.incorrectEmail);
                await loginPage.enterPassword(loginData.incorrectPassword);
                await loginPage.clickLogin();
                await loginPage.verifyLoginErrorMessage();
            }
        );

        test('AE-014 - Verify login fails with valid email and incorrect password', async ({ loginPage }) => {
                    await loginPage.enterEmail(loginData.email);
                    await loginPage.enterPassword(loginData.incorrectPassword);
                    await loginPage.clickLogin();
                    await loginPage.verifyLoginErrorMessage();
            }
        );

        test('AE-015 - Verify login fails with unregistered email and password', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.unregisteredEmail);
                await loginPage.enterPassword(loginData.password);
                await loginPage.clickLogin();
                await loginPage.verifyLoginErrorMessage();

            }
        );

        test('AE-016 - Verify login cannot be submitted with empty email and password', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.emptyEmail);
                await loginPage.enterPassword(loginData.emptyPassword);
                await loginPage.clickLogin();
                await expect(loginPage.emailField).toHaveJSProperty('validity.valueMissing', true);
                await expect(loginPage.passwordField).toHaveJSProperty('validity.valueMissing', true);
            }
        );

        test('AE-017 - Verify login fails when email is empty and password is provided', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.emptyEmail);
                await loginPage.enterPassword(loginData.password);
                await loginPage.clickLogin();
                await expect(loginPage.emailField).toHaveJSProperty('validity.valueMissing', true);
            }
        );

        test('AE-018 - Verify login fails when password is empty and valid email is provided', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.emptyPassword);
                await loginPage.clickLogin();
                await expect(loginPage.passwordField).toHaveJSProperty('validity.valueMissing', true);
            }
        );

        test('AE-019 - Verify login fails with invalid email format', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.invalidEmailFormat);
                await loginPage.enterPassword(loginData.password);
                await loginPage.clickLogin();
                await expect(loginPage.emailField).toHaveJSProperty('validity.typeMismatch', true);
            }
        );

        test('AE-020 - Verify that the Password field masks the entered password', async ({ loginPage }) => {
                await loginPage.enterPassword(loginData.password);
                await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
            }
        );

        test('AE-021 - Verify user can log in by pressing Enter', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.password);
                await loginPage.passwordField.press('Enter');
                await loginPage.verifyLoggedInUser(loginData.username);
            }
        );

        test('AE-022 - Verify authenticated state is maintained when navigating to Products and Cart', async ({ loginPage }) => {
                    await loginPage.enterEmail(loginData.email);
                    await loginPage.enterPassword(loginData.password);
                    await loginPage.clickLogin();
                    await loginPage.verifyLoggedInUser(loginData.username);
                    await loginPage.page.goto(ROUTES.PRODUCTS);
                    await loginPage.page.getByText('All Products').waitFor({state: 'visible', timeout: 10000});
                    await loginPage.verifyLoggedInUser(loginData.username);
                    await loginPage.page.goto(ROUTES.CART);
                    await loginPage.verifyLoggedInUser(loginData.username);
            }
        );
        test('AE-023 - Verify that a logged-in user can log out successfully', async ({ loginPage }) => {

                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.password);
                await loginPage.clickLogin();
                await loginPage.verifyLoggedInUser(loginData.username);
                await loginPage.clickLogout();
                await expect(loginPage.loginHeading).toBeVisible();
                await expect(loginPage.loggedInAs).not.toBeVisible();
                await expect(loginPage.page).toHaveURL(ROUTES.LOGIN);
            }
        );

        test('AE-025 - Verify logged-out user cannot proceed to checkout', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.password);
                await loginPage.clickLogin();
                await loginPage.verifyLoggedInUser(loginData.username);
                await loginPage.page.goto(ROUTES.PRODUCTS);
                await expect(loginPage.page.getByText('All Products')).toBeVisible();
                const product = loginPage.page.locator('.product-image-wrapper').filter({ hasText: 'Blue Top' }).first();
                await expect(product).toBeVisible();
                await product.locator('a.add-to-cart[data-product-id="1"]').first().click();
                await loginPage.page.goto(ROUTES.CART);
                await expect(loginPage.page.getByText('Blue Top')).toBeVisible();
                await expect(loginPage.page.getByText('Proceed To Checkout')).toBeVisible();
                await loginPage.clickLogout();
                await expect(loginPage.loginHeading).toBeVisible();
                await expect(loginPage.loggedInAs).not.toBeVisible();
                await loginPage.page.goto(ROUTES.CART);
                await expect(loginPage.loggedInAs).not.toBeVisible();
                const checkoutButton = loginPage.page.getByText('Proceed To Checkout', { exact: true }
                );
                if (await checkoutButton.isVisible()) {await checkoutButton.click();
                    await expect(loginPage.loggedInAs).not.toBeVisible();
                }
            }
        );
    }
);

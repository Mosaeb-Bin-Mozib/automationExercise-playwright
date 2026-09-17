import {test, expect} from '../../fixtures/login.fixture.js';
import { getLoginData } from '../../test-data/loginData.js';
import {ROUTES} from "../../test-data/routes";
const loginData = getLoginData();

test.describe('Login', () => {
        test('AE-011 - Verify that the Login page is displayed correctly', async ({ loginPage }) => {
                await expect(loginPage.loginHeading).toBeVisible();
                await expect(loginPage.emailField).toBeVisible();
                await expect(loginPage.emailField).toBeEnabled();
                await expect(loginPage.passwordField).toBeVisible();
                await expect(loginPage.passwordField).toBeEnabled();
                await expect(loginPage.loginButton).toBeVisible();
                await expect(loginPage.loginButton).toBeEnabled()
                await expect(loginPage.loginHeading).toBeVisible();
            }
        );
        test('AE-012 - Verify that a registered user can log in using valid credentials', async ({ loginPage }) => {

                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.password);
                await expect(loginPage.emailField).toHaveValue(loginData.email);
                await expect(loginPage.passwordField).toHaveValue(loginData.password);
                await loginPage.loginButton.click();
                await expect(loginPage.loggedInAs).toBeVisible();
                await expect(loginPage.loggedInAs).toContainText(`Logged in as ${loginData.username}`);
             }
        );

        test('AE-013 - Verify login fails with incorrect email and password', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.incorrectEmail);
                await loginPage.enterPassword(loginData.incorrectPassword);
                await loginPage.loginButton.click();
                await expect(loginPage.loginErrorMessage).toBeVisible();
            }
        );

        test('AE-014 - Verify login fails with valid email and incorrect password', async ({ loginPage }) => {
                    await loginPage.enterEmail(loginData.email);
                    await loginPage.enterPassword(loginData.incorrectPassword);
                    await loginPage.loginButton.click();
                    await expect(loginPage.loginErrorMessage).toBeVisible();
            }
        );

        test('AE-015 - Verify login fails with unregistered email and password', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.unregisteredEmail);
                await loginPage.enterPassword(loginData.password);
                await loginPage.loginButton.click();
                await expect(loginPage.loginErrorMessage).toBeVisible();

            }
        );

        test('AE-016 - Verify login cannot be submitted with empty email and password', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.emptyEmail);
                await loginPage.enterPassword(loginData.emptyPassword);
                await loginPage.loginButton.click();
                await expect(loginPage.emailField).toHaveJSProperty('validity.valueMissing', true);
                await expect(loginPage.passwordField).toHaveJSProperty('validity.valueMissing', true);
            }
        );

        test('AE-017 - Verify login fails when email is empty and password is provided', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.emptyEmail);
                await loginPage.enterPassword(loginData.password);
                await loginPage.loginButton.click();
                await expect(loginPage.emailField).toHaveJSProperty('validity.valueMissing', true);
            }
        );

        test('AE-018 - Verify login fails when password is empty and valid email is provided', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.emptyPassword);
                await loginPage.loginButton.click();
                await expect(loginPage.passwordField).toHaveJSProperty('validity.valueMissing', true);
            }
        );

        test('AE-019 - Verify login fails with invalid email format', async ({ loginPage }) => {
                await loginPage.enterEmail(loginData.invalidEmailFormat);
                await loginPage.enterPassword(loginData.password);
                await loginPage.loginButton.click();
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
                await expect(loginPage.loggedInAs).toBeVisible();
                await expect(loginPage.loggedInAs).toContainText(`Logged in as ${loginData.username}`);
            }
        );

        test('AE-022 - Verify authenticated state is maintained when navigating to Products and Cart', async ({ loginPage }) => {
                    await loginPage.enterEmail(loginData.email);
                    await loginPage.enterPassword(loginData.password);
                    await loginPage.loginButton.click();
                    await expect(loginPage.loggedInAs).toBeVisible();
                    await expect(loginPage.loggedInAs).toContainText(`Logged in as ${loginData.username}`);
                    await loginPage.page.goto(ROUTES.PRODUCTS);
                    await loginPage.page.getByText('All Products').waitFor({state: 'visible', timeout: 10000});
                    await expect(loginPage.loggedInAs).toBeVisible();
                    await expect(loginPage.loggedInAs).toContainText(`Logged in as ${loginData.username}`);
                    await loginPage.page.goto(ROUTES.CART);
                    await expect(loginPage.loggedInAs).toBeVisible();
                    await expect(loginPage.loggedInAs).toContainText(`Logged in as ${loginData.username}`);
            }
        );
        test('AE-023 - Verify that a logged-in user can log out successfully', async ({ loginPage }) => {

                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.password);
                await loginPage.loginButton.click();
                await expect(loginPage.loggedInAs).toBeVisible();
                await expect(loginPage.loggedInAs).toContainText(`Logged in as ${loginData.username}`);
                await loginPage.logoutLink.click();
                await expect(loginPage.loginHeading).toBeVisible();
                await expect(loginPage.loggedInAs).not.toBeVisible();
                await expect(loginPage.page).toHaveURL(ROUTES.LOGIN);
            }
        );

        test('AE-025 - Verify logged-out user cannot proceed to checkout', async ({ loginPage,cartPage }) => {
                await loginPage.enterEmail(loginData.email);
                await loginPage.enterPassword(loginData.password);
                await loginPage.loginButton.click();
                await expect(loginPage.loggedInAs).toBeVisible();
                await expect(loginPage.loggedInAs).toContainText(`Logged in as ${loginData.username}`);
                await loginPage.page.goto(ROUTES.PRODUCTS);
                await expect(loginPage.page.getByText('All Products')).toBeVisible();
                await expect(cartPage.blueTopProduct.blueTop).toBeVisible();
                await cartPage.blueTopProduct.addToCart.first().click();
                await loginPage.page.goto(ROUTES.CART);
                await expect(cartPage.blueTopProduct.blueTopRow).toBeVisible();
                await expect(cartPage.cartConfirmation.proceedToCheckout).toBeVisible();
                await loginPage.logoutLink.click();
                await expect(loginPage.loginHeading).toBeVisible();
                await expect(loginPage.loggedInAs).not.toBeVisible();
                await loginPage.page.goto(ROUTES.CART);
                await expect(loginPage.loggedInAs).not.toBeVisible();
                const checkoutButton = cartPage.cartConfirmation.proceedToCheckout;
                if (await checkoutButton.isVisible())
                    {   await checkoutButton.click();
                    await expect(loginPage.loggedInAs).not.toBeVisible();
                    }
            }
        );
    }
);

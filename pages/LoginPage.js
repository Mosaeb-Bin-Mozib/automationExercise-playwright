import { expect } from '@playwright/test';

export class LoginPage {

    constructor(page) {

        this.page = page;

        // Login section
        this.loginHeading = page.getByRole('heading', {name: 'Login to your account'});

        this.emailField = page.locator('input[data-qa="login-email"]');

        this.passwordField = page.locator('input[data-qa="login-password"]');

        this.loginButton = page.getByRole('button', {name: 'Login'});


        // New User Signup section
        this.signupHeading = page.getByRole('heading', {name: 'New User Signup!'});

        this.loggedInAs = page.locator('li:has-text("Logged in as")');

        this.loginErrorMessage = page.getByText('Your email or password is incorrect!');

        this.logoutLink = page.getByRole('link', {name: 'Logout'});

        // ADD THIS
        this.signupLoginLink = page.getByRole('link', {name: 'Signup / Login'});
    }


    // ==========================================
    // OPEN LOGIN PAGE
    // ==========================================

    async open() {

        await this.page.goto('https://automationexercise.com/login');
    }


    // ==========================================
    // WAIT FOR LOGIN PAGE
    // ==========================================

    async waitForPageLoad() {

        await this.loginHeading.waitFor({state: 'visible', timeout: 1000});
    }


    // ==========================================
    // VERIFY LOGIN PAGE
    // ==========================================

    async verifyLoginPage() {

        await expect(this.loginHeading).toBeVisible();


        await expect(this.emailField).toBeVisible();

        await expect(this.emailField).toBeEnabled();


        await expect(this.passwordField).toBeVisible();

        await expect(this.passwordField).toBeEnabled();


        await expect(this.loginButton).toBeVisible();

        await expect(this.loginButton).toBeEnabled();


        await expect(this.signupHeading).toBeVisible();

    }

    async enterEmail(email) {
        await this.emailField.fill(email);
    }

    async enterPassword(password) {
        await this.passwordField.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async verifyLoggedInUser(username) {
        await expect(this.loggedInAs).toBeVisible();

        await expect(this.loggedInAs).toContainText(
            `Logged in as ${username}`
        );
    }
    async verifyLoginErrorMessage() {
        await expect(this.loginErrorMessage).toBeVisible();
    }

    async clickLogout() {await this.logoutLink.click();}
}


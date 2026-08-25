import { expect } from '@playwright/test';

export class SignupPage {

    constructor(page) {
        this.page = page;
        this.signupLoginLink = page.getByRole('link', {name: 'Signup / Login'});

        this.nameField = page.getByPlaceholder('Name');

        this.emailField = page.locator('input[data-qa="signup-email"]');

        this.signupButton = page.getByRole('button', {name: 'Signup'});

        this.signupHeading = page.getByRole('heading', {name: 'New User Signup!'});

        this.accountInformationHeading = page.getByRole('heading', {name: 'Enter Account Information'});
    }

    async enterName(name) {
        await this.nameField.fill(name);
    }

    async enterEmail(email) {
        await this.emailField.fill(email);
    }

    async clickSignup() {
        await this.signupButton.click();
    }

    async verifySignupPage() {
        await expect(this.signupHeading).toBeVisible();

        await expect(this.nameField).toBeVisible();
        await expect(this.nameField).toBeEnabled();

        await expect(this.emailField).toBeVisible();
        await expect(this.emailField).toBeEnabled();

        await expect(this.signupButton).toBeVisible();
        await expect(this.signupButton).toBeEnabled();
    }

    async open() {

        await this.page.goto('https://automationexercise.com/');
    }
    async navigateToSignup() {

        await this.signupLoginLink.click();

        await this.signupHeading.waitFor({
            state: 'visible'
        });
    }
}
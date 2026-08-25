import { expect } from '@playwright/test';

export class BasePage {

    constructor(page) {

        this.page = page;

        // Login
        this.loginEmail = page.getByPlaceholder('Email Address').first();

        this.loginPassword = page.getByPlaceholder('Password');

        this.loginButton = page.getByRole('button', { name: 'Login' }).first();
    }


    // Reusable Login
    async login() {

        await this.page.goto('/login');

        await this.page.waitForLoadState('domcontentloaded');

        await this.loginEmail.fill(process.env.TEST_EMAIL);

        await this.loginPassword.fill(process.env.TEST_PASSWORD);

        await this.loginButton.click();

        await expect(this.page.getByText('Logged in as', { exact: false })).toBeVisible();
    }
}
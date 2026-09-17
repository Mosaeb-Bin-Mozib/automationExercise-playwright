import { expect } from '@playwright/test';
import {ROUTES} from "../test-data/routes";


export class BasePage {
    constructor(page) {
        this.page = page;
        this.loginEmail = page.getByPlaceholder('Email Address').first();
        this.loginPassword = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' }).first();
    }
    async login() {
        await this.page.goto(ROUTES.LOGIN);
        await this.page.waitForLoadState('domcontentloaded');
        await this.loginEmail.fill(process.env.TEST_EMAIL);
        await this.loginPassword.fill(process.env.TEST_PASSWORD);
        await this.loginButton.click();
        await expect(this.page.getByText('Logged in as', { exact: false })).toBeVisible();
    }
}

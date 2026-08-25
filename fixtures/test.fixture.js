import { test as base } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage.js';
import { AccountInformationPage } from '../pages/AccountInformationPage.js';

export const test = base.extend({

    signupPage: async ({ page }, use) => {

        // Common setup
        await page.goto('https://automationexercise.com/');

        await page.getByRole('link', {name: 'Signup / Login'}).click();

        const signupPage = new SignupPage(page);

        // Verify the page is ready
        await signupPage.verifySignupPage();

        // Make the signupPage available to the test
        await use(signupPage);
    },

    accountInformationPage: async ({ page }, use) => {

        await page.goto('https://automationexercise.com/');

        await page.getByRole('link', {name: 'Signup / Login'}).click();

        const signupPage = new SignupPage(page);

        const uniqueEmail = `mosaeb_${Date.now()}@gmail.com`;

        await signupPage.enterName('Mosaeb Bin Mozib');
        await signupPage.enterEmail(uniqueEmail);
        await signupPage.clickSignup();

        // await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();

        const accountInformationPage = new AccountInformationPage(page);

        await use(accountInformationPage);
    },
    // ==========================================
    // TEST DATA
    // ==========================================

    signupTestData: async ({}, use) => {

        const data = {
            name: 'Mosaeb Bin Mozib',
            email: `mosaeb_${Date.now()}@gmail.com`,
            password: 'Test@12345'
        };

        await use(data);
    },

    // ==========================================
    // ACCOUNT INFORMATION PAGE
    // ==========================================

    accountInformationPages: async ({ page, signupTestData }, use) => {

        const signupPage = new SignupPage(page);

        // Open website
        await signupPage.open();

        // Go to Signup / Login
        await signupPage.navigateToSignup();

        // Enter Name
        await signupPage.enterName(
            signupTestData.name
        );

        // Enter Email
        await signupPage.enterEmail(
            signupTestData.email
        );

        // Click Signup
        await signupPage.clickSignup();

        // Wait for Account Information
        await page.getByText('ENTER ACCOUNT INFORMATION').waitFor({state: 'visible', timeout: 10000});

        const accountInformationPage = new AccountInformationPage(page);

        await use(accountInformationPage);
    }

});

export { expect } from '@playwright/test';
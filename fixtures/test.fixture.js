import { test as base } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage.js';
import ROUTES {  } from '../test-data/routes';
import { AccountInformationPage } from '../pages/AccountInformationPage.js';

export const test = base.extend({

    signupPage: async ({ page }, use) => {
        await page.goto(ROUTES.HOME);

        await page.getByRole('link', {name: 'Signup / Login'}).click();

        const signupPage = new SignupPage(page);
        await use(signupPage);
    },

    accountInformationPage: async ({ page }, use) => {

        await page.goto(ROUTES.HOME);

        await page.getByRole('link', {name: 'Signup / Login'}).click();

        const signupPage = new SignupPage(page);

        const uniqueEmail = `mosaeb_${Date.now()}@gmail.com`;

        await signupPage.enterName('Mosaeb Bin Mozib');
        await signupPage.enterEmail(uniqueEmail);
        await signupPage.clickSignup();
        const accountInformationPage = new AccountInformationPage(page);

        await use(accountInformationPage);
    },

    signupTestData: async ({}, use) => {

        const data = {
            name: 'Mosaeb Bin Mozib',
            email: `mosaeb_${Date.now()}@gmail.com`,
            password: 'Test@12345'
        };

        await use(data);
    },

    // ACCOUNT INFORMATION PAGE

    accountInformationPages: async ({ page, signupTestData }, use) => {

        const signupPage = new SignupPage(page);
        await signupPage.open();
        await signupPage.navigateToSignup();
        await signupPage.enterName(
            signupTestData.name
        );

        await signupPage.enterEmail(
            signupTestData.email
        );
        await signupPage.clickSignup();
        await page.getByText('ENTER ACCOUNT INFORMATION').waitFor({state: 'visible', timeout: 10000});
        const accountInformationPage = new AccountInformationPage(page);
        await use(accountInformationPage);
    }

});

export { expect } from '@playwright/test';

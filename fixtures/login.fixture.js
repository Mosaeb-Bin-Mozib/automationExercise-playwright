import {test as base, expect} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';
import { SignupPage } from '../pages/SignupPage.js';
import { AccountInformationPage } from '../pages/AccountInformationPage.js';



export const test = base.extend({

    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);
        await loginPage.open();
        await use(loginPage);
    },

    signupPage: async ({ page }, use) => {

        const signupPage = new SignupPage(page);
        await use(signupPage);
    },

    accountInformationPage: async ({ page }, use) => {

        const accountInformationPage = new AccountInformationPage(page);
        await use(accountInformationPage);
    }
});


export { expect };

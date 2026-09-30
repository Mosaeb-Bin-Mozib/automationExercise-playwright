import { test as base } from '@playwright/test';
import { PaymentPage } from '../pages/PaymentPage';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend({

    paymentPage: async ({ page }, use) => {

        const paymentPage = new PaymentPage(page);

        await use(paymentPage);
    },

    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await use(loginPage);
    },

});

export { expect } from '@playwright/test';
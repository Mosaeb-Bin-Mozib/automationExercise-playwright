import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { CartPage } from '../pages/CartPage.js';
import {HomePage} from "../pages/HomePage";
import {ContactUsPage} from "../pages/ContactUsPage";
import {PaymentPage} from "../pages/PaymentPage";

export const test = base.extend({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await use(loginPage);
    },
    paymentPage: async ({ page }, use) => {

        const paymentPage = new PaymentPage(page);
        await use(paymentPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);

        await use(homePage);
    },
    contactUsPage: async ({ page }, use) => {
        const contactUsPage = new ContactUsPage(page);
        await use(contactUsPage);
    }

});

export { expect };
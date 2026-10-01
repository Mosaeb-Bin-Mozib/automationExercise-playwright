import { test as base, expect } from './base.fixture';
import { CartPage } from '../pages/CartPage.js';

export const test = base.extend({

    cartPage: async ({ page }, use) => {

        const cartPage = new CartPage(page);

        await use(cartPage);
    },

});

export { expect };
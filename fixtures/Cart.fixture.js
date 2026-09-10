import { test as base, expect } from '@playwright/test';

import { CartPage } from '../pages/CartPage';


export const test = base.extend({

    cartPage: async ({ page }, use) => {

        const cartPage = new CartPage(page);

        await use(cartPage);
    },

});


export { expect };

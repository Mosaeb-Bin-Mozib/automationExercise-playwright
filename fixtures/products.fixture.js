import { test as base, expect } from '@playwright/test';

import { ProductsPage } from '../pages/ProductsPage.js';

export const test = base.extend({

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

});

export { expect };
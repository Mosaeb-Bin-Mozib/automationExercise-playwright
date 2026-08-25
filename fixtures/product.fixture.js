import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { ProductApi } from '../pages/ProductApiPage';

dotenv.config();

export const test = base.extend({

    // Create API context
    apiContext: async ({ playwright }, use) => {

        const apiContext = await playwright.request.newContext({
            baseURL: process.env.BASE_URL
        });

        await use(apiContext);

        await apiContext.dispose();
    },

    // Create a Product API object
    productApi: async ({ apiContext }, use) => {

        const productApi = new ProductApi(apiContext);

        await use(productApi);
    },

    searchProductApi: async ({ apiContext }, use) => {

        const searchProductApi = new SearchProductApi(apiContext);

        await use(searchProductApi);
    }
});

export { expect };
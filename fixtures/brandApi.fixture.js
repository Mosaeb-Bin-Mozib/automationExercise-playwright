import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { ProductApi } from '../pages/ProductApiPage';
import { BrandApi } from '../pages/BrandApiPage';

dotenv.config({
    path: path.resolve(process.cwd(), '..env')
});

export const test = base.extend({

    apiContext: async ({ playwright }, use) => {

        const apiContext = await playwright.request.newContext({
            baseURL: process.env.BASE_URL
        });

        await use(apiContext);

        await apiContext.dispose();
    },

    brandApi: async ({ apiContext }, use) => {

        const brandApi = new BrandApi(apiContext);

        await use(brandApi);
    }
});

export { expect };
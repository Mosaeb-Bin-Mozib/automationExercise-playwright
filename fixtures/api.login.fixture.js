import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';

import { ProductApi } from '../pages/ProductApiPage';
import { BrandApi } from '../pages/BrandApiPage';
import { LoginApi } from '../pages/LoginApiPage';
import { UserAccountApi } from '../pages/UserAccountApiPage';

dotenv.config();

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
    },

    productApi: async ({ apiContext }, use) => {

        const productApi = new ProductApi(apiContext);

        await use(productApi);
    },

    loginApi: async ({ apiContext }, use) => {

        const loginApi = new LoginApi(apiContext);

        await use(loginApi);
    },

    userAccountApi: async ({ apiContext }, use) => {

        const userAccountApi = new UserAccountApi(apiContext);

        await use(userAccountApi);
    },

});

export { expect };

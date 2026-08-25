import { test as base } from '@playwright/test';

import { PaymentPage } from '../pages/PaymentPage';


export const test = base.extend({

    paymentPage: async ({ page }, use) => {

        const paymentPage = new PaymentPage(page);

        await use(paymentPage);
    },

});


export { expect } from '@playwright/test';
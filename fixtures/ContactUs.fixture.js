import { test as base } from '@playwright/test';
import { ContactUsPage } from '../pages/ContactUsPage';

export const test = base.extend({

    contactUsPage: async ({ page }, use) => {
        const contactUsPage = new ContactUsPage(page);
        await use(contactUsPage);
    }

});

export { expect } from '@playwright/test';

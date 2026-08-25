import { test as base } from '@playwright/test';
import { ContactUsPage } from '../pages/ContactUsPage';

export const test = base.extend({

    // Contact Us Page Fixture
    contactUsPage: async ({ page }, use) => {

        // Create ContactUsPage object
        const contactUsPage = new ContactUsPage(page);

        // Make it available to the test
        await use(contactUsPage);
    }

});

export { expect } from '@playwright/test';
import { test as base, expect } from '@playwright/test';

export const test = base.extend({

    page: async ({ context }, use) => {

        // Block Google vignette advertisement navigation
        await context.route('**/*', async route => {

            const url = route.request().url();

            if (
                url.includes('doubleclick.net') ||
                url.includes('googlesyndication.com') ||
                url.includes('googleadservices.com')
            ) {
                await route.abort();
                return;
            }

            await route.continue();
        });

        const page = await context.newPage();

        await use(page);

        await page.close();
    },
});

export { expect };

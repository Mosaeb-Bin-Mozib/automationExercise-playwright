import { test as base } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage.js';
import  {ROUTES} from '../test-data/routes';
import { AccountInformationPage } from '../pages/AccountInformationPage.js';
import fs from 'fs';

export const test = base.extend({

    signupPage: async ({ page }, use) => {
        await page.goto(ROUTES.HOME);

        await page.getByRole('link', {name: 'Signup / Login'}).click();

        const signupPage = new SignupPage(page);
        await use(signupPage);
    },

    accountInformationPage: async ({ page }, use) => {

        await page.goto(ROUTES.HOME);
        await page.getByRole('link', {name: 'Signup / Login'}).click();

        const signupPage = new SignupPage(page);
        const filePath = './test-data/user.json';

        let users = [];

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            if (fileContent.trim()) {
                users = JSON.parse(fileContent);
            }
        }

        const unique = Date.now();
        const uniqueId = users.length + 1;
        const uniqueEmail = `mosaeb_${unique}@gmail.com`;

        await signupPage.enterName('Mosaeb Bin Mozib');
        await signupPage.enterEmail(uniqueEmail);
        await signupPage.clickSignup();

        const accountInformationPage =
            new AccountInformationPage(page);

        users.push({
            id: uniqueId,
            name: `Mosaeb Bin Mozib`,
            email: uniqueEmail,
        });

        fs.writeFileSync(
            filePath,
            JSON.stringify(users, null, 2)
        );

        await use(accountInformationPage);
    },

    signupTestData: async ({}, use) => {

        const data = {
            name: 'Mosaeb Bin Mozib',
            email: `mosaeb_${Date.now()}@gmail.com`,
            password: 'Test@12345'
        };

        await use(data);
    },

    accountInformationPages: async ({ page, signupTestData }, use) => {

        const signupPage = new SignupPage(page);
        await signupPage.open();
        await signupPage.navigateToSignup();
        await signupPage.enterName(
            signupTestData.name
        );

        await signupPage.enterEmail(
            signupTestData.email
        );
        await signupPage.clickSignup();
        await page.getByText('ENTER ACCOUNT INFORMATION').waitFor({state: 'visible', timeout: 10000});
        const accountInformationPage = new AccountInformationPage(page);
        await use(accountInformationPage);
    }

});

export { expect } from '@playwright/test';

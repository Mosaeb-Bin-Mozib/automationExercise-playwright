import { expect } from '@playwright/test';

export async function assertLoginInUser(loginPage,user) {
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(process.env.TEST_PASSWORD);
    await expect(loginPage.emailField).toHaveValue(user.email);
    await expect(loginPage.passwordField).toHaveValue(process.env.TEST_PASSWORD);
    await loginPage.loginButton.click();
    await expect(loginPage.loggedInAs).toContainText(`Logged in as ${user.name}`);
}
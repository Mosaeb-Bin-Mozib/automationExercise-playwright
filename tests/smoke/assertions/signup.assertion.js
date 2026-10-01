import { expect } from '@playwright/test';

export async function assertSignUpUser(signupPage) {
    await expect(signupPage.signupHeading).toBeVisible();
    await expect(signupPage.nameField).toBeVisible();
    await expect(signupPage.nameField).toBeEnabled();
    await expect(signupPage.emailField).toBeVisible();
    await expect(signupPage.emailField).toBeEnabled();
    await expect(signupPage.signupButton).toBeVisible();
    await expect(signupPage.signupButton).toBeEnabled();
}

export async function assertAddressInformation(accountInformationPage) {
    await expect(accountInformationPage.accountInformationHeading).toBeVisible();
    await expect(accountInformationPage.titleMr).toBeVisible();
    await expect(accountInformationPage.titleMrs).toBeVisible();
    await expect(accountInformationPage.nameField).toBeVisible();
    await expect(accountInformationPage.emailField).toBeVisible();
    await expect(accountInformationPage.passwordField).toBeVisible();
    await expect(accountInformationPage.dayDropdown).toBeVisible();
    await expect(accountInformationPage.monthDropdown).toBeVisible();
    await expect(accountInformationPage.yearDropdown).toBeVisible();
    await expect(accountInformationPage.newsletterCheckbox).toBeVisible();
    await expect(accountInformationPage.specialOffersCheckbox).toBeVisible();
}
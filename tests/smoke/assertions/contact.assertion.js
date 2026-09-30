import { expect } from 'playwright/test';
import { ROUTES } from '../../../test-data/routes';
import { getContactData } from '../../../test-data/contactData';

const contactData = getContactData();

export async function assertValidInformation(contactUsPage,ROUTES) {
    await contactUsPage.page.goto(ROUTES.HOME);
    await contactUsPage.page.goto(ROUTES.CONTACT_US);
    await contactUsPage.nameField.fill(contactData.name);
    await contactUsPage.emailField.fill(contactData.email);
    await contactUsPage.subjectField.fill(contactData.subject);
    await contactUsPage.messageField.fill(contactData.message);
    contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
    await contactUsPage.submitButton.click();
    await expect(contactUsPage.successMessage).toBeVisible();
}

export async function fillContactForm(contactUsPage, data) {
    await contactUsPage.page.goto(ROUTES.CONTACT_US);
    await contactUsPage.nameField.fill(data.name);
    await contactUsPage.emailField.fill(data.email);
    await contactUsPage.subjectField.fill(data.subject);
    await contactUsPage.messageField.fill(data.message);
}
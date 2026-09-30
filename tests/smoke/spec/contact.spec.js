import { test,expect } from '../../../fixtures/contactus.fixture';
import {getContactData, } from '../../../test-data/contactData';
import {ROUTES} from "../../../test-data/routes";
import {assertValidInformation, fillContactForm, fillContactForm2} from "../assertions/contact.assertion";
const contactData = getContactData();

test.describe('Contact Us', () => {
    test('AE-026 - Verify Contact Us page loads successfully', async ({ contactUsPage }) => {
            await contactUsPage.page.goto(ROUTES.HOME);
            await contactUsPage.page.goto(ROUTES.CONTACT_US);
            await expect(contactUsPage.page).toHaveURL(ROUTES.CONTACT_US);
            await expect(contactUsPage.contactUsHeading).toBeVisible();
            await expect(contactUsPage.getInTouch).toBeVisible();
            await expect(contactUsPage.nameField).toBeVisible();
            await expect(contactUsPage.emailField).toBeVisible();
            await expect(contactUsPage.subjectField).toBeVisible();
            await expect(contactUsPage.messageField).toBeVisible();
            await expect(contactUsPage.fileUpload).toBeVisible();
            await expect(contactUsPage.submitButton).toBeVisible();

        }
    );

    test('AE-027 - Verify Contact Us form submission with valid information', async ({ contactUsPage }) => {
        await assertValidInformation(contactUsPage);

    });

    test('AE-028 - Verify Contact Us form submission with valid file attachment', async ({ contactUsPage }) => {
        await assertValidInformation(contactUsPage, ROUTES, contactData);
        await contactUsPage.fileUpload.setInputFiles(contactData.path);
        await expect(contactUsPage.fileUpload).toHaveJSProperty('files.length', 1);
        await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
        await contactUsPage.submitButton.click();
        await expect(contactUsPage.successMessage).toBeVisible();
    });

    test('AE-029 - Verify Contact Us form accepts empty Name', async ({ contactUsPage }) => {
        await fillContactForm(contactUsPage, {name: contactData.nameEmpty, email: contactData.email, subject: contactData.subject, message: contactData.message});
        await expect(contactUsPage.nameField).toHaveJSProperty('validity.valueMissing', false);
        await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
        await contactUsPage.submitButton.click();
        await expect(contactUsPage.successMessage).toBeVisible();
    });

    test('AE-030 - Verify Contact Us form rejects empty Email', async ({ contactUsPage }) => {
        await fillContactForm(contactUsPage, {name: contactData.name, email: contactData.emailEmpty, subject: contactData.subject, message: contactData.message});
        await expect(contactUsPage.emailField).toHaveJSProperty('validity.valueMissing', true);
        await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
        await contactUsPage.submitButton.click();
    });
    test('AE-031 - Verify Contact Us form rejects empty Subject', async ({ contactUsPage }) => {
            await contactUsPage.page.goto(ROUTES.HOME);
            await fillContactForm(contactUsPage, {name: contactData.nameEmpty, email: contactData.email, subject: contactData.subjectEmpty, message: contactData.message});
            await expect(contactUsPage.subjectField).toHaveJSProperty('validity.valueMissing', false);
            await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitButton.click();
            await expect(contactUsPage.successMessage).toBeVisible();

        }
    );

    test('AE-032 - Verify Contact Us form rejects empty Message', async ({ contactUsPage }) => {

            await assertValidInformation(contactUsPage);
            await contactUsPage.messageField.fill(contactData.messageEmpty);
            await contactUsPage.submitButton.click();
            await expect(contactUsPage.messageField).toHaveJSProperty('validity.valueMissing', false);
            await expect(contactUsPage.successMessage).toBeVisible();

    });

    test('AE-033 - Verify Contact Us form rejects invalid Email', async ({ contactUsPage }) => {
            await contactUsPage.page.goto(ROUTES.HOME);
            await fillContactForm(contactUsPage, {name: contactData.name, email: contactData.emailInvalidFormat, subject: contactData.subject, message: contactData.message});
            await contactUsPage.submitButton.click();
            await expect(contactUsPage.emailField).toHaveJSProperty('validity.typeMismatch', true);
        }
    );
    test('AE-034 - Verify Contact Us Name field handles boundary-length input', async ({ contactUsPage }) => {
            await contactUsPage.page.goto(ROUTES.HOME);
            await contactUsPage.page.goto(ROUTES.CONTACT_US);
            await contactUsPage.nameField.fill(contactData.longName);
            await expect(contactUsPage.nameField).toHaveValue(contactData.longName);
            await contactUsPage.emailField.fill(contactData.email);
            await contactUsPage.subjectField.fill(contactData.subject);
            await contactUsPage.messageField.fill(contactData.message);
            await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitButton.click();
            await expect(contactUsPage.successMessage).toBeVisible();

        }
    );
    test('AE-038 - Verify success confirmation after Contact Us form submission', async ({ contactUsPage }) => {

            await assertValidInformation(contactUsPage);
            await expect(contactUsPage.page.locator('#contact-page').getByText(contactData.success)).toBeVisible();
        }
    );
    test('AE-039 - Verify user can return to Home after Contact Us submission', async ({ contactUsPage,homePage }) => {
            await assertValidInformation(contactUsPage);
            await contactUsPage.homeButton.click();
        }
    );

    test('AE-041 - Verify Subscription section is available in Contact Us footer', async ({ contactUsPage }) => {
            await contactUsPage.page.goto(ROUTES.HOME);
            await contactUsPage.page.goto(ROUTES.CONTACT_US);
            await contactUsPage.footer.scrollIntoViewIfNeeded();
            await expect(contactUsPage.page.getByText(contactData.subscription, {exact: true})).toBeVisible();
            await expect(contactUsPage.subscriptionEmail).toBeVisible();
            await contactUsPage.subscriptionEmail.fill(contactData.email);
            await contactUsPage.subscriptionButton.click();
            await expect(contactUsPage.subscriptionMessage).toContainText('You have been successfully subscribed!', { timeout: 5000 }
        );
        }
    );

});

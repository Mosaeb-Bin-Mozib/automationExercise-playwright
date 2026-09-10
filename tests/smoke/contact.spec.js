import { test,expect } from '../../fixtures/ContactUs.fixture';
import {getContactData, } from '../../test-data/contactData';
import {ROUTES} from "../../test-data/routes";

const contactData = getContactData();

test.describe('Contact Us', () => {
    test('AE-026 - Verify Contact Us page loads successfully', async ({ contactUsPage }) => {
            await contactUsPage.open();
            // Verify all Contact Us page elements
            await contactUsPage.verifyPageDisplayed();

        }
    );
    test('AE-027 - Verify Contact Us form submission with valid information', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.fillContactForm(contactData.name,contactData.email,contactData.subject,contactData.message);
            // Handle confirmation dialog if displayed
            contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();
            await contactUsPage.verifySuccessMessage();
        }
    );
    test('AE-028 - Verify Contact Us form submission with valid file attachment', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.fillContactForm(contactData.name,contactData.email,contactData.subject,contactData.message);
            await contactUsPage.uploadFile(contactData.path);
            await contactUsPage.verifyFileSelected();
            await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();
            await contactUsPage.verifySuccessMessage();
        }
    );
    test('AE-029 - Verify Contact Us form rejects empty Name', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.nameEmpty);
            await contactUsPage.emailField.fill(contactData.email);
            await contactUsPage.subjectField.fill(contactData.subject);
            await contactUsPage.messageField.fill(contactData.message);
            await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();
            await expect(contactUsPage.nameField).toHaveJSProperty('validity.valueMissing', false);
        }
    );
    test('AE-030 - Verify Contact Us form rejects empty Email', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.name);
            await contactUsPage.emailField.fill(contactData.emailEmpty);
            await contactUsPage.subjectField.fill(contactData.subject);
            await contactUsPage.messageField.fill(contactData.message);
            await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();
            await expect(contactUsPage.emailField).toHaveJSProperty('validity.valueMissing', true);

        }
    );
    test('AE-031 - Verify Contact Us form rejects empty Subject', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.name);
            await contactUsPage.emailField.fill(contactData.email);
            await contactUsPage.subjectField.fill(contactData.subjectEmpty);
            await contactUsPage.messageField.fill(contactData.message);
            await expect(contactUsPage.subjectField).toHaveJSProperty('validity.valueMissing', true);
            await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();

        }
    );
    test('AE-032 - Verify Contact Us form rejects empty Message', async ({ contactUsPage }) => {

            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.name);
            await contactUsPage.emailField.fill(contactData.email);
            await contactUsPage.subjectField.fill(contactData.subject);
            await contactUsPage.messageField.fill(contactData.messageEmpty);
            await contactUsPage.submitForm();
            await expect(contactUsPage.messageField).toHaveJSProperty('validity.valueMissing', true);
        }
    );
    test('AE-033 - Verify Contact Us form rejects invalid Email', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.name);
            await contactUsPage.emailField.fill(contactData.emailInvalidFormat);
            await contactUsPage.subjectField.fill(contactData.subject);
            await contactUsPage.messageField.fill(contactData.messageEmpty);
            await contactUsPage.submitForm();
            // Verify browser rejects invalid email format
            await expect(contactUsPage.emailField).toHaveJSProperty('validity.typeMismatch', true);
        }
    );
    test('AE-034 - Verify Contact Us Name field handles boundary-length input', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.longName);
            await expect(contactUsPage.nameField).toHaveValue(contactData.longName);
            await contactUsPage.emailField.fill(contactData.email);
            await contactUsPage.subjectField.fill(contactData.subject);
            await contactUsPage.messageField.fill(contactData.message);
            await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();
            await contactUsPage.verifySuccessMessage();
        }
    );
    test('AE-038 - Verify success confirmation after Contact Us form submission', async ({ contactUsPage }) => {

            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.name);
            await contactUsPage.emailField.fill(contactData.email);
            await contactUsPage.subjectField.fill(contactData.subject);
            await contactUsPage.messageField.fill(contactData.message);
            contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();
            await expect(contactUsPage.page.locator('#contact-page').getByText(contactData.success)).toBeVisible();
        }
    );
    test('AE-039 - Verify user can return to Home after Contact Us submission', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.name);
            await contactUsPage.emailField.fill(contactData.email);
            await contactUsPage.subjectField.fill(contactData.subject );
            await contactUsPage.messageField.fill(contactData.message);
            contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();
            await expect(contactUsPage.page.locator('#contact-page').getByText(contactData.success)).toBeVisible();
            await contactUsPage.page.locator('#contact-page a.btn-success').click();
            await expect(contactUsPage.page).toHaveURL(ROUTES.HOME);
            await expect(contactUsPage.page.getByRole('heading', {name: 'Full-Fledged practice website for Automation Engineers'}).first()).toBeVisible();
        }
    );

    test('AE-041 - Verify Subscription section is available in Contact Us footer', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.page.locator('footer').scrollIntoViewIfNeeded();
            // 3. Verify Subscription is displayed
            await expect(contactUsPage.page.getByText(contactData.subscription, {exact: true})
            ).toBeVisible();
            // 4. Verify email input is displayed
            await expect(contactUsPage.page.locator('#susbscribe_email')).toBeVisible();
            await contactUsPage.page.locator('#susbscribe_email').fill(contactData.email);
            await contactUsPage.page.locator('#subscribe').click();

        }
    );

});

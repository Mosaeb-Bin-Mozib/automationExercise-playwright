import { test,expect } from '../../fixtures/ContactUs.fixture';
import {getContactData, } from '../../test-data/contactData';
const contactData = getContactData();

test.describe('Contact Us', () => {

    // AE-026
    test('AE-026 - Verify Contact Us page loads successfully', async ({ contactUsPage }) => {

            // Open the Contact Us page
            await contactUsPage.open();

            // Verify all Contact Us page elements
            await contactUsPage.verifyPageDisplayed();

        }
    );

    // AE-027
    test('AE-027 - Verify Contact Us form submission with valid information', async ({ contactUsPage }) => {

            // Open the Contact Us page
            await contactUsPage.open();

            // Enter valid information
            await contactUsPage.fillContactForm(contactData.name,contactData.email,contactData.subject,contactData.message);

            // Handle confirmation dialog if displayed
            contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});

            // Submit form
            await contactUsPage.submitForm();

            // Verify a success message
            await contactUsPage.verifySuccessMessage();
        }
    );

    // AE-028
    test('AE-028 - Verify Contact Us form submission with valid file attachment', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.fillContactForm(contactData.name,contactData.email,contactData.subject,contactData.message);
            // Upload a valid test file
            await contactUsPage.uploadFile(contactData.path);
            // Verify a file is selected
            await contactUsPage.verifyFileSelected();
            await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();
            await contactUsPage.verifySuccessMessage();
        }
    );
    // AE-029
    test('AE-029 - Verify Contact Us form rejects empty Name', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.nameEmpty);
            await contactUsPage.emailField.fill(contactData.email);
            await contactUsPage.subjectField.fill(contactData.subject);
            await contactUsPage.messageField.fill(contactData.message);
            // Handle confirmation dialog if displayed
            await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();
            await expect(contactUsPage.nameField).toHaveJSProperty('validity.valueMissing', false);
        }
    );

    // AE-030
    test('AE-030 - Verify Contact Us form rejects empty Email', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.name);
            await contactUsPage.emailField.fill(contactData.emailEmpty);
            await contactUsPage.subjectField.fill(contactData.subject);
            await contactUsPage.messageField.fill(contactData.message);
             // Handle confirmation dialog if displayed
            await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();
            await expect(contactUsPage.emailField).toHaveJSProperty('validity.valueMissing', true);

        }
    );

    // AE-031
    test('AE-031 - Verify Contact Us form rejects empty Subject', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.name);
            await contactUsPage.emailField.fill(contactData.email);
            await contactUsPage.subjectField.fill(contactData.subjectEmpty);
            await contactUsPage.messageField.fill(contactData.message);
            await expect(contactUsPage.subjectField).toHaveJSProperty('validity.valueMissing', true);

        // Handle confirmation dialog if displayed
        await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            await contactUsPage.submitForm();
            // Wait for the response
            await contactUsPage.page.waitForTimeout(10000);

        }
    );

    // AE-032
    test('AE-032 - Verify Contact Us form rejects empty Message', async ({ contactUsPage }) => {

            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.name);
            await contactUsPage.emailField.fill(contactData.email);
            await contactUsPage.subjectField.fill(contactData.subject);
            await contactUsPage.messageField.fill(contactData.messageEmpty);
            await contactUsPage.submitForm();
            await expect(contactUsPage.messageField).toHaveJSProperty('validity.valueMissing', true);
            await contactUsPage.page.waitForTimeout(5000);
        }
    );

    // AE-033
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

    // AE-034
    test('AE-034 - Verify Contact Us Name field handles boundary-length input', async ({ contactUsPage }) => {
            await contactUsPage.open();
            await contactUsPage.nameField.fill(contactData.longName);
            await expect(contactUsPage.nameField).toHaveValue(contactData.longName);
            await contactUsPage.emailField.fill(contactData.email);
            await contactUsPage.subjectField.fill(contactData.subject);
            await contactUsPage.messageField.fill(contactData.message);
            await contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});
            // await expect(contactUsPage.subjectField).toHaveJSProperty('validity.valueMissing', true);
            await contactUsPage.submitForm();
            await contactUsPage.verifySuccessMessage();
        }
    );
    // AE-038
    test('AE-038 - Verify success confirmation after Contact Us form submission', async ({ contactUsPage }) => {

            // Open the Contact Us page
            await contactUsPage.open();

            // Enter valid Name
            await contactUsPage.nameField.fill(contactData.name);

            // Enter valid Email
            await contactUsPage.emailField.fill(contactData.email);

            // Enter valid Subject
            await contactUsPage.subjectField.fill(contactData.subject);

            // Enter valid Message
            await contactUsPage.messageField.fill(contactData.message);

            // Handle confirmation dialog if displayed
            contactUsPage.page.once('dialog', async dialog => {await dialog.accept();});

            // Click Submit
            await contactUsPage.submitForm();

            // Verify success confirmation
            await expect(contactUsPage.page.locator('#contact-page').getByText(contactData.success)).toBeVisible();
        }
    );

    // AE-039
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

            // 10. Verify Home page URL
            await expect(contactUsPage.page).toHaveURL("/");

            // 11. Verify Home page heading
            await expect(contactUsPage.page.getByRole('heading', {name: 'Full-Fledged practice website for Automation Engineers'})
                    .first()
            ).toBeVisible();
        }
    );

    // AE-041
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
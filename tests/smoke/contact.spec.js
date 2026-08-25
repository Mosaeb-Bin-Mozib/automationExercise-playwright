import { test,expect } from '../fixtures/ContactUs.fixture';

test.describe('Contact Us', () => {

    // AE-026
    test('AE-026 - Verify Contact Us page loads successfully', async ({ contactUsPage }) => {

            // Open Contact Us page
            await contactUsPage.open();

            // Verify all Contact Us page elements
            await contactUsPage.verifyPageDisplayed();

        }
    );

    // AE-027
    test('AE-027 - Verify Contact Us form submission with valid information', async ({ contactUsPage }) => {

            // Open Contact Us page
            await contactUsPage.open();

            // Enter valid information
            await contactUsPage.fillContactForm(
                'Mosaeb Bin Mozib',
                'mosaeb009@gmail.com',
                'Test Inquiry',
                'This is a valid test message.'
            );

            // Handle confirmation dialog if displayed
            contactUsPage.page.once('dialog', async dialog => {
                await dialog.accept();
            });

            // Submit form
            await contactUsPage.submitForm();

            // Verify success message
            await contactUsPage.verifySuccessMessage();
        }
    );

    // AE-028
    test('AE-028 - Verify Contact Us form submission with valid file attachment', async ({ contactUsPage }) => {

            // Open Contact Us page
            await contactUsPage.open();

            // Enter valid contact information
            await contactUsPage.fillContactForm(
                'Mosaeb Bin Mozib',
                'mosaeb009@gmail.com',
                'Test Inquiry',
                'This is a valid test message.'
            );

            // Upload valid test file
            await contactUsPage.uploadFile('../test-data/SQA Roadmap.pdf');

            // Verify file is selected
            await contactUsPage.verifyFileSelected();

            // Handle confirmation dialog
            contactUsPage.page.once('dialog', async dialog => {
                await dialog.accept();
            });

            // Submit form
            await contactUsPage.submitForm();

            // Verify success message
            await contactUsPage.verifySuccessMessage();
        }
    );
    // AE-029
    test('AE-029 - Verify Contact Us form rejects empty Name', async ({ contactUsPage }) => {

            // Open Contact Us page
            await contactUsPage.open();

            // Leave Name field empty
            await contactUsPage.nameField.fill('');

            // Enter valid Email
            await contactUsPage.emailField.fill('mosaeb009@gmail.com');

            // Enter valid Subject
            await contactUsPage.subjectField.fill('Test Inquiry');

            // Enter valid Message
            await contactUsPage.messageField.fill('This is a valid test message.');

            // Click Submit
            await contactUsPage.submitForm();

            // Verify Name field is still empty
            await expect(contactUsPage.nameField).toHaveValue('');

            // Verify user remains on Contact Us page
            await expect(contactUsPage.page).toHaveURL(/.*contact_us/);
        }
    );

    // AE-030
    test(
        'AE-030 - Verify Contact Us form rejects empty Email',
        async ({ contactUsPage }) => {

            // Open Contact Us page
            await contactUsPage.open();

            // Enter valid Name
            await contactUsPage.nameField.fill(
                'Mosaeb Bin Mozib'
            );

            // Leave Email empty
            await contactUsPage.emailField.fill('');

            // Enter valid Subject
            await contactUsPage.subjectField.fill(
                'Test Inquiry'
            );

            // Enter valid Message
            await contactUsPage.messageField.fill(
                'This is a valid test message.'
            );

            // Click Submit
            await contactUsPage.submitForm();
            await contactUsPage.page.waitForTimeout(10000);
            // Verify form submission was NOT successful
            await expect(
                contactUsPage.page
                    .locator('#contact-page')
                    .getByText(
                        'Success! Your details have been submitted successfully.'
                    )
            ).not.toBeVisible();

            // Verify user remains on Contact Us page
            await expect(
                contactUsPage.page
            ).toHaveURL(/.*contact_us/);
        }
    );

    // AE-031
    test('AE-031 - Verify Contact Us form rejects empty Subject', async ({ contactUsPage }) => {

            // Open Contact Us page
            await contactUsPage.open();

            // Enter valid Name
            await contactUsPage.nameField.fill('Mosaeb Bin Mozib');

            // Enter valid Email
            await contactUsPage.emailField.fill('mosaeb009@gmail.com');

            // Leave Subject empty
            await contactUsPage.subjectField.fill('');

            // Enter valid Message
            await contactUsPage.messageField.fill('This is a valid test message.');
            // Click Submit
            await contactUsPage.submitForm();

            // Wait for the response
            await contactUsPage.page.waitForTimeout(10000);

            // Verify user remains on Contact Us page
            await expect(contactUsPage.page).toHaveURL(/.*contact_us/);
        }
    );

    // AE-032
    test(
        'AE-032 - Verify Contact Us form rejects empty Message',
        async ({ contactUsPage }) => {

            // 1. Open Contact Us page
            await contactUsPage.open();

            // 2. Enter valid Name
            await contactUsPage.nameField.fill('Mosaeb Bin Mozib');

            // 3. Enter valid Email
            await contactUsPage.emailField.fill('mosaeb009@gmail.com');

            // 4. Enter valid Subject
            await contactUsPage.subjectField.fill('Test Inquiry');

            // 5. Leave Message field empty intentionally

            // 6. Click Submit
            await contactUsPage.submitForm();

            // 7. Wait so you can observe what happens after Submit
            await contactUsPage.page.waitForTimeout(5000);
        }
    );

    // AE-033
    test('AE-033 - Verify Contact Us form rejects invalid Email', async ({ contactUsPage }) => {

            // 1. Open Contact Us page
            await contactUsPage.open();

            // 2. Enter valid Name
            await contactUsPage.nameField.fill('Mosaeb Bin Mozib');

            // 3. Enter invalid Email
            await contactUsPage.emailField.fill('test@.com');

            // 4. Enter valid Subject
            await contactUsPage.subjectField.fill('Test Inquiry');

            // 5. Enter valid Message
            await contactUsPage.messageField.fill('This is a valid test message.');

            // 6. Click Submit
            await contactUsPage.submitForm();

            // 7. Wait so you can observe the validation behavior
            await contactUsPage.page.waitForTimeout(10000);
        }
    );

    // AE-034
    test('AE-034 - Verify Contact Us Name field handles boundary-length input', async ({ contactUsPage }) => {

            // 1. Open Contact Us page
            await contactUsPage.open();

            // 2. Enter minimum reasonable valid Name
            await contactUsPage.nameField.fill('Sakib');

            // 3. Enter valid Email
            await contactUsPage.emailField.fill('mosaeb009@gmail.com');

            // 4. Enter valid Subject
            await contactUsPage.subjectField.fill('Test Inquiry');

            // 5. Enter valid Message
            await contactUsPage.messageField.fill('This is a valid test message.');

            // 6. Verify short Name remains in the field
            await expect(contactUsPage.nameField).toHaveValue('Sakib');

            // 7. Submit the form
            await contactUsPage.submitForm();

            // 8. Wait so you can observe the result
            await contactUsPage.page.waitForTimeout(3000);

            // 9. Open Contact Us page again for the long-name test
            await contactUsPage.open();

            // 10. Enter a long but reasonable Name
            const longName = 'Mosaeb Bin Mozib Test User Contact Form dummy to the pillar object to the map';

            await contactUsPage.nameField.fill(longName);

            // 11. Verify long Name remains in the field
            await expect(contactUsPage.nameField).toHaveValue(longName);

            // 12. Enter valid Email
            await contactUsPage.emailField.fill('mosaeb009@gmail.com');

            // 13. Enter valid Subject
            await contactUsPage.subjectField.fill('Test Inquiry');

            // 14. Enter valid Message
            await contactUsPage.messageField.fill('This is a valid test message.');

            // 15. Submit the form
            await contactUsPage.submitForm();

            // 16. Wait so you can observe the result
            await contactUsPage.page.waitForTimeout(3000);
        }
    );
    // AE-038
    test(
        'AE-038 - Verify success confirmation after Contact Us form submission',
        async ({ contactUsPage }) => {

            // Open Contact Us page
            await contactUsPage.open();

            // Enter valid Name
            await contactUsPage.nameField.fill(
                'Mosaeb Bin Mozib'
            );

            // Enter valid Email
            await contactUsPage.emailField.fill(
                'mosaeb009@gmail.com'
            );

            // Enter valid Subject
            await contactUsPage.subjectField.fill(
                'Test Inquiry'
            );

            // Enter valid Message
            await contactUsPage.messageField.fill(
                'This is a valid test message.'
            );

            // Handle confirmation dialog if displayed
            contactUsPage.page.once('dialog', async dialog => {
                await dialog.accept();
            });

            // Click Submit
            await contactUsPage.submitForm();

            // Verify success confirmation
            await expect(
                contactUsPage.page
                    .locator('#contact-page')
                    .getByText(
                        'Success! Your details have been submitted successfully.'
                    )
            ).toBeVisible();

            // Wait so you can see the success message
            await contactUsPage.page.waitForTimeout(5000);
        }
    );

    // AE-039
    test(
        'AE-039 - Verify user can return to Home after Contact Us submission',
        async ({ contactUsPage }) => {

            // 1. Open Contact Us page
            await contactUsPage.open();

            // 2. Enter valid Name
            await contactUsPage.nameField.fill(
                'Mosaeb Bin Mozib'
            );

            // 3. Enter valid Email
            await contactUsPage.emailField.fill(
                'mosaeb009@gmail.com'
            );

            // 4. Enter valid Subject
            await contactUsPage.subjectField.fill(
                'Test Inquiry'
            );

            // 5. Enter valid Message
            await contactUsPage.messageField.fill(
                'This is a valid test message.'
            );

            // 6. Handle confirmation dialog if displayed
            contactUsPage.page.once('dialog', async dialog => {
                await dialog.accept();
            });

            // 7. Submit Contact Us form
            await contactUsPage.submitForm();

            // 8. Verify success message
            await expect(
                contactUsPage.page
                    .locator('#contact-page')
                    .getByText(
                        'Success! Your details have been submitted successfully.'
                    )
            ).toBeVisible();

            // 9. Click Home button from the success page
            await contactUsPage.page
                .locator('#contact-page a.btn-success')
                .click();

            // 10. Verify Home page URL
            await expect(
                contactUsPage.page
            ).toHaveURL(/.*automationexercise\.com\/?$/);

            // 11. Verify Home page heading
            await expect(
                contactUsPage.page
                    .getByRole('heading', {
                        name: 'Full-Fledged practice website for Automation Engineers'
                    })
                    .first()
            ).toBeVisible();
        }
    );

    // AE-041
    test(
        'AE-041 - Verify Subscription section is available in Contact Us footer',
        async ({ contactUsPage }) => {

            // 1. Open Contact Us page
            await contactUsPage.open();

            // 2. Scroll to the bottom of the page
            await contactUsPage.page
                .locator('footer')
                .scrollIntoViewIfNeeded();

            // 3. Verify Subscription is displayed
            await expect(
                contactUsPage.page.getByText('Subscription', {
                    exact: true
                })
            ).toBeVisible();

            // 4. Verify email input is displayed
            await expect(
                contactUsPage.page.locator('#susbscribe_email')
            ).toBeVisible();

            // 5. Enter valid email
            await contactUsPage.page
                .locator('#susbscribe_email')
                .fill('mosaeb009@gmail.com');

            // 6. Click subscription button
            await contactUsPage.page
                .locator('#subscribe')
                .click();

            // 7. Wait so you can see what happens
            await contactUsPage.page.waitForTimeout(5000);
        }
    );

});
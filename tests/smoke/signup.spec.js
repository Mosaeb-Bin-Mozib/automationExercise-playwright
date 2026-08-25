import { test, expect } from '../fixtures/test.fixture.js';
import { AccountInformationPage } from '../pages/AccountInformationPage.js';

test.describe('New User Signup', () => {

    // AE-001
    test('AE-001 - Verify New User Signup page is displayed correctly', async ({ signupPage }) => {
            await signupPage.verifySignupPage();
        }
    );

    // AE-002
    test('AE-002 - Verify user can signup with valid information', async ({ signupPage }) => {

            const name = 'Mosaeb Bin Mozib';
            const email = `mosaeb_${Date.now()}@gmail.com`;

            await signupPage.enterName(name);
            await signupPage.enterEmail(email);

            await expect(signupPage.nameField).toHaveValue(name);

            await expect(signupPage.emailField).toHaveValue(email);

            await signupPage.clickSignup();

            await expect(signupPage.accountInformationHeading).toBeVisible();
        }
    );


    // AE-003
    test('AE-003 - Verify user cannot signup with empty fields',
        async ({ signupPage }) => {

            await expect(signupPage.nameField).toHaveValue('');

            await expect(signupPage.emailField).toHaveValue('');

            await signupPage.clickSignup();

            await expect(signupPage.signupHeading).toBeVisible();

            await expect(signupPage.page).toHaveURL(/.*login/);
        }
    );


    // AE-004
    test('AE-004 - Verify application rejects invalid email format',
        async ({ signupPage }) => {

            const name = 'Mosaeb Bin Mozib';
            const invalidEmail = 'example.com';

            await signupPage.enterName(name);
            await signupPage.enterEmail(invalidEmail);

            await expect(signupPage.emailField).toHaveValue(invalidEmail);

            await signupPage.clickSignup();

            await expect(signupPage.accountInformationHeading).not.toBeVisible();

            await expect(signupPage.emailField).toHaveJSProperty('validity.valid', false);
        }
    );

    //AE-005
    test(
        'AE-005 - Verify user cannot signup with an already registered email',
        async ({ signupPage }) => {
            const name = 'Mosaeb Bin Mozib';
            const registeredEmail = 'mosaeb598@gmail.com';

            // Enter valid name
            await signupPage.enterName(name);

            // Enter already registered email
            await signupPage.enterEmail(registeredEmail);

            // Verify entered values
            await expect(signupPage.nameField).toHaveValue(name);

            await expect(signupPage.emailField).toHaveValue(registeredEmail);

            // Click Signup
            await signupPage.clickSignup();

            // Verify duplicate email error message
            await expect(signupPage.existingEmailMessage).toBeVisible();

            // Verify the user does not proceed to Account Information
            await expect(signupPage.accountInformationHeading).not.toBeVisible();
        }
    );

    //AE-006
    test(
        'AE-006 - Verify Account Information and Address Information sections',
        async ({ accountInformationPage }) => {

            // Verify an Account Information section
            await accountInformationPage
                .verifyAccountInformationSection();

            // Scroll to an Address Information section
            await accountInformationPage.addressField.scrollIntoViewIfNeeded();

            // Verify an Address Information section
            await accountInformationPage.verifyAddressInformationSection();
        }
    );

    // AE-007
    test(
        'AE-007 - Verify valid Account Information can be entered successfully', async ({accountInformationPages, signupTestData}) => {

            // Select Mr.
            await accountInformationPages.selectMrTitle();

            // Enter valid password
            await accountInformationPages.enterPassword(
                signupTestData.password
            );

            // Verify Name, Email, Password and masked password
            await accountInformationPages.verifyAccountInformation(
                signupTestData.name,
                signupTestData.email,
                signupTestData.password
            );
        }
    );

});
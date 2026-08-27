import { test, expect } from '../../fixtures/test.fixture.js';
import {getSignupData, invalidNumberSignupData} from '../../test-data/signupData';
import { AccountInformationPage } from '../../pages/AccountInformationPage.js';

const signupData = getSignupData();

test.describe('New User Signup', () => {

    // AE-001
    test('AE-001 - Verify New User Signup page is displayed correctly', async ({ signupPage }) => {
            await signupPage.verifySignupPage();
        }
    );

    // AE-002
    test('AE-002 - Verify user can signup with valid information', async ({ signupPage }) => {

        await signupPage.enterName(signupData.name);
        await signupPage.enterEmail(signupData.email);

        await expect(signupPage.nameField).toHaveValue(signupData.name);
        await expect(signupPage.emailField).toHaveValue(signupData.email);

        await signupPage.clickSignup();

        await expect(signupPage.accountInformationHeading).toBeVisible();
    });


    // AE-003
    test('AE-003 - Verify user cannot signup with empty fields',
        async ({ signupPage }) => {

            await expect(signupPage.nameField).toHaveValue('');

            await expect(signupPage.emailField).toHaveValue('');

            await signupPage.clickSignup();

            await expect(signupPage.nameField).toHaveJSProperty('validity.valueMissing', true);
            await expect(signupPage.emailField).toHaveJSProperty('validity.valueMissing', true);
        }
    );


    // AE-004
    test('AE-004 - Verify application rejects invalid email format',
        async ({ signupPage }) => {

            await signupPage.enterName(signupData.name);
            await signupPage.enterEmail(signupData.invalidEmail);

            await expect(signupPage.emailField).toHaveValue(signupData.invalidEmail);

            await signupPage.clickSignup();

            await expect(signupPage.accountInformationHeading).not.toBeVisible();

            await expect(signupPage.emailField).toHaveJSProperty('validity.typeMismatch', true);
        }
    );

    //AE-005
    test('AE-005 - Verify user cannot signup with an already registered email',
        async ({ signupPage }) => {

            // Enter valid name
            await signupPage.enterName(signupData.name);

            // Enter already registered email
            await signupPage.enterEmail(signupData.registeredEmail);

            // Click Signup
            await signupPage.clickSignup();

            // Verify duplicate email error message
            await expect(signupPage.errorMessages).toBeVisible();

            // Verify the user does not proceed to Account Information
            await expect(signupPage.accountInformationHeading).not.toBeVisible();
        }
    );

    //AE-006
    test('AE-006 - Verify Account Information and Address Information sections', async ({ accountInformationPage }) => {

            // Verify an Account Information section
            await accountInformationPage.verifyAccountInformationSection();

            // Scroll to an Address Information section
            await accountInformationPage.addressField.scrollIntoViewIfNeeded();

            // Verify an Address Information section
            await accountInformationPage.verifyAddressInformationSection();
        }
    );

    // AE-007
    test('AE-007 - Verify valid Account Information can be entered successfully', async ({accountInformationPages, signupTestData}) => {
            await signupPage.enterName(invalidNumberSignupData.name);
            await signupPage.enterEmail(invalidNumberSignupData.email);

            await signupPage.clickSignup();

            await signupPage.selectGender(invalidNumberSignupData.title);
            await signupPage.enterPassword(invalidNumberSignupData.password);
            await signupPage.enterFirstName(invalidNumberSignupData.firstName);
            await signupPage.enterLastName(invalidNumberSignupData.lastName);
            await signupPage.enterCompanyName(invalidNumberSignupData.company);
            await signupPage.addressOne(invalidNumberSignupData.address);
            await signupPage.addressTwo(invalidNumberSignupData.address2);
            await signupPage.State(invalidNumberSignupData.state);
            await signupPage.City(invalidNumberSignupData.city);


            await signupPage.enterPassword(invalidNumberSignupData.title);
            await signupPage.enterPassword(invalidNumberSignupData.title);
            await signupPage.enterPassword(invalidNumberSignupData.title);

        }
    );

    test('AE-008 - Verify that valid Address Information can be entered successfully.', async ({accountInformationPages, signupTestData}) => {


        await signupPage.enterName(nameOne);
        await signupPage.enterEmail(email);
        await signupPage.clickSignup();

        }
    );

});
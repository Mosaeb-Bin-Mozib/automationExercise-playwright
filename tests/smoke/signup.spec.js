import { test, expect } from '../../fixtures/test.fixture.js';
import {getSignupData, } from '../../test-data/signupData';

const signupData = getSignupData();

test.describe('New User Signup', () => {
    test('AE-001 - Verify New User Signup page is displayed correctly', async ({ signupPage }) => {
            await signupPage.verifySignupPage();
        }
    );

    test('AE-002 - Verify user can signup with valid information', async ({ signupPage }) => {

        await signupPage.enterName(signupData.name);
        await signupPage.enterEmail(signupData.email);
        await expect(signupPage.nameField).toHaveValue(signupData.name);
        await expect(signupPage.emailField).toHaveValue(signupData.email);
        await signupPage.clickSignup();
        await expect(signupPage.accountInformationHeading).toBeVisible();
    });
    test('AE-003 - Verify user cannot signup with empty fields', async ({ signupPage }) => {
            await expect(signupPage.nameField).toHaveValue('');
            await expect(signupPage.emailField).toHaveValue('');
            await signupPage.clickSignup();
            await expect(signupPage.nameField).toHaveJSProperty('validity.valueMissing', true);
            await expect(signupPage.emailField).toHaveJSProperty('validity.valueMissing', true);
        }
    );

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

    test('AE-005 - Verify user cannot signup with an already registered email', async ({ signupPage }) => {

            await signupPage.enterName(signupData.name);
            await signupPage.enterEmail(signupData.registeredEmail);
            await signupPage.clickSignup();
            await expect(signupPage.errorMessages).toBeVisible();
            await expect(signupPage.accountInformationHeading).not.toBeVisible();
        }
    );

    test('AE-006 - Verify Account Information and Address Information sections', async ({ accountInformationPage }) => {

            await accountInformationPage.verifyAccountInformationSection();
            await accountInformationPage.addressField.scrollIntoViewIfNeeded();
            await accountInformationPage.verifyAddressInformationSection();
        }
    );

    test('AE-007 - Verify valid Account Information can be entered successfully', async ({accountInformationPage, signupTestData}) => {

        await accountInformationPage.selectGender(signupTestData.title);
        await accountInformationPage.enterPassword(signupTestData.password);
        await accountInformationPage.selectDateOfBirth(signupTestData.dateOfBirth);
        await accountInformationPage.enterFirstName(signupTestData.firstName);
        await accountInformationPage.enterLastName(signupTestData.lastName);
        await accountInformationPage.enterCompanyName(signupTestData.company);
        await accountInformationPage.addressOne(signupTestData.address);
        await accountInformationPage.addressTwo(signupTestData.address2);
        await accountInformationPage.selectCountry(signupTestData.country);
        await accountInformationPage.State(signupTestData.state);
        await accountInformationPage.City(signupTestData.city);
        await accountInformationPage.zipCode(signupTestData.zip);
        await accountInformationPage.mobileNumber(signupTestData.phone);
    });

    test('AE-008 - Verify that valid Address Information can be entered successfully.', async ({accountInformationPages, signupTestData}) => {
        await signupPage.enterName(nameOne);
        await signupPage.enterEmail(email);
        await signupPage.clickSignup();

        }
    );

});

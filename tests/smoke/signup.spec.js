import { test, expect } from '../../fixtures/test.fixture.js';
import {getSignupData, } from '../../test-data/signupData';
const signupData = getSignupData();

test.describe('New User Signup', () => {
    test('AE-001 - Verify New User Signup page is displayed correctly', async ({ signupPage }) => {
            await expect(signupPage.signupHeading).toBeVisible();
            await expect(signupPage.nameField).toBeVisible();
            await expect(signupPage.nameField).toBeEnabled();
            await expect(signupPage.emailField).toBeVisible();
            await expect(signupPage.emailField).toBeEnabled();
            await expect(signupPage.signupButton).toBeVisible();
            await expect(signupPage.signupButton).toBeEnabled();
        }
    );

    test('AE-002 - Verify user can signup with valid information', async ({ signupPage }) => {

        await signupPage.enterName(signupData.name);
        await signupPage.enterEmail(signupData.email);
        await expect(signupPage.nameField).toHaveValue(signupData.name);
        await expect(signupPage.emailField).toHaveValue(signupData.email);
        await signupPage.signupButton.click();
        await expect(signupPage.accountInformationHeading).toBeVisible();
    });
    
    test('AE-003 - Verify user cannot signup with empty fields', async ({ signupPage }) => {
            await expect(signupPage.nameField).toHaveValue('');
            await expect(signupPage.emailField).toHaveValue('');
            await signupPage.signupButton.click();
            await expect(signupPage.nameField).toHaveJSProperty('validity.valueMissing', true);
            await expect(signupPage.emailField).toHaveJSProperty('validity.valueMissing', true);
        }
    );

    test('AE-004 - Verify application rejects invalid email format',
        async ({ signupPage }) => {

            await signupPage.enterName(signupData.name);
            await signupPage.enterEmail(signupData.invalidEmail);
            await expect(signupPage.emailField).toHaveValue(signupData.invalidEmail);
            await signupPage.signupButton.click();
            await expect(signupPage.accountInformationHeading).not.toBeVisible();
            await expect(signupPage.emailField).toHaveJSProperty('validity.typeMismatch', true);
        }
    );

    test('AE-005 - Verify user cannot signup with an already registered email', async ({ signupPage }) => {

            await signupPage.enterName(signupData.name);
            await signupPage.enterEmail(signupData.registeredEmail);
            await signupPage.signupButton.click();
            await expect(signupPage.errorMessages).toBeVisible();
            await expect(signupPage.accountInformationHeading).not.toBeVisible();
        }
    );

    test('AE-006 - Verify Account Information and Address Information sections', async ({ accountInformationPage }) => {

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
            await accountInformationPage.addressField.scrollIntoViewIfNeeded();

            await expect(accountInformationPage.addressInformationHeading).toBeVisible();
            await expect(accountInformationPage.firstNameField).toBeVisible();
            await expect(accountInformationPage.lastNameField).toBeVisible();
            await expect(accountInformationPage.companyField).toBeVisible();
            await expect(accountInformationPage.addressField).toBeVisible();
            await expect(accountInformationPage.address2Field).toBeVisible();
            await expect(accountInformationPage.countryDropdown).toBeVisible();
            await expect(accountInformationPage.stateField).toBeVisible();
            await expect(accountInformationPage.cityField).toBeVisible();
            await expect(accountInformationPage.zipcodeField).toBeVisible();
            await expect(accountInformationPage.mobileNumberField).toBeVisible();
            await expect(accountInformationPage.createAccountButton).toBeVisible();
            await expect(accountInformationPage.createAccountButton).toBeEnabled();
        }
    );

    test('AE-007 - Verify valid Account Information can be entered successfully', async ({accountInformationPage, signupTestData}) => {

        await accountInformationPage.selectGender(signupTestData.title);
        await accountInformationPage.passwordField.fill(signupTestData.password);
        await accountInformationPage.dayDropdown.selectOption(getSignupData.dateOfBirth.day);
        await accountInformationPage.monthDropdown.selectOption({ label: getSignupData.dateOfBirth.month });
        await accountInformationPage.yearDropdown.selectOption(getSignupData.dateOfBirth.year);
        await accountInformationPage.firstNameField.fill(signupTestData.firstName);
        await accountInformationPage.lastNameField.fill(signupTestData.lastName);
        await accountInformationPage.companyField.fill(signupTestData.company);
        await accountInformationPage.addressField.fill(signupTestData.address);
        await accountInformationPage.address2Field.fill(signupTestData.address2);
        await accountInformationPage.countryDropdown.selectOption(signupTestData.country);
        await accountInformationPage.stateField.fill(signupTestData.state);
        await accountInformationPage.cityField.fill(signupTestData.city);
        await accountInformationPage.zipcodeField.fill(signupTestData.zip);
        await accountInformationPage.mobileNumberField.fill(signupTestData.phone);
    });

    test('AE-008 - Verify that valid Address Information can be entered successfully.', async ({accountInformationPages,signupPage, signupTestData}) => {
        await signupPage.nameField.fill(signupData.name);
        await signupPage.emailField.fill(signupData.email);
        await signupPage.signupButton.click();

        }
    );

});

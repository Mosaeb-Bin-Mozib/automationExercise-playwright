import {test, expect} from '../../fixtures/login.fixture';
import {getCheckoutData} from '../../test-data/checkoutData';
const checkoutData = getCheckoutData();
const uniqueEmail = `mozib_${Date.now()}@example.com`;
test('E2E-002 - Verify an existing customer can successfully complete a purchase', async ({loginPage, signupPage, accountInformationPage}) => {
        await signupPage.open();
        await signupPage.signupLoginLink.click();
        await signupPage.signupHeading.waitFor({state: 'visible'});
        await expect(signupPage.signupHeading).toBeVisible();
        await expect(signupPage.nameField).toBeVisible();
        await expect(signupPage.nameField).toBeEnabled();
        await expect(signupPage.emailField).toBeVisible();
        await expect(signupPage.emailField).toBeEnabled();
        await expect(signupPage.signupButton).toBeVisible();
        await expect(signupPage.signupButton).toBeEnabled();
        await signupPage.enterName(`${checkoutData.firstName} ${checkoutData.lastName}`);
        await signupPage.enterEmail(uniqueEmail);
        await signupPage.clickSignup();
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
        await accountInformationPage.titleMr.check();
    
        await accountInformationPage.passwordField.fill(process.env.TEST_PASSWORD);
    
        await accountInformationPage.dayDropdown.selectOption(checkoutData.day);
    
        await accountInformationPage.monthDropdown.selectOption({label: checkoutData.month});
    
        await accountInformationPage.yearDropdown.selectOption(checkoutData.year);
        await accountInformationPage.firstNameField.fill(checkoutData.firstName);
        await accountInformationPage.lastNameField.fill(checkoutData.lastName);
        await accountInformationPage.companyField.fill(checkoutData.company);
        await accountInformationPage.addressField.fill(checkoutData.address);
        await accountInformationPage.address2Field.fill(checkoutData.address2);
        await accountInformationPage.countryDropdown.selectOption({label: checkoutData.country});
        await accountInformationPage.stateField.fill(checkoutData.state);
        await accountInformationPage.cityField.fill(checkoutData.city);
        await accountInformationPage.zipcodeField.fill(checkoutData.zipcode);
        await accountInformationPage.mobileNumberField.fill(checkoutData.mobile);

        await accountInformationPage.clickCreateAccount();
        await expect(accountInformationPage.page.getByText('Account Created!')).toBeVisible();
        await accountInformationPage.page.getByRole('link', {name: 'Continue'}).click();
        await expect(loginPage.loggedInAs).toContainText(`Logged in as ${checkoutData.firstName} ${checkoutData.lastName}`);

        await expect(loginPage.logoutLink).toBeVisible();
    }
);

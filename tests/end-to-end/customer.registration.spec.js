import { test, expect } from '../../fixtures/login.fixture';
import {getCheckoutData} from '../../test-data/checkoutData';
const checkoutData = getCheckoutData();
import dotenv from 'dotenv';
import {assertAddressInformation, assertSignUpUser} from "../smoke/assertions/signup.assertion";
dotenv.config();
const uniqueEmail = `mozib_${Date.now()}@example.com`;

test('E2E-001 - Customer can successfully create an account', async ({loginPage, signupPage, accountInformationPage}) => {

                    await signupPage.open();
                    await signupPage.signupLoginLink.click();
                    await signupPage.signupHeading.waitFor({state: 'visible'});
                    await assertSignUpUser(signupPage);
                    await signupPage.nameField.fill(process.env.TEST_USERNAME);
                    await signupPage.emailField.fill(uniqueEmail);
                    await signupPage.signupButton.click();
                    await assertAddressInformation(accountInformationPage);
                    await accountInformationPage.titleMr.check();
                    await accountInformationPage.passwordField.fill(process.env.TEST_PASSWORD);
                    await accountInformationPage.dayDropdown.selectOption(checkoutData.day);
                    await accountInformationPage.monthDropdown.selectOption({label: checkoutData.month});
                    await accountInformationPage.yearDropdown.selectOption(checkoutData.year);
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
                    await expect(loginPage.loggedInAs).toContainText(`Logged in as ${process.env.TEST_USERNAME}`);
                    await expect(loginPage.logoutLink).toBeVisible();
    }
);

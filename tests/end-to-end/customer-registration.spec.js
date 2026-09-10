import { test, expect } from '../../fixtures/login.fixture';

test('E2E-001 - Customer can successfully create an account', async ({loginPage, signupPage, accountInformationPage, userAccountApi}) => {

            const name = 'Automation User';
            const email = `automation_${Date.now()}@example.com`;
            const password = '1234';
            try {
                    await signupPage.open();
                    await signupPage.navigateToSignup();
                    await signupPage.verifySignupPage();
                    await signupPage.enterName(name);
                    await signupPage.enterEmail(email);
                    await signupPage.clickSignup();
                    await accountInformationPage.verifyAccountInformationSection();
                    await accountInformationPage.fillAccountInformation(password);
                    await accountInformationPage.fillAddressInformation({
                            firstName: 'Automation',
                            lastName: 'Tester',
                            company: 'Automation Company',
                            address: '123 Automation Street',
                            address2: 'Test Area',
                            country: 'India',
                            state: 'Dhaka',
                            city: 'Dhaka',
                            zipcode: '1207',
                            mobile: '01700000000'
                    });

                    await accountInformationPage.clickCreateAccount();
                    await accountInformationPage.verifyAccountCreated();
                    await accountInformationPage.clickContinue();
                    await loginPage.verifyLoggedInUser(name);
                    await expect(loginPage.logoutLink).toBeVisible();
            }
            finally {
                 await userAccountApi.deleteAccount(email, password);
            }
    }
);

import {test, expect} from '../../fixtures/login.fixture';


test('E2E-001 - Customer can successfully create an account', async ({loginPage, signupPage, accountInformationPage}) => {

        const name = 'Automation User';

        const email = `automation_${Date.now()}@example.com`;

        const password = '1234';


        // 1. Open website
        await signupPage.open();


        // 2. Go to Signup/Login
        await signupPage.navigateToSignup();


        // 3. Verify Signup page
        await signupPage.verifySignupPage();


        // 4. Enter a name and unique email
        await signupPage.enterName(name);

        await signupPage.enterEmail(email);


        // 5. Click Signup
        await signupPage.clickSignup();


        // 6. Verify Account Information
        await accountInformationPage.verifyAccountInformationSection();


        // 7. Fill Account Information
        await accountInformationPage.fillAccountInformation(password);


        // 8. Fill Address Information
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


        // 9. Create Account
        await accountInformationPage.clickCreateAccount();


        // 10. Verify Account Created
        await accountInformationPage.verifyAccountCreated();


        // 11. Continue
        await accountInformationPage.clickContinue();


        // 12. Verify logged-in user
        await loginPage.verifyLoggedInUser(name);


        // 13. Verify Logout
        await expect(loginPage.logoutLink).toBeVisible();
    }
);
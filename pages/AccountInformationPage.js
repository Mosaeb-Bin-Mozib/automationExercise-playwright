export class AccountInformationPage {

    constructor(page) {
        this.page = page;
        this.accountInformationHeading = page.getByText('ENTER ACCOUNT INFORMATION');
        this.titleMr = page.locator('#id_gender1');
        this.titleMrs = page.locator('#id_gender2');
        this.nameField = page.locator('#name');
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#password');
        this.dayDropdown = page.locator('#days');
        this.monthDropdown = page.locator('#months');
        this.yearDropdown = page.locator('#years');
        this.newsletterCheckbox = page.locator('#newsletter');
        this.specialOffersCheckbox = page.locator('#optin');
        this.firstNameField = page.locator('#first_name');
        this.lastNameField = page.locator('#last_name');
        this.companyField = page.locator('#company');
        this.addressField = page.locator('#address1');
        this.address2Field = page.locator('#address2');
        this.countryDropdown = page.locator('#country');
        this.stateField = page.locator('#state');
        this.cityField = page.locator('#city');
        this.zipcodeField = page.locator('#zipcode');
        this.mobileNumberField = page.locator('#mobile_number');
        this.addressInformationHeading = page.getByText('ADDRESS INFORMATION');
        this.address2Field = page.locator('#address2');
        this.stateField = page.locator('#state');
        this.cityField = page.locator('#city');
        this.createAccountButton = page.getByRole('button', {name: 'Create Account'});

    }

    async selectGender(gender) {
        if (gender === 'Mr.')
        {
            await this.titleMr.check();
        }
        else
        {
            await this.titleMrs.check();
        }
    }
    async enterPassword(password) {
        await this.passwordField.fill(password);
    }

    async clickCreateAccount() {

        await this.createAccountButton.click();
    }
}

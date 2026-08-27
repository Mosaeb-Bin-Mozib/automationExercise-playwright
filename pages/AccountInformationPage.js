import { expect } from '@playwright/test';

export class AccountInformationPage {

    constructor(page) {
        this.page = page;

        // ==============================
        // ACCOUNT INFORMATION
        // ==============================

        this.accountInformationHeading = page.getByText(
            'ENTER ACCOUNT INFORMATION'
        );

        // Title
        this.titleMr = page.locator('#id_gender1');
        this.titleMrs = page.locator('#id_gender2');

        // Name & Email
        this.nameField = page.locator('#name');
        this.emailField = page.locator('#email');

        // Password
        this.passwordField = page.locator('#password');

        // Date of Birth
        this.dayDropdown = page.locator('#days');
        this.monthDropdown = page.locator('#months');
        this.yearDropdown = page.locator('#years');

        // Checkboxes
        this.newsletterCheckbox = page.locator('#newsletter');
        this.specialOffersCheckbox = page.locator('#optin');

        // ==============================
        // ADDRESS INFORMATION
        // ==============================

        this.addressInformationHeading = page.getByText(
            'ADDRESS INFORMATION'
        );

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

        // ==========================================
        // ADDRESS INFORMATION
        // ==========================================

        this.addressInformationHeading = page.getByText('ADDRESS INFORMATION');

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

        // Create Account
        this.createAccountButton = page.getByRole('button', {
            name: 'Create Account'
        });

    }

    // ==========================================
    // AE-006
    // ==========================================

    async verifyAccountInformationSection() {

        await expect(this.accountInformationHeading).toBeVisible();

        // Title
        await expect(this.titleMr).toBeVisible();
        await expect(this.titleMrs).toBeVisible();

        // Name
        await expect(this.nameField).toBeVisible();

        // Email
        await expect(this.emailField).toBeVisible();

        // Password
        await expect(this.passwordField).toBeVisible();

        // Date of Birth
        await expect(this.dayDropdown).toBeVisible();
        await expect(this.monthDropdown).toBeVisible();
        await expect(this.yearDropdown).toBeVisible();

        // Newsletter
        await expect(this.newsletterCheckbox).toBeVisible();

        // Special Offers
        await expect(this.specialOffersCheckbox).toBeVisible();
    }

    async verifyAddressInformationSection() {

        await expect(this.addressInformationHeading).toBeVisible();

        await expect(this.firstNameField).toBeVisible();
        await expect(this.lastNameField).toBeVisible();
        await expect(this.companyField).toBeVisible();

        await expect(this.addressField).toBeVisible();
        await expect(this.address2Field).toBeVisible();

        await expect(this.countryDropdown).toBeVisible();

        await expect(this.stateField).toBeVisible();
        await expect(this.cityField).toBeVisible();
        await expect(this.zipcodeField).toBeVisible();
        await expect(this.mobileNumberField).toBeVisible();

        await expect(this.createAccountButton).toBeVisible();
        await expect(this.createAccountButton).toBeEnabled();
    }

    // ==========================================
    // AE-007
    // ==========================================

    async selectGender(gender) {
        await this.titleMr(gender).check();
    }

    async enterPassword(password) {
        await this.passwordField.fill(password);
    }

    async enterFirstName(firstName) {
        await this.firstNameField.fill(firstName);
    }

    async enterLastName(lastName) {
        await this.lastNameField.fill(lastName);
    }
    async enterCompanyName(companyName) {
        await this.companyField.fill(companyName);
    }
    async addressOne(addressOne) {
        await this.addressField.fill(addressOne);
    }
    async addressTwo(addressTwo) {
        await this.addressField.fill(addressTwo);
    }

    async State(state) {
        await this.addressField.fill(state);
    }

    async City(city) {
        await this.addressField.fill(city);
    }

    async verifyName(name) {
        await expect(this.nameField).toHaveValue(name);
    }

    async verifyEmail(email) {
        await expect(this.emailField).toHaveValue(email);
    }

    async verifyPassword(password) {
        await expect(this.passwordField).toHaveValue(password);
    }

    async verifyPasswordIsMasked() {
        await expect(this.passwordField).toHaveAttribute('type', 'password');
    }

    async verifyAccountInformation(name, email, password) {

        await this.verifyName(name);

        await this.verifyEmail(email);

        await this.verifyPassword(password);

        await this.verifyPasswordIsMasked();

        await expect(this.titleMr).toBeChecked();
    }

    // ==========================================
    // AE-008
    // VERIFY ADDRESS INFORMATION
    // ==========================================

    async verifyAddressInformation(addressData) {

        await expect(this.firstNameField).toHaveValue(addressData.firstName);

        await expect(this.lastNameField).toHaveValue(addressData.lastName);

        await expect(this.addressField).toHaveValue(addressData.address);

        await expect(this.countryDropdown).toHaveValue(addressData.countryValue);

        await expect(this.stateField).toHaveValue(addressData.state);

        await expect(this.cityField).toHaveValue(addressData.city);

        await expect(this.zipcodeField).toHaveValue(addressData.zipcode);

        await expect(this.mobileNumberField).toHaveValue(addressData.mobile);
    }

    // ==========================================
// E2E-001 - FILL ACCOUNT INFORMATION
// ==========================================

    async fillAccountInformation(password) {

        await this.titleMr.check();

        await this.passwordField.fill(password);

        await this.dayDropdown.selectOption('10');

        await this.monthDropdown.selectOption({label: 'January'});

        await this.yearDropdown.selectOption('1995');
    }


// ==========================================
// E2E-001 - FILL ADDRESS INFORMATION
// ==========================================

    async fillAddressInformation(addressData) {

        await this.firstNameField.fill(addressData.firstName);

        await this.lastNameField.fill(addressData.lastName);

        await this.companyField.fill(addressData.company);

        await this.addressField.fill(addressData.address);

        await this.address2Field.fill(addressData.address2);

        await this.countryDropdown.selectOption({label: addressData.country});

        await this.stateField.fill(addressData.state);

        await this.cityField.fill(addressData.city);

        await this.zipcodeField.fill(addressData.zipcode);

        await this.mobileNumberField.fill(addressData.mobile);
    }


// ==========================================
// E2E-001 - CREATE ACCOUNT
// ==========================================

    async clickCreateAccount() {

        await this.createAccountButton.click();
    }


// ==========================================
// E2E-001 - ACCOUNT CREATED
// ==========================================

    async verifyAccountCreated() {

        await expect(this.page.getByText('Account Created!')).toBeVisible();
    }


// ==========================================
// E2E-001 - CONTINUE
// ==========================================

    async clickContinue() {

        await this.page.getByRole('link', {name: 'Continue'}).click();
    }
}
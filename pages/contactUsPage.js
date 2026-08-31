import { expect } from '@playwright/test';

export class ContactUsPage {

    constructor(page) {
        this.page = page;
        // Contact Us heading
        this.contactUsHeading = page.getByRole('heading', {name: 'Contact Us'});

        // Get In Touch section
        this.getInTouch = page.getByText('Get In Touch', {exact: true});

        // Name field
        this.nameField = page.getByPlaceholder('Name');

        // Email field
        this.emailField = page.getByPlaceholder('Email', {exact: true});

        // Subject field
        this.subjectField = page.getByPlaceholder('Subject');

        // Message field
        this.messageField = page.getByPlaceholder('Your Message Here');

        // File upload field
        this.fileUpload = page.locator('input[type="file"]');

        // Submit button
        this.submitButton = page.getByRole('button', {name: 'Submit'});
    }

    // Open the Contact Us page
    async open() {
        await this.page.goto('/');
        await this.page.goto("/contact_us");
    }

    // Verify Contact Us page is displayed
    async verifyPageDisplayed() {

        // Verify URL
        await expect(this.page).toHaveURL("/contact_us");

        // Verify the Contact Us heading
        await expect(this.contactUsHeading).toBeVisible();

        // Verify Get In Touch
        await expect(this.getInTouch).toBeVisible();

        // Verify Name field
        await expect(this.nameField).toBeVisible();

        // Verify Email field
        await expect(this.emailField).toBeVisible();

        // Verify the Subject field
        await expect(this.subjectField).toBeVisible();

        // Verify Message field
        await expect(this.messageField).toBeVisible();

        // Verify File Upload
        await expect(this.fileUpload).toBeVisible();

        // Verify Submit button
        await expect(this.submitButton).toBeVisible();
    }

    // Fill a contact form
    async fillContactForm(name, email, subject, message) {
        await this.nameField.fill(name);
        await this.emailField.fill(email);
        await this.subjectField.fill(subject);
        await this.messageField.fill(message);
    }

    // AE-028 - Upload file
    async uploadFile(filePath) {
        await this.fileUpload.setInputFiles(filePath);
    }

    // AE-028 - Verify a file is selected
    async verifyFileSelected() {
        await expect.poll(async () => {
                return await this.fileUpload.evaluate(
                    input => input.files.length
                );
            })
            .toBe(1);
    }

    // Submit form
    async submitForm() {
        await this.submitButton.click();
    }

    //Verify a success message
    async verifySuccessMessage() {
        await expect(this.page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible();
    }
}
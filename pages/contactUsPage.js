import { expect } from '@playwright/test';

export class ContactUsPage {

    constructor(page) {
        this.page = page;
        this.contactUsHeading = page.getByRole('heading', {name: 'Contact Us'});
        this.getInTouch = page.getByText('Get In Touch', {exact: true});
        this.nameField = page.getByPlaceholder('Name');
        this.emailField = page.getByPlaceholder('Email', {exact: true});
        this.subjectField = page.getByPlaceholder('Subject');
        this.messageField = page.getByPlaceholder('Your Message Here');
        this.fileUpload = page.locator('input[type="file"]');
        this.submitButton = page.getByRole('button', {name: 'Submit'});
    }
    async open() {
        await this.page.goto(ROUTES.HOME);
        await this.page.goto(ROUTES.CONTACT_US);
    }
    async verifyPageDisplayed() {

        await expect(this.page).toHaveURL(ROUTES.CONTACT_US);
        await expect(this.contactUsHeading).toBeVisible();
        await expect(this.getInTouch).toBeVisible();
        await expect(this.nameField).toBeVisible();
        await expect(this.emailField).toBeVisible();
        await expect(this.subjectField).toBeVisible();
        await expect(this.messageField).toBeVisible();
        await expect(this.fileUpload).toBeVisible();
        await expect(this.submitButton).toBeVisible();
    }
    async fillContactForm(name, email, subject, message) {
        await this.nameField.fill(name);
        await this.emailField.fill(email);
        await this.subjectField.fill(subject);
        await this.messageField.fill(message);
    }

    async uploadFile(filePath) {
        await this.fileUpload.setInputFiles(filePath);
    }
    async verifyFileSelected() {
        await expect.poll(async () => {
                return await this.fileUpload.evaluate(
                    input => input.files.length
                );
            })
            .toBe(1);
    }
    async submitForm() {
        await this.submitButton.click();
    }
    async verifySuccessMessage() {
        await expect(this.page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible();
    }
}

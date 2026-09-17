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
        this.successMessage = page.locator("//div[@class='status alert alert-success']");
        this.homeButton = page.locator("//span[normalize-space()='Home']");
        this.subscriptionEmail = page.locator("(//input[@id='susbscribe_email'])[1]");
        this.subscriptionButton = page.locator("(//button[@id='subscribe'])[1]");
        this.footer = page.locator("//div[@class='footer-widget']");
    }
    async open() {
        await this.page.goto(ROUTES.HOME);
        await this.page.goto(ROUTES.CONTACT_US);
    }

}




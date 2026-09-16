import {ROUTES} from "../test-data/routes";
export class LoginPage {

    constructor(page) {

        this.page = page;
        this.loginHeading = page.locator("//h2[normalize-space()='Login to your account']")
        this.emailField = page.locator('input[data-qa="login-email"]');
        this.passwordField = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.loggedInAs = page.locator('li:has-text("Logged in as")');
        this.loginErrorMessage = page.getByText('Your email or password is incorrect!');
        this.logoutLink = page.getByRole('link', {name: 'Logout'});
        this.signupLoginLink = page.getByRole('link', {name: 'Signup / Login'});
    }
    async open() {
        await this.page.goto(ROUTES.HOME);
        await this.page.goto(ROUTES.LOGIN);
    }

    async enterEmail(email) {
        await this.emailField.fill(email);
    }

    async enterPassword(password) {
        await this.passwordField.fill(password);
    }
}



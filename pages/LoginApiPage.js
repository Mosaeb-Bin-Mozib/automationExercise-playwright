export class LoginApi {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    // AE-API-007
    // POST /api/verifyLogin
    async login(email, password) {

        return await this.apiContext.post('https://automationexercise.com/api/verifyLogin', {
            form: {
                email: email,
                password: password
            }
        });
    }

    // AE-API-008
    // Email is missing
    async loginWithoutEmail(password) {

        return await this.apiContext.post('/api/verifyLogin', {
            form: {
                password: password
            }
        });
    }

    // AE-API-009
    // Invalid credentials
    async loginWithInvalidCredentials(email, password) {

        return await this.apiContext.post('/api/verifyLogin', {
            form: {
                email: email,
                password: password
            }
        });
    }

    // AE-API-014
    // DELETE /api/verifyLogin
    async deleteLogin() {
        return await this.apiContext.delete('/api/verifyLogin');
    }
}
export class LoginApi {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }
    async login(email, password) {

        return await this.apiContext.post('https://automationexercise.com/api/verifyLogin', {
            form: {
                email: email,
                password: password
            }
        });
    }
    async loginWithoutEmail(password) {

        return await this.apiContext.post('/api/verifyLogin', {
            form: {
                password: password
            }
        });
    }
    async loginWithInvalidCredentials(email, password) {

        return await this.apiContext.post('/api/verifyLogin', {
            form: {
                email: email,
                password: password
            }
        });
    }
    async deleteLogin() {
        return await this.apiContext.delete('/api/verifyLogin');
    }
}

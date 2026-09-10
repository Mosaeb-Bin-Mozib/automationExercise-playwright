export class UserAccountApi {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }
    async createAccount(userData) {

        return await this.apiContext.post('/api/createAccount', {
            form: userData
        });
    }
    async updateAccount(userData) {

        return await this.apiContext.put('/api/updateAccount', {
            form: userData
        });
    }
    async getUserByEmail(email) {

        return await this.apiContext.get('/api/getUserDetailByEmail', {
            params: {
                email: email
            }
        });
    }
    async deleteAccount(email, password) {

        return await this.apiContext.delete('/api/deleteAccount', {
            form: {
                email: email,
                password: password
            }
        });
    }
}

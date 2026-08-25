export class UserAccountApi {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    // AE-API-010
    // POST /api/createAccount
    async createAccount(userData) {

        return await this.apiContext.post('/api/createAccount', {
            form: userData
        });
    }

    // AE-API-011
    // PUT /api/updateAccount
    async updateAccount(userData) {

        return await this.apiContext.put('/api/updateAccount', {
            form: userData
        });
    }

    // AE-API-012
    // GET /api/getUserDetailByEmail
    async getUserByEmail(email) {

        return await this.apiContext.get('/api/getUserDetailByEmail', {
            params: {
                email: email
            }
        });
    }

    // AE-API-013
    // DELETE /api/deleteAccount
    async deleteAccount(email, password) {

        return await this.apiContext.delete('/api/deleteAccount', {
            form: {
                email: email,
                password: password
            }
        });
    }
}
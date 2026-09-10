import { test, expect } from '../../fixtures/api.login.fixture';
import { getUserAccountData } from "../../test-data/userAccountData";
import { HTTP_STATUS, API_MESSAGE } from "../../test-data/api.constants";

test.describe('Login API Tests', () => {

    test(
        'AE-API-007 - Verify login with valid credentials',
        async ({ loginApi }) => {

            const response = await loginApi.login(
                'mosaeb009@gmail.com',
                '1234'
            );
            const responseBody = await response.text();
            expect(response.status()).toBe(HTTP_STATUS.OK);
            expect(responseBody).toContain('User exists!');
        }
    );

    test(
        'AE-API-008 - Verify login with missing required parameter',
        async ({ loginApi }) => {
            const response = await loginApi.loginWithoutEmail('1234');
            const responseBody = await response.text();
            expect(response.status()).toBe(HTTP_STATUS.BAD_REQUEST);
            expect(responseBody).toContain('email');
        }
    );

    test('AE-API-009 - Verify login with invalid credentials', async ({ loginApi }) => {
            const response = await loginApi.loginWithInvalidCredentials(
                'invalid_user@test.com',
                'WrongPassword123'
            );
            const responseBody = await response.text();
            expect(response.status()).toBe(HTTP_STATUS.NOT_FOUND);
            expect(responseBody).toContain('User not found!');
        }
    );

    test('AE-API-010 - Verify user account creation', async ({ userAccountApi }) => {

        const userData = getUserAccountData();
        const response = await userAccountApi.createAccount(userData);
        const responseBody = await response.text();
        expect(response.status()).toBe(HTTP_STATUS.CREATED);
        expect(responseBody).toContain('User created!');
        await userAccountApi.deleteAccount(
            userData.email,
            userData.password
        );
    });

    test('AE-API-011 - Verify user account update', async ({ userAccountApi }) => {

        const userData = getUserAccountData();
        const createResponse = await userAccountApi.createAccount(userData);
        expect(createResponse.status()).toBe(HTTP_STATUS.CREATED);
        const updateData = {
            email: userData.email,
            password: userData.password,
            firstname: 'Musa',
            lastname: 'Bin Mozib',
            address1: 'Sadar Road Barishal',
            city: 'Barishal'
        };

        const response = await userAccountApi.updateAccount(updateData);
        const responseBody = await response.text();
        expect(response.status()).toBe(HTTP_STATUS.CREATED);
        expect(responseBody).toContain('User updated!');
        await userAccountApi.deleteAccount(
            userData.email,
            userData.password
        );
    });

    test('AE-API-012 - Verify user details can be retrieved by email', async ({ userAccountApi }) => {

            const email = 'mosaeb009@gmail.com';
            const response = await userAccountApi.getUserByEmail(email);
            const responseBody = await response.json();
            expect(response.status()).toBe(HTTP_STATUS.OK);
            expect(responseBody).toHaveProperty('user');
            expect(responseBody.user.email).toBe(email);
        }
    );

    test('AE-API-013 - Verify user account deletion', async ({ userAccountApi }) => {

        const userData = getUserAccountData();
        const createResponse = await userAccountApi.createAccount(userData);
        expect(createResponse.status()).toBe(HTTP_STATUS.CREATED);
        const response = await userAccountApi.deleteAccount(
            userData.email,
            userData.password
        );
        const responseBody = await response.text();
        expect(response.status()).toBe(HTTP_STATUS.OK);
        expect(responseBody).toContain('Account deleted!');
    });

    test('AE-API-014 - Verify unsupported DELETE method for Login API', async ({ loginApi }) => {

        const response = await loginApi.deleteLogin();
        const responseBody = await response.text();
        expect(response.status()).toBe(HTTP_STATUS.METHOD_NOT_ALLOWED);
        expect(responseBody).toContain(API_MESSAGE.UNSUPPORTED_METHOD);
    });

});

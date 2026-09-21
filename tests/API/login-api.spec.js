import { test, expect } from '../../fixtures/api.login.fixture';
import {getUserAccountData, validLoginData} from "../../test-data/userAccountData";
import { HTTP_STATUS, API_MESSAGE } from "../../test-data/api.constants";

test.describe('Login API Tests', () => {

    test('AE-API-007 - Verify login with valid credentials', async ({ loginApi }) => {

        const response = await loginApi.login(
                validLoginData.email,
                validLoginData.password
            );
            expect(response.status()).toBe(HTTP_STATUS.OK);
        }
    );

    test('AE-API-008 - Verify login with missing required parameter', async ({ loginApi }) => {
        const response = await loginApi.loginWithoutEmail('1234');
        const responseBody = await response.json();

        expect(response.status()).toBe(HTTP_STATUS.OK);
        expect(responseBody.responseCode).toBe(HTTP_STATUS.BAD_REQUEST);
        expect(responseBody.message).toContain('email');
    });

    test('AE-API-009 - Verify login with invalid credentials', async ({ loginApi }) => {
        const response = await loginApi.loginWithInvalidCredentials(
            validLoginData.invalidEmail,
            validLoginData.invalidPassword
        );

        const responseBody = await response.json();
        expect(response.status()).toBe(HTTP_STATUS.OK);
        expect(responseBody.responseCode).toBe(HTTP_STATUS.NOT_FOUND);
        expect(responseBody.message).toBe('User not found!');
    });

    test('AE-API-010 - Verify user account creation', async ({ userAccountApi }) => {
        const userData = getUserAccountData();

        try {
            const response = await userAccountApi.createAccount(userData);
            const responseBody = await response.json();

            expect(response.status()).toBe(HTTP_STATUS.OK);
            expect(responseBody.responseCode).toBe(HTTP_STATUS.CREATED);
            expect(responseBody.message).toBe('User created!');
        } finally {
            try {
                await userAccountApi.deleteAccount(
                    userData.email,
                    userData.password
                );
            } catch (cleanupError) {
                console.warn('Account cleanup failed:', cleanupError.message);
            }
        }
    });

    test('AE-API-011 - Verify user account update', async ({ userAccountApi }) => {
        const userData = getUserAccountData();

        try {
            const createResponse = await userAccountApi.createAccount(userData);
            const createBody = await createResponse.json();

            expect(createResponse.status()).toBe(HTTP_STATUS.OK);
            expect(createBody.responseCode).toBe(HTTP_STATUS.CREATED);

            const updateData = {
                email: userData.email,
                password: userData.password,
                firstname: 'Musa',
                lastname: 'Bin Mozib',
                address1: 'Sadar Road Barishal',
                city: 'Barishal'
            };

            const response = await userAccountApi.updateAccount(updateData);
            const responseBody = await response.json();

            expect(response.status()).toBe(HTTP_STATUS.OK);
            expect(responseBody.responseCode).toBe(HTTP_STATUS.CREATED);
            expect(responseBody.message).toBe('User updated!');
        } finally {
            try {
                await userAccountApi.deleteAccount(
                    userData.email,
                    userData.password
                );
            } catch (cleanupError) {
                console.warn('Account cleanup failed:', cleanupError.message);
            }
        }
    });

    test('AE-API-012 - Verify user details can be retrieved by email', async ({ userAccountApi }) => {
        const userData = getUserAccountData();

        try {
            const createResponse = await userAccountApi.createAccount(userData);
            const createBody = await createResponse.json();

            expect(createResponse.status()).toBe(HTTP_STATUS.OK);
            expect(createBody.responseCode).toBe(HTTP_STATUS.CREATED);

            const response = await userAccountApi.getUserByEmail(userData.email);
            const responseBody = await response.json();

            expect(response.status()).toBe(HTTP_STATUS.OK);
            expect(responseBody.user.email).toBe(userData.email);
        } finally {
            try {
                await userAccountApi.deleteAccount(
                    userData.email,
                    userData.password
                );
            } catch (cleanupError) {
                console.warn('Account cleanup failed:', cleanupError.message);
            }
        }
    });

    test('AE-API-013 - Verify user account deletion', async ({ userAccountApi }) => {

        const userData = getUserAccountData();

        try {
            const createResponse = await userAccountApi.createAccount(userData);
            expect(createResponse.status()).toBe(HTTP_STATUS.CREATED);

            const response = await userAccountApi.deleteAccount(
                userData.email,
                userData.password
            );
            const responseBody = await response.text();

            expect(response.status()).toBe(HTTP_STATUS.OK);
            expect(responseBody).toContain('Account deleted!');

        } finally {
            try {
                await userAccountApi.deleteAccount(
                    userData.email,
                    userData.password
                );
            } catch (cleanupError) {
                console.warn('Account cleanup failed:', cleanupError.message);
            }
        }
    });

    test('AE-API-014 - Verify unsupported DELETE method for Login API', async ({ loginApi }) => {

        const response = await loginApi.deleteLogin();
        const responseBody = await response.text();
        expect(response.status()).toBe(HTTP_STATUS.METHOD_NOT_ALLOWED);
        expect(responseBody).toContain(API_MESSAGE.UNSUPPORTED_METHOD);
    });

});

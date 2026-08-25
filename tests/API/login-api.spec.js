import { test, expect } from '../../fixtures/api.login.fixture';
import {printApiResponseOne} from "../utility/apiLogger";

test.describe('Login API Tests', () => {

    test(
        'AE-API-007 - Verify login with valid credentials',
        async ({ loginApi }) => {

            const response = await loginApi.login(
                'mosaeb009@gmail.com',
                '1234'
            );

            const responseBody = await response.text();

            printApiResponseOne(
                'LOGIN - VALID CREDENTIALS',
                response,
                responseBody
            );

            // Verify status code
            expect(response.status()).toBe(200);

            // Verify response message
            expect(responseBody).toContain('User exists!');
        }
    );

    test(
        'AE-API-008 - Verify login with missing required parameter',
        async ({ loginApi }) => {

            const response = await loginApi.loginWithoutEmail('1234');

            const responseBody = await response.text();

            printApiResponseOne(
                'LOGIN - MISSING EMAIL',
                response,
                responseBody
            );

            // Expected status
            expect(response.status()).toBe(400);

            // Expected error message
            expect(responseBody)
                .toContain('email');
        }
    );

    test(
        'AE-API-009 - Verify login with invalid credentials',
        async ({ loginApi }) => {

            const response = await loginApi.loginWithInvalidCredentials(
                'invalid_user@test.com',
                'WrongPassword123'
            );

            const responseBody = await response.text();

            printApiResponseOne(
                'LOGIN - INVALID CREDENTIALS',
                response,
                responseBody
            );

            // Expected status
            expect(response.status()).toBe(404);

            // Expected message
            expect(responseBody)
                .toContain('User not found!');
        }
    );

    test('AE-API-010 - Verify user account creation', async ({ userAccountApi }) => {

            const userData = {
                name: 'API Test User',
                email: 'mosaeb009@gmail.com',
                password: '1234',
                title: 'Mr',
                birth_date: '27',
                birth_month: '10',
                birth_year: '2000',
                firstname: 'Mosaeb',
                lastname: 'Bin Mozib',
                company: 'Sinergy It Solution',
                address1: 'Nathullabad Barishal',
                address2: 'South Banashree',
                country: 'Bangladesh',
                zipcode: '100001',
                state: 'Dhaka',
                city: 'Dhaka',
                mobile_number: '01302692330'
            };

            const response =
                await userAccountApi.createAccount(userData);

            const responseBody = await response.text();

            printApiResponseOne(
                'CREATE USER ACCOUNT',
                response,
                responseBody
            );

            // Expected status according to your test case
            expect(response.status()).toBe(201);

            // Expected message
            expect(responseBody).toContain('User created!');
        }
    );

    test('AE-API-011 - Verify user account update', async ({ userAccountApi }) => {

            const userData = {
                email: 'mosaeb009@gmail.com',
                password: '1234',

                firstname: 'Musa',
                lastname: 'Bin Mozib',

                address1: 'Sadar Road Barishal',

                city: 'Barishal'
            };

            const response = await userAccountApi.updateAccount(userData);

            const responseBody = await response.text();

            printApiResponseOne('UPDATE USER ACCOUNT', response, responseBody);

            // Verify status code
            expect(response.status()).toBe(201);

            // Verify response message
            expect(responseBody).toContain('User updated!');
        }
    );

    test(
        'AE-API-012 - Verify user details can be retrieved by email',
        async ({ userAccountApi }) => {

            const email = 'mosaeb009@gmail.com';

            const response = await userAccountApi.getUserByEmail(email);

            const responseBody = await response.json();

            printApiResponseOne('GET USER DETAILS BY EMAIL', response, responseBody);

            // Verify status code
            expect(response.status()).toBe(200);

            // Verify response contains user
            expect(responseBody).toHaveProperty('user');

            // Verify requested email
            expect(responseBody.user.email).toBe(email);
        }
    );

    test('AE-API-013 - Verify user account deletion', async ({ userAccountApi }) => {

            const email = 'mosaeb009@gmail.com';
            const password = '1234';

            const response = await userAccountApi.deleteAccount(email, password);

            const responseBody = await response.text();

            printApiResponseOne('DELETE USER ACCOUNT', response, responseBody);

            // Verify status code
            expect(response.status()).toBe(200);

            // Verify response message
            expect(responseBody).toContain('Account deleted!');
        }
    );

    test('AE-API-014 - Verify unsupported DELETE method for Login API', async ({ loginApi }) => {

            const response = await loginApi.deleteLogin();

            const responseBody = await response.text();

            printApiResponseOne('LOGIN API - UNSUPPORTED DELETE', response, responseBody);

            // Expected status
            expect(response.status()).toBe(405);

            // Expected error message
            expect(responseBody).toContain('This request method is not supported');
        }
    );

});
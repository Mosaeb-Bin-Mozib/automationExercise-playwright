export function getUserAccountData() {
    const uniqueId = Date.now();

    return {
        name: process.env.TEST_USER_NAME,
        email: `hasan_${uniqueId}@example.com`,
        password: process.env.TEST_USER_PASSWORD,
        title: process.env.TEST_USER_TITLE,
        birth_date: process.env.TEST_USER_BIRTH_DATE,
        birth_month: process.env.TEST_USER_BIRTH_MONTH,
        birth_year: process.env.TEST_USER_BIRTH_YEAR,
        firstname: process.env.TEST_USER_FIRSTNAME,
        lastname: process.env.TEST_USER_LASTNAME,
        company: process.env.TEST_USER_COMPANY,
        address1: process.env.TEST_USER_ADDRESS1,
        address2: process.env.TEST_USER_ADDRESS2,
        country: process.env.TEST_USER_COUNTRY,
        zipcode: process.env.TEST_USER_ZIPCODE,
        state: process.env.TEST_USER_STATE,
        city: process.env.TEST_USER_CITY,
        mobile_number: process.env.TEST_USER_MOBILE
    };
}

export const validLoginData = {
    email: process.env.VALID_LOGIN_EMAIL,
    password: process.env.VALID_LOGIN_PASSWORD,
    invalidEmail: 'invalid_user@test.com',
    invalidPassword: 'WrongPassword123'
};

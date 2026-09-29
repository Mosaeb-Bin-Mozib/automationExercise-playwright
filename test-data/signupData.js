export function getSignupData() {
    return {
        name: process.env.SIGNUP_NAME,
        email: `mosaeb_${Date.now()}@gmail.com`,
        invalidEmail: 'example.com',
        registeredEmail: process.env.REGISTERED_EMAIL,

        title: process.env.SIGNUP_TITLE,
        password: process.env.SIGNUP_PASSWORD,

        dateOfBirth: {
            day: process.env.SIGNUP_DAY,
            month: process.env.SIGNUP_MONTH,
            year: process.env.SIGNUP_YEAR
        },

        newsletter: process.env.SIGNUP_NEWSLETTER === 'true',
        specialOffers: process.env.SIGNUP_SPECIAL_OFFERS === 'true',

        firstName: process.env.SIGNUP_FIRST_NAME,
        lastName: process.env.SIGNUP_LAST_NAME,
        company: process.env.SIGNUP_COMPANY,
        address: process.env.SIGNUP_ADDRESS,
        address2: process.env.SIGNUP_ADDRESS2,
        city: process.env.SIGNUP_CITY,
        state: process.env.SIGNUP_STATE,
        zip: process.env.SIGNUP_ZIP,
        country: process.env.SIGNUP_COUNTRY,
        phone: process.env.SIGNUP_PHONE,
    };
}
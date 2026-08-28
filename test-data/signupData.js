export function getSignupData() {
    return {
        name: 'Mosaeb Bin Mozib',
        email: `mosaeb_${Date.now()}@gmail.com`,
        invalidEmail: 'example.com',
        registeredEmail: 'mosaeb598@gmail.com',

        title: 'Mr.',   // ✅ Add dot
        password: 'Test@12345',

        dateOfBirth: {
            day: '15',
            month: 'May',
            year: '1998'
        },

        newsletter: true,
        specialOffers: true,

        firstName: 'Mosaeb',
        lastName: 'Bin Mozib',
        company: 'Automation Exercise',
        address: '123 Test Street',
        address2: 'Apt 123',
        city: 'Test City',
        state: 'Test State',
        zip: '1219',

        // ⚠️ AutomationExercise does NOT have "Test Country"
        country: 'Canada',

        phone: '01302692330',
    };
}

export function invalidNumberSignupData() {
    return {
        name: '4144144',
        email: `mosaeb_${Date.now()}@gmail.com`,
        invalidEmail:'example.com',
        registeredEmail:'mosaeb598@gmail.com',

        title: 'Mr',
        password: 'Test@12345',
        dateOfBirth: {
            day: '15',
            month: 'May',
            year: '1998'
        },
        newsletter: true,
        specialOffers: true,

        firstName: '21321',
        lastName: '2321321',
        company: '2312321',
        address: '123321312',
        address2: '23213213',
        city: '2321321',
        state: '321312',
        zip: '1219',
        country: '21321323',
        phone: '42423423543652424634',
    };
}
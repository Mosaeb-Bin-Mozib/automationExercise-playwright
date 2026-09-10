export function getUserAccountData() {
    const uniqueId = Date.now();

    return {
        name: 'Hasan Mahmud ',
        email: `hasan_${uniqueId}@example.com`,
        password: 'Test@1234',
        title: 'Mr',
        birth_date: '27',
        birth_month: '10',
        birth_year: '2000',
        firstname: 'Hasan',
        lastname: 'Mahmud',
        company: 'Sinergy It Solution',
        address1: 'Nathullabad Barishal',
        address2: 'South Banashree',
        country: 'Bangladesh',
        zipcode: '100001',
        state: 'Dhaka',
        city: 'Dhaka',
        mobile_number: '01302692330'
    };
}

import path from 'path';

export function getContactData() {
    return {
        name: 'Mosaeb Bin Mozib',
        longName: 'Mosaeb Bin Mozib Test User Contact Form dummy to the pillar object to the map',
        nameEmpty: '',
        email: 'mozib.mosaeb@gmail.com',
        emailEmpty: '',
        emailInvalidFormat: 'testExample.com',
        subject: 'Test Inquiry',
        subscription: 'Subscription',
        subjectEmpty: '',
        message: 'This is a valid test message.',
        success: 'Success! Your details have been submitted successfully.',
        messageEmpty: '',
        path: path.resolve('test-data', 'SQA Roadmap.pdf'),
    };
}
import { test } from '../../fixtures/Payment.fixture';

test.describe('Payment Page', () => {

    test('AE-110 - Verify Payment page loads successfully', async ({ paymentPage }) => {
            await paymentPage.verifyPaymentPageLoadsSuccessfully();
        }
    );

    test('AE-111 - Verify all required payment fields and confirmation button are displayed', async ({ paymentPage }) => {
            await paymentPage.verifyPaymentFieldsDisplayed();
        }
    );

    test('AE-112 - Verify valid payment information can be entered', async ({ paymentPage }) => {
            await paymentPage.verifyValidPaymentInformation();
        }
    );

    test('AE-113 - Verify payment cannot be confirmed when required payment fields are empty', async ({ paymentPage }) => {
            await paymentPage.verifyEmptyPaymentFieldsCannotBeSubmitted();
        }
    );
    test('AE-114 - Verify payment behavior when Card Number contains invalid data', async ({ paymentPage }) => {
            await paymentPage.verifyInvalidCardNumberCannotBeConfirmed();
        }
    );

    test('AE-115 - Verify payment behavior when CVC contains invalid data', async ({ paymentPage }) => {
            await paymentPage.verifyInvalidCvcCannotBeConfirmed();
        }
    );

    test('AE-116 - Verify successful payment and order confirmation', async ({ paymentPage }) => {
            await paymentPage.verifySuccessfulPaymentAndOrderConfirmation();
        }
    );
});

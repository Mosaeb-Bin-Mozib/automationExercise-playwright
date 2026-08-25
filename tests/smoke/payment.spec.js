import { test } from '../../fixtures/Payment.fixture';

test.describe('Payment Page', () => {

    // AE-110
    test('AE-110 - Verify Payment page loads successfully', async ({ paymentPage }) => {

            await paymentPage.verifyPaymentPageLoadsSuccessfully();
        }
    );

    // AE-111
    test('AE-111 - Verify all required payment fields and confirmation button are displayed', async ({ paymentPage }) => {

            await paymentPage.verifyPaymentFieldsDisplayed();
        }
    );

    // AE-112
    test('AE-112 - Verify valid payment information can be entered', async ({ paymentPage }) => {

            await paymentPage.verifyValidPaymentInformation();
        }
    );

    // AE-113
    test('AE-113 - Verify payment cannot be confirmed when required payment fields are empty', async ({ paymentPage }) => {

            await paymentPage
                .verifyEmptyPaymentFieldsCannotBeSubmitted();

        }
    );

    // AE-114
    test('AE-114 - Verify payment behavior when Card Number contains invalid data', async ({ paymentPage }) => {

            await paymentPage.verifyInvalidCardNumberCannotBeConfirmed();
        }
    );

    // AE-115
    test('AE-115 - Verify payment behavior when CVC contains invalid data', async ({ paymentPage }) => {

            await paymentPage.verifyInvalidCvcCannotBeConfirmed();
        }
    );

    // AE-116
    test('AE-116 - Verify successful payment and order confirmation', async ({ paymentPage }) => {

            await paymentPage.verifySuccessfulPaymentAndOrderConfirmation();
        }
    );
});
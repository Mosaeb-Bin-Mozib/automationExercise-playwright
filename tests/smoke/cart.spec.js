import { test } from '../../fixtures/Cart.fixture';


test.describe('Cart Page', () => {
    test('AE-088 - Verify Cart page loads successfully when cart is empty', async ({ cartPage }) => {
            await cartPage.verifyEmptyCartPage();
        }
    );
    test('AE-089 - Verify single product can be added and displayed in Cart', async ({ cartPage }) => {
            await cartPage.verifySingleProductInCart();
        }
    );
    test('AE-090 - Verify multiple products can be added and displayed in Cart', async ({ cartPage }) => {
        await cartPage.verifyMultipleProductsInCart();
    });
    test('AE-091 - Verify selected quantity is maintained in Cart', async ({ cartPage }) => {
        await cartPage.verifySelectedQuantityInCart();
        }
    );
    test('AE-092 - Verify product price, quantity, and total-price calculation', async ({ cartPage }) => {
        await cartPage.verifyCartPriceCalculation();
    });
    test('AE-093 - Verify one selected product can be removed without removing other products', async ({ cartPage }) => {
        await cartPage.verifyRemoveSelectedProductFromCart();
    });

    test('AE-094 - Verify Proceed To Checkout navigation', async ({ cartPage }) => {
        await cartPage.verifyProceedToCheckoutNavigation();
    });

    test('AE-095 - Verify logged-in user can proceed from Cart to Checkout', async ({ cartPage }) => {
        await cartPage.verifyLoggedInUserCanProceedToCheckout();
    });

    test('AE-098 - Verify Cart contents are retained after login', async ({ cartPage }) => {
        await cartPage.verifyCartContentsRetainedAfterLogin();
    });

    test('AE-099 - Verify complete critical Cart flow', async ({ cartPage }) => {
        await cartPage.verifyCompleteCriticalCartFlow();
    });
    test('AE-100 - Verify Checkout page loads successfully', async ({ cartPage }) => {
        await cartPage.verifyCheckoutPageLoadsSuccessfully();
    });
    test('AE-101 - Verify delivery and billing addresses match registered account information', async ({ cartPage }) => {
        await cartPage.verifyDeliveryAndBillingAddresses();
    });

    test('AE-103 - Verify total order amount is calculated correctly', async ({ cartPage }) => {
            await cartPage.verifyCheckoutTotalOrderAmount();
        }
    );
    test('AE-104 - Verify that the user can add an order comment', async ({ cartPage }) => {
            await cartPage.verifyAddOrderComment();
        }
    );
});


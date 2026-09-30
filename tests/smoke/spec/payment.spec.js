import { test } from '../../../fixtures/payment.fixture';
import {expect} from "@playwright/test";
import ROUTES from "../../../test-data/routes";
import {getCartData} from '../../../test-data/cartData';
import {getUser} from '../../../helper/user';
import {assertLoginInUser} from "../assertions/login.assertion";
import {enterInvalidPaymentDetails, enterValidPaymentDetails, goToPaymentPage, verifyEmptyPaymentFields, verifyPaymentFields, verifyPaymentPage} from "../assertions/payment.assertion";
const cartData = getCartData()

test.describe('Payment Page frontend', () => {

    test('AE-110 - Verify Payment page loads successfully', async ({ paymentPage,loginPage }) => {
            await paymentPage.page.goto(ROUTES.LOGIN);
            const user = getUser(1);
            await assertLoginInUser(loginPage, user);
            await goToPaymentPage(paymentPage, ROUTES);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await verifyPaymentPage(paymentPage, ROUTES);
            await paymentPage.logoutLink.click();
        }
    );

    test('AE-111 - Verify all required payment fields and confirmation button are displayed', async ({ paymentPage,loginPage }) => {
            await paymentPage.page.goto(ROUTES.LOGIN);
            const user = getUser(2);
            await assertLoginInUser(loginPage, user);
            await goToPaymentPage(paymentPage, ROUTES);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await verifyPaymentPage(paymentPage, ROUTES);
            await paymentPage.logoutLink.click();
        }
    );

    test('AE-112 - Verify valid payment information can be entered', async ({ paymentPage,loginPage }) => {
            await paymentPage.page.goto(ROUTES.LOGIN);
            const user = getUser(3);
            await assertLoginInUser(loginPage, user);
            await goToPaymentPage(paymentPage, ROUTES);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await enterValidPaymentDetails(paymentPage, cartData);
            await verifyPaymentFields(paymentPage, cartData);
            await paymentPage.logoutLink.click();
        }
    );

    test('AE-113 - Verify payment cannot be confirmed when required payment fields are empty', async ({ paymentPage,loginPage }) => {
            await paymentPage.page.goto(ROUTES.LOGIN);
            const user = getUser(4);
            await assertLoginInUser(loginPage, user);
            await goToPaymentPage(paymentPage, ROUTES);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await paymentPage.cardName.fill('');
            await paymentPage.cardNumber.fill('');
            await paymentPage.cvc.fill('');
            await paymentPage.expiryMonth.fill('');
            await paymentPage.expiryYear.fill('');
            await verifyEmptyPaymentFields(paymentPage);
            await paymentPage.paymentButton.click();
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.page).toHaveURL(ROUTES.PAYMENT);
            await expect(paymentPage.cardName).toBeVisible();
            await expect(paymentPage.cardNumber).toBeVisible();
            await paymentPage.logoutLink.click();
        }
    );
    test('AE-114 - Verify payment behavior when Card contains invalid data', async ({ paymentPage,loginPage }) => {

            await paymentPage.page.goto(ROUTES.LOGIN);
            const user = getUser(5);
            await assertLoginInUser(loginPage, user);
            await goToPaymentPage(paymentPage, ROUTES);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await enterInvalidPaymentDetails(paymentPage, cartData);
            await expect(paymentPage.cardName).toHaveValue(cartData.InvalidCardHolderName);
            await expect(paymentPage.cardNumber).toHaveValue(cartData.InvalidCardHolderNumber);
            await expect(paymentPage.cvc).toHaveValue(cartData.InvalidCardCvcNumber);
            await expect(paymentPage.expiryMonth).toHaveValue(cartData.InvalidCardExpiryMonth);
            await expect(paymentPage.expiryYear).toHaveValue(cartData.InvalidCardExpiryYear);
            await paymentPage.paymentButton.click();
            await expect(paymentPage.orderConfirmation).toBeVisible();
            await paymentPage.logoutLink.click();
        }
    );

    test('AE-116 - Verify successful payment and order confirmation', async ({ paymentPage,loginPage }) => {
            await paymentPage.page.goto(ROUTES.LOGIN);
            const user = getUser(6);
            await assertLoginInUser(loginPage, user);
            await goToPaymentPage(paymentPage, ROUTES);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await enterValidPaymentDetails(paymentPage, cartData);
            await paymentPage.paymentButton.click();
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.orderConfirmation).toBeVisible();
            await paymentPage.logoutLink.click();
        }
    );
});
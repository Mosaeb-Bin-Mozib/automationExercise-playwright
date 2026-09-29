import { test } from '../../fixtures/payment.fixture';
import {expect} from "@playwright/test";
import ROUTES from "../../test-data/routes";
import {getCartData} from '../../test-data/cartData';
import {getUser} from '../../helper/user';
const cartData = getCartData()

test.describe('Payment Page frontend', () => {

    test('AE-110 - Verify Payment page loads successfully', async ({ paymentPage }) => {
            const user = getUser(1);
            await paymentPage.login(user);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.loggedInAs).toBeVisible();
            await expect(paymentPage.loggedInAs).toContainText(`Logged in as ${user.name}`);
            await paymentPage.page.goto(ROUTES.PRODUCTS);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.blueTopProduct).toBeVisible();
            await paymentPage.blueTopProductAddtoCart.click();
            await expect(paymentPage.cartConfirmation.modal).toBeVisible();
            await paymentPage.cartConfirmation.viewCart.click();
            await expect(paymentPage.page).toHaveURL(ROUTES.CART);
            await expect(paymentPage.proceedToCheckout).toBeVisible();
            await paymentPage.proceedToCheckout.click();
            await expect(paymentPage.page).toHaveURL(ROUTES.CHECKOUT);
            await expect(paymentPage.placeOrder).toBeVisible();
            await paymentPage.placeOrder.click();
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.page).toHaveURL(ROUTES.PAYMENT);
            await expect(paymentPage.paymentHeading).toBeVisible();
            await expect(paymentPage.paymentForm).toBeVisible();
            await expect(paymentPage.cardName).toBeVisible();
            await expect(paymentPage.cardNumber).toBeVisible();
            await expect(paymentPage.cvc).toBeVisible();
            await expect(paymentPage.expiryMonth).toBeVisible();
            await expect(paymentPage.expiryYear).toBeVisible();
            await paymentPage.logoutLink.click();
        }
    );

    test('AE-111 - Verify all required payment fields and confirmation button are displayed', async ({ paymentPage }) => {
            const user = getUser(2);
            await paymentPage.login(user);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.loggedInAs).toBeVisible();
            await expect(paymentPage.loggedInAs).toContainText(`Logged in as ${user.name}`);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.loggedInAs).toBeVisible();
            await expect(paymentPage.loggedInAs).toContainText(`Logged in as ${user.name}`);
            await paymentPage.page.goto(ROUTES.PRODUCTS);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.blueTopProduct).toBeVisible();
            await paymentPage.blueTopProductAddtoCart.click();
            await expect(paymentPage.cartConfirmation.modal).toBeVisible();
            await paymentPage.cartConfirmation.viewCart.click();
            await expect(paymentPage.page).toHaveURL(ROUTES.CART);
            await expect(paymentPage.proceedToCheckout).toBeVisible();
            await paymentPage.proceedToCheckout.click();
            await expect(paymentPage.page).toHaveURL(ROUTES.CHECKOUT);
            await expect(paymentPage.placeOrder).toBeVisible();
            await paymentPage.placeOrder.click();
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.page).toHaveURL(ROUTES.PAYMENT);
            await expect(paymentPage.paymentHeading).toBeVisible();
            await expect(paymentPage.paymentForm).toBeVisible();
            await expect(paymentPage.cardName).toBeVisible();
            await expect(paymentPage.cardNumber).toBeVisible();
            await expect(paymentPage.cvc).toBeVisible();
            await expect(paymentPage.expiryMonth).toBeVisible();
            await expect(paymentPage.expiryYear).toBeVisible();
            await expect(paymentPage.paymentButton).toBeVisible();
            await paymentPage.logoutLink.click();
        }
    );

    test('AE-112 - Verify valid payment information can be entered', async ({ paymentPage }) => {
            const user = getUser(3);
            await paymentPage.login(user);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.loggedInAs).toBeVisible();
            await expect(paymentPage.loggedInAs).toContainText(`Logged in as ${user.name}`);
            await paymentPage.page.goto(ROUTES.PRODUCTS);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.blueTopProduct).toBeVisible();
            await paymentPage.blueTopProductAddtoCart.click();
            await expect(paymentPage.cartConfirmation.modal).toBeVisible();
            await paymentPage.cartConfirmation.viewCart.click();
            await expect(paymentPage.page).toHaveURL(ROUTES.CART);
            await expect(paymentPage.proceedToCheckout).toBeVisible();
            await paymentPage.proceedToCheckout.click();
            await expect(paymentPage.page).toHaveURL(ROUTES.CHECKOUT);
            await expect(paymentPage.placeOrder).toBeVisible();
            await paymentPage.placeOrder.click();
            await paymentPage.page.waitForLoadState('domcontentloaded');
            
            await paymentPage.cardName.fill(cartData.cardHolderName);
            await paymentPage.cardNumber.fill(cartData.cardHolderNumber);
            await paymentPage.cvc.fill(cartData.cardCvcNumber);
            await paymentPage.expiryMonth.fill(cartData.cardExpiryMonth);
            await paymentPage.expiryYear.fill(cartData.cardExpiryYear);
            await expect(paymentPage.cardName).toHaveValue(cartData.cardHolderName);
            await expect(paymentPage.cardNumber).toHaveValue(cartData.cardHolderNumber);
            await expect(paymentPage.cvc).toHaveValue(cartData.cardCvcNumber);
            await expect(paymentPage.expiryMonth).toHaveValue(cartData.cardExpiryMonth);
            await expect(paymentPage.expiryYear).toHaveValue(cartData.cardExpiryYear);
            await paymentPage.logoutLink.click();
        }
    );

    test('AE-113 - Verify payment cannot be confirmed when required payment fields are empty', async ({ paymentPage }) => {
            const user = getUser(4);
            await paymentPage.login(user);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.loggedInAs).toBeVisible();
            await expect(paymentPage.loggedInAs).toContainText(`Logged in as ${user.name}`);
            await paymentPage.page.goto(ROUTES.PRODUCTS);
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await expect(paymentPage.blueTopProduct).toBeVisible();
            await paymentPage.blueTopProductAddtoCart.click();
            await expect(paymentPage.cartConfirmation.modal).toBeVisible();
            await paymentPage.cartConfirmation.viewCart.click();
            await expect(paymentPage.page).toHaveURL(ROUTES.CART);
            await expect(paymentPage.proceedToCheckout).toBeVisible();
            await paymentPage.proceedToCheckout.click();
            await expect(paymentPage.page).toHaveURL(ROUTES.CHECKOUT);
            await expect(paymentPage.placeOrder).toBeVisible();
            await paymentPage.placeOrder.click();
            await paymentPage.page.waitForLoadState('domcontentloaded');
            
            await paymentPage.cardName.fill('');
            await paymentPage.cardNumber.fill('');
            await paymentPage.cvc.fill('');
            await paymentPage.expiryMonth.fill('');
            await paymentPage.expiryYear.fill('');
            await expect(paymentPage.cardName).toHaveValue('');
            await expect(paymentPage.cardNumber).toHaveValue('');
            await expect(paymentPage.cvc).toHaveValue('');
            await expect(paymentPage.expiryMonth).toHaveValue('');
            await expect(paymentPage.expiryYear).toHaveValue('');
            await paymentPage.paymentButton.click();
            await paymentPage.page.waitForLoadState('domcontentloaded');
            await paymentPage.page.waitForLoadState('networkidle');
            await expect(paymentPage.page).toHaveURL(ROUTES.PAYMENT);
            await expect(paymentPage.cardName).toBeVisible();
            await expect(paymentPage.cardNumber).toBeVisible();
            await paymentPage.logoutLink.click();
        }
    );
    test('AE-114 - Verify payment behavior when Card contains invalid data', async ({ paymentPage }) => {

        const user = getUser(5);
        await paymentPage.login(user);
        await paymentPage.page.waitForLoadState('domcontentloaded');
        await expect(paymentPage.loggedInAs).toBeVisible();
        await expect(paymentPage.loggedInAs).toContainText(`Logged in as ${user.name}`);
        await paymentPage.page.goto(ROUTES.PRODUCTS);
        await paymentPage.page.waitForLoadState('domcontentloaded');
        await expect(paymentPage.blueTopProduct).toBeVisible();
        await paymentPage.blueTopProductAddtoCart.click();
        await expect(paymentPage.cartConfirmation.modal).toBeVisible();
        await paymentPage.cartConfirmation.viewCart.click();
        await expect(paymentPage.page).toHaveURL(ROUTES.CART);
        await expect(paymentPage.proceedToCheckout).toBeVisible();
        await paymentPage.proceedToCheckout.click();
        await expect(paymentPage.page).toHaveURL(ROUTES.CHECKOUT);
        await expect(paymentPage.placeOrder).toBeVisible();
        await paymentPage.placeOrder.click();
        await paymentPage.page.waitForLoadState('domcontentloaded');

        await paymentPage.cardName.fill(cartData.InvalidCardHolderName);
        await paymentPage.cardNumber.fill(cartData.InvalidCardHolderNumber);
        await paymentPage.cvc.fill(cartData.InvalidCardCvcNumber);
        await paymentPage.expiryMonth.fill(cartData.InvalidCardExpiryMonth);
        await paymentPage.expiryYear.fill(cartData.InvalidCardExpiryYear);
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

    test('AE-116 - Verify successful payment and order confirmation', async ({ paymentPage }) => {
        const user = getUser(6);
        await paymentPage.login(user);
        await paymentPage.page.waitForLoadState('domcontentloaded');
        await expect(paymentPage.loggedInAs).toBeVisible();
            await expect(paymentPage.loggedInAs).toContainText(`Logged in as ${user.name}`);
        await paymentPage.page.goto(ROUTES.PRODUCTS);
        await paymentPage.page.waitForLoadState('domcontentloaded');
        await expect(paymentPage.blueTopProduct).toBeVisible();
        await paymentPage.blueTopProductAddtoCart.click();
        await expect(paymentPage.cartConfirmation.modal).toBeVisible();
        await paymentPage.cartConfirmation.viewCart.click();
        await expect(paymentPage.page).toHaveURL(ROUTES.CART);
        await expect(paymentPage.proceedToCheckout).toBeVisible();
        await paymentPage.proceedToCheckout.click();
        await expect(paymentPage.page).toHaveURL(ROUTES.CHECKOUT);
        await expect(paymentPage.placeOrder).toBeVisible();
        await paymentPage.placeOrder.click();
        await paymentPage.page.waitForLoadState('domcontentloaded');
        
        await paymentPage.cardName.fill(cartData.cardHolderName);
        await paymentPage.cardNumber.fill(cartData.cardHolderNumber);
        await paymentPage.cvc.fill(cartData.cardCvcNumber);
        await paymentPage.expiryMonth.fill(cartData.cardExpiryMonth);
        await paymentPage.expiryYear.fill(cartData.cardExpiryYear);
        await paymentPage.paymentButton.click();
        await paymentPage.page.waitForLoadState('domcontentloaded');
        await expect(paymentPage.orderConfirmation).toBeVisible();
        await paymentPage.logoutLink.click();
        }
    );
});

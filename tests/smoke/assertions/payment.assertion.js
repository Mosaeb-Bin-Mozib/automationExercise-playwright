import { expect } from '@playwright/test';

export async function verifyPaymentPage(paymentPage, ROUTES) {
    await expect(paymentPage.page).toHaveURL(ROUTES.PAYMENT);
    await expect(paymentPage.paymentHeading).toBeVisible();
    await expect(paymentPage.paymentForm).toBeVisible();
    await expect(paymentPage.cardName).toBeVisible();
    await expect(paymentPage.cardNumber).toBeVisible();
    await expect(paymentPage.cvc).toBeVisible();
    await expect(paymentPage.expiryMonth).toBeVisible();
    await expect(paymentPage.expiryYear).toBeVisible();
    await paymentPage.page.goto(ROUTES.CART)
    await paymentPage.cartConfirmation.blueTopDelete.click();

}

export async function verifyPaymentFields(paymentPage, cartData) {
    await expect(paymentPage.cardName).toHaveValue(cartData.cardHolderName);
    await expect(paymentPage.cardNumber).toHaveValue(cartData.cardHolderNumber);
    await expect(paymentPage.cvc).toHaveValue(cartData.cardCvcNumber);
    await expect(paymentPage.expiryMonth).toHaveValue(cartData.cardExpiryMonth);
    await expect(paymentPage.expiryYear).toHaveValue(cartData.cardExpiryYear);
}

export async function enterValidPaymentDetails(paymentPage, checkoutData) {
    await paymentPage.cardName.fill(checkoutData.cardHolderName);
    await paymentPage.cardNumber.fill(checkoutData.cardHolderNumber);
    await paymentPage.cvc.fill(checkoutData.cardCvcNumber);
    await paymentPage.expiryMonth.fill(checkoutData.cardExpiryMonth);
    await paymentPage.expiryYear.fill(checkoutData.cardExpiryYear);
}

export async function enterInvalidPaymentDetails(paymentPage, cartData) {
    await paymentPage.cardName.fill(cartData.InvalidCardHolderName);
    await paymentPage.cardNumber.fill(cartData.InvalidCardHolderNumber);
    await paymentPage.cvc.fill(cartData.InvalidCardCvcNumber);
    await paymentPage.expiryMonth.fill(cartData.InvalidCardExpiryMonth);
    await paymentPage.expiryYear.fill(cartData.InvalidCardExpiryYear);
}

export async function verifyEmptyPaymentFields(paymentPage) {
    await expect(paymentPage.cardName).toHaveValue('');
    await expect(paymentPage.cardNumber).toHaveValue('');
    await expect(paymentPage.cvc).toHaveValue('');
    await expect(paymentPage.expiryMonth).toHaveValue('');
    await expect(paymentPage.expiryYear).toHaveValue('');
}

export async function goToPaymentPage(paymentPage, ROUTES) {
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
}
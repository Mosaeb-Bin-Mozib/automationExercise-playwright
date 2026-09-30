import { expect } from 'playwright/test';
export async function addProductToCart(
    cartPage,
    productLocator,
    addToCartLocator,
    cartData,
    continueShopping = false
) {
    await expect(productLocator).toBeVisible();
    await productLocator.locator(addToCartLocator).first().click();
    await expect(cartPage.cartConfirmation.modal).toBeVisible();
    await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
    if (continueShopping) {
        await cartPage.cartConfirmation.continueShopping.click();
    } else {
        await cartPage.cartConfirmation.viewCart.click();
    }
}

export async function addProductWithQuantity(
    cartPage,
    quantity,
    cartData
) {
    await expect(cartPage.productDetails.quantityInput).toBeVisible();
    await cartPage.productDetails.quantityInput.fill(quantity);
    await expect(cartPage.productDetails.quantityInput).toHaveValue(quantity);
    await cartPage.productDetails.addToCart.click();
    await expect(cartPage.cartConfirmation.modal).toBeVisible();
    await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
    await cartPage.cartConfirmation.viewCart.click();
}

export async function verifyBlueTopCartItem(cartPage, cartData) {
    await expect(cartPage.blueTopProduct.blueTopRow).toBeVisible();
    await expect(cartPage.blueTopProduct.blueTopRowNameTwo).toHaveText(cartData.productName);
    await expect(cartPage.blueTopProduct.blueTopPrice).toHaveText(cartData.productPrice);
    await expect(cartPage.blueTopProduct.blueTopQuantity).toHaveText(cartData.productQuantity);
    await expect(cartPage.blueTopProduct.blueTopTotal).toHaveText(cartData.productPrice);
}

export async function verifyBlueTopCheckout(cartPage, cartData, ROUTES) {
    await expect(cartPage.cartConfirmation.proceedToCheckout).toBeVisible();
    await cartPage.cartConfirmation.proceedToCheckout.click();
    await expect(cartPage.page).toHaveURL(ROUTES.CHECKOUT);
    await expect(cartPage.cartConfirmation.checkoutConfirmationMessage).toBeVisible();
    await expect(cartPage.cartConfirmation.checkoutCartProductList).toBeVisible();
    await expect(cartPage.cartProductList.checkoutBlueTopName).toHaveText(cartData.productName);
    await expect(cartPage.cartProductList.checkoutBlueTopPrice).toHaveText(cartData.productPrice);
    await expect(cartPage.cartProductList.checkoutBlueTopQuantity).toHaveText(cartData.productQuantity);
    await expect(cartPage.cartProductList.checkoutBlueTopTotal).toHaveText(cartData.productPrice);
}
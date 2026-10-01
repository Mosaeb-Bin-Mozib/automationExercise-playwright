import { expect } from 'playwright/test';
import { ROUTES } from '../../../test-data/routes';

export async function addBlueTopToCart(homePage) {
    await homePage.productDetails.blueTopViewProduct.click();
    await homePage.cart.blueTopAddToCart.click();
}

export async function openCartFromViewCart(homePage) {
    await homePage.cart.viewCart.click();
    await expect(homePage.page).toHaveURL(ROUTES.CART);
}

export async function verifyCategoryNavigation(
    homePage,
    category,
    subcategory,
    expectedRoute
)
{
    await homePage.open();
    await category.click();
    await subcategory.click();
    await expect(homePage.page).toHaveURL(expectedRoute);
}

export async function verifyBrandNavigation(
    homePage,
    brand,
    expectedRoute
)
{
    await homePage.open();
    await brand.click();
    await expect(homePage.page).toHaveURL(expectedRoute);
}

export async function addMultipleProductsToCart(homePage) {
    await homePage.cart.blueTopAddToCart.click();
    await homePage.cart.continueShopping.click();
    await homePage.cart.menTshirtAddToCart.click();
    await homePage.cart.viewCart.click();
}
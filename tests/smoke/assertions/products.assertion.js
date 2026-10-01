import { expect } from 'playwright/test';

export async function searchProduct(productsPage, keyword) {
    await productsPage.productSearch.searchInput.fill(keyword);
    await productsPage.productSearch.searchButton.click();
    await expect(productsPage.productSearch.searchedProductsHeading).toBeVisible();
}

export async function verifyProductImageLoaded(image) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    const imageSource = await image.getAttribute('src');
    expect(imageSource).not.toBeNull();
    expect(imageSource).not.toBe('');
    await expect.poll(
        () => image.evaluate(
            img => img.complete && img.naturalWidth > 0
        ),
        {
            message: `Image failed to load. Source: ${imageSource}`,
            timeout: 10000,
        }
    ).toBe(true);
}

export async function verifyProductDetails(details, data) {
    await expect(details.name).toHaveText(data.name);
    await expect(details.price).toHaveText(data.price);
    await expect(details.category).toBeVisible();
    await expect(details.availability).toBeVisible();
    await expect(details.condition).toBeVisible();
    await expect(details.brand).toBeVisible();
}

export async function addProductDetailsToCart(
    productsPage,
    quantity,
    confirmationMessage
) {
    if (quantity !== undefined) {
        await productsPage.productQuantity.fill(quantity);
        await expect(productsPage.productQuantity).toHaveValue(quantity);
    }
    await productsPage.productDetailsAddToCart.click();
    await expect(productsPage.cartConfirmation.modal).toBeVisible();
    await expect(productsPage.cartConfirmation.addedMessage).toHaveText(confirmationMessage);
    await productsPage.cartConfirmation.viewCart.click();
}

export async function fillProductReviewForm(
    productsPage,
    name,
    email,
    review
) {
    await productsPage.productReview.name.fill(name);
    await productsPage.productReview.email.fill(email);
    await productsPage.productReview.review.fill(review);
}
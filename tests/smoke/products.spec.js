import { test, expect } from '../../fixtures/Product.fixture';
import {ROUTES} from "../../test-data/routes";

test.describe('Products Page', () => {
    test('AE-065 - Verify Products page loads successfully', async ({ productsPage }) => {

            await productsPage.open();
            await productsPage.waitForPageLoad();
            await productsPage.verifyProductsPage();
        }
    );
    test('AE-066 - Verify product cards display required information', async ({ productsPage }) => {

            await productsPage.open();
            await productsPage.waitForPageLoad();
            await productsPage.verifyProductCardInformation();
        }
    );

    test('AE-067 - Verify all available products are displayed', async ({ productsPage }) => {

            await productsPage.open();
            await productsPage.waitForPageLoad();
            await productsPage.verifyAllProductsDisplayed();
        }
    );

    test('AE-068 - Verify Add to Cart functionality for a product', async ({ productsPage }) => {

            await productsPage.open();
            await productsPage.waitForPageLoad();
            await productsPage.verifyAddToCart();
        }
    );

    test('AE-071 - Verify product search with valid product keyword', async ({ productsPage }) => {

            await productsPage.open();
            await productsPage.waitForPageLoad();
            await productsPage.verifyValidProductSearch();
        }
    );

    test('AE-072 - Verify search with non-existing product keyword', async ({ productsPage }) => {
            await productsPage.open();
            await productsPage.waitForPageLoad();
            await productsPage.verifyInvalidProductSearch();
        }
    );
    test('AE-073 - Verify search field handling for empty input', async ({ productsPage }) => {

            await productsPage.open();
            await productsPage.waitForPageLoad();
            await productsPage.verifyEmptyProductSearch();
        }
    );

    test('AE-074 - Verify search using different letter cases', async ({ productsPage }) => {

            await productsPage.open();
            await productsPage.waitForPageLoad();
            await productsPage.verifyCaseInsensitiveProductSearch();
        }
    );

    test('AE-076 - Verify product images are displayed correctly', async ({ productsPage }) => {

            await productsPage.open();
            await productsPage.waitForPageLoad();
            await productsPage.verifyProductImages();
        }
    );

    test('AE-077 - Verify Products page critical functionality', async ({ productsPage }) => {

            await productsPage.verifyProductsCriticalSmokeFlow();

        }
    );

    test('Open Products page', async ({ page }) => {

        await page.goto(ROUTES.PRODUCTS);
        await expect(page).toHaveURL(ROUTES.PRODUCTS);

    });

    test('AE-078 - Verify Product Details page loads successfully', async ({ productsPage }) => {
            await productsPage.verifyProductDetailsPage();
        }
    );

    test('AE-079 - Verify all essential product information', async ({ productsPage }) => {
            await productsPage.verifyEssentialProductInformation();
        }
    );

    test('AE-080 - Verify product image is displayed correctly', async ({ productsPage }) => {
            await productsPage.verifyProductDetailsImage();
        }
    );
    test('AE-081 - Verify default product quantity', async ({ productsPage }) => {
            await productsPage.verifyDefaultProductQuantity();
        }
    );

    test('AE-082 - Verify product can be added to Cart with default quantity', async ({ productsPage }) => {
            await productsPage.addProductToCartWithDefaultQuantity();
        }
    );

    test('AE-083 - Verify custom product quantity is maintained in Cart', async ({ productsPage }) => {
            await productsPage.verifyCustomProductQuantityInCart();
        }
    );
    test('AE-084 - Verify valid product review submission', async ({ productsPage }) => {
            await productsPage.verifyValidProductReview();
        }
    );

    test('AE-085 - Verify review validation with invalid email', async ({ productsPage }) => {
            await productsPage.verifyInvalidReviewEmail();
        }
    );
    test('AE-086 - Verify invalid Product Details ID handling', async ({ productsPage }) => {
            await productsPage.verifyInvalidProductDetailsId();
        }
    );
    test('AE-087 - Verify critical Product Details end-to-end flow', async ({ productsPage }) => {
            await productsPage.verifyCriticalProductDetailsFlow();
        }
    );

});

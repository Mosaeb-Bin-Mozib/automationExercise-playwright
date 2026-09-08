import { test, expect } from '../../fixtures/products.fixture'
import {getProductData} from '../../test-data/productData';
const productData = getProductData();
test.describe('Products Page', () => {

    // AE-065 - Verify Products page loads successfully
    test('AE-065 - Verify Products page loads successfully', async ({ productsPage }) => {
            await productsPage.open();
            await productsPage.waitForPageLoad();
            // Verify Products page
            await productsPage.verifyProductsPage();
        }
    );

    // AE-066 - Verify product card information
    test('AE-066 - Verify product cards display required information', async ({ productsPage }) => {
            await productsPage.open();
            await productsPage.waitForPageLoad();
            // Verify product card information
            await productsPage.verifyProductCardInformation();
        }
    );

    // AE-067 - Verify all available products are displayed
    test('AE-067 - Verify all available products are displayed', async ({ productsPage }) => {
            await productsPage.open();
            await productsPage.waitForPageLoad();
            // Verify all products
            await productsPage.verifyAllProductsDisplayed();
        }
    );

    // AE-068 - Verify Add to Cart functionality
    test('AE-068 - Verify Add to Cart functionality for a product', async ({ productsPage }) => {
            await productsPage.open();
            await productsPage.waitForPageLoad();
            // Verify Add to Cart functionality
            await productsPage.verifyAddToCart();
        }
    );

    // AE-071 - Verify product search with a valid product keyword
    test('AE-071 - Verify product search with valid product keyword', async ({ productsPage }) => {
            await productsPage.open();
            await productsPage.waitForPageLoad();
            // Verify valid product search
            await productsPage.verifyValidProductSearch(productData.rightProductKeyword);
        }
    );

    // AE-072 - Verify search with a non-existing product keyword
    test('AE-072 - Verify search with non-existing product keyword', async ({ productsPage }) => {
            await productsPage.open();
            await productsPage.waitForPageLoad();
            // Verify invalid product search
            await productsPage.verifyInvalidProductSearch(productData.wrongProductKeyword);
        }
    );
    // AE-073 - Verify search field handling for empty input
    test('AE-073 - Verify search field handling for empty input', async ({ productsPage }) => {
            await productsPage.open();
            await productsPage.waitForPageLoad();
            // Verify empty search behavior
            await productsPage.verifyEmptyProductSearch(productData.emptyProductKeyword);
        }
    );
    // AE-074 - Verify search using different letter cases
    test('AE-074 - Verify search using different letter cases', async ({ productsPage }) => {
            await productsPage.open();
            await productsPage.waitForPageLoad();
            // Verify case-insensitive search
            await productsPage.verifyCaseInsensitiveProductSearch(productData.searchKeywords);
        }
    );

    // AE-076 - Verify product images are displayed correctly
    test('AE-076 - Verify product images are displayed correctly', async ({ productsPage }) => {
            await productsPage.open();
            await productsPage.waitForPageLoad();
            // Verify product images
            await productsPage.verifyProductImages();
        }
    );
    test('AE-077 - Verify Products page critical functionality', async ({ productsPage }) => {
            await productsPage.verifyProductsCriticalSmokeFlow();
        }
    );

    // AE-078 - Verify Product Details page loads successfully
    test('AE-078 - Verify Product Details page loads successfully', async ({ productsPage }) => {
            await productsPage.verifyProductDetailsPage();
        }
    );
    // AE-079 - Verify all essential product information
    test('AE-079 - Verify all essential product information', async ({ productsPage }) => {

            await productsPage.verifyEssentialProductInformation();

        }
    );

    // AE-080 - Verify the product image is displayed correctly
    test('AE-080 - Verify product image is displayed correctly', async ({ productsPage }) => {
            await productsPage.verifyProductDetailsImage();
        }
    );
    // AE-081 - Verify default product quantity
    test('AE-081 - Verify default product quantity', async ({ productsPage }) => {
            await productsPage.verifyDefaultProductQuantity();
        }
    );

    // AE-082 - Verify product can be added to Cart with the default quantity
    test('AE-082 - Verify product can be added to Cart with default quantity', async ({ productsPage }) => {
            await productsPage.addProductToCartWithDefaultQuantity();
        }
    );
    // AE-083 - Verify custom product quantity is maintained in Cart
    test('AE-083 - Verify custom product quantity is maintained in Cart', async ({ productsPage }) => {
            await productsPage.verifyCustomProductQuantityInCart();
        }
    );
    // AE-084 - Verify valid product review submission
    test('AE-084 - Verify valid product review submission', async ({ productsPage }) => {
            await productsPage.verifyValidProductReview();
        }
    );

    // AE-085 - Verify review validation with invalid email
    test('AE-085 - Verify review validation with invalid email', async ({ productsPage }) => {
            await productsPage.verifyInvalidReviewEmail();
        }
    );

    // AE-086 - Verify invalid Product Details ID handling
    test('AE-086 - Verify invalid Product Details ID handling', async ({ productsPage }) => {

            await productsPage.verifyInvalidProductDetailsId();

        }
    );
    // AE-087 - Verify critical Product Details end-to-end flow
    test('AE-087 - Verify critical Product Details end-to-end flow', async ({ productsPage }) => {

            await productsPage.verifyCriticalProductDetailsFlow();

        }
    );

});
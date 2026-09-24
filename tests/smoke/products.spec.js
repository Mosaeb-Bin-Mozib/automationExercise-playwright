import { test, expect } from '../../fixtures/products.fixture';
import {getProductData} from '../../test-data/productData';
const productData = getProductData();
import {ROUTES} from "../../test-data/routes";

test.describe('Products Page frontend', () => {
    test('AE-065 - Verify Products page loads successfully', async ({ productsPage }) => {

            await productsPage.open();
            await expect(productsPage.allProductsHeading).toBeVisible();
            await expect(productsPage.page).toHaveURL(ROUTES.PRODUCTS);
            await expect(productsPage.allProductsHeading).toBeVisible();
            await expect(productsPage.productsList).toBeVisible();
        }
    );
    test('AE-066 - Verify product cards display required information', async ({ productsPage }) => {

            await productsPage.open();
            await expect(productsPage.allProductsHeading).toBeVisible();
            await expect(productsPage.products.cards.first()).toBeVisible();
            await expect(productsPage.products.blueTop).toBeVisible();
            await expect(productsPage.products.blueTopImage).toBeVisible();
            await expect(productsPage.products.blueTopName).toHaveText(productData.nameTwo);
            await expect(productsPage.products.blueTopPrice).toHaveText(productData.priceTwo);
            await expect(productsPage.products.blueTopAddToCart).toBeVisible();
            await expect(productsPage.products.blueTopViewProduct).toBeVisible();
        }
    );

    test('AE-067 - Verify all available products are displayed', async ({ productsPage }) => {

            await productsPage.open();
            await expect(productsPage.allProductsHeading).toBeVisible();
            await expect(productsPage.allProductsHeading).toBeVisible();
            await expect(productsPage.products.cards.first()).toBeVisible();
            const productCount = await productsPage.products.cards.count();
            expect(productCount).toBeGreaterThan(0);
            for (let i = 0; i < productCount; i++) {
                const productCard = productsPage.products.cards.nth(i);
                await productCard.scrollIntoViewIfNeeded();
                await expect(productCard).toBeVisible();
                await expect(productCard.locator("img").first()).toBeVisible();
                await expect(productCard.locator("p").first()).toBeVisible();
                await expect(productCard.locator("h2").first()).toBeVisible();
            }
        }
    );

    test('AE-068 - Verify Add to Cart functionality for a product', async ({ productsPage }) => {

            await productsPage.open();
            await expect(productsPage.allProductsHeading).toBeVisible();
            await expect(productsPage.products.blueTop).toBeVisible();
            await productsPage.products.blueTopAddToCart.click();
            await expect(productsPage.cartConfirmation.modal).toBeVisible();
            await expect(productsPage.cartConfirmation.addedMessage).toBeVisible();
            await expect(productsPage.cartConfirmation.viewCart).toBeVisible();
            await expect(productsPage.cartConfirmation.continueShopping).toBeVisible();
        }
    );

    test('AE-071 - Verify product search with valid product keyword', async ({ productsPage }) => {

            await productsPage.open();
            await expect(productsPage.allProductsHeading).toBeVisible();
            await expect(productsPage.productSearch.searchInput).toBeVisible();
            await productsPage.productSearch.searchInput.fill(productData.nameTwo);
            await productsPage.productSearch.searchButton.click();
            await expect(productsPage.productSearch.searchedProductsHeading).toBeVisible();
            const productCount = await productsPage.productSearch.searchedProductCards.count();
            expect(productCount).toBeGreaterThan(0);
            for (let i = 0; i < productCount; i++) {
                const productCard = productsPage.productSearch.searchedProductCards.nth(i);
                await productCard.scrollIntoViewIfNeeded();
                await expect(productCard).toBeVisible();
                const productName = await productCard.locator("p").first().innerText();
                expect(productName.trim()).not.toBe('');
            }
        }
    );

    test('AE-072 - Verify search with non-existing product keyword', async ({ productsPage }) => {
            await productsPage.open();
            await expect(productsPage.allProductsHeading).toBeVisible();
            await expect(productsPage.productSearch.searchInput).toBeVisible();
            await productsPage.productSearch.searchInput.fill(productData.wrongProductKeyword);
            await productsPage.productSearch.searchButton.click();
            await expect(productsPage.productSearch.searchedProductsHeading).toBeVisible();
            const productCount = await productsPage.productSearch.searchedProductCards.count();
            expect(productCount).toBe(0);
        }
    );
    test('AE-073 - Verify search field handling for empty input', async ({ productsPage }) => {

            await productsPage.open();
            await expect(productsPage.allProductsHeading).toBeVisible();
            await expect(productsPage.productSearch.searchInput).toBeVisible();
            await productsPage.productSearch.searchInput.fill('');
            await expect(productsPage.productSearch.searchInput).toHaveValue('');
            await productsPage.productSearch.searchButton.click();
            await expect(productsPage.productSearch.searchedProductsHeading).not.toBeVisible();
        }
    );

    test('AE-074 - Verify search using different letter cases', async ({ productsPage }) => {

            await productsPage.open();
            await expect(productsPage.allProductsHeading).toBeVisible();
            const searchKeywords = [productData.nameTwo, productData.nameOne,productData.nameThree];
    
            for (const keyword of searchKeywords) {
                await productsPage.productSearch.searchInput.fill("");
                await productsPage.productSearch.searchInput.fill(keyword);
                await productsPage.productSearch.searchButton.click();
                await expect(productsPage.productSearch.searchedProductsHeading).toBeVisible();
                const productCount = await productsPage.productSearch.searchedProductCards.count();
                expect(productCount).toBeGreaterThan(0);
                for (let i = 0; i < productCount; i++) {
                    const productCard = productsPage.productSearch.searchedProductCards.nth(i);
                    await productCard.scrollIntoViewIfNeeded();
                    await expect(productCard).toBeVisible();
                    await expect(productsPage.viewproduct).toBeVisible();
                    await productsPage.viewproduct.click();
                    await expect(productsPage.page).toHaveURL(/.*\/product_details\/\d+/);
                    await expect(productsPage.detailName).toBeVisible();
                    await expect(productsPage.detailCategory).toBeVisible();
                    await expect(productsPage.detailPrice).toBeVisible();
                    await expect(productsPage.detailAvailability).toBeVisible();
                    await expect(productsPage.detailCondition).toBeVisible();
                    await expect(productsPage.detailBrand).toBeVisible();
                    await productsPage.page.goBack();
                    await expect(productsPage.productSearch.searchedProductsHeading).toBeVisible();
                }
            }
        }
    );

    test('AE-076 - Verify product images are displayed correctly', async ({ productsPage }) => {

            await productsPage.open();
            await expect(productsPage.allProductsHeading).toBeVisible();
            const imageCount = await productsPage.productImages.count();
            expect(imageCount).toBeGreaterThan(0);
            for (let i = 0; i < imageCount; i++) {
    
                const image = productsPage.productImages.nth(i);
                await image.scrollIntoViewIfNeeded();
                await expect(image).toBeVisible();
                const imageSource = await image.getAttribute("src");
                const imageStatus = await image.evaluate((img) => ({
                    complete: img.complete,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight
                }));
                expect(imageSource).not.toBeNull();
                expect(imageSource).not.toBe("");
                expect(imageStatus.complete, `Image ${i + 1} did not complete loading. Source: ${imageSource}`).toBe(true);
    
                expect(imageStatus.naturalWidth, `Image ${i + 1} is broken. Source: ${imageSource}`).toBeGreaterThan(0);
    
            }
        }
    );

    test('AE-077 - Verify Products page critical functionality', async ({ productsPage }) => {

        await productsPage.page.goto(ROUTES.PRODUCTS);
        await productsPage.page.waitForLoadState('domcontentloaded');
        await expect(productsPage.allProductsHeading).toBeVisible();
        await productsPage.productSearch.searchInput.fill(productData.nameFour);
        await productsPage.productSearch.searchButton.click();
        await expect(productsPage.productSearch.searchedProductsHeading).toBeVisible();

        await expect(productsPage.blueTopProduct).toBeVisible();
        await expect(productsPage.blueTopProductView).toBeVisible();
        await productsPage.blueTopProductView.click();

        await expect(productsPage.page).toHaveURL(/\/product_details\/\d+/);
        await expect(productsPage.productInformation).toBeVisible();
        await expect(productsPage.productInformationName.first()).toHaveText(productData.nameTwo);
        await expect(productsPage.productInformationCategory).toBeVisible();
        await expect(productsPage.productInformationPrice.first()).toBeVisible();
        await expect(productsPage.productInformationAvailability).toBeVisible();
        await expect(productsPage.productInformationCondition).toBeVisible();
        await expect(productsPage.productInformationBrand).toBeVisible();

        await productsPage.page.goto(ROUTES.PRODUCTS);
        await productsPage.page.waitForLoadState('domcontentloaded');
        await expect(productsPage.allProductsHeading).toBeVisible();

        await expect(productsPage.blueTopAgain).toBeVisible();
        await productsPage.blueTopAgainaddToCart.click();
        await expect(productsPage.cartConfirmation.modal).toBeVisible();
        await expect(productsPage.cartConfirmation.addedMessage).toBeVisible();

        await expect(productsPage.cartConfirmation.viewCart).toBeVisible();
        await productsPage.cartConfirmation.viewCart.click();
        await expect(productsPage.page).toHaveURL(ROUTES.CART);
        await expect(productsPage.blueTopCartRow).toBeVisible();

        await expect(productsPage.blueTopCartRowName).toHaveText(productData.nameTwo);
        await expect(productsPage.blueTopCartRowPrice).toHaveText(productData.priceTwo);
        await expect(productsPage.blueTopCartRowQuantity).toHaveText(productData.productQuantity);
        await expect(productsPage.blueTopCartRowTotal).toHaveText(productData.priceTwo);

        }
    );

    test('AE-078 - Verify Product Details page loads successfully', async ({ productsPage }) => {
            await productsPage.page.goto(ROUTES.PRODUCTDETAILS);
            await productsPage.page.waitForLoadState('domcontentloaded');
            await expect(productsPage.page).toHaveURL(ROUTES.PRODUCTDETAILS);
            await expect(productsPage.productDetails.information).toBeVisible();
            await expect(productsPage.productDetails.name).toHaveText(productData.nameOne);
            await expect(productsPage.productDetails.category).toBeVisible();
            await expect(productsPage.productDetails.price).toHaveText(productData.priceOne);
            await expect(productsPage.productDetails.availability).toBeVisible();
            await expect(productsPage.productDetails.condition).toBeVisible();
            await expect(productsPage.productDetails.brand).toBeVisible();
            }
    );

    test('AE-080 - Verify product image is displayed correctly', async ({ productsPage }) => {
            await productsPage.page.goto(ROUTES.PRODUCTDETAILS);
            await productsPage.page.waitForLoadState('domcontentloaded');
            await expect(productsPage.productDetailsImage).toBeVisible();
            const imageLoaded = await productsPage.productDetailsImage.evaluate(
                (img) => img.complete && img.naturalWidth > 0
            );
            expect(imageLoaded).toBe(true);
        }
    );
    test('AE-081 - Verify default product quantity', async ({ productsPage }) => {
            await productsPage.page.goto(ROUTES.PRODUCTDETAILS);
            await productsPage.page.waitForLoadState('domcontentloaded');
            await expect(productsPage.productQuantity).toBeVisible();
            await expect(productsPage.productQuantity).toHaveValue(productData.productQuantity);
        }
    );

    test('AE-082 - Verify product can be added to Cart with default quantity', async ({ productsPage }) => {
            await productsPage.page.goto(ROUTES.PRODUCTDETAILS);
            await productsPage.page.waitForLoadState('domcontentloaded');
            await expect(productsPage.productDetails.name).toHaveText(productData.nameOne);
            await expect(productsPage.productQuantity).toHaveValue(productData.productQuantity);
            await productsPage.productDetailsAddToCart.click();
            await expect(productsPage.cartConfirmation.modal).toBeVisible();
            await expect(productsPage.cartConfirmation.addedMessage).toHaveText(productData.cartConfirmation);
            await productsPage.cartConfirmation.viewCart.click();
            await expect(productsPage.menTshirtCartRow).toBeVisible();
            await expect(productsPage.menTshirtCartRowQuantity).toHaveText(productData.productQuantity);
        }
    );

    test('AE-083 - Verify custom product quantity is maintained in Cart', async ({ productsPage }) => {
            await productsPage.page.goto(ROUTES.PRODUCTDETAILS);
            await productsPage.page.waitForLoadState('domcontentloaded');
            await productsPage.productQuantity.fill(productData.Quantity);
            await expect(productsPage.productQuantity).toHaveValue(productData.Quantity);
            await productsPage.productDetailsAddToCart.click();
            await expect(productsPage.cartConfirmation.modal).toBeVisible();
            await expect(productsPage.cartConfirmation.addedMessage).toHaveText(productData.cartConfirmation);
            await productsPage.cartConfirmation.viewCart.click();
            await expect(productsPage.menTshirtCartRow).toBeVisible();
            await expect(productsPage.menTshirtCartRowQuantityFour).toHaveText(productData.Quantity);
        }
    );
    test('AE-084 - Verify valid product review submission', async ({ productsPage }) => {
            await productsPage.page.goto(ROUTES.PRODUCTDETAILS);
            await productsPage.page.waitForLoadState('domcontentloaded');
            await expect(productsPage.menTshirtReview).toBeVisible();
            await productsPage.productReview.name.fill(productData.productReviewName);
            await productsPage.productReview.email.fill(productData.productReviewEmail);
            await productsPage.productReview.review.fill(productData.message);
            await productsPage.productReview.submit.click();
            await expect(productsPage.productReview.successMessage).toBeVisible();
            await expect(productsPage.productReview.successMessage).toHaveText(productData.successMessage);
        }
    );

    test('AE-085 - Verify review validation with invalid email', async ({ productsPage }) => {
            await productsPage.page.goto(ROUTES.PRODUCTDETAILS);
            await productsPage.page.waitForLoadState('domcontentloaded');
            await productsPage.productReview.name.fill(productData.productReviewName);
            await productsPage.productReview.email.fill(productData.productReviewInvalidEmail);
            await productsPage.productReview.review.fill(productData.message);
            await productsPage.productReview.submit.click();
            await expect(productsPage.productReview.email).toHaveJSProperty('validity.typeMismatch', true);
        }
    );
    test('AE-086 - Verify invalid Product Details ID handling', async ({ productsPage }) => {
            const response = await productsPage.page.goto(ROUTES.PRODUCTDETAILS_TWO);
            expect(response).not.toBeNull();
            await productsPage.page.waitForLoadState('domcontentloaded');
            const status = response.status();
            expect(status).toBeLessThan(500);
            await expect(productsPage.page).toHaveURL(ROUTES.PRODUCTDETAILS_TWO);
        }
    );
    test('AE-087 - Verify critical Product Details end-to-end flow', async ({ productsPage }) => {
            await productsPage.page.goto(ROUTES.PRODUCTDETAILS);
            await productsPage.page.waitForLoadState('domcontentloaded');
            await expect(productsPage.productDetails.name).toHaveText(productData.nameOne);
            await expect(productsPage.productDetails.price).toHaveText(productData.priceOne);
            await expect(productsPage.productDetails.availability).toContainText(productData.availability);
            await expect(productsPage.productDetails.brand).toContainText(productData.brand);
            await productsPage.productQuantity.fill(productData.Quantity);
            await expect(productsPage.productQuantity).toHaveValue(productData.Quantity);
            await productsPage.productDetailsAddToCart.click();
            await expect(productsPage.cartConfirmation.modal).toBeVisible();
            await expect(productsPage.cartConfirmation.addedMessage).toHaveText(productData.cartConfirmation);
            await productsPage.cartConfirmation.viewCart.click();
            await expect(productsPage.menTshirtCartRow).toBeVisible();
            await expect(productsPage.menTshirtCartRowName).toHaveText(productData.nameOne);
            await expect(productsPage.menTshirtCartRowQuantityFour).toHaveText(productData.Quantity);
        }
    );

});

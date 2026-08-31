import { expect } from '@playwright/test';
import {getProductData} from '../test-data/productData';
import {getSignupData} from '../test-data/signupData';
const productData = getProductData();
const signupData = getSignupData();
import dotenv from 'dotenv';
dotenv.config();

export class ProductsPage {

    constructor(page) {
        this.page = page;

        // AE-065 - Products page
        this.allProductsHeading = page.locator("//h2[normalize-space()='All Products']");

        this.productsList = page.locator("//div[contains(@class,'features_items')]");

        // AE-066 / AE-067 / AE-069 - Products
        this.products = {

            cards: page.locator("//div[contains(@class,'product-image-wrapper')]"),

            // Blue Top
            blueTop: page.locator("//p[normalize-space()='Blue Top']").first(),

            blueTopImage: page.locator("//div[.//p[normalize-space()='Blue Top']]//img").first(),

            blueTopName: page.locator("//p[normalize-space()='Blue Top']").first(),

            blueTopPrice: page.locator("(//h2[contains(text(),'Rs. 500')])[2]").first(),

            blueTopAddToCart: page.locator("//div[.//p[normalize-space()='Blue Top']]//a[contains(@class,'add-to-cart')]").first(),

            blueTopViewProduct: page.locator("//div[.//p[normalize-space()='Blue Top']]//a[contains(@href,'product_details')]").first(),

            // AE-069 - Men Tshirt
            menTshirt: page.locator("//p[normalize-space()='Men Tshirt']").first(),

            menTshirtAddToCart: page.locator("//div[.//p[normalize-space()='Men Tshirt']]//a[contains(@class,'add-to-cart')]").first(),
        };

        // AE-068 / AE-069 - Add to Cart confirmation
        this.cartConfirmation = {

            modal: page.locator("//div[@class='modal-content']"),

            addedMessage: page.locator("//h4[normalize-space()='Added!']"),

            viewCart: page.locator("//u[normalize-space()='View Cart']"),

            continueShopping: page.locator("//button[normalize-space()='Continue Shopping']"),
        };

        // AE-071 - Product Search
        this.productSearch = {searchInput: page.locator("//input[@id='search_product']"),

            searchButton: page.locator("//button[@id='submit_search']"),

            searchedProductsHeading: page.locator("//h2[normalize-space()='Searched Products']"),

            searchedProductCards: page.locator("//div[contains(@class,'product-image-wrapper')]"),
        };

        // AE-076 - Product Images
        this.productImages = page.locator("//div[contains(@class,'product-image-wrapper')]//img");

        // AE-078 - Product Details Page
        this.productDetails = {

            information: page.locator("//div[contains(@class,'product-information')]"),

            name:page.getByText('Men Tshirt', { exact: true }),

            category: page.locator("//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Category:')]"),

            price: page.locator("//span[normalize-space()='Rs. 400']"),

            availability: page.locator("//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Availability:')]"),

            condition: page.locator("//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Condition:')]"),

            brand: page.locator("//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Brand:')]"),
        };

        // AE-080 - Product Details Image
        this.productDetailsImage = page.locator("//div[contains(@class,'product-details')]//img").first();

        // AE-081 - Product Quantity
        this.productQuantity = page.locator("//input[@id='quantity']");

        // AE-082 - Product Details Add to Cart
        this.productDetailsAddToCart = page.locator("//button[normalize-space()='Add to cart']");

        // AE-084 - Product Review
        this.productReview = {
            name: page.locator("//input[@id='name']"),

            email: page.locator("//input[@id='email']"),

            review: page.locator("//textarea[@id='review']"),

            submit: page.locator("//button[@id='button-review']"),

            successMessage: page.locator("//div[@id='review-section']//span[contains(normalize-space(),'Thank you for your review.')]"),
        };
    }


    // AE-065 - Open Products page
    async open() {
        await this.page.goto(
            '/products',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );
    }


    // AE-065 - Wait for Products page
    async waitForPageLoad() {
        await expect(
            this.allProductsHeading
        ).toBeVisible();
    }


    // AE-065 - Verify Products page
    async verifyProductsPage() {

        await expect(this.page).toHaveURL("/products");
        await expect(this.allProductsHeading).toBeVisible();
        await expect(this.productsList).toBeVisible();
    }


    // AE-066 - Verify product card information
    async verifyProductCardInformation() {

        await expect(this.products.cards.first()).toBeVisible();
        await expect(this.products.blueTop).toBeVisible();
        await expect(this.products.blueTopImage).toBeVisible();
        await expect(this.products.blueTopName).toHaveText('Blue Top');
        await expect(this.products.blueTopPrice).toHaveText('Rs. 500');
        await expect(this.products.blueTopAddToCart).toBeVisible();
        await expect(this.products.blueTopViewProduct).toBeVisible();
    }


    // AE-067 - Verify all available products
    async verifyAllProductsDisplayed() {

        await expect(this.allProductsHeading).toBeVisible();

        await expect(this.products.cards.first()).toBeVisible();

        const productCount = await this.products.cards.count();

        expect(productCount).toBeGreaterThan(0);

        for (let i = 0; i < productCount; i++) {

            const productCard = this.products.cards.nth(i);
            await productCard.scrollIntoViewIfNeeded();
            await expect(productCard).toBeVisible();
            await expect(productCard.locator("img").first()).toBeVisible();
            await expect(productCard.locator("p").first()).toBeVisible();
            await expect(productCard.locator("h2").first()).toBeVisible();
        }
        console.log(`Total products displayed: ${productCount}`);
    }


    // AE-068 - Verify Add to Cart functionality
    async verifyAddToCart() {
        await expect(this.products.blueTop).toBeVisible();
        await this.products.blueTopAddToCart.click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toBeVisible();
        await expect(this.cartConfirmation.viewCart).toBeVisible();
        await expect(this.cartConfirmation.continueShopping).toBeVisible();
    }


    // AE-069 - Verify adding multiple different products to Cart
    async verifyMultipleProductsInCart() {
        // Step 1 - Clear the existing Cart
        await this.page.goto(
            '/view_cart',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );
        // Find all Remove buttons
        const removeButtons = this.page.locator("//a[contains(@class,'cart_quantity_delete')]");
        // Count existing Cart products
        let removeCount = await removeButtons.count();
        // Remove products one by one
        while (removeCount > 0) {
            await removeButtons.first().click();
            // Wait for a removed item
            await this.page.waitForTimeout(300);
            removeCount = await removeButtons.count();
        }
        // Step 2 - Go to Products
        await this.page.goto(
            '/products',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );
        await this.waitForPageLoad();
        // Step 3 - Add Blue Top
        await this.products.blueTopAddToCart.click();
        // Verify confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toBeVisible();
        // Continue Shopping
        await this.cartConfirmation.continueShopping.click();
        // Verify modal closed
        await expect(this.cartConfirmation.modal).toBeHidden();
        // Step 4 - Add Men Tshirt
        await this.products.menTshirtAddToCart.click();
        // Verify confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toBeVisible();
        // Click View Cart
        await this.cartConfirmation.viewCart.click();
        // Step 5 - Verify Cart page
        await expect(this.page).toHaveURL("/view_cart");
        // Step 6 - Verify Blue Top
        const blueTopCartRow = this.page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]").first();
        await expect(blueTopCartRow).toBeVisible();
        // Blue Top price
        await expect(blueTopCartRow.locator("td.cart_price p")).toHaveText('Rs. 500');
        // Blue Top quantity
        await expect(blueTopCartRow.locator("td.cart_quantity button")).toHaveText('2');
        // Blue Top total
        await expect(blueTopCartRow.locator("td.cart_total p")).toHaveText('Rs. 1000');
        // Step 7 - Verify Men Tshirt
        const menTshirtCartRow = this.page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]").first();
        await expect(menTshirtCartRow).toBeVisible();
        // Men Tshirt price
        await expect(menTshirtCartRow.locator("td.cart_price p")).toHaveText('Rs. 400');
        // Men Tshirt quantity
        await expect(menTshirtCartRow.locator("td.cart_quantity button")).toHaveText('1');
        // Men Tshirt total
        await expect(menTshirtCartRow.locator("td.cart_total p")).toHaveText('Rs. 400');
        // Step 8 - Verify overall Cart total
        const cartTotal = this.page.locator("//p[contains(@class,'cart_total_price')]");
        // There are two product totals, so verify individually
        await expect(blueTopCartRow.locator("td.cart_total p")).toHaveText('Rs. 500');
        await expect(menTshirtCartRow.locator("td.cart_total p")).toHaveText('Rs. 400');
        // Wait so you can see the Cart
        await this.page.waitForTimeout(5000);
    }

    // AE-071 - Verify product search with a valid keyword
    async verifyValidProductSearch(search) {
        // Verify search input
        await expect(this.productSearch.searchInput).toBeVisible();
        // Enter a valid search keyword
        await this.productSearch.searchInput.fill(search);
        // Click Search
        await this.productSearch.searchButton.click();
        // Verify the Searched Products heading
        await expect(this.productSearch.searchedProductsHeading).toBeVisible();
        // Verify searched products are displayed
        const productCount = await this.productSearch.searchedProductCards.count();
        expect(productCount).toBeGreaterThan(0);
        console.log(`Total search results: ${productCount}`);
        // Verify every returned product card is displayed
        for (let i = 0; i < productCount; i++) {
            const productCard = this.productSearch.searchedProductCards.nth(i);
            await productCard.scrollIntoViewIfNeeded();
            await expect(productCard).toBeVisible();
            // Verify the product name exists
            const productName = await productCard.locator("p").first().innerText();
            console.log(`Search result ${i + 1}: ${productName}`);
            // Product name should not be empty
            expect(productName.trim()).not.toBe('');
        }
    }

    // AE-072 - Verify search with a non-existing product keyword
    async verifyInvalidProductSearch(search) {
        // Verify search input
        await expect(this.productSearch.searchInput).toBeVisible();
        // Enter a non-existing product keyword
        await this.productSearch.searchInput.fill(search);
        // Click Search
        await this.productSearch.searchButton.click();
        // Verify the Searched Products heading
        await expect(this.productSearch.searchedProductsHeading).toBeVisible();
        // Count returned product cards
        const productCount = await this.productSearch.searchedProductCards.count();
        console.log(`Search results for invalid keyword: ${productCount}`)
        // No product should be returned
        expect(productCount).toBe(0);
    }

    // AE-073 - Verify search field handling for empty input
    async verifyEmptyProductSearch(search) {
        // Verify Search Product input is visible
        await expect(this.productSearch.searchInput).toBeVisible();
        // Make sure the search field is empty
        await this.productSearch.searchInput.fill(search);
        // Verify the field is empty
        await expect(this.productSearch.searchInput).toHaveValue(search);
        // Submit an empty search
        await this.productSearch.searchButton.click();
        // Verify application handles empty search
        await expect(this.page).toHaveURL("/products?search=");
        // Verify Products page is still available
        await expect(this.productSearch.searchedProductsHeading).not.toBeVisible();
    }

    // AE-074 - Verify search using different letter cases
    async verifyCaseInsensitiveProductSearch(searchKeywords) {
        for (const keyword of searchKeywords) {
            console.log("\n====================================");
            console.log(`Searching with keyword: ${keyword}`);
            console.log("====================================");
            // Clear the search field
            await this.productSearch.searchInput.fill("");
            // Enter the search keyword
            await this.productSearch.searchInput.fill(keyword);
            // Click Search
            await this.productSearch.searchButton.click();
            // Verify the Searched Products heading
            await expect(this.productSearch.searchedProductsHeading).toBeVisible();
            // Get search result product cards
            const productCount = await this.productSearch.searchedProductCards.count();
            console.log(`Total results for "${keyword}": ${productCount}`);
            // At least one product should be displayed
            expect(productCount).toBeGreaterThan(0);
            // Loop through every search result
            for (let i = 0; i < productCount; i++) {
                const productCard = this.productSearch.searchedProductCards.nth(i);
                // Scroll product into view
                await productCard.scrollIntoViewIfNeeded();
                // Verify product card
                await expect(productCard).toBeVisible();
                // Product Name
                const productName =
                    await productCard
                        .locator("xpath=.//p")
                        .first()
                        .innerText();
                // Product Price
                const productPrice =
                    await productCard
                        .locator(
                            "xpath=.//h2[contains(normalize-space(), 'Rs.')]"
                        )
                        .first()
                        .innerText();
                console.log(`\nProduct ${i + 1}`);
                console.log(`Name: ${productName.trim()}`);
                console.log(`Price: ${productPrice.trim()}`);
                // Verify product name
                expect(productName.trim()).not.toBe("");
                // Verify product price
                expect(productPrice.trim()).not.toBe("");
                // View Product
                const viewProduct =
                    productCard.locator(
                        "xpath=.//a[contains(normalize-space(), 'View Product')]"
                    ).first();
                await expect(viewProduct).toBeVisible();
                // Click View Product
                await viewProduct.click();
                // Verify Product Details Page
                await expect(this.page).toHaveURL(/.*\/product_details\/\d+/);
                // Product Detail Locators
                const detailName = this.page.locator("//div[contains(@class,'product-information')]//h2");
                const detailCategory = this.page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Category:')]");
                const detailPrice = this.page.locator("//div[contains(@class,'product-information')]//span/span");
                const detailAvailability = this.page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Availability:')]");
                const detailCondition = this.page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Condition:')]");
                const detailBrand = this.page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Brand:')]");

                // Verify Product Details
                await expect(detailName).toBeVisible();
                await expect(detailCategory).toBeVisible();
                await expect(detailPrice).toBeVisible();
                await expect(detailAvailability).toBeVisible();
                await expect(detailCondition).toBeVisible();
                await expect(detailBrand).toBeVisible();

                // Get Product Details
                const productDetailName = (await detailName.innerText()).trim();
                const productCategory = (await detailCategory.innerText()).trim();
                const productDetailPrice = (await detailPrice.innerText()).trim();
                const productAvailability = (await detailAvailability.innerText()).trim();
                const productCondition = (await detailCondition.innerText()).trim();
                const productBrand = (await detailBrand.innerText()).trim();
                // Print Complete Product Information
                console.log(`Product Name: ${productDetailName}`,`Category: ${productCategory}`,`Price: ${productDetailPrice}`,`Availability: ${productAvailability}`,`Condition: ${productCondition}`,`Brand: ${productBrand}`);

                // Validate Product Details
                expect(productDetailName).not.toBe("");
                expect(productCategory).not.toBe("");
                expect(productDetailPrice).not.toBe("");
                expect(productAvailability).not.toBe("");
                expect(productCondition).not.toBe("");
                expect(productBrand).not.toBe("");

                // Return to Search Results
                await this.page.goBack();
                // Wait for search results again
                await expect(this.productSearch.searchedProductsHeading).toBeVisible();
            }
        }
    }

    // AE-076 - Verify product images are displayed correctly
    async verifyProductImages() {
        // Get all product images
        const imageCount = await this.productImages.count();

        console.log("\n========================================");
        console.log("AE-076 - Product Image Validation");
        console.log("========================================");
        console.log(`Total product images: ${imageCount}`);
        console.log("");
        // Verify product images exist
        expect(imageCount).toBeGreaterThan(0);
        // Check every image
        for (let i = 0; i < imageCount; i++) {
            const image = this.productImages.nth(i);
            // Scroll image into view
            await image.scrollIntoViewIfNeeded();
            // Wait for image to become visible
            await expect(image).toBeVisible();
            // Get image source
            const imageSource = await image.getAttribute("src");
            // Get image alt text
            const imageAlt = await image.getAttribute("alt");
            // Check image loading status
            const imageStatus =
                await image.evaluate((img) => ({
                    complete: img.complete,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight
                }));

            console.log(`Product Image ${i + 1}`);
            console.log(`  Alt Text     : ${imageAlt}`);
            console.log(`  Source       : ${imageSource}`);
            console.log(`  Complete     : ${imageStatus.complete}`);
            console.log(`  Natural Width: ${imageStatus.naturalWidth}`);
            console.log(`  Natural Height: ${imageStatus.naturalHeight}`);
            // Verify src exists
            expect(imageSource).not.toBeNull();
            expect(imageSource).not.toBe("");
            // Verify image has loaded
            expect(imageStatus.complete, `Image ${i + 1} did not complete loading. Source: ${imageSource}`).toBe(true);
            expect(imageStatus.naturalWidth, `Image ${i + 1} is broken. Source: ${imageSource}`).toBeGreaterThan(0);
            console.log(`  Status       : PASS`);
            console.log("----------------------------------------");
            console.log("");
        }
        console.log("========================================");
        console.log("AE-076 Result: PASS");
        console.log("All product images loaded successfully.");
        console.log("========================================\n");
    }
    // AE-077 - Verify Products page critical functionality
    async verifyProductsCriticalSmokeFlow() {
        // 1. Open Products page
        await this.page.goto(`/products`);
        await this.page.waitForLoadState('domcontentloaded');
        // 2. Verify All Products
        await expect(this.allProductsHeading).toBeVisible();
        // 3. Search for a product
        await this.productSearch.searchInput.fill('top');
        await this.productSearch.searchButton.click();
        // 4. Verify Searched Products
        await expect(this.productSearch.searchedProductsHeading).toBeVisible();
        // 5. Locate Blue Top
        const blueTopProduct = this.page.locator("//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]").first();
        await expect(blueTopProduct).toBeVisible();
        // 6. Open Blue Top product details
        const viewProduct = blueTopProduct.locator("xpath=.//a[contains(normalize-space(),'View Product')]").first();
        await expect(viewProduct).toBeVisible();
        await viewProduct.click();
        // 7. Verify the Product Details page
        await expect(this.page).toHaveURL(/\/product_details\/\d+/);
        const productInformation = this.page.locator("//div[contains(@class,'product-information')]");
        await expect(productInformation).toBeVisible();
        // Product name
        await expect(productInformation.locator("xpath=.//h2").first()).toHaveText('Blue Top');
        // Category
        await expect(productInformation.locator("xpath=.//p[contains(normalize-space(),'Category:')]")).toBeVisible();
        // Price
        await expect(productInformation.locator("xpath=.//span[contains(normalize-space(),'Rs.')]").first()).toBeVisible();


        // Availability
        await expect(
            productInformation.locator(
                "xpath=.//p[contains(normalize-space(),'Availability:')]"
            )
        ).toBeVisible();


        // Condition
        await expect(
            productInformation.locator(
                "xpath=.//p[contains(normalize-space(),'Condition:')]"
            )
        ).toBeVisible();


        // Brand
        await expect(
            productInformation.locator(
                "xpath=.//p[contains(normalize-space(),'Brand:')]"
            )
        ).toBeVisible();


        // ==========================================
        // 8. Return to Products page
        // ==========================================

        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // ==========================================
        // 9. Locate Blue Top again
        // ==========================================

        const blueTopAgain = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(
            blueTopAgain
        ).toBeVisible();


        // ==========================================
        // 10. Add Blue Top to Cart
        // ==========================================

        const addToCart = blueTopAgain.locator(
            "xpath=.//a[contains(normalize-space(),'Add to cart')]"
        ).first();

        await expect(
            addToCart
        ).toBeVisible();

        await addToCart.click();


        // ==========================================
        // 11. Verify Added confirmation
        // ==========================================

        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toBeVisible();


        // ==========================================
        // 12. Open Cart
        // ==========================================

        await expect(
            this.cartConfirmation.viewCart
        ).toBeVisible();

        await this.cartConfirmation.viewCart.click();


        // ==========================================
        // 13. Verify Cart page
        // ==========================================

        await expect(
            this.page
        ).toHaveURL("/view_cart");


        // ==========================================
        // 14. Locate Blue Top in Cart
        // ==========================================

        const blueTopCartRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        ).first();

        await expect(
            blueTopCartRow
        ).toBeVisible();


        // ==========================================
        // 15. Verify product name
        // ==========================================

        await expect(
            blueTopCartRow.locator(
                "td.cart_description a"
            )
        ).toHaveText('Blue Top');


        // ==========================================
        // 16. Verify price
        // ==========================================

        await expect(
            blueTopCartRow.locator(
                "td.cart_price p"
            )
        ).toHaveText('Rs. 500');


        // ==========================================
        // 17. Verify quantity
        // ==========================================

        await expect(
            blueTopCartRow.locator(
                "td.cart_quantity button"
            )
        ).toHaveText('1');


        // ==========================================
        // 18. Verify total
        // ==========================================

        await expect(
            blueTopCartRow.locator(
                "td.cart_total p"
            )
        ).toHaveText('Rs. 500');


        // ==========================================
        // 19. Final log
        // ==========================================

        console.log(
            'AE-077 - Products critical functionality: PASS'
        );
    }

    // AE-078 - Verify Product Details page loads successfully
    async verifyProductDetailsPage() {

        await this.page.goto('/product_details/2');

        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.page).toHaveURL('product_details/2');

        await expect(this.productDetails.information).toBeVisible();

        await expect(this.productDetails.name).toHaveText(productData.name);

        await expect(this.productDetails.category).toBeVisible();

        await expect(this.productDetails.price).toHaveText(productData.price);

        await expect(this.productDetails.availability).toBeVisible();

        await expect(this.productDetails.condition).toBeVisible();

        await expect(this.productDetails.brand).toBeVisible();
    }

    // AE-079 - Verify all essential product information
    async verifyEssentialProductInformation() {
        // Open Men Tshirt product details page
        await this.page.goto('/product_details/2');
        await this.page.waitForLoadState('domcontentloaded');


        // Product name
        await expect(this.productDetails.name).toHaveText(productData.name);

        // Category
        await expect(this.productDetails.category).toContainText(productData.Category);

        // Price
        await expect(this.productDetails.price).toHaveText(productData.price);

        // Availability
        await expect(this.productDetails.availability).toContainText(productData.Availability);

        // Condition
        await expect(this.productDetails.condition)
            .toContainText(productData.Condition);

        // Brand
        await expect(this.productDetails.brand)
            .toContainText(productData.Brand);
    }
    async verifyProductDetailsImage() {
        await this.page.goto('/product_details/2');
        await this.page.waitForLoadState('domcontentloaded');
        // Verify image is visible
        await expect(this.productDetailsImage).toBeVisible();
        // Verify the image is loaded and not broken
        const imageLoaded = await this.productDetailsImage.evaluate(
            (img) => img.complete && img.naturalWidth > 0
        );
        expect(imageLoaded).toBe(true);
    }

    // AE-081 - Verify default product quantity
    async verifyDefaultProductQuantity() {
        await this.page.goto('product_details/2');
        await this.page.waitForLoadState('domcontentloaded');
        // Verify the quantity field is visible
        await expect(this.productQuantity).toBeVisible();
        // Verify default quantity
        await expect(this.productQuantity).toHaveValue(productData.productQuantity);
    }
    // AE-082 - Verify product can be added to Cart with the default quantity
    async addProductToCartWithDefaultQuantity() {
        await this.page.goto('/product_details/2');
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.productDetails.name).toHaveText(productData.name);
        await expect(this.productQuantity).toHaveValue(productData.productQuantity);
        await this.productDetailsAddToCart.click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText(productData.cartConfirmation);
        // 5. Click View Cart
        await this.cartConfirmation.viewCart.click();
        // 6. Verify product in Cart
        const menTshirtCartRow = this.page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]").first();
        await expect(menTshirtCartRow).toBeVisible();
        // Verify quantity
        await expect(menTshirtCartRow.locator("td.cart_quantity button")).toHaveText(productData.productQuantity);
    }
    // AE-083 - Verify custom product quantity is maintained in Cart
    async verifyCustomProductQuantityInCart() {
        // 1. Open the Product Details page
        await this.page.goto('/product_details/2');
        await this.page.waitForLoadState('domcontentloaded');
        // 2. Change quantity to 4
        await this.productQuantity.fill(productData.Quantity);
        // Verify the selected quantity
        await expect(this.productQuantity).toHaveValue(productData.Quantity);
        // 3. Click Add to Cart
        await this.productDetailsAddToCart.click();
        // 4. Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText(productData.cartConfirmation);
        // Click View Cart
        await this.cartConfirmation.viewCart.click();
        // 5. Locate Men Tshirt cart row
        const menTshirtCartRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        ).first();
        await expect(menTshirtCartRow).toBeVisible();
        // Verify quantity is exactly 4
        await expect(menTshirtCartRow.locator("td.cart_quantity button")).toHaveText(productData.Quantity);
    }

    // AE-084 - Verify valid product review submission
    async verifyValidProductReview() {
        await this.page.goto('/product_details/2');
        await this.page.waitForLoadState('domcontentloaded');
        // 2. Verify Write Your Review section
        await expect(this.page.locator("//a[normalize-space()='Write Your Review']")).toBeVisible();
        await this.productReview.name.fill(signupData.name);
        await this.productReview.email.fill(signupData.registeredEmail);
        await this.productReview.review.fill(productData.message);
        await this.productReview.submit.click();
        // 7. Verify a success message
        await expect(this.productReview.successMessage).toBeVisible();
        await expect(this.productReview.successMessage).toHaveText(productData.successMessage);
    }

    // AE-085 - Verify review validation with invalid email
    async verifyInvalidReviewEmail() {
        // Open the Product Details page
        await this.page.goto('/product_details/2');
        await this.page.waitForLoadState('domcontentloaded');
        await this.productReview.name.fill(signupData.name);
        await this.productReview.email.fill(signupData.invalidEmail);
        await this.productReview.review.fill(productData.message);
        await this.productReview.submit.click();
        await expect(this.productReview.email).toBeFocused();
        // Get native browser validation message
        await expect(this.productReview.email).toHaveJSProperty('validity.typeMismatch', true);
    }

    // AE-086 - Verify invalid Product Details ID handling
    async verifyInvalidProductDetailsId() {
        // Navigate to invalid Product Details ID
        const response = await this.page.goto('/product_details/999999');

        // Verify page received a response
        expect(response).not.toBeNull();

        // Wait for page loading
        await this.page.waitForLoadState('domcontentloaded');

        // Get HTTP status
        const status = response.status();

        console.log(`AE-086 - Invalid Product Details ID response status: ${status}`);

        // Verify application does not return a server error
        expect(status).toBeLessThan(500);

        // Verify the browser page is still accessible
        await expect(this.page).toHaveURL('/product_details/999999');

        console.log('AE-086 - Invalid Product Details ID handling: PASS');
    }

    // AE-087 - Verify critical Product Details end-to-end flow
    async verifyCriticalProductDetailsFlow() {

        // 1. Open Product ID 2
        await this.page.goto('/product_details/2');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Verify product name
        await expect(this.productDetails.name).toHaveText(productData.name);

        // 3. Verify price
        await expect(this.productDetails.price).toHaveText(productData.price);

        // 4. Verify availability
        await expect(this.productDetails.availability).toContainText(productData.availability);

        // 5. Verify brand
        await expect(this.productDetails.brand).toContainText(productData.brand);

        // 6. Change quantity to 4
        await this.productQuantity.fill(productData.Quantity);

        await expect(this.productQuantity).toHaveValue(productData.Quantity);

        // 7. Add product to Cart
        await this.productDetailsAddToCart.click();

        // Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(productData.cartConfirmation);

        // 8. Open Cart
        await this.cartConfirmation.viewCart.click();

        // 9. Verify Men Tshirt in Cart
        const menTshirtCartRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        ).first();

        await expect(menTshirtCartRow).toBeVisible();

        // Verify product name
        await expect(menTshirtCartRow.locator("td.cart_description a")).toHaveText(productData.name);

        // 10. Verify quantity is exactly 4
        await expect(menTshirtCartRow.locator("td.cart_quantity button")).toHaveText(productData.Quantity);
    }
}
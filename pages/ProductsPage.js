import { expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import {ROUTES} from "../test-data/routes";


export class ProductsPage {

    constructor(page) {
        this.page = page;
        this.allProductsHeading = page.locator(
            "//h2[normalize-space()='All Products']"
        );
        this.productsList = page.locator(
            "//div[contains(@class,'features_items')]"
        );
        this.products = {

            cards: page.locator(
                "//div[contains(@class,'product-image-wrapper')]"
            ),
            blueTop: page.locator(
                "//p[normalize-space()='Blue Top']"
            ).first(),

            blueTopImage: page.locator(
                "//div[.//p[normalize-space()='Blue Top']]//img"
            ).first(),

            blueTopName: page.locator(
                "//p[normalize-space()='Blue Top']"
            ).first(),

            blueTopPrice: page.locator(
                "//div[.//p[normalize-space()='Blue Top']]//h2"
            ).first(),

            blueTopAddToCart: page.locator(
                "//div[.//p[normalize-space()='Blue Top']]//a[contains(@class,'add-to-cart')]"
            ).first(),

            blueTopViewProduct: page.locator(
                "//div[.//p[normalize-space()='Blue Top']]//a[contains(@href,'product_details')]"
            ).first(),

            menTshirt: page.locator(
                "//p[normalize-space()='Men Tshirt']"
            ).first(),

            menTshirtAddToCart: page.locator(
                "//div[.//p[normalize-space()='Men Tshirt']]//a[contains(@class,'add-to-cart')]"
            ).first(),
        };

        this.cartConfirmation = {

            modal: page.locator(
                "//div[@class='modal-content']"
            ),

            addedMessage: page.locator(
                "//h4[normalize-space()='Added!']"
            ),

            viewCart: page.locator(
                "//u[normalize-space()='View Cart']"
            ),

            continueShopping: page.locator(
                "//button[normalize-space()='Continue Shopping']"
            ),
        };

        this.productSearch = {
            searchInput: page.locator(
                "//input[@id='search_product']"
            ),

            searchButton: page.locator("//button[@id='submit_search']"),

            searchedProductsHeading: page.locator("//h2[normalize-space()='Searched Products']"),

            searchedProductCards: page.locator("//div[contains(@class,'product-image-wrapper')]"),
        };

        this.productImages = page.locator(
            "//div[contains(@class,'product-image-wrapper')]//img"
        );

        this.productDetails = {

            information: page.locator(
                "//div[contains(@class,'product-information')]"
            ),

            name: page.locator(
                "//div[contains(@class,'product-information')]//h2"
            ),

            category: page.locator(
                "//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Category:')]"
            ),

            price: page.locator(
                "//span[normalize-space()='Rs. 400']"
            ),

            availability: page.locator(
                "//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Availability:')]"
            ),

            condition: page.locator(
                "//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Condition:')]"
            ),

            brand: page.locator(
                "//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Brand:')]"
            ),

        };

        this.productDetailsImage = page.locator(
            "//div[contains(@class,'product-details')]//img"
        ).first();
        this.productQuantity = page.locator(
            "//input[@id='quantity']"
        );
        this.productDetailsAddToCart = page.locator(
            "//button[normalize-space()='Add to cart']"
        );
        this.productReview = {
            name: page.locator("//input[@id='name']"),

            email: page.locator("//input[@id='email']"),

            review: page.locator("//textarea[@id='review']"),

            submit: page.locator("//button[@id='button-review']"),

            successMessage: page.locator("//div[@id='review-section']//span[contains(normalize-space(),'Thank you for your review.')]"),
        };
    }


    async open() {
        await this.page.goto(
            ROUTES.PRODUCTS,
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );
    }
    async waitForPageLoad() {
        await expect(
            this.allProductsHeading
        ).toBeVisible();
    }
    async verifyProductsPage() {

        await expect(
            this.page
        ).toHaveURL(ROUTES.PRODUCTS);

        await expect(
            this.allProductsHeading
        ).toBeVisible();

        await expect(
            this.productsList
        ).toBeVisible();
    }
    async verifyProductCardInformation() {

        await expect(
            this.products.cards.first()
        ).toBeVisible();

        await expect(
            this.products.blueTop
        ).toBeVisible();

        await expect(
            this.products.blueTopImage
        ).toBeVisible();

        await expect(
            this.products.blueTopName
        ).toHaveText('Blue Top');

        await expect(
            this.products.blueTopPrice
        ).toHaveText('Rs. 500');

        await expect(
            this.products.blueTopAddToCart
        ).toBeVisible();

        await expect(
            this.products.blueTopViewProduct
        ).toBeVisible();
    }
    async verifyAllProductsDisplayed() {

        await expect(
            this.allProductsHeading
        ).toBeVisible();

        await expect(
            this.products.cards.first()
        ).toBeVisible();

        const productCount = await this.products.cards.count();

        expect(productCount).toBeGreaterThan(0);

        for (let i = 0; i < productCount; i++) {

            const productCard =
                this.products.cards.nth(i);

            await productCard.scrollIntoViewIfNeeded();

            await expect(
                productCard
            ).toBeVisible();

            await expect(
                productCard.locator("img").first()
            ).toBeVisible();

            await expect(
                productCard.locator("p").first()
            ).toBeVisible();

            await expect(
                productCard.locator("h2").first()
            ).toBeVisible();
        }

    }
    async verifyAddToCart() {

        await expect(
            this.products.blueTop
        ).toBeVisible();

        await this.products.blueTopAddToCart.click();

        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toBeVisible();

        await expect(
            this.cartConfirmation.viewCart
        ).toBeVisible();

        await expect(
            this.cartConfirmation.continueShopping
        ).toBeVisible();
    }
    async verifyMultipleProductsInCart() {
        await this.page.goto(
            ROUTES.CART,
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );

        const removeButtons = this.page.locator(
            "//a[contains(@class,'cart_quantity_delete')]"
        );
        let removeCount = await removeButtons.count();
        while (removeCount > 0) {
            await removeButtons.first().click();
            await this.page.waitForTimeout(300);
            removeCount = await removeButtons.count();
        }
        await this.page.goto(
            ROUTES.PRODUCTS,
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );
        await this.waitForPageLoad();
        await this.products.blueTopAddToCart.click();
        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toBeVisible();
        await this.cartConfirmation.continueShopping.click();
        await expect(
            this.cartConfirmation.modal
        ).toBeHidden();
        await this.products.menTshirtAddToCart.click();
        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();
        await expect(
            this.cartConfirmation.addedMessage
        ).toBeVisible();
        await this.cartConfirmation.viewCart.click();
        await expect(
            this.page
        ).toHaveURL(ROUTES.CART);

        const blueTopCartRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        ).first();

        await expect(
            blueTopCartRow
        ).toBeVisible();

        await expect(
            blueTopCartRow.locator(
                "td.cart_price p"
            )
        ).toHaveText('Rs. 500');

        await expect(
            blueTopCartRow.locator(
                "td.cart_quantity button"
            )
        ).toHaveText('2');

        await expect(
            blueTopCartRow.locator(
                "td.cart_total p"
            )
        ).toHaveText('Rs. 1000');

        const menTshirtCartRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        ).first();

        await expect(
            menTshirtCartRow
        ).toBeVisible();

        await expect(
            menTshirtCartRow.locator(
                "td.cart_price p"
            )
        ).toHaveText('Rs. 400');

        await expect(
            menTshirtCartRow.locator(
                "td.cart_quantity button"
            )
        ).toHaveText('1');

        await expect(
            menTshirtCartRow.locator(
                "td.cart_total p"
            )
        ).toHaveText('Rs. 400');

        const cartTotal = this.page.locator(
            "//p[contains(@class,'cart_total_price')]"
        );

        await expect(
            blueTopCartRow.locator(
                "td.cart_total p"
            )
        ).toHaveText('Rs. 500');

        await expect(
            menTshirtCartRow.locator(
                "td.cart_total p"
            )
        ).toHaveText('Rs. 400');
    }

    // AE-071 - Verify product search with a valid keyword
    async verifyValidProductSearch() {
        await expect(this.productSearch.searchInput).toBeVisible();
        await this.productSearch.searchInput.fill("Blue Top");
        await this.productSearch.searchButton.click();
        await expect(this.productSearch.searchedProductsHeading).toBeVisible();
        const productCount = await this.productSearch.searchedProductCards.count();
        expect(productCount).toBeGreaterThan(0);
        for (let i = 0; i < productCount; i++) {

            const productCard = this.productSearch.searchedProductCards.nth(i);
            await productCard.scrollIntoViewIfNeeded();
            await expect(productCard).toBeVisible();
            const productName =
                await productCard
                    .locator("p")
                    .first()
                    .innerText();
            expect(productName.trim()).not.toBe('');
        }
    }

    async verifyInvalidProductSearch() {
        await expect(this.productSearch.searchInput).toBeVisible();
        await this.productSearch.searchInput.fill("abc123");
        await this.productSearch.searchButton.click();
        await expect(this.productSearch.searchedProductsHeading).toBeVisible();
        const productCount = await this.productSearch.searchedProductCards.count();
        expect(productCount).toBe(0);
    }
    async verifyEmptyProductSearch() {
        await expect(this.productSearch.searchInput).toBeVisible();
        await this.productSearch.searchInput.fill('');
        await expect(this.productSearch.searchInput).toHaveValue('');
        await this.productSearch.searchButton.click();
        await expect(this.page).toHaveURL(ROUTES.PRODUCTS);
        await expect(this.productSearch.searchedProductsHeading).not.toBeVisible();
    }
    async verifyCaseInsensitiveProductSearch() {

        const searchKeywords = [
            "blue top",
            "Men Tshirt",
            "Sleeveless dress",
        ];

        for (const keyword of searchKeywords) {
            await this.productSearch.searchInput.fill("");
            await this.productSearch.searchInput.fill(keyword);
            await this.productSearch.searchButton.click();
            await expect(this.productSearch.searchedProductsHeading).toBeVisible();
            const productCount = await this.productSearch.searchedProductCards.count();
            expect(productCount).toBeGreaterThan(0);
            for (let i = 0; i < productCount; i++) {
                const productCard = this.productSearch.searchedProductCards.nth(i);
                await productCard.scrollIntoViewIfNeeded();
                await expect(productCard).toBeVisible();
                const productName = await productCard
                        .locator("xpath=.//p")
                        .first()
                        .innerText();

                const productPrice = await productCard
                        .locator(
                            "xpath=.//h2[contains(normalize-space(), 'Rs.')]"
                        )
                        .first()
                        .innerText();
                expect(productName.trim()).not.toBe("");
                expect(productPrice.trim()).not.toBe("");

                const viewProduct = productCard.locator(
                        "xpath=.//a[contains(normalize-space(), 'View Product')]"
                    ).first();

                await expect(viewProduct).toBeVisible();
                await viewProduct.click();
                await expect(this.page).toHaveURL(/.*\/product_details\/\d+/);
                const detailName = this.page.locator(
                        "//div[contains(@class,'product-information')]//h2"
                    );

                const detailCategory = this.page.locator(
                        "//div[contains(@class,'product-information')]//p[contains(.,'Category:')]"
                    );

                const detailPrice = this.page.locator(
                        "//div[contains(@class,'product-information')]//span/span"
                    );

                const detailAvailability = this.page.locator(
                        "//div[contains(@class,'product-information')]//p[contains(.,'Availability:')]"
                    );

                const detailCondition = this.page.locator(
                        "//div[contains(@class,'product-information')]//p[contains(.,'Condition:')]"
                    );

                const detailBrand = this.page.locator(
                        "//div[contains(@class,'product-information')]//p[contains(.,'Brand:')]"
                    );
                await expect(detailName).toBeVisible();
                await expect(detailCategory).toBeVisible();
                await expect(detailPrice).toBeVisible();
                await expect(detailAvailability).toBeVisible();
                await expect(detailCondition).toBeVisible();
                await expect(detailBrand).toBeVisible();

                const productDetailName = (await detailName.innerText()).trim();
                const productCategory = (await detailCategory.innerText()).trim();
                const productDetailPrice = (await detailPrice.innerText()).trim();
                const productAvailability = (await detailAvailability.innerText()).trim();
                const productCondition = (await detailCondition.innerText()).trim();
                const productBrand = (await detailBrand.innerText()).trim();
                expect(productDetailName).not.toBe("");
                expect(productCategory).not.toBe("");
                expect(productDetailPrice).not.toBe("");
                expect(productAvailability).not.toBe("");
                expect(productCondition).not.toBe("");
                expect(productBrand).not.toBe("");
                await this.page.goBack();
                await expect(this.productSearch.searchedProductsHeading).toBeVisible();
            }
        }
    }
    async verifyProductImages() {

        const imageCount = await this.productImages.count();
        expect(imageCount).toBeGreaterThan(0);
        for (let i = 0; i < imageCount; i++) {

            const image = this.productImages.nth(i);
            await image.scrollIntoViewIfNeeded();
            await expect(image).toBeVisible();
            const imageSource = await image.getAttribute("src");
            const imageAlt = await image.getAttribute("alt");
            const imageStatus = await image.evaluate((img) => ({
                    complete: img.complete,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight
                }));
            expect(imageSource).not.toBeNull();
            expect(imageSource).not.toBe("");
            expect(
                imageStatus.complete,
                `Image ${i + 1} did not complete loading. Source: ${imageSource}`
            ).toBe(true);

            expect(
                imageStatus.naturalWidth,
                `Image ${i + 1} is broken. Source: ${imageSource}`
            ).toBeGreaterThan(0);

        }

    }

    async verifyProductsCriticalSmokeFlow() {
        await this.page.goto(ROUTES.PRODUCTS);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.productsPage.heading).toBeVisible();
        await this.productsPage.searchInput.fill('top');
        await this.productsPage.searchButton.click();
        await expect(this.productsPage.searchedProductsHeading).toBeVisible();

        const blueTopProduct = this.page.locator("//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]").first();
        await expect(blueTopProduct).toBeVisible();
        const viewProduct = blueTopProduct.locator("xpath=.//a[contains(normalize-space(),'View Product')]").first();
        await expect(viewProduct).toBeVisible();
        await viewProduct.click();
        await expect(this.page).toHaveURL(/\/product_details\/\d+/);
        const productInformation = this.page.locator("//div[contains(@class,'product-information')]");
        await expect(productInformation).toBeVisible();
        await expect(productInformation.locator("xpath=.//h2").first()).toHaveText('Blue Top');
        await expect(productInformation.locator("xpath=.//p[contains(normalize-space(),'Category:')]")).toBeVisible();
        await expect(productInformation.locator("xpath=.//span[contains(normalize-space(),'Rs.')]").first()).toBeVisible();
        await expect(productInformation.locator("xpath=.//p[contains(normalize-space(),'Availability:')]")).toBeVisible();
        await expect(productInformation.locator("xpath=.//p[contains(normalize-space(),'Condition:')]")).toBeVisible();
        await expect(productInformation.locator("xpath=.//p[contains(normalize-space(),'Brand:')]")).toBeVisible();

        await this.page.goto(ROUTES.PRODUCTS);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.productsPage.heading).toBeVisible();

        const blueTopAgain = this.page.locator("//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]").first();
        await expect(blueTopAgain).toBeVisible();
        const addToCart = blueTopAgain.locator("xpath=.//a[contains(normalize-space(),'Add to cart')]").first();
        await expect(addToCart).toBeVisible();
        await addToCart.click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toBeVisible();

        await expect(this.cartConfirmation.viewCart).toBeVisible();
        await this.cartConfirmation.viewCart.click();
        await expect(this.page).toHaveURL(ROUTES.CART);

        const blueTopCartRow = this.page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]").first();
        await expect(blueTopCartRow).toBeVisible();

        await expect(blueTopCartRow.locator("td.cart_description a")).toHaveText('Blue Top');
        await expect(blueTopCartRow.locator("td.cart_price p")).toHaveText('Rs. 500');
        await expect(blueTopCartRow.locator("td.cart_quantity button")).toHaveText('1');
        await expect(blueTopCartRow.locator("td.cart_total p")).toHaveText('Rs. 500');

    }
    async verifyProductDetailsPage() {

        await this.page.goto(ROUTES.PRODUCTDETAILS);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(ROUTES.PRODUCTDETAILS);
        await expect(this.productDetails.information).toBeVisible();
        await expect(this.productDetails.name).toHaveText('Men Tshirt');
        await expect(this.productDetails.category).toBeVisible();
        await expect(this.productDetails.price).toHaveText('Rs. 400');
        await expect(this.productDetails.availability).toBeVisible();
        await expect(this.productDetails.condition).toBeVisible();
        await expect(this.productDetails.brand).toBeVisible();
    }

    async verifyEssentialProductInformation() {
        await expect(this.productDetails.name).toHaveText('Men Tshirt');
        await expect(this.productDetails.category).toContainText('Category: Men > Tshirts');
        await expect(this.productDetails.price).toHaveText('Rs. 400');
        await expect(this.productDetails.availability).toContainText('Availability: In Stock');
        await expect(this.productDetails.condition).toContainText('Condition: New');
        await expect(this.productDetails.brand).toContainText('Brand: H&M');
    }

    async verifyProductDetailsImage() {
        await this.page.goto(ROUTES.PRODUCTDETAILS);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.productDetailsImage).toBeVisible();
        const imageLoaded = await this.productDetailsImage.evaluate(
            (img) => img.complete && img.naturalWidth > 0
        );
        expect(imageLoaded).toBe(true);
    }
    async verifyDefaultProductQuantity() {
        await this.page.goto(ROUTES.PRODUCTDETAILS);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.productQuantity).toBeVisible();
        await expect(this.productQuantity).toHaveValue('1');
    }
    async addProductToCartWithDefaultQuantity() {

        await this.page.goto(ROUTES.PRODUCTDETAILS);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.productDetails.name).toHaveText('Men Tshirt');
        await expect(this.productQuantity).toHaveValue('1');
        await this.productDetailsAddToCart.click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');
        await this.cartConfirmation.viewCart.click();
        const menTshirtCartRow = this.page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]").first();
        await expect(menTshirtCartRow).toBeVisible();
        await expect(menTshirtCartRow.locator("td.cart_quantity button")).toHaveText('1');
    }

    async verifyCustomProductQuantityInCart() {

        await this.page.goto(ROUTES.PRODUCTDETAILS);
        await this.page.waitForLoadState('domcontentloaded');
        await this.productQuantity.fill('4');
        await expect(this.productQuantity).toHaveValue('4');
        await this.productDetailsAddToCart.click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');
        await this.cartConfirmation.viewCart.click();
        const menTshirtCartRow = this.page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]").first();
        await expect(menTshirtCartRow).toBeVisible();
        await expect(menTshirtCartRow.locator("td.cart_quantity button")).toHaveText('4');
    }

    async verifyValidProductReview() {

        await this.page.goto(ROUTES.PRODUCTDETAILS);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.locator("//a[normalize-space()='Write Your Review']")).toBeVisible();
        await this.productReview.name.fill('QA Tester');
        await this.productReview.email.fill('mosaeb009@gmail.com');
        await this.productReview.review.fill('Good product');
        await this.productReview.submit.click();
        await expect(this.productReview.successMessage).toBeVisible();
        await expect(this.productReview.successMessage).toHaveText('Thank you for your review.');
    }

    async verifyInvalidReviewEmail() {

        await this.page.goto(ROUTES.PRODUCTDETAILS);
        await this.page.waitForLoadState('domcontentloaded');
        await this.productReview.name.fill('QA Tester');
        await this.productReview.email.fill('invalid-email');
        await this.productReview.review.fill('Good product');
        await this.productReview.submit.click();
        await expect(this.productReview.email).toBeFocused();
        const validationMessage = await this.productReview.email.evaluate((input) => input.validationMessage);
        expect(validationMessage).not.toBe('');
    }

    async verifyInvalidProductDetailsId() {

        const response = await this.page.goto(ROUTES.PRODUCTDETAILS_TWO);
        expect(response).not.toBeNull();
        await this.page.waitForLoadState('domcontentloaded');
        const status = response.status();
        expect(status).toBeLessThan(500);
        await expect(this.page).toHaveURL(ROUTES.PRODUCTDETAILS_TWO);
    }
    async verifyCriticalProductDetailsFlow() {
        await this.page.goto(ROUTES.PRODUCTDETAILS);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.productDetails.name).toHaveText('Men Tshirt');
        await expect(this.productDetails.price).toHaveText('Rs. 400');
        await expect(this.productDetails.availability).toContainText('In Stock');
        await expect(this.productDetails.brand).toContainText('H&M');
        await this.productQuantity.fill('4');
        await expect(this.productQuantity).toHaveValue('4');
        await this.productDetailsAddToCart.click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');
        await this.cartConfirmation.viewCart.click();
        const menTshirtCartRow = this.page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]").first();
        await expect(menTshirtCartRow).toBeVisible();
        await expect(menTshirtCartRow.locator("td.cart_description a")).toHaveText('Men Tshirt');
        await expect(menTshirtCartRow.locator("td.cart_quantity button")).toHaveText('4');

    }
}

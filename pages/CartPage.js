import { expect } from '@playwright/test';

export class CartPage {

    constructor(page) {

        this.page = page;

        // ==========================================
        // AE-088 - Cart Page
        // ==========================================

        this.cartPage = page.locator(
            "//section[@id='cart_items']"
        );

        this.emptyCartMessage = page.locator(
            "//p[contains(normalize-space(),'Cart is empty!')]"
        );

        this.emptyCartBuyProductsLink = page.locator(
            "//p[contains(normalize-space(),'Cart is empty!')]//a"
        );

        // AE-089 - Cart product
        this.cartProduct = {

            row: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
            ).first(),

            name: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]//td[contains(@class,'cart_description')]//a"
            ).first(),

            price: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]//td[contains(@class,'cart_price')]//p"
            ).first(),

            quantity: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]//td[contains(@class,'cart_quantity')]//button"
            ).first(),

            total: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]//td[contains(@class,'cart_total')]//p"
            ).first(),
        };

        // Add to Cart confirmation
        this.cartConfirmation = {

            modal: page.locator("//div[@class='modal-content']"),

            addedMessage: page.locator("//h4[normalize-space()='Added!']"),

            viewCart: page.locator("//u[normalize-space()='View Cart']"),

            continueShopping: page.locator("//button[normalize-space()='Continue Shopping']"),
        };

        // AE-090 - Multiple Cart Products
        this.products = {
            blueTop: page.locator(
                "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
            ).first(),

            menTshirt: page.locator(
                "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Men Tshirt']]"
            ).first(),
        };

        // AE-091 - Product Details quantity
        this.productDetails = {

            quantityInput: page.locator(
                "//input[@id='quantity']"
            ),

            addToCart: page.locator(
                "//button[contains(@class,'cart')]"
            ),
        };
    }


    // ==========================================
    // AE-088 - Verify Empty Cart
    // ==========================================

    async verifyEmptyCartPage() {

        // 1. Open Cart page
        await this.page.goto('/view_cart');

        // 2. Wait for page loading
        await this.page.waitForLoadState('domcontentloaded');

        // 3. Verify Cart URL
        await expect(this.page).toHaveURL('/view_cart');

        // 4. Verify Cart page
        await expect(this.cartPage).toBeVisible();

        // 5. Verify an empty-cart message
        await expect(this.emptyCartMessage).toBeVisible();

        // 6. Verify message text
        await expect(this.emptyCartMessage).toContainText('Cart is empty!');

        // 7. Verify Buy Products link
        await expect(this.emptyCartBuyProductsLink).toBeVisible();

        console.log('AE-088 - Empty Cart page: PASS');
    }


    // AE-089 - Verify a single product can be added and displayed in Cart
    async verifySingleProductInCart() {

        // 1. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Select Blue Top
        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(
            blueTopProduct
        ).toBeVisible();

        // 3. Click Add to Cart
        await blueTopProduct.locator(
            "xpath=.//a[@data-product-id='1' and contains(@class,'add-to-cart')]"
        ).first().click();

    // 4. Verify Add to Cart confirmation
        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toHaveText('Added!');

        // Click View Cart
        await this.cartConfirmation.viewCart.click();

        // 5. Verify the Blue Top row
        await expect(this.cartProduct.row).toBeVisible();

        // 6. Verify product name
        await expect(this.cartProduct.name).toHaveText('Blue Top');

        // Verify price
        await expect(this.cartProduct.price).toHaveText('Rs. 500');

        // Verify quantity
        await expect(this.cartProduct.quantity).toHaveText('1');

        // Verify total
        await expect(this.cartProduct.total).toHaveText('Rs. 500');

        console.log('AE-089 - Blue Top added to Cart successfully: PASS');
    }

    // AE-090 - Verify multiple products can be added and displayed in Cart
    async verifyMultipleProductsInCart() {

        // 1. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Add Blue Top to Cart
        await expect(this.products.blueTop).toBeVisible();

        await this.products.blueTop.locator("xpath=.//a[contains(@class,'add-to-cart')]").first().click();

        // Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');

        // 3. Click Continue Shopping
        await this.cartConfirmation.continueShopping.click();

        // 4. Add Men Tshirt to Cart
        await expect(this.products.menTshirt).toBeVisible();

        await this.products.menTshirt.locator("xpath=.//a[contains(@class,'add-to-cart')]").first().click();

        // Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');

        // 5. Click View Cart
        await this.cartConfirmation.viewCart.click();

        // 6. Verify Blue Top is displayed
        const blueTopRow = this.page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]");

        await expect(blueTopRow).toBeVisible();

        // Verify Men Tshirt is displayed
        const menTshirtRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );

        await expect(menTshirtRow).toBeVisible();

        // 7. Verify Blue Top price
        await expect(blueTopRow.locator("xpath=.//td[contains(@class,'cart_price')]//p")).toHaveText('Rs. 500');

        // Verify Men Tshirt price
        await expect(menTshirtRow.locator("xpath=.//td[contains(@class,'cart_price')]//p")).toHaveText('Rs. 400');

        // 8. Verify Blue Top quantity
        await expect(blueTopRow.locator("xpath=.//td[contains(@class,'cart_quantity')]//button")).toHaveText('1');

        // Verify Men Tshirt quantity
        await expect(menTshirtRow.locator("xpath=.//td[contains(@class,'cart_quantity')]//button")).toHaveText('1');

        await this.page.waitForTimeout(5000);
        console.log(
            'AE-090 - Multiple products displayed in Cart successfully: PASS'
        );
    }


    // AE-091 - Verify the selected quantity is maintained in Cart
    async verifySelectedQuantityInCart() {

        // 1. Open Men Tshirt Product Details page
        await this.page.goto('/product_details/2');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Verify the quantity field is visible
        await expect(this.productDetails.quantityInput).toBeVisible();

        // Change quantity to 4
        await this.productDetails.quantityInput.fill('6');

        // Verify the selected quantity
        await expect(this.productDetails.quantityInput).toHaveValue('6');

        // 3. Click Add to Cart
        await this.productDetails.addToCart.click();

        // 4. Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');

        // Click View Cart
        await this.cartConfirmation.viewCart.click();

        // 5. Verify Men Tshirt quantity in Cart
        const menTshirtRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );

        await expect(menTshirtRow).toBeVisible();

        const quantity = menTshirtRow.locator(
            "xpath=.//td[contains(@class,'cart_quantity')]//button"
        );

        await expect(quantity).toHaveText('6');

        await this.page.waitForTimeout(5000);
        console.log(
            'AE-091 - Selected quantity 6 maintained in Cart: PASS'
        );
    }

    // AE-092 - Verify product price, quantity, and total-price calculation
    async verifyCartPriceCalculation() {

        // 1. Add Men T-shirt to Cart with quantity 2
        await this.page.goto('/product_details/2');

        await this.page.waitForLoadState('domcontentloaded');

        // Set quantity to 2
        await this.productDetails.quantityInput.fill('3');

        await expect(this.productDetails.quantityInput).toHaveValue('3');

        // Add to Cart
        await this.productDetails.addToCart.click();

        // Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');

        // 2. Open Cart
        await this.cartConfirmation.viewCart.click();

        // Locate Men Tshirt row
        const menTshirtRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );

        await expect(menTshirtRow).toBeVisible();

        // 3. Record unit price
        const priceText = await menTshirtRow.locator(
            "xpath=.//td[contains(@class,'cart_price')]//p"
        ).innerText();

        // Convert "Rs. 400" → 400
        const unitPrice = Number(priceText.replace('Rs. ', '').trim());

        // Verify unit price
        expect(unitPrice).toBe(400);

        // 4. Verify quantity
        const quantityText = await menTshirtRow.locator(
            "xpath=.//td[contains(@class,'cart_quantity')]//button"
        ).innerText();

        const quantity = Number(quantityText.trim());

        expect(quantity).toBe(3);

        // 5. Verify the total price
        const totalText = await menTshirtRow.locator(
            "xpath=.//td[contains(@class,'cart_total')]//p"
        ).innerText();

        const actualTotal = Number(
            totalText.replace('Rs. ', '').trim()
        );

        // 6. Calculate the expected total
        const expectedTotal = unitPrice * quantity;

        // Compare total with unit price × quantity
        expect(actualTotal).toBe(expectedTotal);

        console.log(
            `AE-092 - Price calculation verified: ${unitPrice} × ${quantity} = ${actualTotal}`
        );
    }

    // AE-093 - Verify one selected product can be removed without removing other products
    async verifyRemoveSelectedProductFromCart() {

        // 1. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // Add Blue Top
        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();

        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        // Verify confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');

        // 2. Click Continue Shopping
        await this.cartConfirmation.continueShopping.click();

        // Add Men Tshirt
        const menTshirtProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Men Tshirt']]"
        ).first();

        await expect(menTshirtProduct).toBeVisible();

        await menTshirtProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        // Verify confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');

        // 3. Open Cart
        await this.cartConfirmation.viewCart.click();

        // Locate both product rows
        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        const menTshirtRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );

        // Verify both products are initially present
        await expect(blueTopRow).toBeVisible();

        await expect(menTshirtRow).toBeVisible();

        // 4. Click the Remove / X button for Blue Top
        await blueTopRow.locator(
            "xpath=.//td[contains(@class,'cart_delete')]//a"
        ).click();

        // Verify Blue Top is removed
        await expect(blueTopRow).toHaveCount(0);

        // 5. Verify Men Tshirt remains
        await expect(menTshirtRow).toBeVisible();

        await this.page.waitForTimeout(5000);
        console.log('AE-093 - Blue Top removed and Men T shirt remains in Cart: PASS');
    }

    // AE-094 - Verify Proceed To Checkout navigation
    async verifyProceedToCheckoutNavigation() {

        // 1. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // Add Blue Top
        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();

        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        // Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');

        // 2. Open Cart
        await this.cartConfirmation.viewCart.click();

        // 3. Verify Cart contents
        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(blueTopRow).toBeVisible();

        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Blue Top');

        // 4. Click Proceed To Checkout
        const proceedToCheckout = this.page.locator("//a[normalize-space()='Proceed To Checkout']");

        await expect(proceedToCheckout).toBeVisible();

        await proceedToCheckout.click();

        await this.page.waitForTimeout(5000);

        console.log(
            'AE-094 - Proceed To Checkout navigation verified: PASS'
        );
    }

    // ==========================================
// AE-095 - Verify logged-in user can proceed from Cart to Checkout
// ==========================================

    async verifyLoggedInUserCanProceedToCheckout() {

        // 1. Open Login page
        await this.page.goto('/login');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Login with a valid account
        await this.page.locator("//input[@data-qa='login-email']").fill('mosaeb009@gmail.com');

        await this.page.locator("//input[@data-qa='login-password']").fill('1234');

        await this.page.locator("//button[@data-qa='login-button']").click();

        // Verify user is logged in
        await expect(
            this.page.locator(
                "//a[contains(normalize-space(),'Logged in as')]"
            )
        ).toBeVisible();

        // 3. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // 4. Select Blue Top
        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();

        // 5. Add Blue Top to Cart
        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        // 6. Verify Add to Cart confirmation
        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toHaveText('Added!');

        // 7. Click View Cart
        await this.cartConfirmation.viewCart.click();

        // 8. Verify Cart page
        await expect(this.cartPage).toBeVisible();

        // 9. Verify Blue Top is in Cart
        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(blueTopRow).toBeVisible();

        // 10. Verify product name
        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Blue Top');

        // 11. Verify product price
        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_price')]//p"
            )
        ).toHaveText('Rs. 500');

        // 12. Verify quantity
        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_quantity')]//button"
            )
        ).toHaveText('1');

        // 13. Verify total
        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_total')]//p"
            )
        ).toHaveText('Rs. 500');

        // 14. Click Proceed To Checkout
        const proceedToCheckout = this.page.locator(
            "//a[normalize-space()='Proceed To Checkout']"
        );

        await expect(proceedToCheckout).toBeVisible();

        await proceedToCheckout.click();

        // 15. Verify Checkout page
        await expect(this.page).toHaveURL(/\/checkout/);

        // 16. Verify Checkout heading
        await expect(
            this.page.locator(
                "//h2[normalize-space()='Address Details']"
            )
        ).toBeVisible();

        await expect(
            this.page.locator(
                "//h2[normalize-space()='Review Your Order']"
            )
        ).toBeVisible();

        // 17. Verify Blue Top in order
        const checkoutBlueTop = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(checkoutBlueTop).toBeVisible();

        // 18. Verify the product name in order
        await expect(
            checkoutBlueTop.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Blue Top');

        // 19. Verify price
        await expect(
            checkoutBlueTop.locator(
                "xpath=.//td[contains(@class,'cart_price')]//p"
            )
        ).toHaveText('Rs. 500');

        // 20. Verify quantity
        await expect(
            checkoutBlueTop.locator(
                "xpath=.//td[contains(@class,'cart_quantity')]//button"
            )
        ).toHaveText('1');

        // 21. Verify total
        await expect(
            checkoutBlueTop.locator(
                "xpath=.//td[contains(@class,'cart_total')]//p"
            )
        ).toHaveText('Rs. 500');

        console.log(
            'AE-095 - Logged-in user successfully proceeded to Checkout with Blue Top: PASS'
        );
    }


    // AE-098 - Verify Cart contents are retained after login

    async verifyCartContentsRetainedAfterLogin() {

        // 1. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Select Blue Top
        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();

        // 3. Add Blue Top to Cart
        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        // 4. Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');

        // 5. Open Cart
        await this.cartConfirmation.viewCart.click();

        // 6. Verify Blue Top is initially in Cart
        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(blueTopRow).toBeVisible();

        // 7. Verify the product name before login
        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Blue Top');

        // 8. Verify price before login
        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_price')]//p"
            )
        ).toHaveText('Rs. 500');

        // 9. Verify quantity before login
        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_quantity')]//button"
            )
        ).toHaveText('1');

        // 10. Navigate to Login
        await this.page.goto('/login');

        await this.page.waitForLoadState('domcontentloaded');

        // 11. Login with valid credentials
        await this.page.locator(
            "//input[@data-qa='login-email']"
        ).fill('mosaeb009@gmail.com');

        await this.page.locator(
            "//input[@data-qa='login-password']"
        ).fill('1234');

        await this.page.locator(
            "//button[@data-qa='login-button']"
        ).click();

        // 12. Verify user is logged in
        await expect(
            this.page.locator(
                "//a[contains(normalize-space(),'Logged in as')]"
            )
        ).toBeVisible();

        // 13. Return to Cart
        await this.page.goto('/view_cart');

        await this.page.waitForLoadState('domcontentloaded');

        // 14. Verify Blue Top is still in the Cart
        await expect(blueTopRow).toBeVisible();

        // 15. Verify product name after login
        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Blue Top');

        // 16. Verify price after login
        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_price')]//p"
            )
        ).toHaveText('Rs. 500');

        // 17. Verify quantity after login
        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_quantity')]//button"
            )
        ).toHaveText('1');

        // 18. Verify total after login
        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_total')]//p"
            )
        ).toHaveText('Rs. 500');

        console.log('AE-098 - Cart contents retained after login: PASS');
    }

    // AE-099 - Verify Complete Critical Cart Flow

    async verifyCompleteCriticalCartFlow() {

        // 1. Open Products page

        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Add Blue Top

        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();

        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        // Verify Add to Cart confirmation
        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toHaveText('Added!');

        // Continue Shopping
        await this.cartConfirmation.continueShopping.click();

        // 3. Add Men Tshirt

        const menTshirtProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Men Tshirt']]"
        ).first();

        await expect(menTshirtProduct).toBeVisible();

        await menTshirtProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        // Verify Add to Cart confirmation
        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toHaveText('Added!');

        // 4. Open Cart

        await this.cartConfirmation.viewCart.click();

        await expect(this.cartPage).toBeVisible();

        // 5. Locate both products

        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        const menTshirtRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );

        // 6. Verify Blue Top

        await expect(blueTopRow).toBeVisible();

        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Blue Top');

        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_price')]//p"
            )
        ).toHaveText('Rs. 500');

        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_quantity')]//button"
            )
        ).toHaveText('1');

        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_total')]//p"
            )
        ).toHaveText('Rs. 500');

        // 7. Verify Men Tshirt

        await expect(menTshirtRow).toBeVisible();

        await expect(
            menTshirtRow.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Men Tshirt');

        await expect(
            menTshirtRow.locator(
                "xpath=.//td[contains(@class,'cart_price')]//p"
            )
        ).toHaveText('Rs. 400');

        await expect(
            menTshirtRow.locator(
                "xpath=.//td[contains(@class,'cart_quantity')]//button"
            )
        ).toHaveText('1');

        await expect(
            menTshirtRow.locator(
                "xpath=.//td[contains(@class,'cart_total')]//p"
            )
        ).toHaveText('Rs. 400');

        // 8. Remove Blue Top

        await blueTopRow.locator(
            "xpath=.//td[contains(@class,'cart_delete')]//a"
        ).click();

        // Wait for the Blue Top row to disappear
        await expect(blueTopRow).toHaveCount(0);

        // 9. Verify Men Tshirt remains

        await expect(menTshirtRow).toBeVisible();

        await expect(
            menTshirtRow.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Men Tshirt');

        // 10. Login

        await this.page.goto('/login');

        await this.page.waitForLoadState('domcontentloaded');

        await this.page.locator(
            "//input[@data-qa='login-email']"
        ).fill('mosaeb009@gmail.com');

        await this.page.locator(
            "//input[@data-qa='login-password']"
        ).fill('1234');

        await this.page.locator(
            "//button[@data-qa='login-button']"
        ).click();

        // 11. Verify successful login

        await expect(
            this.page.locator(
                "//a[contains(normalize-space(),'Logged in as')]"
            )
        ).toBeVisible();

        // 12. Return to Cart

        await this.page.goto('/view_cart');

        await this.page.waitForLoadState('domcontentloaded');

        // 13. Verify Men T-shirt is still in Cart

        const remainingProduct = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );

        await expect(remainingProduct).toBeVisible();

        // 14. Proceed To Checkout

        const proceedToCheckout = this.page.locator(
            "//a[normalize-space()='Proceed To Checkout']"
        );

        await expect(proceedToCheckout).toBeVisible();

        await proceedToCheckout.click();

        // 15. Verify Checkout page

        await expect(this.page).toHaveURL(/\/checkout/);

        await expect(
            this.page.locator(
                "//h2[normalize-space()='Address Details']"
            )
        ).toBeVisible();

        await expect(
            this.page.locator(
                "//h2[normalize-space()='Review Your Order']"
            )
        ).toBeVisible();

        // 16. Verify the remaining product in Checkout

        const checkoutMenTshirt = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );

        await expect(checkoutMenTshirt).toBeVisible();

        await expect(
            checkoutMenTshirt.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Men Tshirt');

        await expect(
            checkoutMenTshirt.locator(
                "xpath=.//td[contains(@class,'cart_price')]//p"
            )
        ).toHaveText('Rs. 400');

        await expect(
            checkoutMenTshirt.locator(
                "xpath=.//td[contains(@class,'cart_quantity')]//button"
            )
        ).toHaveText('1');

        await expect(
            checkoutMenTshirt.locator(
                "xpath=.//td[contains(@class,'cart_total')]//p"
            )
        ).toHaveText('Rs. 400');

        await this.page.waitForTimeout(5000);
        console.log('AE-099 - Complete critical Cart flow verified successfully: PASS');
    }

    // ==========================================
// AE-100 - Verify Checkout page loads successfully
// ==========================================

    async verifyCheckoutPageLoadsSuccessfully() {

        // 1. Launch / open Login page
        await this.page.goto('/login');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Login with a valid registered account
        await this.page.locator(
            "//input[@data-qa='login-email']"
        ).fill(process.env.TEST_EMAIL);

        await this.page.locator(
            "//input[@data-qa='login-password']"
        ).fill(process.env.TEST_PASSWORD);

        await this.page.locator(
            "//button[@data-qa='login-button']"
        ).click();

        // Verify successful login
        await expect(
            this.page.locator(
                "//a[contains(normalize-space(),'Logged in as')]"
            )
        ).toBeVisible();

        // 3. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // 4. Select Blue Top
        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();

        // 5. Add Blue Top to Cart
        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        // 6. Verify Add to Cart confirmation
        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toHaveText('Added!');

        // 7. Open Cart
        await this.cartConfirmation.viewCart.click();

        await expect(this.cartPage).toBeVisible();

        // 8. Verify product is in Cart
        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(blueTopRow).toBeVisible();

        // 9. Click Proceed To Checkout
        const proceedToCheckout = this.page.locator(
            "//a[normalize-space()='Proceed To Checkout']"
        );

        await expect(proceedToCheckout).toBeVisible();

        await proceedToCheckout.click();

        // ==========================================
        // Checkout Page Verification
        // ==========================================

        // 10. Verify Checkout URL
        await expect(this.page).toHaveURL(/\/checkout/);

        // 11. Verify Address Details
        await expect(
            this.page.locator(
                "//h2[normalize-space()='Address Details']"
            )
        ).toBeVisible();

        // 12. Verify Review Your Order
        await expect(
            this.page.locator(
                "//h2[normalize-space()='Review Your Order']"
            )
        ).toBeVisible();

        // 13. Verify Blue Top in order
        const checkoutProduct = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(checkoutProduct).toBeVisible();

        // 14. Verify product name
        await expect(
            checkoutProduct.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Blue Top');

        // 15. Verify price
        await expect(
            checkoutProduct.locator(
                "xpath=.//td[contains(@class,'cart_price')]//p"
            )
        ).toHaveText('Rs. 500');

        // 16. Verify quantity
        await expect(
            checkoutProduct.locator(
                "xpath=.//td[contains(@class,'cart_quantity')]//button"
            )
        ).toHaveText('1');

        // 17. Verify total
        await expect(
            checkoutProduct.locator(
                "xpath=.//td[contains(@class,'cart_total')]//p"
            )
        ).toHaveText('Rs. 500');

        // 18. Verify comment field
        await expect(
            this.page.locator(
                "//textarea[@name='message']"
            )
        ).toBeVisible();

        // 19. Verify Place Order button
        await expect(
            this.page.locator(
                "//a[normalize-space()='Place Order']"
            )
        ).toBeVisible();

        console.log(
            'AE-100 - Checkout page loaded successfully: PASS'
        );
    }

    // AE-101 - Verify delivery and billing addresses match registered account information
    async verifyDeliveryAndBillingAddresses() {

        // 1. Login with a valid registered account
        await this.page.goto('/login');

        await this.page.waitForLoadState('domcontentloaded');

        await this.page.locator(
            "input[data-qa='login-email']"
        ).fill(process.env.TEST_EMAIL);

        await this.page.locator(
            "input[data-qa='login-password']"
        ).fill(process.env.TEST_PASSWORD);

        await this.page.locator(
            "button[data-qa='login-button']"
        ).click();

        // Verify user is logged in
        await expect(
            this.page.locator("a:has-text('Logout')")
        ).toBeVisible();

        // 2. Open Products page

        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // 3. Add Blue Top to Cart

        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();

        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        // 4. Verify Add to Cart confirmation
        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toHaveText('Added!');

        // 5. Open Cart
        await this.cartConfirmation.viewCart.click();

        await expect(
            this.page
        ).toHaveURL('/view_cart');

        // 6. Verify Blue Top is in Cart
        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(
            blueTopRow
        ).toBeVisible();

        // 7. Proceed To Checkout
        const proceedToCheckout = this.page.locator(
            "//a[normalize-space()='Proceed To Checkout']"
        );

        await expect(
            proceedToCheckout
        ).toBeVisible();

        await proceedToCheckout.click();

        // 8. Verify Checkout page
        await expect(
            this.page
        ).toHaveURL('/checkout');

        // 9. Locate Delivery Address
        const deliveryAddress = this.page.locator(
            '#address_delivery'
        );

        await expect(
            deliveryAddress
        ).toBeVisible();

        // 10. Verify Delivery Address
        await expect(
            deliveryAddress
        ).toContainText('MOSAEB BIN MOZIB');

        await expect(
            deliveryAddress
        ).toContainText('Syntax');

        await expect(
            deliveryAddress
        ).toContainText('Nathullabad barishal');

        await expect(
            deliveryAddress
        ).toContainText('Dhaka Dhilli');

        await expect(
            deliveryAddress
        ).toContainText('1122');

        await expect(
            deliveryAddress
        ).toContainText('India');

        await expect(
            deliveryAddress
        ).toContainText('01302692330');

        // 11. Locate Billing Address
        const billingAddress = this.page.locator(
            '#address_invoice'
        );

        await expect(
            billingAddress
        ).toBeVisible();

        // 12. Verify Billing Address
        await expect(
            billingAddress
        ).toContainText('MOSAEB BIN MOZIB');

        await expect(
            billingAddress
        ).toContainText('Syntax');

        await expect(
            billingAddress
        ).toContainText('Nathullabad barishal');

        await expect(
            billingAddress
        ).toContainText('Dhaka Dhilli');

        await expect(
            billingAddress
        ).toContainText('1122');

        await expect(
            billingAddress
        ).toContainText('India');

        await expect(
            billingAddress
        ).toContainText('01302692330');

        // 13. Compare Delivery and Billing Addresses
        const deliveryDetails = await deliveryAddress
            .locator('li')
            .evaluateAll(items =>
                items
                    .slice(1)
                    .map(item => item.textContent?.trim())
                    .filter(Boolean)
            );

        const billingDetails = await billingAddress
            .locator('li')
            .evaluateAll(items =>
                items
                    .slice(1)
                    .map(item => item.textContent?.trim())
                    .filter(Boolean)
            );

        // 14. Verify both addresses match
        expect(
            deliveryDetails
        ).toEqual(billingDetails);

        console.log(
            'AE-101 - Delivery and billing addresses match registered account information: PASS'
        );
    }


    // AE-103 - Verify total order amount is calculated correctly
    async verifyCheckoutTotalOrderAmount() {

        // 1. Login
        await this.page.goto('/login');

        await this.page.getByPlaceholder('Email Address').first()
            .fill(process.env.TEST_EMAIL);

        await this.page.getByPlaceholder('Password').fill(
            process.env.TEST_PASSWORD);

        await this.page
            .getByRole('button', { name: 'Login' })
            .first()
            .click();

        // Verify login
        await expect(
            this.page.getByText(/Logged in as/i)
        ).toBeVisible();


        // 2. Open Blue Top product
        await this.page.goto('/product_details/1');

        // 3. Set quantity = 3
        await this.productDetails.quantityInput.fill('3');

        // 4. Add to Cart
        await this.productDetails.addToCart.click();

        await expect(this.cartConfirmation.modal).toBeVisible();


        // 5. Open Cart
        await this.cartConfirmation.viewCart.click();

        await expect(this.page).toHaveURL('/view_cart');


        // 6. Verify Blue Top
        const blueTopRow = this.page.locator(
            "//tr[.//a[normalize-space()='Blue Top']]"
        );

        await expect(blueTopRow).toBeVisible();

        await expect(blueTopRow).toContainText('Rs. 500');

        await expect(
            blueTopRow.locator('td.cart_quantity button')
        ).toHaveText('3');

        await expect(blueTopRow).toContainText('Rs. 1500');


        // 7. Proceed to Checkout
        const proceedToCheckout = this.page.locator(
            'a.check_out'
        );

        await expect(proceedToCheckout).toBeVisible();
        await proceedToCheckout.click();

        await expect(this.page).toHaveURL('/checkout');


        // 8. Calculate the expected total
        const price = 500;
        const quantity = 3;
        const expectedTotal = price * quantity;


        // 9. Get actual Total Amount
        const totalText = await this.page
            .locator("(//p[@class='cart_total_price'][normalize-space()='Rs. 1500'])[2]")
            .innerText();

        const actualTotal = Number(
            totalText.replace('Rs. ', '').trim()
        );


        // 10. Verify total
        expect(actualTotal).toBe(expectedTotal);

        console.log(
            `AE-103 - Rs. ${price} × ${quantity} = Rs. ${actualTotal} - PASS`
        );
    }


    // AE-104
    async verifyAddOrderComment() {

        // 1. Login
        await this.page.goto('/login');

        await this.page.getByPlaceholder('Email Address').first()
            .fill(process.env.TEST_EMAIL);

        await this.page.getByPlaceholder('Password').fill(
            process.env.TEST_PASSWORD);

        await this.page
            .getByRole('button', { name: 'Login' })
            .first()
            .click();

        // Verify login
        await expect(
            this.page.getByText(/Logged in as/i)
        ).toBeVisible();

        await this.page.goto('/checkout');
        await expect(this.page).toHaveURL('/checkout');

        const comment = 'Please deliver the order carefully.';
        const commentBox = this.page.locator('textarea[name="message"]');

        await expect(commentBox).toBeVisible();

        await commentBox.fill(comment);

        await expect(commentBox).toHaveValue(comment);

        await this.page.locator('a.check_out').filter({
            hasText: 'Place Order'
        }).click();

        await expect(this.page).toHaveURL('/payment');

        console.log('AE-104 - Add order comment: PASS');
    }
}
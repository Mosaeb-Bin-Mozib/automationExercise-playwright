import { expect } from '@playwright/test';
import {getCartData} from '../test-data/cartData';
import {getLoginData} from '../test-data/loginData';
const cartData = getCartData();
const loginData = getLoginData();

export class CartPage {

    constructor(page) {

        this.page = page;

        // ==========================================
        // AE-088 - Cart Page
        // ==========================================

        this.cartPage = page.locator(
            "//section[@id='cart_items']"
        );

        this.emptyCartMessage = page.locator("//p[contains(normalize-space(),'Cart is empty!')]");

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

        this.menTshirt = {

            row: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
            ).first(),

            name: page.locator(
                "(//a[normalize-space()='Men Tshirt'])[1]"
            ).first(),

            price: page.locator(
                "(//p[contains(text(),'Rs. 400')])[1]"
            ).first(),

            quantity: page.locator(
                "xpath=.//td[contains(@class,'cart_quantity')]//button"
            ).first(),

            total: page.locator(
                "//p[@class='cart_total_price'][normalize-space()='Rs. 400']"
            ).first(),

        };

        this.login = {

            emailField: page.locator("//input[@data-qa='login-email']"),

            passwordField: page.locator("//input[@data-qa='login-password']"),

            loginClick: page.locator("//button[@data-qa='login-button']"),

            loginConfirmation: page.locator("//a[contains(normalize-space(),'Logged in as')]"),
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
            blueTop: page.locator("xpath=.//a[@data-product-id='1' and contains(@class,'add-to-cart')]").first(),

            blueTopRemove: page.locator("//tr[@id='product-1']//i[@class='fa fa-times']"),

            blueTopProduct: page.locator("//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]").first(),

            menTshirtProduct: page.locator("//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Men Tshirt']]").first(),

            menTshirt: page.locator("xpath=.//a[@data-product-id='2' and contains(@class,'add-to-cart')]").first(),

            proceedToCheckout: page.locator("//a[normalize-space()='Proceed To Checkout']"),
            checkoutConfirmation: page.locator("//p[normalize-space()='Register / Login account to proceed on checkout.']"),
            checkoutHeading: page.locator("//h2[normalize-space()='Address Details']"),
            checkoutReviewHeading: page.locator("//h2[normalize-space()='Review Your Order']"),
            checkoutBlueTop: page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"),
            checkoutBlueTopName: page.locator("xpath=.//td[contains(@class,'cart_description')]//a"),
            checkoutBlueTopPrice: page.locator("xpath=.//td[contains(@class,'cart_price')]//p"),
            checkoutBlueTopQuantity: page.locator("xpath=.//td[contains(@class,'cart_quantity')]//button"),
            checkoutBlueTopTotal: page.locator("xpath=.//td[contains(@class,'cart_total')]//p"),


            checkoutMenTshirt: page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"),
            checkoutMenTshirtPrice: page.locator("xpath=.//td[contains(@class,'cart_price')]//p"),
            checkoutMenTshirtQty: page.locator("xpath=.//td[contains(@class,'cart_quantity')]//button"),
            checkoutMenTshirtTotal: page.locator("xpath=.//td[contains(@class,'cart_total')]//p"),

            checkoutComment: page.locator("//textarea[@name='message']"),
            checkoutPlaceOrder: page.locator("//a[normalize-space()='Place Order']"),
            checkoutTotal: page.locator("(//p[@class='cart_total_price'][normalize-space()='Rs. 1500'])[2]"),

            checkoutDeliveryAddress: page.locator("//h3[normalize-space()='Your delivery address']"),
            checkoutDeliveryAddressName: page.locator("//ul[@id='address_delivery']//li[@class='address_firstname address_lastname'][contains(text(),'Mr. MOSAEB')]"),
            checkoutDeliveryCompanyName: page.locator("(//li[@class='address_address1 address_address2'][normalize-space()='Syntax'])[1]"),
            checkoutDeliveryAddressOne: page.locator("(//li[@class='address_address1 address_address2'][normalize-space()='Nathullabad barishal'])[1]"),
            checkoutDeliveryState: page.locator("//ul[@id='address_delivery']//li[@class='address_city address_state_name address_postcode'][contains(text(),'Dhaka Dhaka')]"),
            checkoutDeliveryCountry: page.locator("(//li[@class='address_country_name'][normalize-space()='Australia'])[1]"),
            checkoutDeliveryPhone: page.locator("(//li[@class='address_phone'][normalize-space()='01302692330'])[1]"),


            checkoutBillingAddress: page.locator("//h3[normalize-space()='Your billing address']"),
            checkoutBillingAddressName: page.locator("(//li[@class='address_firstname address_lastname'][contains(text(),'Mr. MOSAEB')])[2]"),
            checkoutBillingCompanyName: page.locator("(//li[@class='address_address1 address_address2'][normalize-space()='Syntax'])[2]"),
            checkoutBillingAddressOne: page.locator("(//li[@class='address_address1 address_address2'][normalize-space()='Nathullabad barishal'])[3]"),
            checkoutBillingState: page.locator("//ul[@id='address_invoice']//li[@class='address_city address_state_name address_postcode'][contains(text(),'Dhaka Dhaka')]"),
            checkoutBillingCountry: page.locator("(//li[@class='address_country_name'][normalize-space()='Australia'])[2]"),
            checkoutBillingPhone: page.locator("(//li[@class='address_phone'][normalize-space()='01302692330'])[2]"),

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
        await expect(this.emptyCartMessage).toContainText(cartData.emptyCartMessage);

        // 7. Verify Buy Products link
        await expect(this.emptyCartBuyProductsLink).toBeVisible();
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

        await expect(blueTopProduct).toBeVisible();

        // 3. Click Add to Cart
        await blueTopProduct.locator("xpath=.//a[@data-product-id='1' and contains(@class,'add-to-cart')]"
        ).first().click();

    // 4. Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // Click View Cart
        await this.cartConfirmation.viewCart.click();

        // 5. Verify the Blue Top row
        await expect(this.cartProduct.row).toBeVisible();

        // 6. Verify product name
        await expect(this.cartProduct.name).toHaveText(cartData.productName);

        // Verify price
        await expect(this.cartProduct.price).toHaveText(cartData.productPrice);

        // Verify quantity
        await expect(this.cartProduct.quantity).toHaveText(cartData.productQuantity);

        // Verify total
        await expect(this.cartProduct.total).toHaveText(cartData.productPrice);
    }

    // AE-090 - Verify multiple products can be added and displayed in Cart
    async verifyMultipleProductsInCart() {

        // 1. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Add Blue Top to Cart
        await expect(this.products.blueTop).toBeVisible();

        await this.products.blueTop.click();

        // Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // 3. Click Continue Shopping
        await this.cartConfirmation.continueShopping.click();

        // 4. Add Men Tshirt to Cart
        await expect(this.products.menTshirt).toBeVisible();

        await this.products.menTshirt.click();

        // Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // 5. Click View Cart
        await this.cartConfirmation.viewCart.click();

        // 6. Verify Blue Top is displayed
        // const blueTopRow = this.page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]");

        await expect(this.cartProduct.row).toBeVisible();

        // Verify Men Tshirt is displayed
        await expect(this.menTshirt.row).toBeVisible();

        // 7. Verify Blue Top price
        await expect(this.cartProduct.price).toHaveText(cartData.productPrice);

        // Verify Men Tshirt price
        await expect(this.menTshirt.price).toHaveText(cartData.productPrice2);

        // 8. Verify Blue Top quantity
        await expect(this.cartProduct.quantity).toHaveText(cartData.productQuantity);

        // Verify Men Tshirt quantity
        await expect(this.menTshirt.quantity).toHaveText(cartData.productQuantity2);
    }


    // AE-091 - Verify the selected quantity is maintained in Cart
    async verifySelectedQuantityInCart() {

        // 1. Open Men Tshirt Product Details page
        await this.page.goto('/product_details/2');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Verify the quantity field is visible
        await expect(this.productDetails.quantityInput).toBeVisible();

        // Change quantity to 4
        await this.productDetails.quantityInput.fill(cartData.quantityInput);

        // Verify the selected quantity
        await expect(this.productDetails.quantityInput).toHaveValue(cartData.quantityInput);

        // 3. Click Add to Cart
        await this.productDetails.addToCart.click();

        // 4. Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // Click View Cart
        await this.cartConfirmation.viewCart.click();

        // 5. Verify Men Tshirt quantity in Cart
        await expect(this.menTshirt.row).toBeVisible();
        await expect(this.menTshirt.quantity).toHaveText(cartData.quantityInput);
        await expect(this.menTshirt.price).toHaveText(cartData.productPrice2);
    }

    // AE-092 - Verify product price, quantity, and total-price calculation
    async verifyCartPriceCalculation() {

        // 1. Add Men T-shirt to Cart with quantity 2
        await this.page.goto('/product_details/2');

        await this.page.waitForLoadState('domcontentloaded');

        // Set quantity to 2
        await this.productDetails.quantityInput.fill(cartData.quantityInput);

        await expect(this.productDetails.quantityInput).toHaveValue('3');

        // Add to Cart
        await this.productDetails.addToCart.click();

        // Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // 2. Open Cart
        await this.cartConfirmation.viewCart.click();

        // Locate Men Tshirt row
        const menTshirtRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );

        await expect(this.menTshirt.row).toBeVisible();

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
        await expect(this.products.blueTopProduct).toBeVisible();

        await this.products.blueTop.first().click();

        // Verify confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // 2. Click Continue Shopping
        await this.cartConfirmation.continueShopping.click();

        // Add Men Tshirt
        await expect(this.products.menTshirtProduct).toBeVisible();

        await this.products.menTshirt.first().click();

        // Verify confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // 3. Open Cart
        await this.cartConfirmation.viewCart.click();

        // Verify both products are initially present
        await expect(this.cartProduct.row).toBeVisible();

        await expect(this.menTshirt.row).toBeVisible();

        await this.products.blueTopRemove.click();

        // Verify Blue Top is removed
        await expect(this.cartProduct.row).toHaveCount(0);

        // 5. Verify Men Tshirt remains
        await expect(this.menTshirt.row).toBeVisible();
    }

    // AE-094 - Verify Proceed To Checkout navigation
    async verifyProceedToCheckoutNavigation() {

        // 1. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // Add Blue Top
        await expect(this.products.blueTopProduct).toBeVisible();

        await this.products.blueTop.click();

        // Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // 2. Open Cart
        await this.cartConfirmation.viewCart.click();

        await expect(this.cartProduct.row).toBeVisible();

        await expect(this.cartProduct.name).toHaveText(cartData.productName);

        // 4. Click Proceed To Checkout

        await expect(this.products.proceedToCheckout).toBeVisible();

        await this.products.proceedToCheckout.click();

        await expect(this.products.checkoutConfirmation).toHaveText(cartData.checkoutConfirmation);
    }

    // ==========================================
// AE-095 - Verify logged-in user can proceed from Cart to Checkout
// ==========================================

    async verifyLoggedInUserCanProceedToCheckout() {

        // 1. Open Login page
        await this.page.goto('/login');

        await this.page.waitForLoadState('domcontentloaded');

        // 3. Create LoginPage object

        await this.login.emailField.fill(loginData.email);

        await this.login.passwordField.fill(loginData.password);

        await this.login.loginClick.click();

        // Verify user is logged in
        await expect(this.login.loginConfirmation).toBeVisible();

        // 3. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.products.blueTopProduct).toBeVisible();

        // 5. Add Blue Top to Cart
        await this.products.blueTop.first().click();

        // 6. Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // 7. Click View Cart
        await this.cartConfirmation.viewCart.click();

        // 8. Verify Cart page
        await expect(this.cartPage).toBeVisible();

        await expect(this.cartProduct.row).toBeVisible();

        // 10. Verify product name
        await expect(this.cartProduct.name).toHaveText(cartData.productName);

        // 11. Verify product price
        await expect(this.cartProduct.price).toHaveText(cartData.productPrice);

        // 12. Verify quantity
        await expect(this.cartProduct.quantity).toHaveText(cartData.productQuantity);

        // 13. Verify total
        await expect(this.cartProduct.total).toHaveText(cartData.productPrice);

        // 14. Click Proceed To Checkout

        await expect(this.products.proceedToCheckout).toBeVisible();

        await this.products.proceedToCheckout.click();

        // 15. Verify Checkout page
        await expect(this.page).toHaveURL("/checkout");

        // 16. Verify Checkout heading
        await expect(this.products.checkoutHeading).toBeVisible();

        await expect(this.products.checkoutReviewHeading).toBeVisible();

        // 17. Verify Blue Top in order
        await expect(this.products.checkoutBlueTop).toBeVisible();

        // 18. Verify the product name in order
        await expect(this.products.checkoutBlueTopName).toHaveText(cartData.productName);

        // 19. Verify price
        await expect(this.products.checkoutBlueTopPrice).toHaveText(cartData.productPrice);

        // 20. Verify quantity
        await expect(this.products.checkoutBlueTopQuantity).toHaveText(cartData.productQuantity);

        // 21. Verify total
        await expect(this.products.checkoutBlueTopTotal).toHaveText(cartData.productPrice);
    }


    // AE-098 - Verify Cart contents are retained after login

    async verifyCartContentsRetainedAfterLogin() {

        // 1. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Select Blue Top
        await expect(this.products.blueTopProduct).toBeVisible();

        // 3. Add Blue Top to Cart
        await this.products.blueTop.first().click();

        // 4. Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // 5. Open Cart
        await this.cartConfirmation.viewCart.click();

        // 6. Verify Blue Top is initially in Cart

        await expect(this.cartProduct.row).toBeVisible();

        // 7. Verify the product name before login
        await expect(this.cartProduct.name).toHaveText(cartData.productName);

        // 8. Verify price before login
        await expect(this.cartProduct.price).toHaveText(cartData.productPrice);

        // 9. Verify quantity before login
        await expect( this.cartProduct.quantity).toHaveText(cartData.productQuantity);

        // 10. Navigate to Login
        await this.page.goto('/login');

        await this.page.waitForLoadState('domcontentloaded');

        // 11. Login with valid credentials
        await this.login.emailField.fill(loginData.email);

        await this.login.passwordField.fill(loginData.password);

        await this.login.loginClick.click();

        // 12. Verify user is logged in
        await expect(this.login.loginConfirmation).toBeVisible();

        // 13. Return to Cart
        await this.page.goto('/view_cart');

        await this.page.waitForLoadState('domcontentloaded');

        // 14. Verify Blue Top is still in the Cart
        await expect(this.cartProduct.row).toBeVisible();

        // 15. Verify product name after login
        await expect(this.cartProduct.name).toHaveText(cartData.productName);

        // 16. Verify price after login
        await expect(this.cartProduct.price).toHaveText(cartData.productPrice);

        // 17. Verify quantity after login
        await expect(this.cartProduct.quantity).toHaveText(cartData.productQuantity);

        // 18. Verify total after login
        await expect(this.cartProduct.total).toHaveText(cartData.productPrice);
    }

    // AE-099 - Verify Complete Critical Cart Flow

    async verifyCompleteCriticalCartFlow() {

        // 1. Open Products page

        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Add Blue Top

        await expect(this.products.blueTopProduct).toBeVisible();

        await this.products.blueTop.first().click();

        // Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // Continue Shopping
        await this.cartConfirmation.continueShopping.click();

        // 3. Add Men Tshirt

        await expect(this.products.menTshirtProduct).toBeVisible();

        await this.products.menTshirt.first().click();

        // Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // 4. Open Cart

        await this.cartConfirmation.viewCart.click();

        await expect(this.cartPage).toBeVisible();

        // 6. Verify Blue Top
        await expect(this.cartProduct.name).toHaveText(cartData.productName);

        await expect(this.cartProduct.price).toHaveText(cartData.productPrice);

        await expect(this.cartProduct.quantity).toHaveText(cartData.productQuantity);

        await expect(this.cartProduct.total).toHaveText(cartData.productPrice);

        // 7. Verify Men Tshirt
        await expect(this.menTshirt.row).toBeVisible();

        await expect(this.menTshirt.name).toHaveText(cartData.productName2);

        await expect(this.menTshirt.price).toHaveText(cartData.productPrice2);

        await expect(this.menTshirt.quantity).toHaveText(cartData.productQuantity2);

        await expect(this.menTshirt.total).toHaveText(cartData.productPrice2);

        // 8. Remove Blue Top

        await this.products.blueTopRemove.click();

        // Wait for the Blue Top row to disappear
        await expect(this.products.blueTopProduct).toHaveCount(0);

        // 9. Verify Men Tshirt remains

        await expect(this.menTshirt.row).toBeVisible();

        await expect(this.menTshirt.name).toHaveText(cartData.productName2);

        // 10. Login
        await this.page.goto('/login');

        await this.page.waitForLoadState('domcontentloaded');

        // 11. Login with valid credentials
        await this.login.emailField.fill(loginData.email);

        await this.login.passwordField.fill(loginData.password);

        await this.login.loginClick.click();

        // 12. Verify user is logged in
        await expect(this.login.loginConfirmation).toBeVisible();

        // 12. Return to Cart

        await this.page.goto('/view_cart');

        await this.page.waitForLoadState('domcontentloaded');

        // 13. Verify Men T-shirt is still in Cart

        await expect(this.menTshirt.row).toBeVisible();

        // 14. Proceed To Checkout

        await expect(this.products.proceedToCheckout).toBeVisible();

        await this.products.proceedToCheckout.click();

        // 15. Verify Checkout page

        await expect(this.page).toHaveURL("/checkout");

        await expect(this.products.checkoutHeading).toBeVisible();

        await expect(this.products.checkoutReviewHeading).toBeVisible();

        // 16. Verify the remaining product in Checkout
        await expect(this.products.checkoutMenTshirt).toBeVisible();

        // await expect(this.products.checkoutMenTshirtDes).toHaveText(cartData.productName2);

        await expect(this.products.checkoutMenTshirtPrice).toHaveText(cartData.productPrice2);

        await expect(this.products.checkoutMenTshirtQty).toHaveText(cartData.productQuantity2);

        await expect(this.products.checkoutMenTshirtTotal).toHaveText(cartData.productPrice2);
    }

    // ==========================================
// AE-100 - Verify Checkout page loads successfully
// ==========================================

    async verifyCheckoutPageLoadsSuccessfully() {
        await this.page.goto('/login');
        await this.page.waitForLoadState('domcontentloaded');
        await this.login.emailField.fill(loginData.email);
        await this.login.passwordField.fill(loginData.password);
        await this.login.loginClick.click();
        //Verify user is logged in
        await expect(this.login.loginConfirmation).toBeVisible();
        //Open Products page
        await this.page.goto('/products');
        await this.page.waitForLoadState('domcontentloaded');
        //Select Blue Top
        await expect(this.products.blueTopProduct).toBeVisible();

        //Add Blue Top to Cart
        await this.products.blueTop.first().click();

        //Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        //Open Cart
        await this.cartConfirmation.viewCart.click();
        await expect(this.cartPage).toBeVisible();
        //Verify the product is in the Cart
        await expect(this.cartProduct.row).toBeVisible();
        //Click Proceed To Checkout
        await expect(this.products.proceedToCheckout).toBeVisible();
        await this.products.proceedToCheckout.click();
        // Checkout Page Verification
        await expect(this.page).toHaveURL("/checkout");
        //Verify Address Details
        await expect(this.products.checkoutHeading).toBeVisible();
        //Verify Review Your Order
        await expect(this.products.checkoutReviewHeading).toBeVisible();
        // Verify Blue Top in order
        await expect(this.products.checkoutBlueTop).toBeVisible();

        //Verify the blue top product name
        await expect(this.products.checkoutBlueTopName).toHaveText(cartData.productName);
        //Verify price
        await expect(this.products.checkoutBlueTopPrice).toHaveText(cartData.productPrice);
        //Verify quantity
        await expect(this.products.checkoutBlueTopQuantity).toHaveText(cartData.productQuantity);
        //Verify total
        await expect(this.products.checkoutBlueTopTotal).toHaveText(cartData.productPrice);
        //Verify comment field
        await expect(this.products.checkoutComment).toBeVisible();
        //Verify Place Order button
        await expect(this.products.checkoutPlaceOrder).toBeVisible();

    }

    // AE-101 - Verify delivery and billing addresses match registered account information
    async verifyDeliveryAndBillingAddresses() {

        // 1. Login with a valid registered account
        await this.page.goto('/login');
        await this.page.waitForLoadState('domcontentloaded');
        await this.login.emailField.fill(loginData.email);
        await this.login.passwordField.fill(loginData.password);
        await this.login.loginClick.click();
        //Verify user is logged in
        await expect(this.login.loginConfirmation).toBeVisible();
        await this.page.goto('/products');
        await this.page.waitForLoadState('domcontentloaded');

        //Add Blue Top to Cart
        await expect(this.products.blueTopProduct).toBeVisible();
        await this.products.blueTop.first().click();

        //Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        //Open Cart
        await this.cartConfirmation.viewCart.click();
        await expect(this.page).toHaveURL('/view_cart');

        //Verify Blue Top is in Cart
        await expect(this.cartProduct.row).toBeVisible();

        //Proceed To Checkout
        await expect(this.products.proceedToCheckout).toBeVisible();
        await this.products.proceedToCheckout.click();
        //Verify Checkout page
        await expect(this.page).toHaveURL('/checkout');
        //Locate Delivery Address
        await expect(this.products.checkoutDeliveryAddress).toBeVisible();
        await expect(this.products.checkoutDeliveryAddressName).toContainText(cartData.checkoutAddressName);
        await expect(this.products.checkoutDeliveryCompanyName).toContainText(cartData.checkoutCompanyName);
        await expect(this.products.checkoutDeliveryAddressOne).toContainText(cartData.checkoutAddressOne);
        await expect(this.products.checkoutDeliveryState).toContainText(cartData.checkoutState);
        await expect(this.products.checkoutDeliveryCountry).toContainText(cartData.checkoutCountry);
        await expect(this.products.checkoutDeliveryPhone).toContainText(cartData.checkoutPhone);

        //Locate Billing Address
        await expect(this.products.checkoutBillingAddress).toBeVisible();
        await expect(this.products.checkoutBillingAddressName).toContainText(cartData.checkoutAddressName);
        await expect(this.products.checkoutBillingCompanyName).toContainText(cartData.checkoutCompanyName);
        await expect(this.products.checkoutBillingAddressOne).toContainText(cartData.checkoutAddressOne);
        await expect(this.products.checkoutBillingState).toContainText(cartData.checkoutState);
        await expect(this.products.checkoutBillingCountry).toContainText(cartData.checkoutCountry);
        await expect(this.products.checkoutBillingPhone).toContainText(cartData.checkoutPhone);

        //Compare Delivery and Billing Addresses
        const deliveryDetails = await this.products.checkoutDeliveryAddress
            .locator('li')
            .evaluateAll(items =>
                items
                    .slice(1)
                    .map(item => item.textContent?.trim())
                    .filter(Boolean)
            );

        const billingDetails = await this.products.checkoutBillingAddress
            .locator('li')
            .evaluateAll(items =>
                items
                    .slice(1)
                    .map(item => item.textContent?.trim())
                    .filter(Boolean)
            );

        //Verify both addresses match
        expect(deliveryDetails).toEqual(billingDetails);
    }


    // AE-103 - Verify total order amount is calculated correctly
    async verifyCheckoutTotalOrderAmount() {
        await this.page.goto('/login');
        await this.page.waitForLoadState('domcontentloaded');
        await this.login.emailField.fill(loginData.email);
        await this.login.passwordField.fill(loginData.password);
        await this.login.loginClick.click();
        //Verify user is logged in
        await expect(this.login.loginConfirmation).toBeVisible();
        //Open Blue Top product
        await this.page.goto('/product_details/1');
        //Set quantity = 3
        await this.productDetails.quantityInput.fill(cartData.quantityInput);
        //Add to Cart
        await this.productDetails.addToCart.click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        //Open Cart
        await this.cartConfirmation.viewCart.click();
        await expect(this.page).toHaveURL('/view_cart');
        //Verify Blue Top
        await expect(this.cartProduct.row).toBeVisible();
        await expect(this.cartProduct.price).toContainText(cartData.productPrice);
        await expect(this.cartProduct.quantity).toHaveText(cartData.quantityInput);
        await expect(this.cartProduct.total).toContainText(cartData.productTotal);
        //Proceed to Checkout
        await expect(this.products.proceedToCheckout).toBeVisible();
        await this.products.proceedToCheckout.click();
        await expect(this.page).toHaveURL('/checkout');
        //Calculate the expected total
        const price = 500;
        const quantity = 3;
        const expectedTotal = price * quantity;
        //Get actual Total Amount
        const totalText = await this.products.checkoutTotal.innerText();
        const actualTotal = Number(totalText.replace('Rs. ', '').trim());
        //Verify total
        expect(actualTotal).toBe(expectedTotal);
    }


    // AE-104
    async verifyAddOrderComment() {

        // 1. Login
        await this.page.goto('/login');
        await this.page.waitForLoadState('domcontentloaded');
        await this.login.emailField.fill(loginData.email);
        await this.login.passwordField.fill(loginData.password);
        await this.login.loginClick.click();
        //Verify user is logged in
        await expect(this.login.loginConfirmation).toBeVisible();

        await this.page.goto('/checkout');
        await expect(this.page).toHaveURL('/checkout');
        await expect(this.products.checkoutComment).toBeVisible();
        await this.products.checkoutComment.fill(cartData.comment);
        await expect(this.products.checkoutComment).toHaveValue(cartData.comment);

        await this.page.locator('a.check_out').filter({hasText: 'Place Order'}).click();
        await expect(this.page).toHaveURL('/payment');
    }
}
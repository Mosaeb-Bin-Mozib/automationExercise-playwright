import { expect } from '@playwright/test';
import {ROUTES} from "../test-data/routes";


export class CartPage {

    constructor(page) {

        this.page = page;
        this.cartPage = page.locator(
            "//section[@id='cart_items']"
        );
        this.emptyCartMessage = page.locator(
            "//p[contains(normalize-space(),'Cart is empty!')]"
        );
        this.emptyCartBuyProductsLink = page.locator(
            "//p[contains(normalize-space(),'Cart is empty!')]//a"
        );
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
        this.cartConfirmation = {

            modal: page.locator("//div[@class='modal-content']"),

            addedMessage: page.locator("//h4[normalize-space()='Added!']"),

            viewCart: page.locator("//u[normalize-space()='View Cart']"),

            continueShopping: page.locator("//button[normalize-space()='Continue Shopping']"),
        };
        this.products = {
            blueTop: page.locator(
                "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
            ).first(),

            menTshirt: page.locator(
                "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Men Tshirt']]"
            ).first(),
        };
        this.productDetails = {

            quantityInput: page.locator(
                "//input[@id='quantity']"
            ),

            addToCart: page.locator(
                "//button[contains(@class,'cart')]"
            ),
        };
    }
    async verifyEmptyCartPage() {
        await this.page.goto(ROUTES.CART);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(ROUTES.CART);
        await expect(this.cartPage).toBeVisible();
        await expect(this.emptyCartMessage).toBeVisible();
        await expect(this.emptyCartMessage).toContainText('Cart is empty!');
        await expect(this.emptyCartBuyProductsLink).toBeVisible();

    }
    async verifySingleProductInCart() {
        await this.page.goto(ROUTES.PRODUCTS);
        await this.page.waitForLoadState('domcontentloaded');
        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(
            blueTopProduct
        ).toBeVisible();
        await blueTopProduct.locator(
            "xpath=.//a[@data-product-id='1' and contains(@class,'add-to-cart')]"
        ).first().click();
        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toHaveText('Added!');
        await this.cartConfirmation.viewCart.click();
        await expect(this.cartProduct.row).toBeVisible();
        await expect(this.cartProduct.name).toHaveText('Blue Top');
        await expect(this.cartProduct.price).toHaveText('Rs. 500');
        await expect(this.cartProduct.quantity).toHaveText('1');
        await expect(this.cartProduct.total).toHaveText('Rs. 500');
    }
    async verifyMultipleProductsInCart() {
        await this.page.goto(ROUTES.PRODUCTS);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.products.blueTop).toBeVisible();
        await this.products.blueTop.locator("xpath=.//a[contains(@class,'add-to-cart')]").first().click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');
        await this.cartConfirmation.continueShopping.click();
        await expect(this.products.menTshirt).toBeVisible();
        await this.products.menTshirt.locator("xpath=.//a[contains(@class,'add-to-cart')]").first().click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');
        await this.cartConfirmation.viewCart.click();
        const blueTopRow = this.page.locator("//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]");
        await expect(blueTopRow).toBeVisible();
        const menTshirtRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );
        await expect(menTshirtRow).toBeVisible();
        await expect(blueTopRow.locator("xpath=.//td[contains(@class,'cart_price')]//p")).toHaveText('Rs. 500');
        await expect(menTshirtRow.locator("xpath=.//td[contains(@class,'cart_price')]//p")).toHaveText('Rs. 400');
        await expect(blueTopRow.locator("xpath=.//td[contains(@class,'cart_quantity')]//button")).toHaveText('1');
        await expect(menTshirtRow.locator("xpath=.//td[contains(@class,'cart_quantity')]//button")).toHaveText('1');

    }
    async verifySelectedQuantityInCart() {
        await this.page.goto(ROUTES.PRODUCTDETAILS);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.productDetails.quantityInput).toBeVisible();
        await this.productDetails.quantityInput.fill('6');
        await expect(this.productDetails.quantityInput).toHaveValue('6');
        await this.productDetails.addToCart.click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');
        await this.cartConfirmation.viewCart.click();
        const menTshirtRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );
        await expect(menTshirtRow).toBeVisible();
        const quantity = menTshirtRow.locator(
            "xpath=.//td[contains(@class,'cart_quantity')]//button"
        );
        await expect(quantity).toHaveText('6');
    }
    async verifyCartPriceCalculation() {
        await this.page.goto(ROUTES.PRODUCTDETAILS);
        await this.page.waitForLoadState('domcontentloaded');
        await this.productDetails.quantityInput.fill('3');
        await expect(this.productDetails.quantityInput).toHaveValue('3');
        await this.productDetails.addToCart.click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');
        await this.cartConfirmation.viewCart.click();
        const menTshirtRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );
        await expect(menTshirtRow).toBeVisible();
        const priceText = await menTshirtRow.locator(
            "xpath=.//td[contains(@class,'cart_price')]//p"
        ).innerText();
        const unitPrice = Number(priceText.replace('Rs. ', '').trim());
        expect(unitPrice).toBe(400);
        const quantityText = await menTshirtRow.locator(
            "xpath=.//td[contains(@class,'cart_quantity')]//button"
        ).innerText();
        const quantity = Number(quantityText.trim());
        expect(quantity).toBe(3);
        const totalText = await menTshirtRow.locator(
            "xpath=.//td[contains(@class,'cart_total')]//p"
        ).innerText();

        const actualTotal = Number(
            totalText.replace('Rs. ', '').trim()
        );
        const expectedTotal = unitPrice * quantity;
        expect(actualTotal).toBe(expectedTotal);
    }

    async verifyRemoveSelectedProductFromCart() {
        await this.page.goto(ROUTES.PRODUCTS);

        await this.page.waitForLoadState('domcontentloaded');
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
        await this.cartConfirmation.continueShopping.click();

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
        await this.cartConfirmation.viewCart.click();
        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );
        const menTshirtRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );

        // Verify both products are initially present
        await expect(blueTopRow).toBeVisible();

        await expect(menTshirtRow).toBeVisible();
        await blueTopRow.locator(
            "xpath=.//td[contains(@class,'cart_delete')]//a"
        ).click();
        await expect(blueTopRow).toHaveCount(0);
        await expect(menTshirtRow).toBeVisible();
    }

    // AE-094 - Verify Proceed To Checkout navigation
    async verifyProceedToCheckoutNavigation() {
        await this.page.goto(ROUTES.PRODUCTS);

        await this.page.waitForLoadState('domcontentloaded');
        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();
        await expect(blueTopProduct).toBeVisible();
        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');
        await this.cartConfirmation.viewCart.click();
        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(blueTopRow).toBeVisible();

        await expect(
            blueTopRow.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Blue Top');
        const proceedToCheckout = this.page.locator("//a[normalize-space()='Proceed To Checkout']");

        await expect(proceedToCheckout).toBeVisible();

        await proceedToCheckout.click();

    }

    async verifyLoggedInUserCanProceedToCheckout() {
        await this.page.goto(ROUTES.LOGIN);

        await this.page.waitForLoadState('domcontentloaded');

        // 2. Login with a valid account
        await this.page.locator("//input[@data-qa='login-email']").fill('mosaeb009@gmail.com');

        await this.page.locator("//input[@data-qa='login-password']").fill('1234');

        await this.page.locator("//button[@data-qa='login-button']").click();
        await expect(
            this.page.locator(
                "//a[contains(normalize-space(),'Logged in as')]"
            )
        ).toBeVisible();
        await this.page.goto(ROUTES.PRODUCTS);

        await this.page.waitForLoadState('domcontentloaded');

        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();
        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();
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
        const proceedToCheckout = this.page.locator(
            "//a[normalize-space()='Proceed To Checkout']"
        );

        await expect(proceedToCheckout).toBeVisible();

        await proceedToCheckout.click();
        await expect(this.page).toHaveURL(ROUTES.CHECKOUT);
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
        const checkoutBlueTop = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(checkoutBlueTop).toBeVisible();
        await expect(
            checkoutBlueTop.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Blue Top');
        await expect(
            checkoutBlueTop.locator(
                "xpath=.//td[contains(@class,'cart_price')]//p"
            )
        ).toHaveText('Rs. 500');
        await expect(
            checkoutBlueTop.locator(
                "xpath=.//td[contains(@class,'cart_quantity')]//button"
            )
        ).toHaveText('1');
        await expect(
            checkoutBlueTop.locator(
                "xpath=.//td[contains(@class,'cart_total')]//p"
            )
        ).toHaveText('Rs. 500');
    }

    async verifyCartContentsRetainedAfterLogin() {
        await this.page.goto(ROUTES.PRODUCTS);

        await this.page.waitForLoadState('domcontentloaded');

        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();
        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');
        await this.cartConfirmation.viewCart.click();
        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );
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

        await this.page.goto(ROUTES.LOGIN);

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

        await expect(
            this.page.locator(
                "//a[contains(normalize-space(),'Logged in as')]"
            )
        ).toBeVisible();

        await this.page.goto(ROUTES.CART);

        await this.page.waitForLoadState('domcontentloaded');

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
    }

    async verifyCompleteCriticalCartFlow() {

        await this.page.goto(ROUTES.PRODUCTS);

        await this.page.waitForLoadState('domcontentloaded');


        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();

        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toHaveText('Added!');

        await this.cartConfirmation.continueShopping.click();

        const menTshirtProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Men Tshirt']]"
        ).first();

        await expect(menTshirtProduct).toBeVisible();

        await menTshirtProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toHaveText('Added!');

        await this.cartConfirmation.viewCart.click();

        await expect(this.cartPage).toBeVisible();

        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        const menTshirtRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );


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


        await blueTopRow.locator(
            "xpath=.//td[contains(@class,'cart_delete')]//a"
        ).click();

        await expect(blueTopRow).toHaveCount(0);

        await expect(menTshirtRow).toBeVisible();

        await expect(
            menTshirtRow.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Men Tshirt');


        await this.page.goto(ROUTES.LOGIN);

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


        await expect(
            this.page.locator(
                "//a[contains(normalize-space(),'Logged in as')]"
            )
        ).toBeVisible();


        await this.page.goto(ROUTES.CART);

        await this.page.waitForLoadState('domcontentloaded');


        const remainingProduct = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
        );

        await expect(remainingProduct).toBeVisible();


        const proceedToCheckout = this.page.locator(
            "//a[normalize-space()='Proceed To Checkout']"
        );

        await expect(proceedToCheckout).toBeVisible();

        await proceedToCheckout.click();


        await expect(this.page).toHaveURL(ROUTES.CHECKOUT);

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
    }

    async verifyCheckoutPageLoadsSuccessfully() {
        await this.page.goto(ROUTES.LOGIN);

        await this.page.waitForLoadState('domcontentloaded');

        await this.page.locator(
            "//input[@data-qa='login-email']"
        ).fill(process.env.TEST_EMAIL);

        await this.page.locator(
            "//input[@data-qa='login-password']"
        ).fill(process.env.TEST_PASSWORD);

        await this.page.locator(
            "//button[@data-qa='login-button']"
        ).click();

        await expect(
            this.page.locator(
                "//a[contains(normalize-space(),'Logged in as')]"
            )
        ).toBeVisible();

        await this.page.goto(ROUTES.PRODUCTS);

        await this.page.waitForLoadState('domcontentloaded');

        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();

        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toHaveText('Added!');

        await this.cartConfirmation.viewCart.click();

        await expect(this.cartPage).toBeVisible();

        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(blueTopRow).toBeVisible();
        const proceedToCheckout = this.page.locator(
            "//a[normalize-space()='Proceed To Checkout']"
        );

        await expect(proceedToCheckout).toBeVisible();

        await proceedToCheckout.click();
        await expect(this.page).toHaveURL(ROUTES.CHECKOUT);

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

        const checkoutProduct = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(checkoutProduct).toBeVisible();

        await expect(
            checkoutProduct.locator(
                "xpath=.//td[contains(@class,'cart_description')]//a"
            )
        ).toHaveText('Blue Top');

        await expect(
            checkoutProduct.locator(
                "xpath=.//td[contains(@class,'cart_price')]//p"
            )
        ).toHaveText('Rs. 500');

        await expect(
            checkoutProduct.locator(
                "xpath=.//td[contains(@class,'cart_quantity')]//button"
            )
        ).toHaveText('1');

        await expect(
            checkoutProduct.locator(
                "xpath=.//td[contains(@class,'cart_total')]//p"
            )
        ).toHaveText('Rs. 500');

        await expect(
            this.page.locator(
                "//textarea[@name='message']"
            )
        ).toBeVisible();

        await expect(
            this.page.locator(
                "//a[normalize-space()='Place Order']"
            )
        ).toBeVisible();

    }

    async verifyDeliveryAndBillingAddresses() {

        await this.page.goto(ROUTES.LOGIN);

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

        await expect(
            this.page.locator("a:has-text('Logout')")
        ).toBeVisible();


        await this.page.goto(ROUTES.PRODUCTS);

        await this.page.waitForLoadState('domcontentloaded');


        const blueTopProduct = this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopProduct).toBeVisible();

        await blueTopProduct.locator(
            "xpath=.//a[contains(@class,'add-to-cart')]"
        ).first().click();

        await expect(
            this.cartConfirmation.modal
        ).toBeVisible();

        await expect(
            this.cartConfirmation.addedMessage
        ).toHaveText('Added!');

        await this.cartConfirmation.viewCart.click();

        await expect(
            this.page
        ).toHaveURL(ROUTES.CART);

        const blueTopRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        );

        await expect(
            blueTopRow
        ).toBeVisible();

        const proceedToCheckout = this.page.locator(
            "//a[normalize-space()='Proceed To Checkout']"
        );

        await expect(
            proceedToCheckout
        ).toBeVisible();

        await proceedToCheckout.click();

        await expect(
            this.page
        ).toHaveURL(ROUTES.CHECKOUT);

        const deliveryAddress = this.page.locator(
            '#address_delivery'
        );

        await expect(
            deliveryAddress
        ).toBeVisible();

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

        const billingAddress = this.page.locator(
            '#address_invoice'
        );

        await expect(
            billingAddress
        ).toBeVisible();

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

        expect(
            deliveryDetails
        ).toEqual(billingDetails);

    }


    async verifyCheckoutTotalOrderAmount() {

        await this.page.goto(ROUTES.LOGIN);

        await this.page.getByPlaceholder('Email Address').first()
            .fill(process.env.TEST_EMAIL);

        await this.page.getByPlaceholder('Password').fill(
            process.env.TEST_PASSWORD);

        await this.page
            .getByRole('button', { name: 'Login' })
            .first()
            .click();

        await expect(
            this.page.getByText(/Logged in as/i)
        ).toBeVisible();
        
        await this.page.goto(ROUTES.PRODUCTDETAILS_ONE);
        await this.productDetails.quantityInput.fill('3');
        await this.productDetails.addToCart.click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await this.cartConfirmation.viewCart.click();
        await expect(this.page).toHaveURL(ROUTES.CART);

        const blueTopRow = this.page.locator(
            "//tr[.//a[normalize-space()='Blue Top']]"
        );
        await expect(blueTopRow).toBeVisible();
        await expect(blueTopRow).toContainText('Rs. 500');
        await expect(
            blueTopRow.locator('td.cart_quantity button')
        ).toHaveText('3');
        await expect(blueTopRow).toContainText('Rs. 1500');
        const proceedToCheckout = this.page.locator(
            'a.check_out'
        );

        await expect(proceedToCheckout).toBeVisible();
        await proceedToCheckout.click();

        await expect(this.page).toHaveURL(ROUTES.CHECKOUT);
        const price = 500;
        const quantity = 3;
        const expectedTotal = price * quantity;
        const totalText = await this.page
            .locator("(//p[@class='cart_total_price'][normalize-space()='Rs. 1500'])[2]")
            .innerText();

        const actualTotal = Number(
            totalText.replace('Rs. ', '').trim()
        );

        expect(actualTotal).toBe(expectedTotal);

    }
    async verifyAddOrderComment() {

        await this.page.goto(ROUTES.LOGIN);
        await this.page.getByPlaceholder('Email Address').first()
            .fill(process.env.TEST_EMAIL);
        await this.page.getByPlaceholder('Password').fill(
            process.env.TEST_PASSWORD);
        await this.page
            .getByRole('button', { name: 'Login' })
            .first()
            .click();

        await expect(
            this.page.getByText(/Logged in as/i)
        ).toBeVisible();

        await this.page.goto(ROUTES.CHECKOUT);
        await expect(this.page).toHaveURL(ROUTES.CHECKOUT);

        const comment = 'Please deliver the order carefully.';
        const commentBox = this.page.locator('textarea[name="message"]');

        await expect(commentBox).toBeVisible();

        await commentBox.fill(comment);

        await expect(commentBox).toHaveValue(comment);

        await this.page.locator('a.check_out').filter({
            hasText: 'Place Order'
        }).click();

        await expect(this.page).toHaveURL(ROUTES.PAYMENT);
    }
}

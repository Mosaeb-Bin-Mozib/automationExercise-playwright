import { test } from '../../fixtures/Cart.fixture';
import {getCartData} from '../../test-data/cartData';
import {getLoginData} from '../../test-data/loginData';
const cartData = getCartData()
const loginData = getLoginData()
import {expect} from "@playwright/test";
import ROUTES from "../../test-data/routes";

test.describe('Cart Page', () => {
    test('AE-088 - Verify Cart page loads successfully when cart is empty', async ({ cartPage }) => {
        await cartPage.page.goto(ROUTES.CART);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await expect(cartPage.page).toHaveURL(ROUTES.CART);
        await expect(cartPage.cartPage).toBeVisible();
        await expect(cartPage.emptyCartMessage).toBeVisible();
        await expect(cartPage.emptyCartMessage).toContainText(cartData.emptyCartMessage);
        await expect(cartPage.emptyCartBuyProductsLink).toBeVisible();
        }
    );
    test('AE-089 - Verify single product can be added and displayed in Cart', async ({ cartPage }) => {
        await cartPage.page.goto(ROUTES.PRODUCTS);
        await cartPage.page.waitForLoadState('domcontentloaded');
        const blueTopProduct = cartPage.blueTopProduct.blueTop.first();
        await expect(blueTopProduct).toBeVisible();
        await blueTopProduct.locator(cartPage.blueTopProduct.addToCart).first().click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();

        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.viewCart.click();
        await expect(cartPage.cartProduct.row).toBeVisible();
        await expect(cartPage.cartProduct.name).toHaveText(cartData.productName);
        await expect(cartPage.cartProduct.price).toHaveText(cartData.productPrice);
        await expect(cartPage.cartProduct.quantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.cartProduct.total).toHaveText(cartData.productPrice);
        }
    );
    test('AE-090 - Verify multiple products can be added and displayed in Cart', async ({ cartPage }) => {
        await cartPage.page.goto(ROUTES.PRODUCTS);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await expect(cartPage.products.blueTop).toBeVisible();
        await cartPage.products.blueTop.locator(cartPage.blueTopProduct.addToCart).first().click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.continueShopping.click();
        await expect(cartPage.products.menTshirt).toBeVisible();
        await cartPage.products.menTshirt.locator(cartPage.manTshirtProduct.addToCart).first().click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.viewCart.click();
        await expect(cartPage.blueTopProduct.blueTopRow).toBeVisible();
        await expect(cartPage.manTshirtProduct.manTshirtRow).toBeVisible();
        await expect(cartPage.blueTopProduct.blueTopPrice).toHaveText(cartData.productPrice);
        await expect(cartPage.blueTopProduct.blueTopQuantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.blueTopProduct.blueTopQuantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.blueTopProduct.blueTopTotal).toHaveText(cartData.productPrice);
        await expect(cartPage.manTshirtProduct.manTshirtPrice).toHaveText(cartData.productPrice2);
        await expect(cartPage.manTshirtProduct.manTshirtQuantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.manTshirtProduct.manTshirtTotal).toHaveText(cartData.productPrice2);
    });
    test('AE-091 - Verify selected quantity is maintained in Cart', async ({ cartPage }) => {
        await cartPage.page.goto(ROUTES.PRODUCTDETAILS);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await expect(cartPage.productDetails.quantityInput).toBeVisible();
        await cartPage.productDetails.quantityInput.fill(cartData.quantityInput2);
        await expect(cartPage.productDetails.quantityInput).toHaveValue(cartData.quantityInput2);
        await cartPage.productDetails.addToCart.click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.viewCart.click();
        await expect(cartPage.manTshirtProduct.manTshirtRow).toBeVisible();
        await expect(cartPage.manTshirtProduct.manTshirtQuantitySix).toHaveText(cartData.quantityInput2);}
    );

    test('AE-092 - Verify product price, quantity, and total-price calculation', async ({ cartPage }) => {
        await cartPage.page.goto(ROUTES.PRODUCTDETAILS);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await cartPage.productDetails.quantityInput.fill(cartData.quantityInput);
        await expect(cartPage.productDetails.quantityInput).toHaveValue(cartData.quantityInput);
        await cartPage.productDetails.addToCart.click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.viewCart.click();
        await expect(cartPage.manTshirtProduct.manTshirtRow).toBeVisible();
        const priceText = await cartPage.manTshirtProduct.manTshirtPrice2.innerText();
        const unitPrice = Number(priceText.replace('Rs. ', '').trim());
        expect(unitPrice).toBe(400);
        const quantityText = await cartPage.manTshirtProduct.manTshirtQuantityThree.innerText();
        const quantity = Number(quantityText.trim());
        expect(quantity).toBe(3);
        const totalText = await cartPage.manTshirtProduct.manTshirtTotalThreeProduct.innerText();
        const actualTotal = Number(totalText.replace('Rs. ', '').trim());
        const expectedTotal = unitPrice * quantity;
        expect(actualTotal).toBe(expectedTotal);
    });
    test('AE-093 - Verify one selected product can be removed without removing other products', async ({ cartPage }) => {
        await cartPage.page.goto(ROUTES.PRODUCTS);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await expect(cartPage.blueTopProduct.blueTop).toBeVisible();
        await cartPage.blueTopProduct.addToCart.first().click();

        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.continueShopping.click();

        await expect(cartPage.manTshirtProduct.manTshirt).toBeVisible();
        await cartPage.manTshirtProduct.addToCart.first().click();


        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.viewCart.click();

        await expect(cartPage.blueTopProduct.blueTopRowName).toBeVisible();
        await expect(cartPage.manTshirtProduct.manTshirtRowName).toBeVisible();
        await cartPage.blueTopProduct.blueTopDelete.click();
        await expect(cartPage.blueTopProduct.blueTopRowName).toHaveCount(0);
        await expect(cartPage.manTshirtProduct.manTshirtRowName).toBeVisible();
    });

    test('AE-094 - Verify Proceed To Checkout navigation', async ({ cartPage }) => {
        await cartPage.page.goto(ROUTES.PRODUCTS);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await expect(cartPage.blueTopProduct.blueTop).toBeVisible();
        await cartPage.blueTopProduct.addToCart.first().click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.viewCart.click();

        await expect(cartPage.blueTopProduct.blueTopRow).toBeVisible();
        await expect(cartPage.blueTopProduct.blueTopRowNameTwo).toHaveText(cartData.productName);
        await expect(cartPage.cartConfirmation.proceedToCheckout).toBeVisible();
        await cartPage.cartConfirmation.proceedToCheckout.click();
    });

    test('AE-095 - Verify logged-in user can proceed from Cart to Checkout', async ({ cartPage,loginPage}) => {
        await cartPage.page.goto(ROUTES.LOGIN);
        await cartPage.page.waitForLoadState('domcontentloaded');

        await loginPage.emailField.fill(loginData.email);
        await loginPage.passwordField.fill(loginData.password);
        await loginPage.loginButton.click();
        await expect(loginPage.loggedInAs).toBeVisible();

        await cartPage.page.goto(ROUTES.PRODUCTS);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await expect(cartPage.blueTopProduct.blueTop).toBeVisible();
        await cartPage.blueTopProduct.addToCart.first().click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        await cartPage.cartConfirmation.viewCart.click();
        await expect(cartPage.cartPage).toBeVisible();
        await expect(cartPage.blueTopProduct.blueTopRow).toBeVisible();
        await expect(cartPage.blueTopProduct.blueTopRowNameTwo).toHaveText(cartData.productName);

        await expect(cartPage.blueTopProduct.blueTopPrice).toHaveText(cartData.productPrice);
        await expect(cartPage.blueTopProduct.blueTopQuantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.blueTopProduct.blueTopPrice).toHaveText(cartData.productPrice);
        await expect(cartPage.cartConfirmation.proceedToCheckout).toBeVisible();
        await cartPage.cartConfirmation.proceedToCheckout.click();
        await expect(cartPage.page).toHaveURL(ROUTES.CHECKOUT);
        await expect(cartPage.cartConfirmation.checkoutConfirmationMessage).toBeVisible();

        await expect(cartPage.cartConfirmation.checkoutCartProductList).toBeVisible();

        await expect(cartPage.cartProductList.checkoutBlueTop).toBeVisible();
        await expect(cartPage.cartProductList.checkoutBlueTopName).toHaveText(cartData.productName);
        await expect(cartPage.cartProductList.checkoutBlueTopPrice).toHaveText(cartData.productPrice);
        await expect(cartPage.cartProductList.checkoutBlueTopQuantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.cartProductList.checkoutBlueTopTotal).toHaveText(cartData.productPrice);
    });

    test('AE-098 - Verify Cart contents are retained after login', async ({ cartPage,loginPage }) => {
        await cartPage.page.goto(ROUTES.PRODUCTS);
        await cartPage.page.waitForLoadState('domcontentloaded');

        await expect(cartPage.blueTopProduct.blueTop).toBeVisible();
        await cartPage.blueTopProduct.addToCart.first().click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.viewCart.click();

        await expect(cartPage.blueTopProduct.blueTopRow).toBeVisible();
        await expect(cartPage.blueTopProduct.blueTopRowNameTwo).toHaveText(cartData.productName);
        await expect(cartPage.blueTopProduct.blueTopPrice).toHaveText(cartData.productPrice);
        await expect(cartPage.blueTopProduct.blueTopQuantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.blueTopProduct.blueTopTotal).toHaveText(cartData.productPrice);

        await cartPage.page.goto(ROUTES.LOGIN);
        await loginPage.emailField.fill(loginData.email);
        await loginPage.passwordField.fill(loginData.password);
        await loginPage.loginButton.click();
        await expect(loginPage.loggedInAs).toBeVisible();

        await cartPage.page.goto(ROUTES.CART);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await expect(cartPage.blueTopProduct.blueTopRow).toBeVisible();
        await expect(cartPage.blueTopProduct.blueTopRowNameTwo).toHaveText(cartData.productName);
        await expect(cartPage.blueTopProduct.blueTopPrice).toHaveText(cartData.productPrice);
        await expect(cartPage.blueTopProduct.blueTopQuantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.blueTopProduct.blueTopTotal).toHaveText(cartData.productPrice);
    });

    test('AE-099 - Verify complete critical Cart flow', async ({ cartPage, loginPage }) => {
        await cartPage.page.goto(ROUTES.PRODUCTS);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await expect(cartPage.blueTopProduct.blueTop).toBeVisible();
        await cartPage.blueTopProduct.addToCart.first().click();

        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.continueShopping.click();

        await expect(cartPage.manTshirtProduct.manTshirt).toBeVisible();
        await cartPage.manTshirtProduct.addToCart.first().click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.viewCart.click();
        await expect(cartPage.cartPage).toBeVisible();
        await expect(cartPage.blueTopProduct.blueTopRowName).toBeVisible();
        await expect(cartPage.blueTopProduct.blueTopRowNameTwo).toHaveText(cartData.productName);
        await expect(cartPage.blueTopProduct.blueTopPrice).toHaveText(cartData.productPrice);
        await expect(cartPage.blueTopProduct.blueTopQuantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.blueTopProduct.blueTopTotal).toHaveText(cartData.productPrice);

        await expect(cartPage.manTshirtProduct.manTshirtRowName).toBeVisible();
        await expect(cartPage.manTshirtProduct.manTshirtRowNameTwo).toHaveText(cartData.productName2);
        await expect(cartPage.manTshirtProduct.manTshirtPrice).toHaveText(cartData.productPrice2);
        await expect(cartPage.manTshirtProduct.manTshirtQuantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.manTshirtProduct.manTshirtTotal).toHaveText(cartData.productPrice2);
        await cartPage.blueTopProduct.blueTopDelete.click();

        await expect(blueTopRow).toHaveCount(0);
        await expect(menTshirtRow).toBeVisible();
        await expect(cartPage.manTshirtProduct.manTshirtRowNameTwo).toHaveText(cartData.productName2);

        await cartPage.page.goto(ROUTES.LOGIN);

        await cartPage.page.waitForLoadState('domcontentloaded');

        await cartPage.page.goto(ROUTES.LOGIN);
        await loginPage.emailField.fill(loginData.email);
        await loginPage.passwordField.fill(loginData.password);
        await loginPage.loginButton.click();
        await expect(loginPage.loggedInAs).toBeVisible();

        await cartPage.page.goto(ROUTES.CART);
        await cartPage.page.waitForLoadState('domcontentloaded');

        await expect(cartPage.cartConfirmation.remainingProduct).toBeVisible();
        await expect(cartPage.cartConfirmation.proceedToCheckout).toBeVisible();
        await cartPage.cartConfirmation.proceedToCheckout.click();


        await expect(cartPage.page).toHaveURL(ROUTES.CHECKOUT);
        await expect(cartPage.cartConfirmation.checkoutConfirmationMessage).toBeVisible();
        await expect(cartPage.cartConfirmation.checkoutCartProductList).toBeVisible();
        await expect(cartPage.cartProductList.checkoutManTshirt).toBeVisible();
        await expect(cartPage.cartProductList.checkoutManTshirtName).toHaveText(cartData.productName2);
        await expect(cartPage.cartProductList.checkoutManTshirtPrice).toHaveText(cartData.productPrice2);
        await expect(cartPage.cartProductList.checkoutManTshirtQuantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.cartProductList.checkoutManTshirtTotal).toHaveText(cartData.productPrice2);
    });
    test('AE-100 - Verify Checkout page loads successfully', async ({ cartPage,loginPage }) => {
        await cartPage.page.goto(ROUTES.LOGIN);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await loginPage.emailField.fill(loginData.email);
        await loginPage.passwordField.fill(loginData.password);
        await loginPage.loginButton.click();
        await expect(loginPage.loggedInAs).toBeVisible();

        await cartPage.page.goto(ROUTES.PRODUCTS);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await expect(cartPage.blueTopProduct.blueTop).toBeVisible();
        await cartPage.blueTopProduct.addToCart.first().click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.viewCart.click();
        await expect(cartPage.cartPage).toBeVisible();
        await expect(cartPage.blueTopProduct.blueTopRow).toBeVisible();
        await expect(cartPage.cartConfirmation.proceedToCheckout).toBeVisible();
        await cartPage.cartConfirmation.proceedToCheckout.click();
        await expect(cartPage.page).toHaveURL(ROUTES.CHECKOUT);
        await expect(cartPage.cartConfirmation.checkoutConfirmationMessage).toBeVisible();
        await expect(cartPage.cartConfirmation.checkoutCartProductList).toBeVisible();

        await expect(cartPage.cartProductList.checkoutBlueTop).toBeVisible();
        await expect(cartPage.cartProductList.checkoutBlueTopName).toHaveText(cartData.productName);
        await expect(cartPage.cartProductList.checkoutBlueTopPrice).toHaveText(cartData.productPrice);
        await expect(cartPage.cartProductList.checkoutBlueTopQuantity).toHaveText(cartData.productQuantity);
        await expect(cartPage.cartProductList.checkoutBlueTopTotal).toHaveText(cartData.productPrice);
        await expect(cartPage.cartConfirmation.checkoutPlaceOrder).toBeVisible();
    });

    test('AE-101 - Verify delivery and billing addresses match registered account information', async ({ cartPage,loginPage }) => {
        await cartPage.page.goto(ROUTES.LOGIN);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await loginPage.emailField.fill(loginData.email);
        await loginPage.passwordField.fill(loginData.password);
        await loginPage.loginButton.click();
        await expect(loginPage.loggedInAs).toBeVisible();


        await cartPage.page.goto(ROUTES.PRODUCTS);
        await cartPage.page.waitForLoadState('domcontentloaded');
        await expect(cartPage.blueTopProduct.blueTop).toBeVisible();
        await cartPage.blueTopProduct.addToCart.first().click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await expect(cartPage.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);
        await cartPage.cartConfirmation.viewCart.click();

        await expect(cartPage.page).toHaveURL(ROUTES.CART);
        await expect(cartPage.blueTopProduct.blueTopRowNameTwo).toBeVisible();
        await expect(cartPage.cartConfirmation,proceedToCheckout).toBeVisible();
        await cartPage.cartConfirmation,proceedToCheckout.click();

        await expect(cartPage.page).toHaveURL(ROUTES.CHECKOUT);
        await expect(cartPage.cartConfirmation.deliveryAddress).toBeVisible();
        await expect(cartPage.cartConfirmation.deliveryAddressName).toContainText(cartData.checkoutAddressName);
        await expect(cartPage.cartConfirmation.deliveryAddressCompanyName).toContainText(cartData.checkoutCompanyName);
        await expect(cartPage.cartConfirmation.deliveryAddressOne).toContainText(cartData.checkoutAddressOne);
        await expect(cartPage.cartConfirmation.deliveryAddressState).toContainText(cartData.checkoutState);
        await expect(cartPage.cartConfirmation.deliveryAddressCountry).toContainText(cartData.checkoutCountry);
        await expect(cartPage.cartConfirmation.deliveryAddressPhone).toContainText(cartData.checkoutPhone);

        await expect(cartPage.cartConfirmation.checkoutBillingAddress).toBeVisible();
        await expect(cartPage.cartConfirmation.checkoutBillingAddressName).toContainText(cartData.checkoutAddressName);
        await expect(cartPage.cartConfirmation.checkoutBillingCompanyName).toContainText(cartData.checkoutCompanyName);
        await expect(cartPage.cartConfirmation.checkoutBillingAddressOne).toContainText(cartData.checkoutAddressOne);
        await expect(cartPage.cartConfirmation.checkoutBillingState).toContainText(cartData.checkoutState);
        await expect(cartPage.cartConfirmation.checkoutBillingCountry).toContainText(cartData.checkoutCountry);
        await expect(cartPage.cartConfirmation.checkoutBillingPhone).toContainText(cartData.checkoutPhone);

        const deliveryDetails = await cartPage.cartConfirmation.deliveryAddress
            .locator('li')
            .evaluateAll(items =>
                items
                    .slice(1)
                    .map(item => item.textContent?.trim())
                    .filter(Boolean)
            );

        const billingDetails = await cartPage.cartConfirmation.checkoutBillingAddress
            .locator('li')
            .evaluateAll(items =>
                items
                    .slice(1)
                    .map(item => item.textContent?.trim())
                    .filter(Boolean)
            );

        expect(deliveryDetails).toEqual(billingDetails);
    });

    test('AE-103 - Verify total order amount is calculated correctly', async ({ cartPage,loginPage }) => {
        await cartPage.page.goto(ROUTES.LOGIN);
        await loginPage.emailField.fill(loginData.email);
        await loginPage.passwordField.fill(loginData.password);
        await loginPage.loginButton.click();
        await expect(loginPage.loggedInAs).toBeVisible();

        await cartPage.page.goto(ROUTES.PRODUCTDETAILS_ONE);

        await cartPage.productDetails.quantityInput.fill(cartData.quantityInput);
        await cartPage.productDetails.addToCart.click();
        await expect(cartPage.cartConfirmation.modal).toBeVisible();
        await cartPage.cartConfirmation.viewCart.click();
        await expect(cartPage.page).toHaveURL(ROUTES.CART);

        await expect(cartPage.blueTopProduct.blueTopRowNameTwo).toBeVisible();
        await expect(cartPage.blueTopProduct.blueTopPrice).toContainText(cartData.productPrice);
        await expect(cartPage.blueTopProduct.blueTopQuantity).toHaveText(cartData.quantityInput);
        await expect(cartPage.blueTopProduct.blueTopTotal).toContainText(cartData.productTotal);
        await expect(cartPage.cartConfirmation.proceedToCheckout).toBeVisible();
        await cartPage.cartConfirmation.proceedToCheckout.click();
        await expect(cartPage.page).toHaveURL(ROUTES.CHECKOUT);

        const price = 500;
        const quantity = 3;
        const expectedTotal = price * quantity;
        const totalText = await cartPage.cartConfirmation.totalText.innerText();
        const actualTotal = Number(totalText.replace('Rs. ', '').trim());
        expect(actualTotal).toBe(expectedTotal);
        }
    );
    test('AE-104 - Verify that the user can add an order comment', async ({ cartPage,loginPage }) => {
        await cartPage.page.goto(ROUTES.LOGIN);
        await loginPage.emailField.fill(loginData.email);
        await loginPage.passwordField.fill(loginData.password);
        await loginPage.loginButton.click();
        await expect(loginPage.loggedInAs).toBeVisible();

        await cartPage.page.goto(ROUTES.CHECKOUT);
        await expect(cartPage.page).toHaveURL(ROUTES.CHECKOUT);
        await expect(cartPage.cartConfirmation.commentBox).toBeVisible();
        await cartPage.cartConfirmation.commentBox.fill(cartData.comment);
        await expect(cartPage.cartConfirmation.commentBox).toHaveValue(cartData.comment);
        await cartPage.cartConfirmation.checkoutPlaceOrder.click();
        await expect(cartPage.page).toHaveURL(ROUTES.PAYMENT);
        }
    );
});


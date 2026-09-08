import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import {getCartData} from '../test-data/cartData';
const cartData = getCartData();

export class PaymentPage extends BasePage {

    constructor(page) {

        super(page);

        // Product
        this.blueTopProduct = page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();


        // Add To Cart Confirmation
        this.cartConfirmation = {

            modal: page.locator("//div[@class='modal-content']"),

            addedMessage: page.locator("//h4[normalize-space()='Added!']"),

            viewCart: page.locator("//u[normalize-space()='View Cart']"),

            continueShopping: page.locator("//button[normalize-space()='Continue Shopping']"),
        };

        // Cart
        this.proceedToCheckout = page.getByText('Proceed To Checkout', { exact: true });

        // Checkout
        this.placeOrder = page.getByText('Place Order', { exact: true });

        // Payment
        this.paymentHeading = page.locator("//h2[normalize-space()='Payment']", { exact: true });

        this.paymentForm = page.locator("//div[contains(@class,'payment-information')]");

        this.cardName = page.locator("//input[@name='name_on_card']");

        this.cardNumber = page.locator("//input[@name='card_number']");

        this.cvc = page.locator("//input[@placeholder='ex. 311']");

        this.expiryMonth = page.locator("//input[@placeholder='MM']");

        this.expiryYear = page.locator("//input[@placeholder='YYYY']");

        this.paymentButton = page.getByRole('button', { name: 'Pay and Confirm Order' });

        //Verify order confirmation
        this.orderConfirmation = this.page.locator("//p[normalize-space()='Congratulations! Your order has been confirmed!']", { exact: true }
        );
    }

    // AE-110 Verify Payment page loads successfully

    async verifyPaymentPageLoadsSuccessfully() {

        //Login
        await this.login();
        await this.page.goto('/products');
        await this.page.waitForLoadState('domcontentloaded');
        //Select Blue Top
        await expect(this.blueTopProduct).toBeVisible();
        await this.blueTopProduct.locator("(//a[contains(text(),'Add to cart')])[1]").click();

        // 5. Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // 6. Open Cart
        await this.cartConfirmation.viewCart.click();

        // 7. Verify Cart page
        await expect(this.page).toHaveURL('/view_cart');

        // 8. Proceed to Checkout
        await expect(this.proceedToCheckout).toBeVisible();

        await this.proceedToCheckout.click();

        // 9. Verify Checkout page
        await expect(this.page).toHaveURL('/checkout');

        // 10. Place Order
        await expect(this.placeOrder).toBeVisible();

        await this.placeOrder.click();

        // 11. Wait for Payment page
        await this.page.waitForLoadState('domcontentloaded');

        // 12. Verify Payment URL
        await expect(this.page).toHaveURL('/payment');

        // 13. Verify Payment heading
        await expect(this.paymentHeading).toBeVisible();

        // 14. Verify Payment form
        await expect(this.paymentForm).toBeVisible();

        // 15. Verify payment fields
        await expect(this.cardName).toBeVisible();

        await expect(this.cardNumber).toBeVisible();

        await expect(this.cvc).toBeVisible();

        await expect(this.expiryMonth).toBeVisible();

        await expect(this.expiryYear).toBeVisible();
    }

    async verifyPaymentPageLoad() {

        //Login
        await this.login();
        await this.page.goto('/products');
        await this.page.waitForLoadState('domcontentloaded');
        //Select Blue Top
        await expect(this.blueTopProduct).toBeVisible();
        await this.blueTopProduct.locator("(//a[contains(text(),'Add to cart')])[1]").click();

        // 5. Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText(cartData.addedMessage);

        // 6. Open Cart
        await this.cartConfirmation.viewCart.click();

        // 7. Verify Cart page
        await expect(this.page).toHaveURL('/view_cart');

        // 8. Proceed to Checkout
        await expect(this.proceedToCheckout).toBeVisible();

        await this.proceedToCheckout.click();

        // 9. Verify Checkout page
        await expect(this.page).toHaveURL('/checkout');

        // 10. Place Order
        await expect(this.placeOrder).toBeVisible();

        await this.placeOrder.click();

        // 11. Wait for Payment page
        await this.page.waitForLoadState('domcontentloaded');

        // 12. Verify Payment URL
        await expect(this.page).toHaveURL('/payment');

        // 13. Verify Payment heading
        await expect(this.paymentHeading).toBeVisible();

    }

    // AE-111 - Verify all required payment fields and confirmation button
    async verifyPaymentFieldsDisplayed() {

        // 1. Reach Payment page
        await this.verifyPaymentPageLoadsSuccessfully();

        // 2. Verify Name on Card
        await expect(this.cardName).toBeVisible();

        // 3. Verify Card Number
        await expect(this.cardNumber).toBeVisible();

        // 4. Verify CVC
        await expect(this.cvc).toBeVisible();

        // 5. Verify Expiration Month
        await expect(this.expiryMonth).toBeVisible();

        // 6. Verify Expiration Year
        await expect(this.expiryYear).toBeVisible();

        // 7. Verify Pay and Confirm Order button
        await expect(this.paymentButton).toBeVisible();

    }

    // AE-112 - Verify valid payment information can be entered
    async verifyValidPaymentInformation() {

        //Reach Payment page
        await this.verifyPaymentPageLoad();
        await this.cardName.fill(cartData.cardHolderName);
        await this.cardNumber.fill(cartData.cardHolderNumber);
        await this.cvc.fill(cartData.cardCvcNumber);
        await this.expiryMonth.fill(cartData.cardExpiryMonth);
        await this.expiryYear.fill(cartData.cardExpiryYear);
        //Verify entered values
        await expect(this.cardName).toHaveValue(cartData.cardHolderName);
        await expect(this.cardNumber).toHaveValue(cartData.cardHolderNumber);
        await expect(this.cvc).toHaveValue(cartData.cardCvcNumber);
        await expect(this.expiryMonth).toHaveValue(cartData.cardExpiryMonth);
        await expect(this.expiryYear).toHaveValue(cartData.cardExpiryYear);
    }

    // AE-113 - Verify payment cannot be confirmed when required fields are empty
    async verifyEmptyPaymentFieldsCannotBeSubmitted() {
        await this.verifyPaymentPageLoad();
        //Make sure all payment fields are empty
        await this.cardName.fill('');
        await this.cardNumber.fill('');
        await this.cvc.fill('');
        await this.expiryMonth.fill('');
        await this.expiryYear.fill('');
        //Verify fields are empty
        await expect(this.cardName).toHaveValue('');
        await expect(this.cardNumber).toHaveValue('');
        await expect(this.cvc).toHaveValue('');
        await expect(this.expiryMonth).toHaveValue('');
        await expect(this.expiryYear).toHaveValue('');
        //Click Pay and Confirm Order
        await this.paymentButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        //Verify the browser remains on the Payment page
        await expect(this.page).toHaveURL('/payment');
        //Verify a payment form is still displayed
        await expect(this.cardName).toBeVisible();
        await expect(this.cardNumber).toBeVisible();
    }

    // AE-114 - Verify payment behavior with invalid Card Number
    async verifyInvalidCardNumberCannotBeConfirmed() {
        await this.verifyPaymentPageLoad();
        await this.cardName.fill(cartData.InvalidCardHolderName);
        await this.cardNumber.fill(cartData.InvalidCardHolderNumber);
        await this.cvc.fill(cartData.InvalidCardCvcNumber);
        await this.expiryMonth.fill(cartData.InvalidCardExpiryMonth);
        await this.expiryYear.fill(cartData.InvalidCardExpiryYear);
        // 7. Verify entered values
        await expect(this.cardName).toHaveValue(cartData.InvalidCardHolderName);
        await expect(this.cardNumber).toHaveValue(cartData.InvalidCardHolderNumber);
        await expect(this.cvc).toHaveValue(cartData.InvalidCardCvcNumber);
        await expect(this.expiryMonth).toHaveValue(cartData.InvalidCardExpiryMonth);
        await expect(this.expiryYear).toHaveValue(cartData.InvalidCardExpiryYear);
        //Click Pay and Confirm Order
        await this.paymentButton.click();
        //Verify order is NOT successfully confirmed
        await expect(this.page).toHaveURL('/payment');
    }


    // AE-115 - Verify payment behavior with invalid CVC
    async verifyInvalidCvcCannotBeConfirmed() {

        // 1. Reach Payment page
        await this.verifyPaymentPageLoadsSuccessfully();

        // 2. Enter valid Name on Card
        await this.cardName.fill('QA Tester');

        // 3. Enter approved test card value
        await this.cardNumber.fill('4111111111111111');

        // 4. Enter invalid CVC
        await this.cvc.fill('1');

        // 5. Enter a valid expiration month
        await this.expiryMonth.fill('12');

        // 6. Enter a valid expiration year
        await this.expiryYear.fill('2030');

        // 7. Click Pay and Confirm Order
        await this.paymentButton.click();

        await this.page.waitForTimeout(7000);
        // 8. Verify order is not successfully confirmed
        await expect(this.page).toHaveURL('/payment');

        console.log('AE-115 - Invalid CVC cannot be confirmed: PASS');
    }

    // AE-116 - Verify successful payment and order confirmation
    async verifySuccessfulPaymentAndOrderConfirmation() {
        await this.verifyPaymentPageLoad();
        await this.cardName.fill(cartData.cardHolderName);
        await this.cardNumber.fill(cartData.cardHolderNumber);
        await this.cvc.fill(cartData.cardCvcNumber);
        await this.expiryMonth.fill(cartData.cardExpiryMonth);
        await this.expiryYear.fill(cartData.cardExpiryYear);
        await this.paymentButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.orderConfirmation).toBeVisible();
    }
}
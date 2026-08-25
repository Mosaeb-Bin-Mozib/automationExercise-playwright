import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

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

        // 1. Login
        await this.login();


        // 2. Open Products page
        await this.page.goto('/products');

        await this.page.waitForLoadState('domcontentloaded');

        // 3. Select Blue Top
        await expect(this.blueTopProduct).toBeVisible();

        await this.blueTopProduct.locator("(//a[contains(text(),'Add to cart')])[1]").click();

        // 5. Verify Add to Cart confirmation
        await expect(this.cartConfirmation.modal).toBeVisible();

        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');

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

        console.log('AE-110 - Payment page loaded successfully: PASS');
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

        console.log('AE-111 - All required payment fields displayed: PASS');
    }

    // AE-112 - Verify valid payment information can be entered
    async verifyValidPaymentInformation() {

        // 1. Reach Payment page
        await this.verifyPaymentPageLoadsSuccessfully();

        // 2. Enter Name on Card
        await this.cardName.fill('QA Tester');

        // 3. Enter Card Number
        await this.cardNumber.fill('4111111111111111');

        // 4. Enter CVC
        await this.cvc.fill('311');

        // 5. Enter Expiration Month
        await this.expiryMonth.fill('12');

        // 6. Enter Expiration Year
        await this.expiryYear.fill('2030');

        // 7. Verify entered values
        await expect(this.cardName).toHaveValue('QA Tester');

        await expect(this.cardNumber).toHaveValue('4111111111111111');

        await expect(this.cvc).toHaveValue('311');

        await expect(this.expiryMonth).toHaveValue('12');

        await expect(this.expiryYear).toHaveValue('2030');

        await this.page.waitForTimeout(5000);

        console.log('AE-112 - Valid payment information entered successfully: PASS');
    }

    // AE-113 - Verify payment cannot be confirmed when required fields are empty
    async verifyEmptyPaymentFieldsCannotBeSubmitted() {

        // 1. Reach Payment page
        await this.verifyPaymentPageLoadsSuccessfully();

        // 2. Make sure all payment fields are empty
        await this.cardName.fill('');
        await this.cardNumber.fill('');
        await this.cvc.fill('');
        await this.expiryMonth.fill('');
        await this.expiryYear.fill('');

        // 3. Verify fields are empty
        await expect(this.cardName).toHaveValue('');

        await expect(this.cardNumber).toHaveValue('');

        await expect(this.cvc).toHaveValue('');

        await expect(this.expiryMonth).toHaveValue('');

        await expect(this.expiryYear).toHaveValue('');

        // 4. Click Pay and Confirm Order
        await this.paymentButton.click();

        await this.page.waitForTimeout(7000);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        // 5. Verify the browser remains on the Payment page
        await expect(this.page).toHaveURL('/payment');

        // 6. Verify a payment form is still displayed
        await expect(this.cardName).toBeVisible();

        await expect(this.cardNumber).toBeVisible();

        console.log('AE-113 - Empty payment fields cannot be submitted: PASS');
    }

    // AE-114 - Verify payment behavior with invalid Card Number
    async verifyInvalidCardNumberCannotBeConfirmed() {

        // 1. Reach Payment page
        await this.verifyPaymentPageLoadsSuccessfully();

        // 2. Enter valid Name on Card
        await this.cardName.fill('QA Tester');

        // 3. Enter invalid Card Number
        await this.cardNumber.fill('123');

        // 4. Enter CVC
        await this.cvc.fill('31142423');

        // 5. Enter invalid Expiration Month
        await this.expiryMonth.fill('1233');

        // 6. Enter Expiration Year
        await this.expiryYear.fill('2030');

        // 7. Verify entered values
        await expect(this.cardName).toHaveValue('QA Tester');

        await expect(this.cardNumber).toHaveValue('123');

        await expect(this.cvc).toHaveValue('31142423');

        await expect(this.expiryMonth).toHaveValue('1233');

        await expect(this.expiryYear).toHaveValue('2030');

        // 8. Click Pay and Confirm Order
        await this.paymentButton.click();

        await this.page.waitForTimeout(7000);
        // 9. Verify order is NOT successfully confirmed
        await expect(this.page).toHaveURL('/payment');

        console.log('AE-114 - Invalid Card Number cannot be confirmed: PASS');
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

        // 1. Reach Payment page
        await this.verifyPaymentPageLoadsSuccessfully();

        // 2. Enter valid Name on Card
        await this.cardName.fill('QA Tester');

        // 3. Enter approved test Card Number
        await this.cardNumber.fill('4111111111111111');

        // 4. Enter valid CVC
        await this.cvc.fill('311');

        // 5. Enter a valid Expiration Month
        await this.expiryMonth.fill('12');

        // 6. Enter a valid Expiration Year
        await this.expiryYear.fill('2030');

        // 7. Click Pay and Confirm Order
        await this.paymentButton.click();

        // 8. Wait for order processing
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.orderConfirmation).toBeVisible();

        console.log('AE-116 - Successful payment and order confirmation: PASS');
    }
}
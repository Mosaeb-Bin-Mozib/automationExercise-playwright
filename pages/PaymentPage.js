import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import {ROUTES} from "../test-data/routes";

export class PaymentPage extends BasePage {

    constructor(page) {

        super(page);
        this.blueTopProduct = page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]"
        ).first();

        this.cartConfirmation = {

            modal: page.locator("//div[@class='modal-content']"),

            addedMessage: page.locator("//h4[normalize-space()='Added!']"),

            viewCart: page.locator("//u[normalize-space()='View Cart']"),

            continueShopping: page.locator("//button[normalize-space()='Continue Shopping']"),
        };

        this.proceedToCheckout = page.getByText('Proceed To Checkout', { exact: true });
        this.placeOrder = page.getByText('Place Order', { exact: true });
        this.paymentHeading = page.locator("//h2[normalize-space()='Payment']", { exact: true });
        this.paymentForm = page.locator("//div[contains(@class,'payment-information')]");
        this.cardName = page.locator("//input[@name='name_on_card']");
        this.cardNumber = page.locator("//input[@name='card_number']");
        this.cvc = page.locator("//input[@placeholder='ex. 311']");
        this.expiryMonth = page.locator("//input[@placeholder='MM']");
        this.expiryYear = page.locator("//input[@placeholder='YYYY']");
        this.paymentButton = page.getByRole('button', { name: 'Pay and Confirm Order' });
        this.orderConfirmation = this.page.locator("//p[normalize-space()='Congratulations! Your order has been confirmed!']", { exact: true }
        );
    }
    async verifyPaymentPageLoadsSuccessfully() {
        await this.login();
        await this.page.goto(ROUTES.PRODUCTS);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.blueTopProduct).toBeVisible();
        await this.blueTopProduct.locator("(//a[contains(text(),'Add to cart')])[1]").click();
        await expect(this.cartConfirmation.modal).toBeVisible();
        await expect(this.cartConfirmation.addedMessage).toHaveText('Added!');
        await this.cartConfirmation.viewCart.click();
        await expect(this.page).toHaveURL(ROUTES.CART);
        await expect(this.proceedToCheckout).toBeVisible();
        await this.proceedToCheckout.click();
        await expect(this.page).toHaveURL(ROUTES.CHECKOUT);
        await expect(this.placeOrder).toBeVisible();
        await this.placeOrder.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(ROUTES.PAYMENT);
        await expect(this.paymentHeading).toBeVisible();
        await expect(this.paymentForm).toBeVisible();
        await expect(this.cardName).toBeVisible();
        await expect(this.cardNumber).toBeVisible();
        await expect(this.cvc).toBeVisible();
        await expect(this.expiryMonth).toBeVisible();
        await expect(this.expiryYear).toBeVisible();
    }

    async verifyPaymentFieldsDisplayed() {
        await this.verifyPaymentPageLoadsSuccessfully();
        await expect(this.cardName).toBeVisible();
        await expect(this.cardNumber).toBeVisible();
        await expect(this.cvc).toBeVisible();
        await expect(this.expiryMonth).toBeVisible();
        await expect(this.expiryYear).toBeVisible();
        await expect(this.paymentButton).toBeVisible();

    }

    async verifyValidPaymentInformation() {
        await this.verifyPaymentPageLoadsSuccessfully();
        await this.cardName.fill('QA Tester');
        await this.cardNumber.fill('4111111111111111');
        await this.cvc.fill('311');
        await this.expiryMonth.fill('12');
        await this.expiryYear.fill('2030');
        await expect(this.cardName).toHaveValue('QA Tester');
        await expect(this.cardNumber).toHaveValue('4111111111111111');
        await expect(this.cvc).toHaveValue('311');
        await expect(this.expiryMonth).toHaveValue('12');
        await expect(this.expiryYear).toHaveValue('2030');

    }

    async verifyEmptyPaymentFieldsCannotBeSubmitted() {
        await this.verifyPaymentPageLoadsSuccessfully();
        await this.cardName.fill('');
        await this.cardNumber.fill('');
        await this.cvc.fill('');
        await this.expiryMonth.fill('');
        await this.expiryYear.fill('');
        await expect(this.cardName).toHaveValue('');
        await expect(this.cardNumber).toHaveValue('');
        await expect(this.cvc).toHaveValue('');
        await expect(this.expiryMonth).toHaveValue('');
        await expect(this.expiryYear).toHaveValue('');
        await this.paymentButton.click();
        await this.page.waitForTimeout(7000);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(ROUTES.PAYMENT);
        await expect(this.cardName).toBeVisible();
        await expect(this.cardNumber).toBeVisible();
    }

    async verifyInvalidCardNumberCannotBeConfirmed() {
        await this.verifyPaymentPageLoadsSuccessfully();
        await this.cardName.fill('QA Tester');
        await this.cardNumber.fill('123');
        await this.cvc.fill('31142423');
        await this.expiryMonth.fill('1233');
        await this.expiryYear.fill('2030');
        await expect(this.cardName).toHaveValue('QA Tester');
        await expect(this.cardNumber).toHaveValue('123');
        await expect(this.cvc).toHaveValue('31142423');
        await expect(this.expiryMonth).toHaveValue('1233');
        await expect(this.expiryYear).toHaveValue('2030');
        await this.paymentButton.click();
        await this.page.waitForTimeout(7000);
        await expect(this.page).toHaveURL(ROUTES.PAYMENT);
    }


    async verifyInvalidCvcCannotBeConfirmed() {
        await this.verifyPaymentPageLoadsSuccessfully();
        await this.cardName.fill('QA Tester');
        await this.cardNumber.fill('4111111111111111');
        await this.cvc.fill('1');
        await this.expiryMonth.fill('12');
        await this.expiryYear.fill('2030');
        await this.paymentButton.click();
        await this.page.waitForTimeout(7000);
        await expect(this.page).toHaveURL(ROUTES.PAYMENT);
    }

    async verifySuccessfulPaymentAndOrderConfirmation() {
        await this.verifyPaymentPageLoadsSuccessfully();
        await this.cardName.fill('QA Tester');
        await this.cardNumber.fill('4111111111111111');
        await this.cvc.fill('311');
        await this.expiryMonth.fill('12');
        await this.expiryYear.fill('2030');
        await this.paymentButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.orderConfirmation).toBeVisible();
    }
}

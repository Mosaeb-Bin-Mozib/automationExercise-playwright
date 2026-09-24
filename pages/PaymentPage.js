import { BasePage } from './BasePage';
import {getCartData} from '../test-data/cartData';
const cartData = getCartData()

export class PaymentPage extends BasePage {

    constructor(page) {

        super(page);
        this.blueTopProduct = page.locator(`//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='${cartData.productName}']]`).first();
        this.blueTopProductAddtoCart = page.locator("(//a[contains(text(),'Add to cart')])[1]");

        this.cartConfirmation = {

            modal: page.locator("//div[@class='modal-content']"),

            addedMessage: page.locator(`//h4[normalize-space()=${cartData.addedMessage}]`),

            viewCart: page.locator("//u[normalize-space()='View Cart']"),

            continueShopping: page.locator("//button[normalize-space()='Continue Shopping']"),
        };

        this.proceedToCheckout = page.getByText('Proceed To Checkout', { exact: true });
        this.placeOrder = page.getByText('Place Order', { exact: true });
        this.paymentHeading = page.getByRole('heading', { name: 'Payment' });
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

}

import {getCartData} from '../test-data/cartData';
const cartData = getCartData()
export class CartPage {

    constructor(page) {

        this.page = page;
        this.cartPage = page.locator("//section[@id='cart_items']");
        this.emptyCartMessage = page.locator("//p[contains(normalize-space(),'Cart is empty!')]");
        this.emptyCartBuyProductsLink = page.locator("//p[contains(normalize-space(),'Cart is empty!')]//a");
        this.cartProduct = {
            row: page.getByRole('row', { name: 'Product Image Blue Top Women' }).first(),
            name: page.getByRole('link', { name: cartData.productName }).first(),
            price: page.getByText('Rs.').first().first(),
            quantity:page.getByRole('button', { name: cartData.productQuantity }).first(),
            total:page.getByText('Rs.').nth(1).first(),
        };
        this.cartConfirmation = {

            modal: page.locator("//div[@class='modal-content']"),
            addedMessage: page.locator("//h4[normalize-space()='Added!']"),
            viewCart: page.locator("//u[normalize-space()='View Cart']"),
            continueShopping: page.locator("//button[normalize-space()='Continue Shopping']"),
            proceedToCheckout: page.locator("//a[normalize-space()='Proceed To Checkout']"),
            checkoutConfirmationMessage: page.locator("//h2[normalize-space()='Address Details']"),
            checkoutCartProductList: page.locator("//h2[normalize-space()='Review Your Order']"),
            checkoutPlaceOrder: page.locator("//a[normalize-space()='Place Order']"),
            totalText: page.locator("(//p[@class='cart_total_price'][normalize-space()='Rs. 1500'])[2]"),
            commentBox: page.locator("//textarea[@name='message']"),

            deliveryAddress: page.locator("(//h3[normalize-space()='Your delivery address'])[1]"),
            deliveryAddressName: page.locator("//ul[@id='address_delivery']//li[@class='address_firstname address_lastname'][contains(text(),'Mr. MOSAEB')]"),
            deliveryAddressCompanyName: page.locator("(//li[@class='address_address1 address_address2'][normalize-space()='Syntax'])[1]"),
            deliveryAddressOne: page.locator("(//li[@class='address_address1 address_address2'][normalize-space()='Nathullabad barishal'])[1]"),
            deliveryAddressState: page.locator("//ul[@id='address_delivery']//li[@class='address_city address_state_name address_postcode'][contains(text(),'Dhaka Dhaka')]"),
            deliveryAddressCountry: page.locator("//ul[@id='address_delivery']//li[@class='address_country_name'][normalize-space()='Australia']"),
            deliveryAddressPhone: page.locator("//ul[@id='address_delivery']//li[@class='address_phone'][normalize-space()='01302692330']"),

            checkoutBillingAddress: page.locator("//h3[normalize-space()='Your billing address']"),
            checkoutBillingAddressName: page.locator("(//li[@class='address_firstname address_lastname'][contains(text(),'Mr. MOSAEB')])[2]"),
            checkoutBillingCompanyName: page.locator("(//li[@class='address_address1 address_address2'][normalize-space()='Syntax'])[2]"),
            checkoutBillingAddressOne: page.locator("(//li[@class='address_address1 address_address2'][normalize-space()='Nathullabad barishal'])[3]"),
            checkoutBillingState: page.locator("//ul[@id='address_invoice']//li[@class='address_city address_state_name address_postcode'][contains(text(),'Dhaka Dhaka')]"),
            checkoutBillingCountry: page.locator("(//li[@class='address_country_name'][normalize-space()='Australia'])[2]"),
            checkoutBillingPhone: page.locator("(//li[@class='address_phone'][normalize-space()='01302692330'])[2]"),
        };

        this.products = {
            blueTop: page.locator(`//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()=${cartData.productName}]]`).first(),
            menTshirt: page.locator(`//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()=${cartData.productName2}]]`).first(),
        };

        this.productDetails = {
            quantityInput: page.locator("//input[@id='quantity']"),
            addToCart: page.locator("//button[contains(@class,'cart')]"),
        };

        this.blueTopProduct = {
            blueTop: page.locator(`//div[@class='productinfo text-center']//p[contains(text(),${cartData.productName})]`),
            blueTopRow: page.locator("(//tr[@id='product-1'])[1]"),
            blueTopRowName: page.locator("//tr[@id='product-1']//td[@class='cart_description']"),
            blueTopRowNameTwo: page.locator(`//a[normalize-space()=${cartData.productName}]`),
            blueTopPrice: page.locator(`//td[@class='cart_price']//p[contains(text(),${cartData.productPrice})]`),
            blueTopQuantity: page.getByRole('row', { name: /Blue Top Women/ }).getByRole('button'),

            blueTopTotal: page.locator(`//p[@class='cart_total_price'][normalize-space()=${cartData.productPrice}]`),
            blueTopDelete: page.locator("//tr[@id='product-1']//a[@class='cart_quantity_delete']"),
            addToCart: page.locator("(//a[@class='btn btn-default add-to-cart'][normalize-space()='Add to cart'])[1]"),
        };
        this.manTshirtProduct = {
            manTshirt: page.locator(`(//p[contains(text(),${cartData.productName2})])[1]`),
            manTshirtRow: page.locator("(//tr[@id='product-2'])[1]"),
            manTshirtRowName: page.locator("(//td[@class='cart_description'])[1]"),
            manTshirtRowNameTwo: page.locator(`//a[normalize-space()=${cartData.productName2}]`),
            manTshirtPrice: page.locator(`//td[@class='cart_price']//p[contains(text(),${cartData.productPrice2})]`),
            manTshirtPrice2: page.locator(`(//p[normalize-space()=${cartData.productPrice2}])[1]`),
            manTshirtQuantity: page.locator("//tr[@id='product-2']//button[@class='disabled'][normalize-space()='1']"),
            manTshirtQuantityThree: page.locator(`//button[normalize-space()=${cartData.quantityInput}]`),
            manTshirtQuantitySix: page.locator(`//button[normalize-space()=${cartData.quantityInput2}]`),
            manTshirtTotal: page.locator(`//p[@class='cart_total_price'][normalize-space()=${cartData.productPrice2}]`),
            manTshirtTotalThreeProduct: page.locator("(//p[@class='cart_total_price'])[1]"),
            addToCart: page.locator("(//a[@class='btn btn-default add-to-cart'][normalize-space()='Add to cart'])[3]"),
        };

        this.cartProductList = {
            checkoutBlueTop: page.locator("(//tr[@id='product-1'])[1]"),
            checkoutBlueTopName: page.locator(`(//a[normalize-space()=${cartData.productName}])[1]`),
            checkoutBlueTopPrice: page.locator(`//td[@class='cart_price']//p[contains(text(),${cartData.productPrice})]`),
            checkoutBlueTopQuantity: page.getByRole('button', { name: cartData.productQuantity }),
            checkoutBlueTopTotal: page
            .getByRole('row', { name: /Blue Top Women > Tops/ })
            .locator('td')
            .nth(4)
            .locator('p'),

            checkoutManTshirt: page.locator("(//tr[@id='product-2'])[1]"),
            checkoutManTshirtName: page.locator(`//a[normalize-space()=${cartData.productName2}]`),
            checkoutManTshirtPrice: page.locator(`//td[@class='cart_price']//p[contains(text(),${cartData.productPrice2})]`),
            checkoutManTshirtQuantity: page.locator("(//button[normalize-space()='1'])[1]"),
            checkoutManTshirtTotal: page
            .getByRole('row', { name: /Men Tshirt Men > Tshirts/ })
            .locator('td')
            .nth(4)
            .locator('p'),
        };
    }
}
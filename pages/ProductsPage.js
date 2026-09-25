import dotenv from 'dotenv';
dotenv.config();
import {ROUTES} from "../test-data/routes";
import {getProductData} from "../test-data/productData";
const productData = getProductData()

export class ProductsPage {

    constructor(page) {
        this.page = page;
        this.allProductsHeading =page.getByRole('heading', { name: 'All Products' });
        this.productsList = page.locator("//div[contains(@class,'features_items')]");
        this.viewproduct = page.locator("xpath=.//a[contains(normalize-space(), 'View Product')]");
        this.blueTopProduct = page.locator('div').filter({ hasText: 'Rs. 500 Blue Top Add to cart' }).nth(4);

        this.blueTopProductView = page.locator("xpath=.//a[contains(normalize-space(),'View Product')]").first();

        this.productInformation = page.locator("//div[contains(@class,'product-information')]");
        this.productInformationName = page.getByRole('heading', { name: productData.nameTwo })
        this.productInformationCategory = page.locator("xpath=.//p[contains(normalize-space(),'Category:')]");
        this.productInformationPrice = page.locator("xpath=.//span[contains(normalize-space(),'Rs.')]");
        this.productInformationAvailability = page.locator("xpath=.//p[contains(normalize-space(),'Availability:')]");
        this.productInformationCondition = page.locator("xpath=.//p[contains(normalize-space(),'Condition:')]");
        this.productInformationBrand = page.locator("xpath=.//p[contains(normalize-space(),'Brand:')]");

        this.menTshirtCartRow = page.locator(`//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='${productData.nameOne}']]`);
        this.menTshirtCartRowQuantity = page.locator(`//button[normalize-space()='${productData.productQuantity}']`);
        this.menTshirtCartRowQuantityFour = page.locator(`//button[normalize-space()='${productData.Quantity}']`);
        this.menTshirtCartRowName = page.locator(`//a[normalize-space()='${productData.nameOne}']`);
        this.menTshirtReview = page.locator("//a[normalize-space()='Write Your Review']");

        this.blueTopAgain = page.locator(`//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='${productData.nameTwo}']]`);
        this.blueTopAgainaddToCart = page.locator("//body/section/div[@class='container']/div[@class='row']/div[@class='col-sm-9 padding-right']/div[@class='features_items']/div[2]/div[1]/div[1]/div[1]/a[1]");
        this.blueTopCartRow = page.locator(`//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='${productData.nameTwo}']]`);
        this.blueTopCartRowName = page.locator("td.cart_description a");
        this.blueTopCartRowPrice = page.locator("td.cart_price p");
        this.blueTopCartRowQuantity = page.locator("td.cart_quantity button");
        this.blueTopCartRowTotal = page.locator("td.cart_total p");

        this.detailName = page.locator("//div[contains(@class,'product-information')]//h2");
        this.detailCategory = page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Category:')]");
        this.detailPrice = page.locator("//div[contains(@class,'product-information')]//span/span");
        this.detailAvailability = page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Availability:')]");
        this.detailCondition = page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Condition:')]");
        this.detailBrand = page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Brand:')]");

        this.products = {

            cards: page.locator("//div[contains(@class,'product-image-wrapper')]"),
            blueTop: page.locator(`//p[normalize-space()='${productData.nameTwo}']`).first(),

            blueTopImage: page.locator(`//div[.//p[normalize-space()='${productData.nameTwo}']]//img`).first(),

            blueTopName: page.locator(`//p[normalize-space()='${productData.nameTwo}']`).first(),

            blueTopPrice: page.getByRole('heading', { name: productData.priceTwo }).first(),

            blueTopAddToCart: page.locator(`//div[.//p[normalize-space()='${productData.nameTwo}']]//a[contains(@class,'add-to-cart')]`).first(),

            blueTopViewProduct: page.locator(`//div[.//p[normalize-space()='${productData.nameTwo}']]//a[contains(@href,'product_details')]`).first(),

            menTshirt: page.locator(`//p[normalize-space()=${productData.nameOne}]`).first(),

            menTshirtAddToCart: page.locator(`//div[.//p[normalize-space()='${productData.nameOne}']]//a[contains(@class,'add-to-cart')]`).first(),
        };

        this.cartConfirmation = {
            modal: page.locator("//div[@class='modal-content']"),
            addedMessage: page.locator("//h4[normalize-space()='Added!']"),
            viewCart: page.locator("//u[normalize-space()='View Cart']"),
            continueShopping: page.locator("//button[normalize-space()='Continue Shopping']"),
        };

        this.productSearch = {
            searchInput: page.locator("//input[@id='search_product']"),
            searchButton: page.locator("//button[@id='submit_search']"),
            searchedProductsHeading: page.locator("//h2[normalize-space()='Searched Products']"),
            searchedProductCards: page.locator("//div[contains(@class,'product-image-wrapper')]"),
        };

        this.productImages = page.locator("//div[contains(@class,'product-image-wrapper')]//img");

        this.productDetails = {

            information: page.locator("//div[contains(@class,'product-information')]"),
            name: page.locator("//div[contains(@class,'product-information')]//h2"),
            category: page.locator("//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Category:')]"),
            price: page.locator(`//span[normalize-space()='${productData.priceOne}']`),
            availability: page.locator("//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Availability:')]"),
            condition: page.locator("//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Condition:')]"),
            brand: page.locator("//div[contains(@class,'product-information')]//p[contains(normalize-space(),'Brand:')]"),

        };
        this.productDetailsImage = page.locator("//div[contains(@class,'product-details')]//img").first();
        this.productQuantity = page.locator("//input[@id='quantity']");
        this.productDetailsAddToCart = page.locator("//button[normalize-space()='Add to cart']");
        this.productReview = {
            name: page.locator("//input[@id='name']"),
            email: page.locator("//input[@id='email']"),
            review: page.locator("//textarea[@id='review']"),
            submit: page.locator("//button[@id='button-review']"),
            successMessage: page.locator("//div[@id='review-section']//span[contains(normalize-space(),'Thank you for your review.')]"),
        };

        this.product = {
            name: page.locator("//input[@id='name']"),
            email: page.locator("//input[@id='email']"),
            review: page.locator("//textarea[@id='review']"),
            submit: page.locator("//button[@id='button-review']"),
            successMessage: page.locator("//div[@id='review-section']//span[contains(normalize-space(),'Thank you for your review.')]"),
        };
    }
    async open() {
        await this.page.goto(ROUTES.PRODUCTS, {waitUntil: 'domcontentloaded', timeout: 60000});
    }
}
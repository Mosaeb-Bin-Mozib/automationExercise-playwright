import {ROUTES} from "../test-data/routes";
import {getProductData} from '../test-data/productData';
const productData = getProductData();

export class HomePage {
    constructor(page) {
        this.page = page;
        this.homeHeading = page.getByRole('heading', {name: 'Full-Fledged practice website for Automation Engineers'}).first();

        this.homeLink = page.getByRole('link', { name: /Home/ }).first();
        this.productsLink = page.getByRole('link', { name: /Products/ }).first();
        this.cartLink = page.getByRole('link', { name: /Cart/ }).first();
        this.signupLoginLink = page.getByRole('link', { name: /Signup \/ Login/ }).first();
        this.contactUsLink = page.getByRole('link', { name: /Contact us/ }).first();

        this.loginInfo = page.locator("//h2[normalize-space()='Login to your account']");
        this.productInfo = page.locator("(//h2[normalize-space()='All Products'])[1]");
        this.contactInfo = page.locator("//h2[normalize-space()='Get In Touch']");
        this.featuredItemsInfo = page.locator("//div[contains(@class,'features_items')]");
        this.addToCart = page.locator("//a[normalize-space()='Cart']");
        this.blueTopDetails = page.getByText('Add to cart', { exact: true });
        this.homebutton = page.locator("//a[normalize-space()='Home']");

        this.header = page.locator('header');
        this.banner = page.locator('#slider-carousel');
        this.categories = page.getByText('Category').first();
        this.products = page.getByText('Features Items').first();
        this.footer = page.locator('footer');

        this.loginHeading = page.locator(
            "//h2[normalize-space()='Login to your account']"
        );

        this.contactUsHeading = page.locator(
            "//h2[normalize-space()='Get In Touch']"
        );

        this.categories = {
            section: page.locator(
                "//h2[normalize-space()='Category']"
            ),

            women: {
                category: page.locator(
                    "//a[contains(., 'Women')]"
                ).first(),

                dress: page.locator(
                    "//div[@id='Women']//a[contains(text(),'Dress')]"
                ).first(),

                tops: page.locator(
                    "//a[normalize-space()='Tops']"
                ).first(),

                saree: page.locator(
                    "//a[normalize-space()='Saree']"
                ).first(),
            },

            men: {
                category: page.locator(
                    "//a[contains(., 'Men')]"
                ).first(),

                tshirts: page.locator(
                    "//a[normalize-space()='Tshirts']"
                ).first(),

                jeans: page.locator(
                    "//a[normalize-space()='Jeans']"
                ).first(),
            },

            kids: {
                category: page.locator(
                    "//a[contains(., 'Kids')]"
                ).first(),

                dress: page.locator(
                    "//a[normalize-space()='Dress']"
                ).last(),

                topsShirts: page.locator(
                    "//a[contains(normalize-space(), 'Tops & Shirts')]"
                ),
            },
        };

        this.brands = {
            section: page.locator(
                "//h2[normalize-space()='Brands']"
            ),

            polo: page.locator(
                "//a[@href='/brand_products/Polo']"
            ),

            hm: page.locator(
                "//a[@href='/brand_products/H&M']"
            ),

            madame: page.locator(
                "//a[@href='/brand_products/Madame']"
            ),

            mastAndHarbour: page.locator(
                "//a[@href='/brand_products/Mast & Harbour']"
            ),

            babyhug: page.locator(
                "//a[@href='/brand_products/Babyhug']"
            ),

            allenSollyJunior: page.locator(
                "//a[@href='/brand_products/Allen Solly Junior']"
            ),

            kookieKids: page.locator(
                "//a[@href='/brand_products/Kookie Kids']"
            ),

            biba: page.locator(
                "//a[@href='/brand_products/Biba']"
            ),
        };

        this.featuredItems = {
            products: page.locator("//div[contains(@class,'features_items')]"),
            productImages: page.getByRole('img', { name: 'ecommerce website products' }),
            productNames: page.getByText(productData.nameTwo, { exact: true }),
            productPrices: page.getByRole('heading', { name: productData.priceTwo }),
            addToCart: page.locator("//div[contains(@class,'features_items')]//a[contains(@class,'add-to-cart')]"),
            viewProduct: page.locator("//div[contains(@class,'features_items')]//a[contains(normalize-space(),'View Product')]"),
        };

        this.productDetails = {
            blueTopViewProduct:page.getByRole('link', { name: 'View Product' }).first(),

            name: page.locator("//div[contains(@class,'product-information')]//h2"),

            category: page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Category:')]"),

            price: page.locator("//div[contains(@class,'product-information')]//span[contains(.,'Rs.')]").first(),

            availability: page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Availability:')]"),

            condition: page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Condition:')]"),

            brand: page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Brand:')]"),
        };

        this.cart = {
            bluePrice: page.locator('tr').filter({ hasText: productData.nameTwo }).locator('td.cart_price p'),
            blueQuantity:page.locator(`//tr[@id='product-1']//button[@class='disabled'][normalize-space()=${productData.productQuantity}]`),
            menTshirtPrice:page.locator('#product-2 td.cart_price p'),
            menTshirtQuantity:page.locator(`//tr[@id='product-2']//button[@class='disabled'][normalize-space()=${productData.productQuantity}]`),
            blueTopAddToCart: page.getByText('Add to cart', { exact: true }).first(),

            viewCart: page.locator(
                "//div[contains(@class,'modal-content')]//a[contains(normalize-space(),'View Cart')]"
            ).first(),

            cartBlueTop: page.locator(
                `//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='${productData.nameTwo}']]`
            ).first(),

            productName: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]]//td[contains(@class,'cart_description')]//a"
            ).first(),

            productPrice: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]]//td[contains(@class,'cart_price')]//p"
            ).first(),

            quantity: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]]//td[contains(@class,'cart_quantity')]//button"
            ).first(),

            totalPrice: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]]//td[contains(@class,'cart_total')]//p"
            ).first(),

            continueShopping: page.locator(
                "//div[contains(@class,'modal-content')]//button[normalize-space()='Continue Shopping']"
            ).first(),

            menTshirtAddToCart:page.locator('[data-product-id="2"]').first(),

            blueTopCartRow: page.locator(
                `//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='${productData.nameTwo}']]`
            ).first(),

            menTshirtCartRow: page.locator(
                `//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='${productData.nameOne}']]`
            ).first(),
        };

        this.footerSections = {
            recommendedItems: page.locator(
                "//h2[normalize-space()='recommended items']"
            ),

            subscription: page.locator(
                "//h2[normalize-space()='Subscription']"
            ),

            footer: page.locator(
                "//footer"
            ),
        };
    }
    async open() {
        await this.page.goto(ROUTES.HOME, {waitUntil: 'domcontentloaded', timeout: 60000});
    }

}

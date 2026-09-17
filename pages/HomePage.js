import {ROUTES} from "../test-data/routes";
export class HomePage {
    constructor(page) {
        this.page = page;
        this.homeHeading = page
            .getByRole('heading', {
                name: 'Full-Fledged practice website for Automation Engineers'
            })
            .first();

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
        this.blueTopDetails = page.locator("//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]//a[contains(@href,'/product_details/')]");
        this.blueTopDetailsName = page.locator("//h2[normalize-space()='Blue Top']");
        this.blueTopDetailsPrice = page.locator("//span[normalize-space()='Rs. 500']");
        this.blueTopDetailsAddtoCart = page.locator("//button[normalize-space()='Add to cart']");
        this.blueTopDetailsViewCart = page.locator("//u[normalize-space()='View Cart']");
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
            section: page.locator(
                "//div[contains(@class,'features_items')]"
            ),

            products: page.locator(
                "//div[contains(@class,'features_items')]//div[contains(@class,'product-image-wrapper')]"
            ),

            productImages: page.locator(
                "//div[contains(@class,'features_items')]//div[contains(@class,'product-image-wrapper')]//img"
            ),

            productNames: page.locator(
                "//div[contains(@class,'features_items')]//div[contains(@class,'product-image-wrapper')]//p"
            ),

            productPrices: page.locator(
                "//div[contains(@class,'features_items')]//div[contains(@class,'product-image-wrapper')]//h2"
            ),

            addToCart: page.locator(
                "//div[contains(@class,'features_items')]//a[contains(@class,'add-to-cart')]"
            ),

            viewProduct: page.locator(
                "//div[contains(@class,'features_items')]//a[contains(normalize-space(),'View Product')]"
            ),
        };

        this.productDetails = {
            blueTop: page.locator("//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]").first(),

            blueTopViewProduct: page.locator("//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]//a[contains(normalize-space(),'View Product')]").first(),

            name: page.locator("//div[contains(@class,'product-information')]//h2"),

            category: page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Category:')]"),

            price: page.locator("//div[contains(@class,'product-information')]//span[contains(.,'Rs.')]").first(),

            availability: page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Availability:')]"),

            condition: page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Condition:')]"),

            brand: page.locator("//div[contains(@class,'product-information')]//p[contains(.,'Brand:')]"),
        };

        this.cart = {
            bluePrice:page.locator("//td[@class='cart_price']//p[contains(text(),'Rs. 500')]"),
            blueQuantity:page.locator("//tr[@id='product-1']//button[@class='disabled'][normalize-space()='1']"),
            menTshirtPrice:page.locator("//td[@class='cart_price']//p[contains(text(),'Rs. 400')]"),
            menTshirtQuantity:page.locator("//tr[@id='product-2']//button[@class='disabled'][normalize-space()='1']"),
            blueTopAddToCart: page.locator(
                "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]//a[contains(@class,'add-to-cart')]"
            ).first(),

            viewCart: page.locator(
                "//div[contains(@class,'modal-content')]//a[contains(normalize-space(),'View Cart')]"
            ).first(),

            cartBlueTop: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
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

            menTshirtAddToCart: page.locator(
                "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Men Tshirt']]//a[contains(@class,'add-to-cart')]"
            ).first(),

            blueTopCartRow: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
            ).first(),

            menTshirtCartRow: page.locator(
                "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Men Tshirt']]"
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
    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }
}

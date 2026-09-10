import { expect } from '@playwright/test';
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

        this.header = page.locator('header');
        this.banner = page.locator('#slider-carousel');
        this.categories = page.getByText('Category').first();
        this.products = page.getByText('Features Items').first();
        this.footer = page.locator('footer');
        this.testCasesLink = page.locator(
            "//a[normalize-space()='Test Cases']"
        ).first();

        this.apiTestingLink = page.locator(
            "//a[contains(normalize-space(), 'API Testing')]"
        ).first();

        this.loginHeading = page.locator(
            "//h2[normalize-space()='Login to your account']"
        );

        this.productsHeading = page.locator(
            "//h2[normalize-space()='All Products']"
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
                "//h2[normalize-space()='Features Items']"
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
        await this.page.goto(ROUTES.HOME, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
    }
    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }
    async verifyHomePageDisplayed() {await expect(this.homeHeading).toBeVisible();}
    async verifyMainNavigation() {
        await expect(this.homeLink).toBeVisible();
        await expect(this.productsLink).toBeVisible();
        await expect(this.cartLink).toBeVisible();
        await expect(this.signupLoginLink).toBeVisible();
        await expect(this.contactUsLink).toBeVisible();
    }
    async verifyMainPageSections() {
        await expect(this.header).toBeVisible();
        await expect(this.banner).toBeVisible();
        await expect(this.categories).toBeVisible();
        await expect(this.products).toBeVisible();
        await expect(this.footer).toBeVisible();
    }

    async verifySignupLoginPage() {
        await expect(this.page).toHaveURL(ROUTES.LOGIN);
        await expect(
            this.page.getByText('Login to your account').first()
        ).toBeVisible();
    }
    async verifyProductsPage() {
        await expect(this.page).toHaveURL(ROUTES.PRODUCTS);
        await expect(this.page.getByText('All Products').first()).toBeVisible();
    }
    async verifyCartPage() {
        await expect(this.page).toHaveURL(ROUTES.CART);
    }
    async verifyContactUsPage() {
        await expect(this.page).toHaveURL(ROUTES.CONTACT_US);
        await expect(
            this.page.getByText('Get In Touch').first()
        ).toBeVisible();
    }
    async verifyProductCategories() {

        await expect(this.categories.section).toBeVisible();
        await expect(this.categories.women.category).toBeVisible();
        await this.categories.women.category.click();
        await expect(this.categories.women.dress).toBeVisible();
        await expect(this.categories.women.tops).toBeVisible();
        await expect(this.categories.women.saree).toBeVisible();
        await expect(this.categories.men.category).toBeVisible();
        await this.categories.men.category.click();
        await expect(this.categories.men.tshirts).toBeVisible();
        await expect(this.categories.men.jeans).toBeVisible();
        await expect(this.categories.kids.category).toBeVisible();
        await this.categories.kids.category.click();
        await expect(this.categories.kids.dress).toBeVisible();
        await expect(this.categories.kids.topsShirts).toBeVisible();
    }

    async verifyCategoryProductListing() {
        await expect(this.page).toHaveURL(/.*\/category_products\/.*/);
        await expect(this.page.locator("//div[contains(@class,'features_items')]")).toBeVisible();
    }
    async verifyBrandsSection() {

        await expect(this.brands.section).toBeVisible();
        await expect(this.brands.polo).toBeVisible();
        await expect(this.brands.hm).toBeVisible();
        await expect(this.brands.madame).toBeVisible();
        await expect(this.brands.mastAndHarbour).toBeVisible();
        await expect(this.brands.babyhug).toBeVisible();
        await expect(this.brands.allenSollyJunior).toBeVisible();
        await expect(this.brands.kookieKids).toBeVisible();
        await expect(this.brands.biba).toBeVisible();
    }


    async verifyBrandProductListing() {

        await expect(this.page).toHaveURL(/.*\/brand_products\/.*/);
        await expect(
            this.page.locator(
                "//div[contains(@class,'features_items')]"
            )
        ).toBeVisible();
    }
    async verifyFeaturedItems() {

        await expect(this.featuredItems.section).toBeVisible();
        await expect(this.featuredItems.products.first()).toBeVisible();
        await expect(this.featuredItems.productImages.first()).toBeVisible();
        await expect(this.featuredItems.productNames.first()).toBeVisible();
        await expect(this.featuredItems.productPrices.first()).toBeVisible();
        await expect(this.featuredItems.addToCart.first()).toBeVisible();

    }

    async verifyBlueTopProductDetails() {
        await expect(this.productDetails.blueTop).toBeVisible();
        await this.productDetails.blueTopViewProduct.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(ROUTES.PRODUCTDETAILS_ONE);
        await expect(this.productDetails.name).toHaveText('Blue Top');
        await expect(this.productDetails.category).toContainText('Category:');
        await expect(this.productDetails.price).toBeVisible();
        await expect(this.productDetails.availability).toContainText('Availability:');
        await expect(this.productDetails.condition).toContainText('Condition:');
        await expect(this.productDetails.brand).toContainText('Brand:');
    }

    async addBlueTopToCart() {
        await expect(this.productDetails.blueTop).toBeVisible();
        await this.cart.blueTopAddToCart.click();
        await expect(this.cart.viewCart).toBeVisible();
        await this.cart.viewCart.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(ROUTES.CART);
        await expect(this.cart.cartBlueTop).toBeVisible();
    }

    async verifyCartProductInformation() {

        await expect(this.page).toHaveURL(ROUTES.CART);
        await expect(this.cart.productName).toHaveText('Blue Top');
        await expect(this.cart.productPrice).toHaveText('Rs. 500');
        await expect(this.cart.quantity).toHaveText('1');
        await expect(this.cart.totalPrice).toHaveText('Rs. 500');
    }

    async verifyContinueShopping() {

        await expect(this.productDetails.blueTop).toBeVisible();
        await this.cart.blueTopAddToCart.click();
        await expect(this.cart.continueShopping).toBeVisible();
        await this.cart.continueShopping.click();
        await expect(this.cart.continueShopping).toBeHidden();
        await expect(this.page).toHaveURL(/.*\/$/);
        await expect(this.productDetails.blueTop).toBeVisible();

        await this.page.locator("//a[normalize-space()='Cart']").first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(ROUTES.CART);
        await expect(this.cart.cartBlueTop).toBeVisible();
    }

    async verifyFooterContent() {

        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        await expect(this.footerSections.subscription).toBeVisible();
        await expect(this.footerSections.footer).toBeVisible();
        await expect(this.footerSections.footer).toContainText('Copyright');
        await expect(this.footerSections.footer).toBeInViewport();
    }

    async verifyMultipleProductsInCart() {

        await this.cart.blueTopAddToCart.click();
        await this.cart.continueShopping.click();
        await expect(this.cart.continueShopping).toBeHidden();
        await this.cart.menTshirtAddToCart.click();
        await this.cart.viewCart.click();
        await expect(this.page).toHaveURL(ROUTES.CART);
        await expect(this.cart.blueTopCartRow).toBeVisible();
        await expect(this.cart.menTshirtCartRow).toBeVisible();
        await expect(this.cart.blueTopCartRow.locator("td.cart_price p")).toHaveText('Rs. 500');
        await expect(this.cart.blueTopCartRow.locator("td.cart_quantity button")).toHaveText('1');
        await expect(this.cart.menTshirtCartRow.locator("td.cart_price p")).toHaveText('Rs. 400');
        await expect(this.cart.menTshirtCartRow.locator("td.cart_quantity button")).toHaveText('1');
        await this.page.waitForTimeout(1000);

    }

    async verifyCriticalShoppingJourney() {
        await expect(this.page).toHaveURL(ROUTES.HOME);
        await expect(this.featuredItems.section).toBeVisible();
        await this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]//a[contains(@href,'/product_details/')]"
        ).first().click();
        await expect(this.page).toHaveURL(ROUTES.PRODUCTDETAILS_ONE);
        await expect(this.page.locator(
                "//div[@class='product-information']//h2[normalize-space()='Blue Top']"
            )
        ).toBeVisible();
        await expect(this.page.locator(
                "//div[@class='product-information']//span[normalize-space()='Rs. 500']"
            )
        ).toBeVisible();
        await this.page.locator(
            "//button[contains(@class,'cart') and contains(.,'Add to cart')]"
        ).click();
        await this.page.locator(
            "//u[normalize-space()='View Cart']"
        ).click();
        await expect(this.page
        ).toHaveURL(ROUTES.CART);
        const blueTopCartRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopCartRow).toBeVisible();
        await expect(
            blueTopCartRow.locator("td.cart_price p")
        ).toHaveText('Rs. 500');

        await expect(
            blueTopCartRow.locator("td.cart_quantity button")
        ).toHaveText('1');
        await this.page.locator("//a[normalize-space()='Home']").first().click();
        await expect(this.page).toHaveURL(ROUTES.HOME);
        await expect(this.homeHeading).toBeVisible();
    }
}

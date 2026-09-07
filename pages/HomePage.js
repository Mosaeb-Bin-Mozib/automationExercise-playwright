import { expect } from '@playwright/test';
import { test } from '../fixtures/utility.fixture';

export class HomePage {
    constructor(page) {
        this.page = page;

        // Home page heading
        this.homeHeading = page
            .getByRole('heading', {
                name: 'Full-Fledged practice website for Automation Engineers'
            })
            .first();

        //Main navigation
        this.homeLink = page.getByRole('link', { name: /Home/ }).first();
        this.productsLink = page.getByRole('link', { name: /Products/ }).first();
        this.cartLink = page.getByRole('link', { name: /Cart/ }).first();
        this.signupLoginLink = page.getByRole('link', { name: /Signup \/ Login/ }).first();
        this.contactUsLink = page.getByRole('link', { name: /Contact us/ }).first();

        // AE-045 - Main page sections
        this.header = page.locator('header');
        this.banner = page.locator('#slider-carousel');
        this.categories = page.getByText('Category').first();
        this.products = page.getByText('Features Items').first();
        this.footer = page.locator('footer');

        // AE-046 - Navigation links using XPath

        this.testCasesLink = page.locator(
            "//a[normalize-space()='Test Cases']"
        ).first();

        this.apiTestingLink = page.locator(
            "//a[contains(normalize-space(), 'API Testing')]"
        ).first();

        // AE-046 - Page verification locators
        this.loginHeading = page.locator(
            "//h2[normalize-space()='Login to your account']"
        );

        this.productsHeading = page.locator(
            "//h2[normalize-space()='All Products']"
        );

        this.contactUsHeading = page.locator(
            "//h2[normalize-space()='Get In Touch']"
        );

        // AE-048 - Product Categories
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

        // AE-050 - Brands
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

        // AE-051 - Featured Items
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

        // AE-052 - Product Details
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

        // AE-053 - Add product to Cart
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

            // AE-054
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

            // AE-055 - Continue Shopping
            continueShopping: page.locator(
                "//div[contains(@class,'modal-content')]//button[normalize-space()='Continue Shopping']"
            ).first(),

            // AE-062 - Multiple products

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

        //AE-057 - Bottom page sections
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

    // Open Home page
    async open() {
        await this.page.goto('/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
    }

    // Wait for Home page to load
    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    // Verify Home page URL
    async verifyHomePageURL() {
        await expect(this.page).toHaveURL('/');
    }

    // Verify Home page heading
    async verifyHomePageDisplayed() {await expect(this.homeHeading).toBeVisible();}

    // AE-044 - Verify main navigation
    async verifyMainNavigation() {

        // Verify Home link
        await expect(this.homeLink).toBeVisible();

        // Verify Products link
        await expect(this.productsLink).toBeVisible();

        // Verify Cart link
        await expect(this.cartLink).toBeVisible();

        // Verify Signup / Login link
        await expect(this.signupLoginLink).toBeVisible();

        // Verify Contact Us link
        await expect(this.contactUsLink).toBeVisible();
    }

    // AE-045 - Verify main page content is not visually broken
    async verifyMainPageSections() {

        // Verify header
        await expect(this.header).toBeVisible();

        // Verify banner/content area
        await expect(this.banner).toBeVisible();

        // Verify categories
        await expect(this.categories).toBeVisible();

        // Verify a products section
        await expect(this.products).toBeVisible();

        // Verify footer
        await expect(this.footer).toBeVisible();
    }

    // AE-046 - Verify Signup / Login page
    async verifySignupLoginPage() {
        await expect(this.page).toHaveURL("/login");
        await expect(
            this.page.getByText('Login to your account').first()
        ).toBeVisible();
    }

    // AE-046 - Verify Products page
    async verifyProductsPage() {
        await expect(this.page).toHaveURL("/products");
        await expect(
            this.page.getByText('All Products').first()
        ).toBeVisible();
    }

    // AE-046 - Verify Cart page
    async verifyCartPage() {
        await expect(this.page).toHaveURL("/view_cart");
    }

    // AE-046 - Verify Contact Us page
    async verifyContactUsPage() {
        await expect(this.page).toHaveURL("/contact_us");
        await expect(
            this.page.getByText('Get In Touch').first()
        ).toBeVisible();
    }


    // AE-048 - Verify all product categories and subcategories
    async verifyProductCategories() {

        // Verify a Category section
        await expect(this.categories.section).toBeVisible();

        // Verify Women category
        await expect(this.categories.women.category).toBeVisible();

        // Open Women category
        await this.categories.women.category.click();

        // Verify Women subcategories
        await expect(this.categories.women.dress).toBeVisible();
        await expect(this.categories.women.tops).toBeVisible();
        await expect(this.categories.women.saree).toBeVisible();

        // Verify Men category
        await expect(this.categories.men.category).toBeVisible();

        // Open Men category
        await this.categories.men.category.click();

        // Verify Men subcategories
        await expect(this.categories.men.tshirts).toBeVisible();
        await expect(this.categories.men.jeans).toBeVisible();

        // Verify Kids category
        await expect(this.categories.kids.category).toBeVisible();

        // Open Kids category
        await this.categories.kids.category.click();

        // Verify Kids subcategories
        await expect(this.categories.kids.dress).toBeVisible();
        await expect(this.categories.kids.topsShirts).toBeVisible();
    }

    // AE-049 - Verify category/subcategory product listing
    async verifyCategoryProductListing() {

        // Verify category product page is opened
        await expect(this.page).toHaveURL(/.*\/category_products\/.*/);

        // Verify product listing is displayed
        await expect(this.page.locator("//div[contains(@class,'features_items')]")).toBeVisible();
    }

    // AE-050 - Verify Brands section
    async verifyBrandsSection() {

        // Verify a Brands section
        await expect(this.brands.section).toBeVisible();

        // Verify all available brands
        await expect(this.brands.polo).toBeVisible();
        await expect(this.brands.hm).toBeVisible();
        await expect(this.brands.madame).toBeVisible();
        await expect(this.brands.mastAndHarbour).toBeVisible();
        await expect(this.brands.babyhug).toBeVisible();
        await expect(this.brands.allenSollyJunior).toBeVisible();
        await expect(this.brands.kookieKids).toBeVisible();
        await expect(this.brands.biba).toBeVisible();
    }


    // AE-050 - Verify brand product listing
    async verifyBrandProductListing() {

        // Verify brand product page URL
        await expect(this.page).toHaveURL(/.*\/brand_products\/.*/);

        // Verify product listing is displayed
        await expect(
            this.page.locator(
                "//div[contains(@class,'features_items')]"
            )
        ).toBeVisible();
    }

    // AE-051 - Verify Featured Items and product information
    async verifyFeaturedItems() {

        // Verify the Featured Items section
        await expect(this.featuredItems.section).toBeVisible();

        // Verify featured products are displayed
        await expect(this.featuredItems.products.first()).toBeVisible();

        // Verify product images
        await expect(this.featuredItems.productImages.first()).toBeVisible();

        // Verify product names
        await expect(this.featuredItems.productNames.first()).toBeVisible();

        // Verify product prices
        await expect(this.featuredItems.productPrices.first()).toBeVisible();

        // Verify Add to Cart controls
        await expect(this.featuredItems.addToCart.first()).toBeVisible();

    }

    // AE-052 - Open Blue Top and verify product details
    async verifyBlueTopProductDetails() {

        // Verify Blue Top is displayed on Home page
        await expect(this.productDetails.blueTop).toBeVisible();

        // Click View Product
        await this.productDetails.blueTopViewProduct.click();

        // Wait for product detail page
        await this.page.waitForLoadState('domcontentloaded');

        // Verify product detail URL
        await expect(this.page).toHaveURL("/product_details/1");

        // Verify product name
        await expect(this.productDetails.name).toHaveText('Blue Top');

        // Verify category
        await expect(this.productDetails.category).toContainText('Category:');
        // Verify price
        await expect(this.productDetails.price).toBeVisible();

        // Verify availability
        await expect(this.productDetails.availability).toContainText('Availability:');

        // Verify condition
        await expect(this.productDetails.condition).toContainText('Condition:');

        // Verify brand
        await expect(this.productDetails.brand).toContainText('Brand:');
    }

    // AE-053 - Add Blue Top to Cart and verify
    async addBlueTopToCart() {

        // Verify Blue Top is displayed
        await expect(this.productDetails.blueTop).toBeVisible();

        // Click Add to Cart
        await this.cart.blueTopAddToCart.click();

        // Verify confirmation modal
        await expect(this.cart.viewCart).toBeVisible();

        // Click View Cart
        await this.cart.viewCart.click();

        // Wait for Cart page
        await this.page.waitForLoadState('domcontentloaded');

        // Verify Cart page
        await expect(this.page).toHaveURL("/view_cart");

        // Verify Blue Top is in Cart
        await expect(this.cart.cartBlueTop).toBeVisible();
    }

    // AE-054 - Verify real Cart product and pricing information
    async verifyCartProductInformation() {

        // Verify Cart page
        await expect(this.page).toHaveURL("/view_cart");

        // Verify product name
        await expect(this.cart.productName).toHaveText('Blue Top');

        // Verify actual product price
        await expect(this.cart.productPrice).toHaveText('Rs. 500');

        // Verify actual quantity
        await expect(this.cart.quantity).toHaveText('1');

        // Verify actual total price
        await expect(this.cart.totalPrice).toHaveText('Rs. 500');
    }

    // AE-055 - Verify Continue Shopping behavior
    async verifyContinueShopping() {

        // Verify Blue Top is displayed on the Home page
        await expect(this.productDetails.blueTop).toBeVisible();

        // Add Blue Top to Cart
        await this.cart.blueTopAddToCart.click();

        // Verify Add to Cart confirmation
        await expect(this.cart.continueShopping).toBeVisible();

        // Click Continue Shopping
        await this.cart.continueShopping.click();

        // Wait for modal to close
        await expect(this.cart.continueShopping).toBeHidden();

        // Verify the user is back on shopping/Home page
        await expect(this.page).toHaveURL(/.*\/$/);

        // Verify Blue Top is still available for shopping
        await expect(this.productDetails.blueTop).toBeVisible();

        // Open Cart again
        await this.page.locator("//a[normalize-space()='Cart']").first().click();

        // Wait for Cart page
        await this.page.waitForLoadState('domcontentloaded');

        // Verify Cart page
        await expect(this.page).toHaveURL("/view_cart");

        // Verify previously added Blue Top remains in Cart
        await expect(this.cart.cartBlueTop).toBeVisible();
    }

    // AE-059 - Verify Footer content
    async verifyFooterContent() {

        // Scroll to the bottom of the Home page
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        // Verify a Subscription section
        await expect(this.footerSections.subscription).toBeVisible();

        // Verify Footer is displayed
        await expect(this.footerSections.footer).toBeVisible();

        // Verify footer contains expected information
        await expect(this.footerSections.footer).toContainText('Copyright');

        // Verify the footer is within the viewport
        await expect(this.footerSections.footer).toBeInViewport();
    }

    // AE-062 - Verify multiple products in Cart
    async verifyMultipleProductsInCart() {

        // Add Blue Top to Cart
        await this.cart.blueTopAddToCart.click();

        // Click Continue Shopping
        await this.cart.continueShopping.click();

        // Wait for modal to close
        await expect(this.cart.continueShopping).toBeHidden();

        // Add Men Tshirt to Cart
        await this.cart.menTshirtAddToCart.click();

        // Open Cart
        await this.cart.viewCart.click();

        // Verify Cart page
        await expect(this.page).toHaveURL("/view_cart");

        // Verify Blue Top is in Cart
        await expect(this.cart.blueTopCartRow).toBeVisible();

        // Verify Men Tshirt is in Cart
        await expect(this.cart.menTshirtCartRow).toBeVisible();

        // Verify Blue Top price
        await expect(this.cart.blueTopCartRow.locator("td.cart_price p")).toHaveText('Rs. 500');

        // Verify Blue Top quantity
        await expect(this.cart.blueTopCartRow.locator("td.cart_quantity button")).toHaveText('1');

        // Verify Men Tshirt price
        await expect(this.cart.menTshirtCartRow.locator("td.cart_price p")).toHaveText('Rs. 400');

        // Verify Men Tshirt quantity
        await expect(this.cart.menTshirtCartRow.locator("td.cart_quantity button")).toHaveText('1');
        await this.page.waitForTimeout(1000);

    }

    // AE-064 - Verify a critical Home → Product → Cart journey
    async verifyCriticalShoppingJourney() {

        // Verify Home page is loaded
        await expect(this.page).toHaveURL("/");

        // Verify Featured Items
        await expect(this.featuredItems.section).toBeVisible();

        // Open Blue Top product
        await this.page.locator(
            "//div[contains(@class,'product-image-wrapper')][.//p[normalize-space()='Blue Top']]//a[contains(@href,'/product_details/')]"
        ).first().click();

        // Verify the Product Details page
        await expect(this.page).toHaveURL("/product_details/1");

        // Verify product name
        await expect(this.page.locator(
                "//div[@class='product-information']//h2[normalize-space()='Blue Top']"
            )
        ).toBeVisible();

        // Verify product price
        await expect(this.page.locator(
                "//div[@class='product-information']//span[normalize-space()='Rs. 500']"
            )
        ).toBeVisible();

        // Add Blue Top to Cart
        await this.page.locator(
            "//button[contains(@class,'cart') and contains(.,'Add to cart')]"
        ).click();

        // Click View Cart
        await this.page.locator(
            "//u[normalize-space()='View Cart']"
        ).click();

        // Verify Cart page
        await expect(this.page
        ).toHaveURL("/view_cart");

        // Verify Blue Top is in Cart
        const blueTopCartRow = this.page.locator(
            "//tr[.//td[contains(@class,'cart_description')]//a[normalize-space()='Blue Top']]"
        ).first();

        await expect(blueTopCartRow).toBeVisible();

        // Verify Blue Top price in Cart
        await expect(
            blueTopCartRow.locator("td.cart_price p")
        ).toHaveText('Rs. 500');

        // Verify quantity
        await expect(
            blueTopCartRow.locator("td.cart_quantity button")
        ).toHaveText('1');

        // Return to Home
        await this.page.locator("//a[normalize-space()='Home']").first().click();

        // Verify Home page
        await expect(this.page).toHaveURL("/");

        // Verify Home page remains usable
        await expect(this.homeHeading).toBeVisible();
    }
}
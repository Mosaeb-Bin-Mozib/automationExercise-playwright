import { test, expect } from '../../fixtures/Home.fixture';

test.describe('Home Page', () => {

    // AE-042
    test('AE-042 - Verify that the Home page loads successfully', async ({ homePage }) => {

            // 1. Open Home page
            await homePage.open();

            // 2. Wait for page loading
            await homePage.waitForPageLoad();

            // 3. Verify Home page URL
            await homePage.verifyHomePageURL();

            // 4. Verify Home page content
            await homePage.verifyHomePageDisplayed();

        }
    );

    // AE-043
    test('AE-043 - Verify Home page identifies Automation Exercise', async ({ homePage }) => {

            // 1. Open Home page
            await homePage.open();

            // 2. Wait for the page to load
            await homePage.waitForPageLoad();

            // 3. Verify Automation Exercise branding in the page title
            await expect(homePage.page).toHaveTitle(/Automation Exercise/);

            // 4. Verify Home page heading/content
            await homePage.verifyHomePageDisplayed();
        }
    );

    // AE-044
    test('AE-044 - Verify that the main navigation is displayed', async ({ homePage }) => {

            // 1. Open Home page
            await homePage.open();

            // 2. Wait for Home page to load
            await homePage.waitForPageLoad();

            // 3. Verify main navigation
            await homePage.verifyMainNavigation();
        }
    );

    // AE-045
    test('AE-045 - Verify that the main page content is not visually broken', async ({ homePage }) => {

            // 1. Open Home page
            await homePage.open();

            // 2. Wait for Home page to load
            await homePage.waitForPageLoad();

            // 3. Verify header, banner, categories, products and footer
            await homePage.verifyMainPageSections();
        }
    );

    // AE-046 - Verify all major navigation links from Home page
    test('AE-046 - Verify all major navigation links from Home page', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await homePage.signupLoginLink.click();
            await homePage.verifySignupLoginPage();
            await homePage.open();
            await homePage.productsLink.click();
            await homePage.verifyProductsPage();
            await homePage.open();
            await homePage.cartLink.click();
            await homePage.verifyCartPage();
            await homePage.open();
            await homePage.contactUsLink.click();
            await homePage.verifyContactUsPage();
            await homePage.open();
        }
    );

    // AE-048 - Verify all available product categories and subcategories
    test('AE-048 - Verify all available product categories and subcategories', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            // Verify all categories and subcategories
            await homePage.verifyProductCategories();
        }
    );

    // AE-049 - Verify category/subcategory navigation
    test('AE-049 - Verify each category and subcategory navigates to correct product listing', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            // Women → Dress
            await homePage.categories.women.category.click();
            await homePage.categories.women.dress.click();
            await homePage.verifyCategoryProductListing();
            // Women → Tops
            await homePage.open();
            await homePage.categories.women.category.click();
            await homePage.categories.women.tops.click();
            await homePage.verifyCategoryProductListing();
            // Women → Saree
            await homePage.open();
            await homePage.categories.women.category.click();
            await homePage.categories.women.saree.click();
            await homePage.verifyCategoryProductListing();
            // Men → t-Shirts
            await homePage.open();
            await homePage.categories.men.category.click();
            await homePage.categories.men.tshirts.click();
            await homePage.verifyCategoryProductListing();
            // Men → Jeans
            await homePage.open();
            await homePage.categories.men.category.click();
            await homePage.categories.men.jeans.click();
            await homePage.verifyCategoryProductListing();
            // Kids → Dress
            await homePage.open();
            await homePage.categories.kids.category.click();
            await homePage.categories.kids.dress.click();
            await homePage.verifyCategoryProductListing();
            // Kids → Tops & Shirts
            await homePage.open();
            await homePage.categories.kids.category.click();
            await homePage.categories.kids.topsShirts.click();
            await homePage.verifyCategoryProductListing();
            await homePage.open();
        }
    );
    // AE-050 - Verify available brands and brand navigation
    test('AE-050 - Verify available brands and brand navigation', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            // Verify a Brands section
            await homePage.verifyBrandsSection();
            // Polo
            await homePage.brands.polo.click();
            await homePage.verifyBrandProductListing();
            // H&M
            await homePage.open();
            await homePage.brands.hm.click();
            await homePage.verifyBrandProductListing();
            // Madame
            await homePage.open();
            await homePage.brands.madame.click();
            await homePage.verifyBrandProductListing();
            // Mast & Harbour
            await homePage.open();
            await homePage.brands.mastAndHarbour.click();
            await homePage.verifyBrandProductListing();
            // Baby hug
            await homePage.open();
            await homePage.brands.babyhug.click();
            await homePage.verifyBrandProductListing();
            // Allen Solly Junior
            await homePage.open();
            await homePage.brands.allenSollyJunior.click();
            await homePage.verifyBrandProductListing();
            // Kookie Kids
            await homePage.open();
            await homePage.brands.kookieKids.click();
            await homePage.verifyBrandProductListing();
            // Biba
            await homePage.open();
            await homePage.brands.biba.click();
            await homePage.verifyBrandProductListing();
        }
    );

        // AE-051 - Verify Featured Items and product information
        test('AE-051 - Verify Featured Items and product information', async ({ homePage }) => {
                    await homePage.open();
                    await homePage.waitForPageLoad();
                    // Verify Featured Items and product information
                    await homePage.verifyFeaturedItems();
            }
        );

        // AE-052 - Verify product can be opened from Home page
        test('AE-052 - Verify product can be opened from Home page', async ({ homePage }) => {
                await homePage.open();
                await homePage.waitForPageLoad();
                // Open Blue Top and verify product details
                await homePage.verifyBlueTopProductDetails();
            }
        );
    // AE-053 - Verify product can be added to Cart from Home page
    test('AE-053 - Verify product can be added to Cart from Home page', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            // Add Blue Top to the Cart and verify
            await homePage.addBlueTopToCart();
        }
    );
    // AE-054 - Verify Cart contains correct product and pricing information
    test('AE-054 - Verify Cart contains correct product and pricing information', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            // Add Blue Top to Cart
            await homePage.addBlueTopToCart();
            // Verify actual product information
            await homePage.verifyCartProductInformation();
        }
    );
    // AE-055 - Verify Continue Shopping behavior after adding a product
    test('AE-055 - Verify Continue Shopping behavior', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            // Verify Continue Shopping behavior
            await homePage.verifyContinueShopping();
        }
    );
    // AE-059 - Verify Footer content is displayed correctly
    test('AE-059 - Verify Footer content', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            // Verify Footer and its content
            await homePage.verifyFooterContent();
        }
    );

    // AE-062 - Verify multiple products in Cart
    test('AE-062 - Verify multiple products are added to Cart correctly', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            // Add multiple products and verify Cart
            await homePage.verifyMultipleProductsInCart();
        }
    );

    // AE-064 - Critical Home → Product → Cart journey
    test('AE-064 - Verify critical Home to Product to Cart journey', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            // Execute a critical shopping journey
            await homePage.verifyCriticalShoppingJourney();
        }
    );
});
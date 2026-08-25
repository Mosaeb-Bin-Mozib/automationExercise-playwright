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

            // 5. Wait so you can see the page
            await homePage.page.waitForTimeout(5000);
        }
    );

    // AE-043
    test('AE-043 - Verify Home page identifies Automation Exercise', async ({ homePage }) => {

            // 1. Open Home page
            await homePage.open();

            // 2. Wait for page to load
            await homePage.waitForPageLoad();

            // 3. Verify Automation Exercise branding in the page title
            await expect(homePage.page).toHaveTitle(
                /Automation Exercise/
            );

            // 4. Verify Home page heading/content
            await homePage.verifyHomePageDisplayed();

            // 5. Wait so you can see the result
            await homePage.page.waitForTimeout(5000);
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

            // 4. Wait so you can visually verify the navigation
            await homePage.page.waitForTimeout(5000);
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

            // 4. Wait so you can visually inspect the page
            await homePage.page.waitForTimeout(5000);
        }
    );

    // AE-046 - Verify all major navigation links from Home page
    test('AE-046 - Verify all major navigation links from Home page', async ({ homePage }) => {

            // Open Home page
            await homePage.open();

            // Wait for Home page to load
            await homePage.waitForPageLoad();

            // 1. Click Signup / Login
            await homePage.signupLoginLink.click();

            // Verify Login page
            await homePage.verifySignupLoginPage();

            // 2. Open Home page again
            await homePage.open();

            // 3. Click Products
            await homePage.productsLink.click();

            // Verify Products page
            await homePage.verifyProductsPage();

            // 4. Open Home page again
            await homePage.open();

            // 5. Click Cart
            await homePage.cartLink.click();

            // Verify Cart page
            await homePage.verifyCartPage();

            // 6. Open Home page again
            await homePage.open();

            // 7. Click Contact Us
            await homePage.contactUsLink.click();

            // Verify Contact Us page
            await homePage.verifyContactUsPage();

            // 8. Open Home page again
            await homePage.open();

            // 9. Click Test Cases
            await homePage.testCasesLink.click();

            // Verify Test Cases page
            await homePage.verifyTestCasesPage();

            // 10. Open Home page again
            await homePage.open();

            // 11. Click API Testing
            await homePage.apiTestingLink.click();

            // Verify API Testing page
            await homePage.verifyApiTestingPage();

            // 10. Open Home page again
            await homePage.open();

            // Wait so you can see the final page
            await homePage.page.waitForTimeout(5000);
        }
    );

    // AE-048 - Verify all available product categories and subcategories
    test('AE-048 - Verify all available product categories and subcategories', async ({ homePage }) => {

            // Open Home page
            await homePage.open();

            // Wait for Home page to load
            await homePage.waitForPageLoad();

            // Verify all categories and subcategories
            await homePage.verifyProductCategories();

            // Wait to observe the result
            await homePage.page.waitForTimeout(5000);
        }
    );

    // AE-049 - Verify category/subcategory navigation
    test('AE-049 - Verify each category and subcategory navigates to correct product listing', async ({ homePage }) => {

            // Open Home page
            await homePage.open();

            // Wait for Home page
            await homePage.waitForPageLoad();

            // =========================
            // Women → Dress
            // =========================

            await homePage.categories.women.category.click();

            await homePage.categories.women.dress.click();

            await homePage.verifyCategoryProductListing();


            // =========================
            // Women → Tops
            // =========================

            await homePage.open();

            await homePage.categories.women.category.click();

            await homePage.categories.women.tops.click();

            await homePage.verifyCategoryProductListing();


            // =========================
            // Women → Saree
            // =========================

            await homePage.open();

            await homePage.categories.women.category.click();

            await homePage.categories.women.saree.click();

            await homePage.verifyCategoryProductListing();


            // =========================
            // Men → Tshirts
            // =========================

            await homePage.open();

            await homePage.categories.men.category.click();

            await homePage.categories.men.tshirts.click();

            await homePage.verifyCategoryProductListing();


            // =========================
            // Men → Jeans
            // =========================

            await homePage.open();

            await homePage.categories.men.category.click();

            await homePage.categories.men.jeans.click();

            await homePage.verifyCategoryProductListing();


            // =========================
            // Kids → Dress
            // =========================

            await homePage.open();

            await homePage.categories.kids.category.click();

            await homePage.categories.kids.dress.click();

            await homePage.verifyCategoryProductListing();


            // =========================
            // Kids → Tops & Shirts
            // =========================

            await homePage.open();

            await homePage.categories.kids.category.click();

            await homePage.categories.kids.topsShirts.click();

            await homePage.verifyCategoryProductListing();
            await homePage.open();


        // Wait so you can see the final page
            await homePage.page.waitForTimeout(5000);
        }
    );

    // AE-050 - Verify available brands and brand navigation
    test(
        'AE-050 - Verify available brands and brand navigation',
        async ({ homePage }) => {

            // Open Home page
            await homePage.open();

            // Wait for Home page to load
            await homePage.waitForPageLoad();

            // =========================
            // Verify Brands section
            // =========================

            await homePage.verifyBrandsSection();


            // =========================
            // Polo
            // =========================

            await homePage.brands.polo.click();

            await homePage.verifyBrandProductListing();


            // =========================
            // H&M
            // =========================

            await homePage.open();

            await homePage.brands.hm.click();

            await homePage.verifyBrandProductListing();


            // =========================
            // Madame
            // =========================

            await homePage.open();

            await homePage.brands.madame.click();

            await homePage.verifyBrandProductListing();


            // =========================
            // Mast & Harbour
            // =========================

            await homePage.open();

            await homePage.brands.mastAndHarbour.click();

            await homePage.verifyBrandProductListing();


            // =========================
            // Babyhug
            // =========================

            await homePage.open();

            await homePage.brands.babyhug.click();

            await homePage.verifyBrandProductListing();


            // =========================
            // Allen Solly Junior
            // =========================

            await homePage.open();

            await homePage.brands.allenSollyJunior.click();

            await homePage.verifyBrandProductListing();


            // =========================
            // Kookie Kids
            // =========================

            await homePage.open();

            await homePage.brands.kookieKids.click();

            await homePage.verifyBrandProductListing();


            // =========================
            // Biba
            // =========================

            await homePage.open();

            await homePage.brands.biba.click();

            await homePage.verifyBrandProductListing();

            // Wait so you can see the final page
            // await homePage.page.waitForTimeout(5000);
        }
    );

        // AE-051 - Verify Featured Items and product information
        test('AE-051 - Verify Featured Items and product information', async ({ homePage }) => {

                    // Open Home page
                    await homePage.open();

                    // Wait for Home page to load
                    await homePage.waitForPageLoad();

                    // Verify Featured Items and product information
                    await homePage.verifyFeaturedItems();

                    // Wait so you can see the result
                    await homePage.page.waitForTimeout(5000);
            }
        );

        // AE-052 - Verify product can be opened from Home page
        test('AE-052 - Verify product can be opened from Home page', async ({ homePage }) => {

                // Open Home page
                await homePage.open();

                // Wait for Home page to load
                await homePage.waitForPageLoad();

                // Open Blue Top and verify product details
                await homePage.verifyBlueTopProductDetails();

                // Wait so you can see the product detail page
                await homePage.page.waitForTimeout(5000);
            }
        );

    // AE-053 - Verify product can be added to Cart from Home page
    test('AE-053 - Verify product can be added to Cart from Home page', async ({ homePage }) => {

            // Open Home page
            await homePage.open();

            // Wait for Home page to load
            await homePage.waitForPageLoad();

            // Add Blue Top to the Cart and verify
            await homePage.addBlueTopToCart();

            // Wait so you can see the Cart page
            await homePage.page.waitForTimeout(5000);
        }
    );

    // AE-054 - Verify Cart contains correct product and pricing information
    test('AE-054 - Verify Cart contains correct product and pricing information', async ({ homePage }) => {

            // Open Home page
            await homePage.open();

            // Wait for Home page to load
            await homePage.waitForPageLoad();

            // Add Blue Top to Cart
            await homePage.addBlueTopToCart();

            // Verify actual product information
            await homePage.verifyCartProductInformation();

            // Wait so you can see the result
            await homePage.page.waitForTimeout(5000);
        }
    );

    // AE-055 - Verify Continue Shopping behavior after adding a product
    test('AE-055 - Verify Continue Shopping behavior', async ({ homePage }) => {

            // Open Home page
            await homePage.open();

            // Wait for Home page to load
            await homePage.waitForPageLoad();

            // Verify Continue Shopping behavior
            await homePage.verifyContinueShopping();

            // Wait so you can see the result
            await homePage.page.waitForTimeout(5000);
        }
    );

    // AE-059 - Verify Footer content is displayed correctly
    test('AE-059 - Verify Footer content', async ({ homePage }) => {
            // Open Home page
            await homePage.open();

            // Wait for Home page to load
            await homePage.waitForPageLoad();

            // Verify Footer and its content
            await homePage.verifyFooterContent();

            // Wait so you can see the footer
            await homePage.page.waitForTimeout(5000);
        }
    );

    // AE-062 - Verify multiple products in Cart
    test('AE-062 - Verify multiple products are added to Cart correctly', async ({ homePage }) => {

            // Open Home page
            await homePage.open();

            // Wait for Home page to load
            await homePage.waitForPageLoad();

            // Add multiple products and verify Cart
            await homePage.verifyMultipleProductsInCart();

            // Wait so you can see the Cart result
            await homePage.page.waitForTimeout(5000);
        }
    );

    // AE-064 - Critical Home → Product → Cart journey
    test('AE-064 - Verify critical Home to Product to Cart journey', async ({ homePage }) => {

            // Open Home page
            await homePage.open();

            // Wait for Home page to load
            await homePage.waitForPageLoad();

            // Execute critical shopping journey
            await homePage.verifyCriticalShoppingJourney();
        }
    );

    // AE-057 - Verify scrolling from top to bottom
    // test('AE-057 - Verify user can scroll from top to bottom', async ({ homePage }) => {
    //
    //         // Open Home page
    //         await homePage.open();
    //
    //         // Wait for Home page to load
    //         await homePage.waitForPageLoad();
    //
    //         // Scroll to bottom and verify bottom content
    //         await homePage.verifyScrollToBottom();
    //
    //         // Wait so you can see the bottom of the page
    //         await homePage.page.waitForTimeout(5000);
    //     }
    // );
});
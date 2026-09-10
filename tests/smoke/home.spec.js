import { test, expect } from '../../fixtures/Home.fixture';
import {ROUTES} from "../../test-data/routes";


test.describe('Home Page', () => {
    test('AE-042 - Verify that the Home page loads successfully', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await expect(homePage.page).toHaveURL(ROUTES.HOME);
            await homePage.verifyHomePageDisplayed();

        }
    );

    test('AE-043 - Verify Home page identifies Automation Exercise', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await expect(homePage.page).toHaveTitle(/Automation Exercise/);
            await homePage.verifyHomePageDisplayed();
        }
    );

    test('AE-044 - Verify that the main navigation is displayed', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await homePage.verifyMainNavigation();
        }
    );

    test('AE-045 - Verify that the main page content is not visually broken', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await homePage.verifyMainPageSections();
        }
    );

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

    test('AE-048 - Verify all available product categories and subcategories', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await homePage.verifyProductCategories();
        }
    );

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
    test('AE-050 - Verify available brands and brand navigation', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
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
     test('AE-051 - Verify Featured Items and product information', async ({ homePage }) => {
                    await homePage.open();
                    await homePage.waitForPageLoad();
                    await homePage.verifyFeaturedItems();
            }
        );

        test('AE-052 - Verify product can be opened from Home page', async ({ homePage }) => {
                await homePage.open();
                await homePage.waitForPageLoad();
                await homePage.verifyBlueTopProductDetails();
            }
        );
    test('AE-053 - Verify product can be added to Cart from Home page', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await homePage.addBlueTopToCart();
        }
    );
    test('AE-054 - Verify Cart contains correct product and pricing information', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await homePage.addBlueTopToCart();
            await homePage.verifyCartProductInformation();
        }
    );
    test('AE-055 - Verify Continue Shopping behavior', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await homePage.verifyContinueShopping();
        }
    );
    test('AE-059 - Verify Footer content', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await homePage.verifyFooterContent();
        }
    );

    test('AE-062 - Verify multiple products are added to Cart correctly', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await homePage.verifyMultipleProductsInCart();
        }
    );
    test('AE-064 - Verify critical Home to Product to Cart journey', async ({ homePage }) => {
            await homePage.open();
            await homePage.waitForPageLoad();
            await homePage.verifyCriticalShoppingJourney();
        }
    );
});

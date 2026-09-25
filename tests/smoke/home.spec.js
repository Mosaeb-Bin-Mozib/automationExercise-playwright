import { test, expect } from '../../fixtures/home.fixture';
import {ROUTES} from "../../test-data/routes";
import {getProductData} from "../../test-data/productData";
const productData = getProductData()


test.describe('Home Page frontend', () => {
    test('AE-042 - Verify that the Home page loads successfully', async ({ homePage }) => {
            await homePage.page.goto(ROUTES.HOME);
            await homePage.page.goto(ROUTES.CONTACT_US);
            await homePage.page.goto(ROUTES.HOME);
            await expect(homePage.page).toHaveURL(ROUTES.HOME);
            await expect(homePage.homeHeading).toBeVisible();
        }
    );

    test('AE-043 - Verify Home page identifies Automation Exercise', async ({ homePage }) => {
            await homePage.open();
            await expect(homePage.page).toHaveTitle(/Automation Exercise/);
            await expect(homePage.homeHeading).toBeVisible();
        }
    );

    test('AE-044 - Verify that the main navigation is displayed', async ({ homePage }) => {
            await homePage.open();
            await expect(homePage.homeLink).toBeVisible();
            await expect(homePage.productsLink).toBeVisible();
            await expect(homePage.cartLink).toBeVisible();
            await expect(homePage.signupLoginLink).toBeVisible();
            await expect(homePage.contactUsLink).toBeVisible();
        }
    );

    test('AE-045 - Verify that the main page content is not visually broken', async ({ homePage }) => {
            await homePage.open();
            await expect(homePage.header).toBeVisible();
            await expect(homePage.banner).toBeVisible();
            await expect(homePage.categories.section).toBeVisible();
            await expect(homePage.products).toBeVisible();
            await expect(homePage.footer).toBeVisible();
        }
    );

    test('AE-046 - Verify all major navigation links from Home page', async ({ homePage }) => {
            await homePage.open();
            await homePage.signupLoginLink.click();
            await expect(homePage.page).toHaveURL(ROUTES.LOGIN);
            await expect(homePage.loginInfo.first()).toBeVisible();
            await homePage.open();
            await homePage.productsLink.click();
            await expect(homePage.page).toHaveURL(ROUTES.PRODUCTS);
            await expect(homePage.productInfo.first()).toBeVisible();
            await homePage.open();
            await homePage.cartLink.click();
            await expect(homePage.page).toHaveURL(ROUTES.CART);
            await homePage.open();
            await homePage.contactUsLink.click();
            await expect(homePage.page).toHaveURL(ROUTES.CONTACT_US);
            await expect(homePage.contactInfo.first()).toBeVisible();
            await homePage.open();
        }
    );

    test('AE-048 - Verify all available product categories and subcategories', async ({ homePage }) => {
            await homePage.open();
            await expect(homePage.categories.women.category).toBeVisible();
            await homePage.categories.women.category.click();
            await expect(homePage.categories.women.dress).toBeVisible();
            await expect(homePage.categories.women.tops).toBeVisible();
            await expect(homePage.categories.women.saree).toBeVisible();
            await expect(homePage.categories.men.category).toBeVisible();
            await homePage.categories.men.category.click();
            await expect(homePage.categories.men.tshirts).toBeVisible();
            await expect(homePage.categories.men.jeans).toBeVisible();
            await expect(homePage.categories.kids.category).toBeVisible();
            await homePage.categories.kids.category.click();
            await expect(homePage.categories.kids.dress).toBeVisible();
            await expect(homePage.categories.kids.topsShirts).toBeVisible();
        }
    );

    test('AE-049 - Verify each category and subcategory navigates to correct product listing', async ({ homePage }) => {
            await homePage.open();
            await homePage.categories.women.category.click();
            await homePage.categories.women.dress.click();
            await expect(homePage.page).toHaveURL(ROUTES.WOMANDRESS);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.categories.women.category.click();
            await homePage.categories.women.tops.click();
            await expect(homePage.page).toHaveURL(ROUTES.TOP);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.categories.women.category.click();
            await homePage.categories.women.saree.click();
            await expect(homePage.page).toHaveURL(ROUTES.SAREE);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.categories.men.category.click();
            await homePage.categories.men.tshirts.click();
            await expect(homePage.page).toHaveURL(ROUTES.TSHIRTS);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.categories.men.category.click();
            await homePage.categories.men.jeans.click();
            await expect(homePage.page).toHaveURL(ROUTES.JEANS);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.categories.kids.category.click();
            await homePage.categories.kids.dress.click();
            await expect(homePage.page).toHaveURL(ROUTES.KIDDRESS);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.categories.kids.category.click();
            await homePage.categories.kids.topsShirts.click();
            await expect(homePage.page).toHaveURL(ROUTES.KIDTOPSHIRTS);
            await expect(homePage.featuredItemsInfo).toBeVisible();
            await homePage.open();
        }
    );
    test('AE-050 - Verify available brands and brand navigation', async ({ homePage }) => {
            await homePage.open();
            await expect(homePage.brands.section).toBeVisible();
            await expect(homePage.brands.polo).toBeVisible();
            await expect(homePage.brands.hm).toBeVisible();
            await expect(homePage.brands.madame).toBeVisible();
            await expect(homePage.brands.mastAndHarbour).toBeVisible();
            await expect(homePage.brands.babyhug).toBeVisible();
            await expect(homePage.brands.allenSollyJunior).toBeVisible();
            await expect(homePage.brands.kookieKids).toBeVisible();
            await expect(homePage.brands.biba).toBeVisible();

            await homePage.brands.polo.click();
            await expect(homePage.page).toHaveURL(ROUTES.POLO);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.brands.hm.click();
            await expect(homePage.page).toHaveURL(ROUTES.HM);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.brands.madame.click();
            await expect(homePage.page).toHaveURL(ROUTES.MADAME);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.brands.mastAndHarbour.click();
            await expect(homePage.page).toHaveURL(ROUTES.MASTHARBOUR);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.brands.babyhug.click();
            await expect(homePage.page).toHaveURL(ROUTES.BABYHUG);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.brands.allenSollyJunior.click();
            await expect(homePage.page).toHaveURL(ROUTES.ALLENSOLLYJUNIOR);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.brands.kookieKids.click();
            await expect(homePage.page).toHaveURL(ROUTES.KOOKIE);
            await expect(homePage.featuredItemsInfo).toBeVisible();

            await homePage.open();
            await homePage.brands.biba.click();
            await expect(homePage.page).toHaveURL(ROUTES.BIBA);
            await expect(homePage.featuredItemsInfo).toBeVisible();
        }
    );
     test('AE-051 - Verify Featured Items and product information', async ({ homePage }) => {
                    await homePage.open();
                    await expect(homePage.featuredItems.products).toBeVisible();
                    await expect(homePage.featuredItems.productImages.first()).toBeVisible();
                    await expect(homePage.featuredItems.productNames.first()).toBeVisible();
                    await expect(homePage.featuredItems.productPrices.first()).toBeVisible();
            }
        );

        test('AE-052 - Verify product can be opened from Home page', async ({ homePage }) => {
                await homePage.open();
                await homePage.productDetails.blueTopViewProduct.click();
                await expect(homePage.page).toHaveURL(ROUTES.PRODUCTDETAILS_ONE);
                await expect(homePage.productDetails.name).toHaveText(productData.nameTwo);
                await expect(homePage.productDetails.category).toContainText(productData.Category_two);
                await expect(homePage.productDetails.price).toBeVisible();
                await expect(homePage.productDetails.availability).toContainText(productData.Availability);
                await expect(homePage.productDetails.condition).toContainText(productData.Condition);
                await expect(homePage.productDetails.brand).toContainText(productData.Brand);
            }
        );
    test('AE-053 - Verify product can be added to Cart from Home page', async ({ homePage }) => {
            await homePage.open();
            await homePage.productDetails.blueTopViewProduct.click();
            await homePage.cart.blueTopAddToCart.click();
            await expect(homePage.cart.viewCart).toBeVisible();
            await homePage.cart.viewCart.click();
            await homePage.page.waitForLoadState('domcontentloaded');
            await expect(homePage.page).toHaveURL(ROUTES.CART);
            await expect(homePage.cart.cartBlueTop).toBeVisible();
        }
    );
    test('AE-054 - Verify Cart contains correct product and pricing information', async ({ homePage }) => {
            await homePage.open();
            await homePage.productDetails.blueTopViewProduct.click();
            await homePage.cart.blueTopAddToCart.click();
            await expect(homePage.cart.viewCart).toBeVisible();
            await homePage.cart.viewCart.click();
            await expect(homePage.page).toHaveURL(ROUTES.CART);
            await expect(homePage.cart.cartBlueTop).toBeVisible();
            await expect(homePage.cart.productName).toHaveText(productData.nameTwo);
            await expect(homePage.cart.productPrice).toHaveText(productData.priceTwo);
            await expect(homePage.cart.quantity).toHaveText(productData.productQuantity);
            await expect(homePage.cart.totalPrice).toHaveText(productData.priceTwo);
        }
    );
    test('AE-055 - Verify Continue Shopping behavior', async ({ homePage }) => {
            await homePage.open();
            await homePage.productDetails.blueTopViewProduct.click();
            await homePage.cart.blueTopAddToCart.click();
            await expect(homePage.cart.continueShopping).toBeVisible();
            await homePage.cart.continueShopping.click();
            await expect(homePage.cart.continueShopping).toBeHidden();
            await homePage.addToCart.first().click();
            await expect(homePage.page).toHaveURL(ROUTES.CART);
            await expect(homePage.cart.cartBlueTop).toBeVisible();
        }
    );
    test('AE-059 - Verify Footer content', async ({ homePage }) => {
            await homePage.open();
            await homePage.page.evaluate(() => {window.scrollTo(0, document.body.scrollHeight);});
            await expect(homePage.footerSections.subscription).toBeVisible();
            await expect(homePage.footerSections.footer).toBeVisible();
            await expect(homePage.footerSections.footer).toContainText(productData.footerMessage);
            await expect(homePage.footerSections.footer).toBeInViewport();
        }
    );

    test('AE-062 - Verify multiple products are added to Cart correctly', async ({ homePage }) => {
            await homePage.open();
            await homePage.cart.blueTopAddToCart.click();
            await homePage.cart.continueShopping.click();
            await expect(homePage.cart.continueShopping).toBeHidden();
            await homePage.cart.menTshirtAddToCart.click();
            await homePage.cart.viewCart.click();
            await expect(homePage.page).toHaveURL(ROUTES.CART);
            await expect(homePage.cart.blueTopCartRow).toBeVisible();
            await expect(homePage.cart.menTshirtCartRow).toBeVisible();
            await expect(homePage.cart.bluePrice).toHaveText(productData.priceTwo);
            await expect(homePage.cart.blueQuantity).toHaveText(productData.productQuantity);
            await expect(homePage.cart.menTshirtPrice).toHaveText(productData.priceOne);
            await expect(homePage.cart.menTshirtQuantity).toHaveText(productData.productQuantity);
        }
    );
    test('AE-064 - Verify critical Home to Product to Cart journey', async ({ homePage }) => {
            await homePage.open();
            await expect(homePage.page).toHaveURL(ROUTES.HOME);
            await homePage.blueTopDetails.first().click();
            await homePage.cart.viewCart.click();
            await expect(homePage.page).toHaveURL(ROUTES.CART);
            await expect(homePage.cart.blueTopCartRow).toBeVisible();
            await expect(homePage.cart.bluePrice).toHaveText(productData.priceTwo);
            await expect(homePage.cart.blueQuantity).toHaveText(productData.productQuantity);
            await homePage.homebutton.first().click();
            await expect(homePage.page).toHaveURL(ROUTES.HOME);
            await expect(homePage.homeHeading).toBeVisible();
        }
    );
});

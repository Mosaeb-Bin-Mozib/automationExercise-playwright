import fs from 'fs';
import { test, expect } from '../../fixtures/base.fixture';
import { getCartData } from '../../test-data/cartData';
import { getUser } from '../../helper/user';
import ROUTES from '../../test-data/routes';
import { assertLoginInUser } from '../smoke/assertions/login.assertion';
import { enterValidPaymentDetails } from '../smoke/assertions/payment.assertion';
import {addProductToCart, verifyBlueTopCartItem, verifyBlueTopCheckout} from '../smoke/assertions/cart.assertion';
const cartData = getCartData();

test('E2E-002 - Verify an existing customer can successfully complete a purchase', async ({ paymentPage, loginPage, cartPage }) => {

        const user = getUser(23);
        await paymentPage.page.goto(ROUTES.LOGIN);
        await assertLoginInUser(loginPage, user);
        await cartPage.page.goto(ROUTES.PRODUCTS);
        await addProductToCart(cartPage, cartPage.blueTopProduct.blueTop, cartPage.blueTopProduct.addToCart, cartData);
        await verifyBlueTopCartItem(cartPage, cartData);
        await verifyBlueTopCheckout(cartPage, cartData, ROUTES);
        await expect(paymentPage.placeOrder).toBeVisible();
        await paymentPage.placeOrder.click();
        await enterValidPaymentDetails(paymentPage, cartData);
        await paymentPage.paymentButton.click();
        await expect(paymentPage.orderConfirmation).toBeVisible();
        await expect(paymentPage.downloadInvoice).toBeVisible();
        const downloadPromise = paymentPage.page.waitForEvent('download');
        await paymentPage.downloadInvoice.click();
        const download = await downloadPromise;
        const invoiceDirectory = 'test-data/invoices';
        await fs.promises.mkdir(invoiceDirectory, { recursive: true });
        // Save an invoice file
        const invoicePath = `${invoiceDirectory}/invoice-${user.id}.txt`;
        await download.saveAs(invoicePath);
        // Read the invoice file
        const invoiceContent = await fs.promises.readFile(invoicePath, 'utf-8');
        // Verify invoice content
        expect(invoiceContent).toContain(`Hi ${user.name}, Your total purchase amount is 500. Thank you`);
        await paymentPage.logoutLink.click();
}
);
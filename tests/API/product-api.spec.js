import { test, expect } from '../../fixtures/product.fixture';
import { HTTP_STATUS } from '../../test-data/api.constants';

test.describe('Product API Tests', () => {

    test('AE-API-001 - Verify all products can be retrieved', async ({ productApi }) => {
        const response = await productApi.getAllProducts();
        expect(response.status()).toBe(HTTP_STATUS.OK);
        const responseBody = await response.json();
        expect(responseBody.products).toBeDefined();
        expect(Array.isArray(responseBody.products)).toBe(true);
        expect(responseBody.products.length).toBeGreaterThan(0);
        for (const product of responseBody.products) {
            expect(product.id).toBeDefined();
            expect(typeof product.id).toBe('number');
            expect(product.name).toBeDefined();
            expect(typeof product.name).toBe('string');
            expect(product.price).toBeDefined();
            expect(typeof product.price).toBe('string');
            expect(product.brand).toBeDefined();
            expect(typeof product.brand).toBe('string');
            expect(product.category).toBeDefined();
        }
    });


    test('AE-API-002 - Verify unsupported POST method', async ({ productApi }) => {

        const response = await productApi.postProducts();
        expect(response.status()).toBe(HTTP_STATUS.METHOD_NOT_ALLOWED);
    });

    test('AE-API-005 - Verify product search with valid keyword', async ({ productApi }) => {
        const keyword = 'top';
        const response = await productApi.searchProduct(keyword);
        expect(response.status()).toBe(HTTP_STATUS.OK);
        const responseBody = await response.json();
        expect(responseBody.products).toBeDefined();
        expect(Array.isArray(responseBody.products)).toBe(true);
        expect(responseBody.products.length).toBeGreaterThan(0);
    });


    test('Get all products', async ({ productApi }) => {

        const response = await productApi.getAllProducts();
        const responseBody = await response.json();
        printApiResponse('GET ALL PRODUCTS API',
            response,
            responseBody
        );
        expect(response.status()).toBe(HTTP_STATUS.OK);

    });

    test('AE-API-006 - Verify search request without required parameter', async ({ productApi }) => {
            const response = await productApi.searchProductWithoutParameter();
            const responseBody = await response.text();
            printApiResponseThree('SEARCH PRODUCT - WITHOUT PARAMETER', response, responseBody);
            expect(response.status()).toBe(HTTP_STATUS.BAD_REQUEST);
            expect(responseBody).toContain('search_product');
        }
    );

});

import { test, expect } from '../../fixtures/product.fixture';
import {printApiResponse, printApiResponseThree} from "../utility/apiLogger";

test.describe('Product API Tests', () => {

    test('AE-API-001 - Verify all products can be retrieved', async ({ productApi }) => {

        // Send GET request
        const response = await productApi.getAllProducts();

        // Verify status code
        expect(response.status()).toBe(200);

        // Get response body
        const responseBody = await response.json();

        // Verify products exist
        expect(responseBody.products).toBeDefined();

        // Verify products is an array
        expect(Array.isArray(responseBody.products)).toBe(true);

        // Verify products are not empty
        expect(responseBody.products.length).toBeGreaterThan(0);

        // Verify each product
        for (const product of responseBody.products) {

            // Product ID
            expect(product.id).toBeDefined();
            expect(typeof product.id).toBe('number');

            // Product Name
            expect(product.name).toBeDefined();
            expect(typeof product.name).toBe('string');

            // Product Price
            expect(product.price).toBeDefined();
            expect(typeof product.price).toBe('string');

            // Product Brand
            expect(product.brand).toBeDefined();
            expect(typeof product.brand).toBe('string');

            // Product Category
            expect(product.category).toBeDefined();
        }
    });


    test('AE-API-002 - Verify unsupported POST method', async ({ productApi }) => {

        // Send POST request
        const response = await productApi.postProducts();

        // Verify 405 Method Not Allowed
        expect(response.status()).toBe(405);
    });

    test('AE-API-005 - Verify product search with valid keyword', async ({ productApi }) => {

        // Test data
        const keyword = 'blue top';

        // Send search request
        const response = await productApi.searchProduct(keyword);

        // Verify status code
        expect(response.status()).toBe(200);

        // Get response body
        const responseBody = await response.json();

        // Verify products exist
        expect(responseBody.products).toBeDefined();

        // Verify products is an array
        expect(Array.isArray(responseBody.products)).toBe(true);

        // Verify search-returned products
        expect(responseBody.products.length).toBeGreaterThan(0);
    });


    test('Get all products', async ({ productApi }) => {

        const response = await productApi.getAllProducts();

        const responseBody = await response.json();

        printApiResponse('GET ALL PRODUCTS API',
            response,
            responseBody
        );

        expect(response.status()).toBe(200);

    });

    test('AE-API-006 - Verify search request without required parameter', async ({ productApi }) => {

            const response =
                await productApi.searchProductWithoutParameter();

            const responseBody = await response.text();

        printApiResponseThree('SEARCH PRODUCT - WITHOUT PARAMETER', response, responseBody);

            expect(response.status()).toBe(400);

            expect(responseBody)
                .toContain('search_product');
        }
    );

});
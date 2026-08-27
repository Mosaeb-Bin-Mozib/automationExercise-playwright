import { test, expect } from '../../fixtures/brandApi.fixture';
import { printApiResponseOne, printApiResponseTwo} from '../utility/apiLogger';

test.describe('Brand API Tests', () => {

    test('AE-API-003 - Verify all brands can be retrieved', async ({ brandApi }) => {

        // Send GET request
        const response = await brandApi.getAllBrands();

        // Verify status code
        expect(response.status()).toBe(200);

        // Get response body
        const responseBody = await response.json();

        // Verify brands exist
        expect(responseBody.brands).toBeDefined();
        console.log(responseBody);
        // Verify brands is an array
        expect(Array.isArray(responseBody.brands)).toBe(true);

        // Verify brands are not empty
        // expect(responseBody.brands.length).toBeGreaterThan(0);

        // Verify each brand
        for (const brand of responseBody.brands) {
            expect(brand.id).toBeDefined();
            expect(typeof brand.id).toBe('number');

            expect(brand.brand).toBeDefined();
            expect(typeof brand.brand).toBe('string');

            expect(brand.brand.length).toBeGreaterThan(0);
        }
    });

    test(
        'AE-API-004 - Verify unsupported PUT method for Brands API', async ({ brandApi }) => {

            const response = await brandApi.updateBrands();

            const responseBody = await response.text();

            printApiResponseOne('PUT ALL BRANDS', response, responseBody);

            // Verify status code
            expect(response.status()).toBe(405);

            // Verify error message
            expect(responseBody)
                .toContain('This request method is not supported');
        }
    );

    test('Get all brands', async ({ brandApi }) => {

        const response = await brandApi.getAllBrands();

        const responseBody = await response.json();

        printApiResponseTwo('GET ALL BRANDS API', response, responseBody);

        // Validate each brand
        for (const brand of responseBody.brands) {
            expect(brand).toHaveProperty('id');
            expect(brand).toHaveProperty('brand');
        }

        // Content type
        expect(response.headers()['content-type']).toContain('text/html; charset=utf-8');

        expect(response.status()).toBe(200);
        expect(responseBody).toHaveProperty('brands');
        expect(Array.isArray(responseBody.brands)).toBe(true);
    });
});
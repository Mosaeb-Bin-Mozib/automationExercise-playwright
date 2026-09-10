import { test, expect } from '../../fixtures/brandApi.fixture';
import { HTTP_STATUS, API_MESSAGE } from '../../test-data/api.constants';

test.describe('Brand API Tests', () => {

    test('AE-API-003 - Verify all brands can be retrieved', async ({ brandApi }) => {
        const response = await brandApi.getAllBrands();
        expect(response.status()).toBe(HTTP_STATUS.OK);
        const responseBody = await response.json();
        expect(responseBody.brands).toBeDefined();
        expect(Array.isArray(responseBody.brands)).toBe(true);
        for (const brand of responseBody.brands) {
            expect(brand.id).toBeDefined();
            expect(typeof brand.id).toBe('number');
            expect(brand.brand).toBeDefined();
            expect(typeof brand.brand).toBe('string');
            expect(brand.brand.length).toBeGreaterThan(0);
        }
    });

    test('AE-API-004 - Verify unsupported PUT method for Brands API', async ({ brandApi }) => {
        const response = await brandApi.updateBrands();
        const responseBody = await response.text();
        expect(response.status()).toBe(HTTP_STATUS.METHOD_NOT_ALLOWED);
        expect(responseBody).toContain(API_MESSAGE.UNSUPPORTED_METHOD);
    });

    test('Get all brands', async ({ brandApi }) => {
        const response = await brandApi.getAllBrands();
        const responseBody = await response.json();
        for (const brand of responseBody.brands) {
            expect(brand).toHaveProperty('id');
            expect(brand).toHaveProperty('brand');
        }
        expect(response.headers()['content-type']).toContain('text/html; charset=utf-8');
        expect(response.status()).toBe(HTTP_STATUS.OK);
        expect(responseBody).toHaveProperty('brands');
        expect(Array.isArray(responseBody.brands)).toBe(true);
    });
});

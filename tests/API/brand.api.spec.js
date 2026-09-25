import { test, expect } from '../../fixtures/brandApi.fixture';
import { HTTP_STATUS, API_MESSAGE } from '../../test-data/api.constants';

test.describe('Brand API Tests', () => {

    test('AE-API-003 - Verify all brands can be retrieved', async ({ brandApi }) => {
        const response = await brandApi.getAllBrands();
        expect(response.status()).toBe(HTTP_STATUS.OK);
        const responseBody = await response.json();
        expect(responseBody.brands).toBeDefined();
        expect(Array.isArray(responseBody.brands)).toBe(true);
        for (const brand of responseBody.brands)
        {
            expect(brand.id).toBeDefined();
            expect(typeof brand.id).toBe('number');
            expect(brand.brand).toBeDefined();
            expect(typeof brand.brand).toBe('string');
            expect(brand.brand.length).toBeGreaterThan(0);
        }
    });

    test('AE-API-004 - Verify unsupported PUT method for Brands API', async ({ brandApi }) => {
        const response = await brandApi.updateBrands();
        const responseBody = await response.json();

        expect(response.status()).toBe(HTTP_STATUS.OK);
        expect(responseBody.responseCode).toBe(HTTP_STATUS.METHOD_NOT_ALLOWED);
        expect(responseBody.message).toBe(API_MESSAGE.UNSUPPORTED_METHOD);
    });
});

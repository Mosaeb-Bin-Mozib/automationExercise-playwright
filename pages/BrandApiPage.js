export class BrandApi {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    // AE-API-003
    // GET /api/brandsList
    async getAllBrands() {
        return await this.apiContext.get('/api/brandsList');
    }

    // AE-API-004
    // PUT /api/brandsList
    async updateBrands() {
        return await this.apiContext.put('/api/brandsList');
    }
}
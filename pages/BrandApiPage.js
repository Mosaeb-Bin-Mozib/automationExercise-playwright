export class BrandApi {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }
    async getAllBrands() {
        return await this.apiContext.get('/api/brandsList');
    }
    async updateBrands() {
        return await this.apiContext.put('/api/brandsList');
    }
}

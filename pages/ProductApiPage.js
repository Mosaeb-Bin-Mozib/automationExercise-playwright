export class ProductApi {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    // AE-API-001
    // GET /api/productsList
    async getAllProducts() {
        return await this.apiContext.get('/api/productsList');
    }

    // AE-API-002
    // POST /api/productsList
    async postProducts() {
        return await this.apiContext.post('/api/productsList');
    }

    // AE-API-005
    // POST /api/searchProduct
    async searchProduct(keyword) {
        return await this.apiContext.post('/api/searchProduct', {
            form: {
                search_product: keyword
            }
        });
    }

    // AE-API-006
    // POST /api/searchProduct
    // Without search_product parameter
    async searchProductWithoutParameter() {
        return await this.apiContext.post('/api/searchProduct');
    }
}
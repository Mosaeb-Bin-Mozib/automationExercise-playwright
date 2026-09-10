export class ProductApi {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }
    async getAllProducts() {
        return await this.apiContext.get('/api/productsList');
    }
    async postProducts() {
        return await this.apiContext.post('/api/productsList');
    }
    async searchProduct(keyword) {
        return await this.apiContext.post('/api/searchProduct', {
            form: {
                search_product: keyword
            }
        });
    }
    async searchProductWithoutParameter() {
        return await this.apiContext.post('/api/searchProduct');
    }
}

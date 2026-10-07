class APIUtils
{
    
    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    // -------------------------------------------
    // LOGIN TO THE APPLICATION USING API. THIS API SENDS THE LOGIN INFO AND RETURNS AUTH TOKEN
    // -------------------------------------------
    async getToken() {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        );

        const loginResponseJson = await loginResponse.json();

        this.token = loginResponseJson.token;

        return this.token;
    }

    // -------------------------------------------
    // WE WILL NOW CREATE AN ORDER USING API
    // -------------------------------------------
    async createOrder(orderPayload) {
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    Authorization: this.token,
                    "Content-Type": "application/json"
                }
            }
        );

        const orderPayloadResponse = await orderResponse.json();

        return orderPayloadResponse.orders[0];
    }

}

module.exports = { APIUtils };
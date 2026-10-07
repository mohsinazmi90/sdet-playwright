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

// ---------------------------------------
// TEACHER'S APIUTLS CODE
// ---------------------------------------

// class APiUtils {
//     constructor(apiContext, loginPayLoad) {
//         this.apiContext = apiContext;
//         this.loginPayLoad = loginPayLoad;
//     }

//     async getToken() {
//         const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
//             data: this.loginPayLoad
//         }); // 200, 201
//         const loginResponseJson = await loginResponse.json();
//         const token = loginResponseJson.token;
//         console.log(token);
//         return token;
//     }

//     async createOrder(orderPayLoad) {
//         let response = {};
//         response.token = await this.getToken();
//         const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
//             data: orderPayLoad,
//             headers: {
//                 'Authorization': response.token,
//                 'Content-Type': 'application/json'
//             }
//         });

//         const orderResponseJson = await orderResponse.json();
//         console.log(orderResponseJson);
//         const orderId = orderResponseJson.orders[0];
//         response.orderId = orderId;

//         return response;
//     }
// }

// module.exports = { APiUtils };
import axios from "axios";
import { URL_Key } from "./API";

axios.defaults.headers.common["Content-Type"] = "application/json";
export interface CheckoutRequest {
    products: number[];
}
const ShoppingServices = {
    async getProduct(lim: number) {
        const path = "/products"
        try {
            const response = await axios.get(`${URL_Key}` + path, {
                params: { limit: lim },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching product:", error);
            throw error;
        }
    },
    async getRecommenddedProduct() {
        const path = "/recommended-products"
        try {
            const response = await axios.get(`${URL_Key}` + path);
            return response.data;
        } catch (error) {
            console.error("Error fetching product:", error);
            throw error;
        }
    },
    async onPostCheckout(body: CheckoutRequest) {
        const path = "/orders/checkout"
        try {
            const response = await axios.post(`${URL_Key}` + path, body);
            return response.data;
        } catch (error) {
            console.error("Error fetching product:", error);
            throw error;
        }
    }

};

export default ShoppingServices;
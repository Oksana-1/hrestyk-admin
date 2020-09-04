import axios from 'axios';
import Product from "../entities/Product";

export const BASE_HOST = '//95.179.185.226:8085/';
const PRODUCTS_URL = 'api/v1/product/all';
const PRODUCT_URL_BASE = 'api/v1/product/single/';
const NEW_PRODUCT_URL = 'api/v1/product/store-form-data';
axios.defaults.baseURL = BASE_HOST;

export const getProducts = async() => {
    try {
        const response = (await axios.get(PRODUCTS_URL)).data.data;
        return response.products.map(item => new Product(item));
    } catch (e) {
        console.error(e);
    }
}
export const getProduct = async (productId) => {
    try {
        const response = (await axios.get(PRODUCT_URL_BASE + productId)).data.data;
        return {
            product: new Product(response.product),
            categories: response.categories
        };
    } catch (e) {
        console.error(e);
    }
}
export const createProduct = async (payload) => {
    const boundary = new Date().getTime();
    console.log(boundary);
    try {
        await axios.post(
            NEW_PRODUCT_URL,
            payload,{
                headers: {'Content-Type': 'multipart/form-data; boundary=boundary-' + boundary}
            });
    } catch (e) {
        console.error(e);
    }
}

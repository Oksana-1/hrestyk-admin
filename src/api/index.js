import axios from 'axios';
import Product from "../entities/Product";

export const BASE_HOST = '//95.179.185.226:8085/';
const PRODUCTS_URL = 'api/v1/product/all';
const PRODUCT_URL_BASE = 'api/v1/product/single/';
const NEW_PRODUCT_URL = '/api/v1/api/v1/product/store-form-data';
axios.defaults.baseURL = BASE_HOST;

import categories from "./temp/categories";
export const apiResponseCategories = categories;

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
        return new Product(response.products[0]);
    } catch (e) {
        console.error(e);
    }
}
export const createProduct = async (payload) => {
    try {
        await axios.post(NEW_PRODUCT_URL, payload);
    } catch (e) {
        console.error(e);
    }
}

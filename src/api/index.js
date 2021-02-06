import axios from 'axios';
import Product from "../entities/Product";

export const BASE_HOST = '//95.179.185.226:8085/';
const PRODUCTS_URL = 'api/v1/product/all';
const PRODUCT_URL = 'api/v1/product/single/';
const NEW_PRODUCT_URL = 'api/v1/product/store-form-data';
const DELETE_PRODUCT_URL = 'api/v1/product/document';
const EDIT_PRODUCT_URL_BASE = 'api/v1/product/edit';
axios.defaults.baseURL = BASE_HOST;

export const getProducts = async() => {
    try {
        const response = (await axios.get(PRODUCTS_URL)).data.data;
        return {
            products: response.products.map(item => new Product(item)),
            categories: response.categories
        };
    } catch (e) {
        console.error(e);
    }
}
export const getProduct = async (productId) => {
    try {
        const response = (await axios.get(PRODUCT_URL + productId)).data.data;
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
export const deleteProduct = async (productId)  => {
    try {
        await axios.delete(`${DELETE_PRODUCT_URL}/${productId}`);
    } catch (e) {
        console.error(e);
    }
}
export const editProduct = async ({productId, payload}) => {
    const boundary = new Date().getTime();
    try {
        await axios.patch(
          `${EDIT_PRODUCT_URL_BASE}/${productId}`,
          payload,{
              headers: {'Content-Type': 'multipart/form-data; boundary=boundary-' + boundary}
          });
    } catch (e) {
        console.error(e);
    }
}

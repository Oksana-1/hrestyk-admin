import axios from 'axios';
import Product from "../entities/Product";

const BASE_HOST = '//95.179.185.226:8085';
axios.defaults.baseURL = BASE_HOST;
const PRODUCTS_URL = '/api/v1/product/all';


import products from './temp/products';
import categories from "./temp/categories";
export const apiResponseProducts = products;
export const apiResponseCategories = categories;

export const getProducts = async() => {
    try {
        const response = (await axios.get(PRODUCTS_URL)).data.data;
        return response.map(item => new Product(item));
    } catch (e) {
        console.error(e);
    }

}

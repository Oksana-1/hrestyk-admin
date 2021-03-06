import axios from "axios";
import Product from "../entities/Product";
import Order from "@/entities/Order";

export const BASE_HOST = "//95.179.185.226:8085/";
const API_VERSION = "api/v1/";

const PRODUCTS_URL = "product/all";
const PRODUCT_URL = "product/single/";
const NEW_PRODUCT_URL = "product/store-form-data";
const DELETE_PRODUCT_URL = "product/document";
const ADD_IMAGE_URL = "product/image";
const DELETE_IMAGE_URL_BASE = "product/image";
const EDIT_PRODUCT_URL_BASE = "product/edit";
const ORDER_URL = "cart/all";
const SINGLE_ORDER_URL = "/cart/show";

axios.defaults.baseURL = BASE_HOST + API_VERSION;
const boundary = new Date().getTime();

export class ProductApi {
  async getProducts() {
    try {
      const response = (await axios.get(PRODUCTS_URL)).data.data;
      return {
        products: response.products.map((item) => new Product(item)),
        categories: response.categories,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async getProduct(productId) {
    try {
      const response = (await axios.get(PRODUCT_URL + productId)).data.data;
      return {
        product: new Product(response.product),
        categories: response.categories,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async createProduct(payload) {
    try {
      await axios.post(NEW_PRODUCT_URL, payload, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=boundary-" + boundary,
        },
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async deleteProduct(productId) {
    try {
      await axios.delete(`${DELETE_PRODUCT_URL}/${productId}`);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async addImage(productId, payload) {
    try {
      const response = await axios.patch(
        `${ADD_IMAGE_URL}/${productId}`,
        payload,
        {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=boundary-" + boundary,
          },
        }
      );
      return new Product(response.data.data);
    } catch (e) {
      console.error(e);
    }
  }
  async deleteImage(imageId) {
    try {
      const response = (
        await axios.delete(`${DELETE_IMAGE_URL_BASE}/${imageId}`)
      ).data.data;
      return {
        product: new Product(response.product),
        categories: response.categories,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async editProduct({ productId, payload }) {
    const boundary = new Date().getTime();
    try {
      const response = (
        await axios.patch(`${EDIT_PRODUCT_URL_BASE}/${productId}`, payload, {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=boundary-" + boundary,
          },
        })
      ).data.data;
      return {
        product: new Product(response.product),
        categories: response.categories,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export class OrderApi {
  async getOrders({ take, skip }) {
    try {
      const response = await axios.get(
        `${ORDER_URL}?take=${take}&skip=${skip}`
      );
      return response
        ? {
            orders: response.data.data.map((item) => new Order(item)),
            count: response.data.count,
          }
        : null;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async getOrder(id) {
    try {
      const response = await axios.get(`${SINGLE_ORDER_URL}/${id}`);
      return new Order(response.data.data[0]);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

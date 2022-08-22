import * as apiEndPoints from "@/api/apiEndPoints";
import Product from "@/entities/Product";
import ErrorFactory from "@/entities/errors/ErrorFactory";
import axios from "axios";

const errorFactory = new ErrorFactory();

const boundary = new Date().getTime();

export class ProductApi {
  async getProducts(axiosInstance) {
    try {
      const response = (await axiosInstance.get(apiEndPoints.PRODUCTS_URL)).data
        .data;
      return {
        products: response.products.map((item) => new Product(item)),
        categories: response.categories,
      };
    } catch (e) {
      errorFactory.create(e);
    }
  }
  async getProduct(axiosInstance, productId) {
    try {
      const response = (
        await axiosInstance.get(apiEndPoints.PRODUCT_URL + productId)
      ).data.data;
      return {
        product: new Product(response.product),
        categories: response.categories,
      };
    } catch (e) {
      errorFactory.create(e);
    }
  }
  async createProduct(axiosInstance, payload) {
    try {
      await axios.post(apiEndPoints.NEW_PRODUCT_URL, payload, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=boundary-" + boundary,
        },
      });
    } catch (e) {
      errorFactory.create(e);
    }
  }
  async deleteProduct(axiosInstance, productId) {
    try {
      await axiosInstance.delete(
        `${apiEndPoints.DELETE_PRODUCT_URL}/${productId}`
      );
    } catch (e) {
      errorFactory.create(e);
    }
  }
  async addImage(axiosInstance, { productId, payload }) {
    try {
      const response = await axiosInstance.patch(
        `${apiEndPoints.ADD_IMAGE_URL}/${productId}`,
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
      errorFactory.create(e);
    }
  }
  async deleteImage(axiosInstance, imageId) {
    try {
      const response = (
        await axiosInstance.delete(
          `${apiEndPoints.DELETE_IMAGE_URL_BASE}/${imageId}`
        )
      ).data.data;
      return {
        product: new Product(response.product),
        categories: response.categories,
      };
    } catch (e) {
      errorFactory.create(e);
    }
  }
  async editProduct(axiosInstance, { productId, payload }) {
    const boundary = new Date().getTime();
    try {
      const response = (
        await axiosInstance.patch(
          `${apiEndPoints.EDIT_PRODUCT_URL_BASE}/${productId}`,
          payload,
          {
            headers: {
              "Content-Type":
                "multipart/form-data; boundary=boundary-" + boundary,
            },
          }
        )
      ).data.data;
      return {
        product: new Product(response.product),
        categories: response.categories,
      };
    } catch (e) {
      errorFactory.create(e);
    }
  }
}

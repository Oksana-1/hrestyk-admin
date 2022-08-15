import * as apiEndPoints from "@/api/apiEndPoints";
import Product from "@/entities/Product";

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
      console.error(e);
      throw e;
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
      console.error(e);
      throw e;
    }
  }
  async createProduct(axiosInstance, payload) {
    try {
      await axiosInstance.post(apiEndPoints.NEW_PRODUCT_URL, payload, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=boundary-" + boundary,
        },
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async deleteProduct(axiosInstance, productId) {
    try {
      await axiosInstance.delete(
        `${apiEndPoints.DELETE_PRODUCT_URL}/${productId}`
      );
    } catch (e) {
      console.error(e);
      throw e;
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
      console.error(e);
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
      console.error(e);
      throw e;
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
      console.error(e);
      throw e;
    }
  }
}

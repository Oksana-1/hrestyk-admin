import * as apiEndPoints from "@/api/apiEndPoints";
import Order from "@/entities/Order";
import ErrorFactory from "@/entities/errors/ErrorFactory";

const errorFactory = new ErrorFactory();

export class OrderApi {
  async getOrders(axiosInstance, { take, skip }) {
    try {
      const response = await axiosInstance.get(
        `${apiEndPoints.ORDER_URL}?take=${take}&skip=${skip}`
      );
      return response
        ? {
            orders: response.data.data.map((item) => new Order(item)),
            count: response.data.count,
          }
        : null;
    } catch (e) {
      errorFactory.create(e);
    }
  }
  async getOrder(axiosInstance, id) {
    try {
      const response = await axiosInstance.get(
        `${apiEndPoints.SINGLE_ORDER_URL}/${id}`
      );
      return new Order(response.data.data[0]);
    } catch (e) {
      errorFactory.create(e);
    }
  }
  async orderProcessing(axiosInstance, { id, status, content }) {
    try {
      const response = await axiosInstance.patch(
        `${apiEndPoints.ORDER_PROCESSING_URL}/${id}/${status}`,
        { content }
      );
      return new Order(response.data.data);
    } catch (e) {
      errorFactory.create(e);
    }
  }
  async deleteOrder(axiosInstance, id) {
    try {
      await axiosInstance.delete(`${apiEndPoints.ORDER_DELETE_URL}/${id}`);
    } catch (e) {
      errorFactory.create(e);
    }
  }
}

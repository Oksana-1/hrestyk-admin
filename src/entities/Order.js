import { ObjectCreationValidator } from "@/entities/ObjectCreationValidator";

export default class Order {
  constructor(order) {
    this.createdAt = order.createdAt;
    this.orderStatus = order.orderStatus;
    this.processing = order.processing.map(
      (item) => new ProcessingStatus(item)
    );
    this.products = order.products.map((product) => new OrderProduct(product));
    this.userInfo = new UserInfo(order.userInfo);
    this.__v = order.__v;
    this._id = order._id;

    ObjectCreationValidator.validate(this);
  }
  get id() {
    return this._id;
  }
  get orderSum() {
    return this.products.reduce((total, product) => {
      total = total + product.price * product.amount;
      return total;
    }, 0);
  }
}

export class OrderProduct {
  constructor(orderProduct) {
    this.amount = orderProduct.amount;
    this.images = orderProduct.images.map(
      (item) => new OrderProductImage(item)
    );
    this.price = orderProduct.price;
    this.title = orderProduct.title;
    this._id = orderProduct._id;
  }
}
export class OrderProductImage {
  constructor(image) {
    this.alt = image.alt;
    this._uid = image._uid;
    this.image = image.image;
    this.is_main = image.is_main;
    this.url = image.url;
  }
}
export class ProcessingStatus {
  constructor(processing) {
    this.processingStatus = processing.processingStatus;
    this.content = processing.content;

    ObjectCreationValidator.validate(this);
  }
}
export class UserInfo {
  constructor(userInfo) {
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.phone = userInfo.phone;
    this._id = userInfo._id;

    ObjectCreationValidator.validate(this);
  }
}

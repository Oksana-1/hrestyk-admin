import { BASE_URL } from "@/utils/constants";
import { ObjectCreationValidator } from "@/entities/ObjectCreationValidator";

export default class Product {
  constructor(product) {
    this.category = product.category;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt ? product.updatedAt : null;
    this.description = product.description;
    this.images = product.images.map((image) => new Image(image));
    this.price = product.price;
    this.qty_available = product.qty_available;
    this.title = product.title;
    this.article = product.__v;
    this._id = product._id;
    this.isActive = product.isActive;

    ObjectCreationValidator.validate(this);
  }
  get id() {
    return this._id;
  }
  get mainImage() {
    return this.images.find((image) => image.is_main === true) || null;
  }
}

export class Image {
  constructor(image) {
    this.alt = image.alt;
    this.is_main = image.is_main;
    this.url = /^http/.test(image.url) ? image.url : BASE_URL + "/" + image.url;
    this.id = image.id ? image.id : image._id;

    ObjectCreationValidator.validate(this);
  }
}

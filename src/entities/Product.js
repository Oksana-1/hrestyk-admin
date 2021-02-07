import { BASE_HOST } from "@/api";

export default class Product {
  constructor(product) {
    this.category = product.category;
    this.createdAt = product.createdAt;
    this.description = product.description;
    this.images = product.images.map((image) => new Image(image));
    this.price = product.price;
    this.qty_available = product.qty_available;
    this.title = product.title;
    this.article = product.__v;
    this.id = product._id;
    this.isActive = product.isActive;
  }
}

export class Image {
  constructor(image) {
    this.alt = image.alt;
    this.is_main = image.is_main;
    this.url = /^http/.test(image.url) ? image.url : BASE_HOST + image.url;
    this.id = image._id;
  }
}

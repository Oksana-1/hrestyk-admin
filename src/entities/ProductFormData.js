export default class ProductFormData {
  constructor(product) {
    this.category = product.category;
    this.description = product.description;
    this.images = product.images.map(
      (image) => new ProductFormDataImage(image)
    );
    this.price = product.price;
    this.qty_available = product.qty_available;
    this.title = product.title;
    this.isActive = product.isActive;
  }

  getFormData() {
    const formData = new FormData();
    for (const [key, value] of Object.entries(this.productForm)) {
      if (key === "images") {
        const images = value;
        if (images.length > 0) {
          images.forEach((image, index) => {
            if (image.file) {
              formData.append(`images[${index}]`, image.file);
            }
            if (image.id) {
              formData.append(`images[${index}][_id]`, image.id);
            }
            formData.append(`images[${index}][alt]`, image.alt);
            formData.append(`images[${index}][is_main]`, image.is_main);
          });
        }
      } else {
        formData.append(key, value);
      }
    }
    return formData;
  }
  get productForm() {
    return {
      category: this.category,
      description: this.description,
      images: this.images,
      price: this.price,
      qty_available: this.qty_available,
      title: this.title,
      isActive: this.isActive,
    };
  }
}

export class ProductFormDataImage {
  constructor(image) {
    this.key = image.key ? image.key : null;
    this.id = image.id ? image.id : null;
    this.alt = image.alt;
    this.is_main = image.is_main;
    this.file = image.file ? image.file : null;
  }
}

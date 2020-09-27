export default class ProductFormData {
    constructor(product) {
        this.category = product.category;
        this.description = product.description;
        this.images = product.images.map(image => new ProductFormDataImage(image));
        this.price = product.price;
        this.qty_available = product.qty_available;
        this.title = product.title;
        this.isActive = product.isActive;
    }
    getFormData() {
        const formData = new FormData();
        for (const [key, value] of Object.entries(this)) {
            formData.append(key, value);
        }
        return formData;
    }
}
export class ProductFormDataImage {
    constructor(image) {
        this.alt = image.alt;
        this.is_main = image.is_main;
        this.file = image.file;
    }
}
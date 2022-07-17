<template>
  <div>
    <product-item
      @submit="submit"
      @deleteItem="deleteItem"
      :submitting="submitting"
      :vuexArgs="productId"
    />
    <confirm-modal
      v-if="modalToShow === 'confirm'"
      :confirmation-text="'Видалити цей продукт?'"
      @confirm="doRemove"
      @cancel="closeModal"
      :disabled-button="submitting"
    />
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import ConfirmModal from "./modals/ConfirmModal";
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProductItem from "@/views/product/ProductItem";
import WithVuexFetch from "@/hoc/WithVuexFetch";
import ProductFormData from "@/entities/ProductFormData";

export default {
  name: "Product",
  components: {
    ProductItem: WithVuexFetch(ProductItem, "products/getSingleProduct"),
    ConfirmModal,
  },
  data() {
    return {
      productId: this.$route.params.id,
      modalToShow: null,
      snackbar: false,
      text: "Нічого не змінилося",
      timeout: 2000,
      submitting: false,
    };
  },
  computed: {
    ...mapGetters("products", ["product", "newProduct"]),
  },
  watch: {
    $route(to) {
      this.productId = to.params.id;
    },
  },
  methods: {
    ...mapMutations("dialogs", ["SET_DIALOG"]),
    ...mapMutations("products", ["SET_NEW_PRODUCT"]),
    ...mapActions("products", [
      "getSingleProduct",
      "deleteProduct",
      "editProduct",
    ]),
    async submit() {
      if (
        !this.isPrimitiveProductPropChanged() &&
        !this.isProductImagesChanged()
      ) {
        this.snackbar = true;
        return;
      }
      this.submitting = true;
      try {
        const payload = this.newProduct.getFormData();
        await this.editProduct({
          productId: this.productId,
          payload: payload,
        });
        this.setDefaultProductForm();
      } catch (e) {
        console.error(e);
      } finally {
        this.submitting = false;
      }
    },
    deleteItem() {
      this.modalToShow = "confirm";
      this.SET_DIALOG(true);
    },
    closeModal() {
      this.SET_DIALOG(false);
      this.modalToShow = null;
    },
    async doRemove() {
      this.submitting = true;
      try {
        await this.deleteProduct(this.productId);
        await this.$router.push("/products");
      } catch (e) {
        console.error(e);
      } finally {
        this.submitting = false;
      }
    },
    setDefaultProductForm() {
      if (this.product) {
        this.SET_NEW_PRODUCT(new ProductFormData(this.product));
      }
    },
    isPrimitiveProductPropChanged() {
      return (
        Object.keys(this.newProduct).filter((prop) => {
          if (typeof this.newProduct[prop] !== "object") {
            return this.product[prop] !== this.newProduct[prop];
          }
        }).length > 0
      );
    },
    isProductImagesChanged() {
      if (
        !Array.isArray(this.newProduct.images) ||
        !Array.isArray(this.product.images)
      ) {
        throw new Error("Error on comparing images. Images is not an array.");
      }
      if (this.product.images.length !== this.newProduct.images.length) {
        return true;
      } else {
        // comparing images props
        return (
          this.newProduct.images.filter((image) => {
            const comparingItem = this.product.images.find(
              (item) => item.id === image.id
            );
            if (!comparingItem) return true;
            return (
              image.alt !== comparingItem.alt ||
              image.is_main !== comparingItem.is_main
            );
          }).length > 0
        );
      }
    },
  },
};
</script>

<style scoped></style>

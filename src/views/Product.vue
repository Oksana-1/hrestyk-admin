<template>
  <div v-if="!busy">
    <v-container fluid>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12">
            <BaseCard header-type="avatar" icon-name="mdi-store">
              <template v-slot:card-content>
                <v-row class="justify-end mt-n8 px-2">
                  <base-menu @save="submit" @delete="deleteItem" />
                </v-row>
                <product-form
                  :product="newProduct"
                  :edit-submitting="submitting"
                  @validationPass="submit"
                />
              </template>
            </BaseCard>
          </v-col>
          <v-col cols="12">
            <product-images
              :key="`product-images-${componentKey}`"
              :productImages="productImages"
              :edit-submitting="submitting"
              @imageChanges="submit"
              @imageDeleted="forceUpdate"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <v-row class="justify-space-between secondary lighten-2 white--text">
      <v-col class="caption px-6"
        >Дата створення: {{ product.createdAt | dateToString }}</v-col
      >
      <v-col v-if="product.updatedAt" class="caption px-6 text-right"
        >Дата останнього редагування:
        {{ product.updatedAt | dateToString }}</v-col
      >
    </v-row>
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
import BaseCard from "../components/base/BaseCard";
import BaseMenu from "../components/base/BaseMenu";
import ConfirmModal from "./modals/ConfirmModal";
import ProductForm from "./common/ProductForm";
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProductFormData from "../entities/ProductFormData";
import ProductImages from "@/views/product/ProductImages";

export default {
  name: "Product",
  components: {
    ProductImages,
    BaseCard,
    BaseMenu,
    ConfirmModal,
    ProductForm,
  },
  data() {
    return {
      productId: this.$route.params.id,
      valid: false,
      busy: false,
      modalToShow: null,
      componentKey: 0,
      snackbar: false,
      text: "Нічого не змінилося",
      timeout: 2000,
      submitting: false,
    };
  },
  computed: {
    ...mapGetters(["product", "newProduct", "categories"]),
    productImages() {
      return this.product ? this.product.images : [];
    },
    category() {
      return (
        this.categories.find((item) => item === this.product.category) || null
      );
    },
  },
  watch: {
    $route(to) {
      this.productId = to.params.id;
    },
  },
  methods: {
    ...mapMutations(["SET_DIALOG", "SET_NEW_PRODUCT"]),
    ...mapActions(["getSingleProduct", "deleteProduct", "editProduct"]),
    async init() {
      this.busy = true;
      await this.getSingleProduct(this.productId);
      this.setDefaultProductForm();
      this.busy = false;
    },
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
          productId: this.product.id,
          payload: payload,
        });
        this.forceUpdate();
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
      try {
        await this.deleteProduct(this.productId);
        await this.$router.push("/products");
      } catch (e) {
        console.error(e);
      }
    },
    forceUpdate() {
      this.componentKey += 1;
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
  created() {
    this.init();
  },
};
</script>

<style scoped></style>

<template>
  <div>
    <single-product
      @deleteItem="deleteItem"
      @deleteProductImage="deleteProductImage"
      @addImage="addProductImage"
      @imageChanges="onImageChange"
      :vuexArgs="productId"
      :key="`product-${componentKey}`"
    />
    <confirm-modal
      v-if="modalToShow === 'confirm'"
      :confirmation-text="'Видалити цей продукт?'"
      @confirm="doRemove"
      @cancel="closeModal"
      :disabled-button="editing"
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
import ConfirmModal from "../components/modals/ConfirmModal";
import { mapActions, mapGetters, mapMutations } from "vuex";
import SingleProduct from "@/views/product/SingleProduct";
import WithVuexFetch from "@/hoc/WithVuexFetch";
import { errorHandleMixin } from "@/mixins/errorHandleMixin";
import ProductFormData from "@/entities/ProductFormData";
import { cloneObject } from "@/utils/helpers";

export default {
  name: "SingleProductPage",
  components: {
    SingleProduct: WithVuexFetch(SingleProduct, "products/getSingleProduct"),
    ConfirmModal,
  },
  mixins: [errorHandleMixin],
  data() {
    return {
      productId: this.$route.params.id,
      modalToShow: null,
      snackbar: false,
      text: "Нічого не змінилося",
      timeout: 2000,
      productFormData: null,
      componentKey: 0,
    };
  },
  computed: {
    ...mapGetters("products", ["product", "editing"]),
  },
  watch: {
    $route(to) {
      this.productId = to.params.id;
    },
  },
  methods: {
    ...mapMutations("dialogs", ["SET_DIALOG"]),
    ...mapActions("products", [
      "getSingleProduct",
      "deleteProduct",
      "editProduct",
      "deleteImage",
      "addImage",
    ]),
    async onImageChange(images) {
      try {
        const productToSend = new ProductFormData(cloneObject(this.product));
        productToSend.images = images;
        await this.editProduct({
          productId: this.productId,
          payload: productToSend,
        });
        this.forceUpdate();
      } catch (e) {
        await this.handleErrors(e);
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
        await this.handleErrors(e);
      }
    },
    async deleteProductImage(id) {
      try {
        await this.deleteImage(id);
        this.forceUpdate();
      } catch (e) {
        await this.handleErrors(e);
      }
    },
    async addProductImage(image) {
      try {
        await this.addImage({
          productId: this.productId,
          payload: image.getFormdata(),
        });
        this.forceUpdate();
      } catch (e) {
        await this.handleErrors(e);
      }
    },
    forceUpdate() {
      this.componentKey += 1;
    },
  },
};
</script>

<style scoped></style>

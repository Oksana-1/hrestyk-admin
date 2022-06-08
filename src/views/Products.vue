<template>
  <div>
    <v-container fluid>
      <div v-if="busy" class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </div>
      <api-error v-else-if="isError" />
      <product-list
        v-else
        @deleteItemFromList="deleteItemFromList"
        @addProduct="addProduct"
      />
    </v-container>
    <confirm-modal
      :confirmationText="confirmationMessage"
      v-if="modalToShow === 'confirm'"
      @confirm="doRemove"
      @cancel="closeModal"
      :disabled-button="removing"
    />
    <new-product-modal v-if="modalToShow === 'addProduct'" />
  </div>
</template>

<script>
import NewProductModal from "./newProduct/NewProductModal";
import { mapActions, mapGetters, mapMutations } from "vuex";
import ConfirmModal from "./modals/ConfirmModal";
import ApiError from "@/views/errors/ApiError";
import { productsHeaders } from "@/translations/pages/products";
import ProductList from "@/views/products/ProductList";
import WithVuexFetch from "@/hoc/WithVuexFetch";

export default {
  name: "Products",
  data() {
    return {
      busy: false,
      modalToShow: null,
      confirmationMessage: "Видалити цей продукт?",
      productIdToDelete: null,
      removing: false,
      isError: false,
      productsHeaders,
    };
  },
  components: {
    ProductList: WithVuexFetch(ProductList, "fetchProducts"),
    ApiError,
    NewProductModal,
    ConfirmModal,
  },
  computed: {
    ...mapGetters(["dialog"]),
  },
  methods: {
    ...mapActions(["deleteProduct"]),
    ...mapMutations(["SET_DIALOG"]),
    addProduct() {
      this.SET_DIALOG(true);
      this.modalToShow = "addProduct";
    },
    deleteItemFromList(productId) {
      this.modalToShow = "confirm";
      this.SET_DIALOG(true);
      this.productIdToDelete = productId;
    },
    async doRemove() {
      this.removing = true;
      try {
        await this.deleteProduct(this.productIdToDelete);
      } catch (e) {
        console.error(e);
      } finally {
        this.removing = false;
        this.closeModal();
      }
    },
    closeModal() {
      this.SET_DIALOG(false);
      this.modalToShow = null;
      this.productIdToDelete = null;
    },
  },
};
</script>

<style scoped></style>

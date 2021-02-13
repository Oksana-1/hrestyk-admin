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
                <product-form :product="newProduct" @validationPass="submit" />
              </template>
            </BaseCard>
          </v-col>
          <v-col cols="12">
            <product-images
              :key="`product-images-${componentKey}`"
              :productImages="productImages"
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
      <v-col class="caption px-6 text-right"
        >Дата останнього редагування:
        {{ product.updatedAt | dateToString }}</v-col
      >
    </v-row>
    <info-modal
      v-if="modalToShow === 'success'"
      :infoText="'Зміни збережено!'"
      @ok="closeModal"
    />
    <info-modal
      v-if="modalToShow === 'error'"
      :infoText="'Упс... Сталася помилка.'"
      @ok="closeModal"
    />
    <confirm-modal
      v-if="modalToShow === 'confirm'"
      :confirmation-text="'Видалити цей продукт?'"
      @confirm="doRemove"
      @cancel="closeModal"
    />
  </div>
</template>

<script>
import BaseCard from "../components/base/BaseCard";
import BaseMenu from "../components/base/BaseMenu";
import InfoModal from "./modals/InfoModal";
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
    InfoModal,
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
      try {
        const payload = this.newProduct.getFormData();
        await this.editProduct({
          productId: this.product.id,
          payload: payload,
        });
        this.forceUpdate();
        this.setDefaultProductForm();
        this.modalToShow = "success";
        this.SET_DIALOG(true);
      } catch (e) {
        console.error(e);
        this.modalToShow = "error";
        this.SET_DIALOG(true);
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
      await this.deleteProduct(this.productId);
      await this.$router.push("/products");
    },
    forceUpdate() {
      this.componentKey += 1;
    },
    setDefaultProductForm() {
      if (this.product) {
        this.SET_NEW_PRODUCT(new ProductFormData(this.product));
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped></style>

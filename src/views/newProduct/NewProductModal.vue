<template>
  <base-modal dialogWidth="700px">
    <template v-slot:dialog-body>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1"
            >Загальна інформація</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2"
            >Завантаження фото</v-stepper-step
          >
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card-text>
              <product-form :product="product" @validationPass="step = 2" />
            </v-card-text>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card-text>
              <image-form-list
                :product="product"
                :create-submitting="submitting"
                @step="step = $event"
                @validationPass="submit"
              />
            </v-card-text>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from "../../components/base/BaseModal";
import ProductForm from "../common/ProductForm";
import ImageFormList from "./productImageStep/ImageFormList";
import ProductFormData from "@/entities/ProductFormData";
import { newProductInitialForm } from "@/entities/initialForms/newProduct";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "NewProductModal",
  components: {
    ProductForm,
    ImageFormList,
    BaseModal,
  },
  data() {
    return {
      product: new ProductFormData(newProductInitialForm),
      step: 1,
      submitting: false,
    };
  },
  computed: {
    ...mapGetters(["newProduct"]),
  },
  methods: {
    ...mapActions(["postNewProduct", "fetchProducts"]),
    ...mapMutations(["SET_NEW_PRODUCT", "SET_DIALOG"]),
    async submit() {
      try {
        this.submitting = true;
        const payload = this.newProduct.getFormData();
        await this.postNewProduct(payload);
        this.SET_NEW_PRODUCT(new ProductFormData(newProductInitialForm));
        this.step = 1;
        await this.fetchProducts();
      } catch (e) {
        console.log(e);
      } finally {
        this.submitting = false;
        this.SET_DIALOG(false);
      }
    },
  },
};
</script>

<style scoped></style>
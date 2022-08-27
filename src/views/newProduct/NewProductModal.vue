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
              <product-form
                :key="`image-form-list-${componentKey}`"
                @submit="onFirstStepSubmit"
              />
            </v-card-text>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card-text>
              <image-form-list
                :key="`image-form-list-${componentKey}`"
                :submitting="submitting"
                @step="step = $event"
                @submit="submit"
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
import { mapActions, mapMutations } from "vuex";
import { errorHandleMixin } from "@/mixins/errorHandleMixin";
import { cloneObject } from "@/utils/helpers";

export default {
  name: "NewProductModal",
  components: {
    ProductForm,
    ImageFormList,
    BaseModal,
  },
  mixins: [errorHandleMixin],
  data() {
    return {
      product: new ProductFormData(cloneObject(newProductInitialForm)),
      step: 1,
      submitting: false,
      componentKey: 0,
    };
  },
  methods: {
    ...mapActions("products", ["postNewProduct", "fetchProducts"]),
    ...mapMutations("dialogs", ["SET_DIALOG"]),
    onFirstStepSubmit(form) {
      const {
        category,
        description,
        isActive,
        price,
        qty_available,
        title,
      } = form;
      this.product.category = category;
      this.product.description = description;
      this.product.isActive = isActive;
      this.product.price = price;
      this.product.qty_available = qty_available;
      this.product.title = title;
      this.step = 2;
    },
    async submit(images) {
      try {
        this.product.images = images;
        this.submitting = true;
        const payload = this.product.getFormData();
        await this.postNewProduct(payload);
        this.SET_DIALOG(false);
        await this.fetchProducts();
        this.product = new ProductFormData(cloneObject(newProductInitialForm));
        this.step = 1;
        this.forceUpdate();
      } catch (e) {
        await this.handleErrors(e);
      } finally {
        this.submitting = false;
      }
    },
    forceUpdate() {
      this.componentKey += 1;
    },
  },
};
</script>

<style scoped></style>

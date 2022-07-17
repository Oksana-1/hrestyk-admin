<template>
  <v-container fluid class="pb-0">
    <v-form v-model="valid">
      <v-row>
        <v-col cols="12">
          <BaseCard header-type="avatar" icon-name="mdi-store">
            <template v-slot:card-content>
              <v-row class="justify-end mt-n8 px-2">
                <base-menu
                  @save="$emit('submit')"
                  @delete="$emit('deleteItem')"
                />
              </v-row>
              <product-form
                :product="newProduct"
                :edit-submitting="submitting"
                @validationPass="$emit('submit')"
              />
            </template>
          </BaseCard>
        </v-col>
        <v-col cols="12">
          <product-images
            :key="`product-images-${componentKey}`"
            :productImages="productImages"
            :edit-submitting="submitting"
            @imageChanges="$emit('submit')"
            @imageDeleted="forceUpdate"
          />
        </v-col>
      </v-row>
    </v-form>
    <v-row class="justify-space-between secondary lighten-2 white--text">
      <v-col class="caption px-6"
        >Дата створення: {{ product.createdAt | dateToString }}</v-col
      >
      <v-col v-if="product.updatedAt" class="caption px-6 text-right"
        >Дата останнього редагування:
        {{ product.updatedAt | dateToString }}</v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
import BaseMenu from "@/components/base/BaseMenu";
import ProductForm from "@/views/common/ProductForm";
import ProductImages from "@/views/product/ProductImages";
import { mapGetters, mapMutations } from "vuex";
import ProductFormData from "@/entities/ProductFormData";

export default {
  name: "ProductItem",
  props: {
    submitting: Boolean,
  },
  components: {
    BaseCard,
    BaseMenu,
    ProductForm,
    ProductImages,
  },
  data() {
    return {
      valid: false,
      componentKey: false,
    };
  },
  computed: {
    ...mapGetters("products", ["product", "newProduct"]),
    productImages() {
      return this.product ? this.product.images : [];
    },
  },
  methods: {
    ...mapMutations("products", ["SET_NEW_PRODUCT"]),
    setDefaultProductForm() {
      if (this.product) {
        this.SET_NEW_PRODUCT(new ProductFormData(this.product));
      }
    },
    forceUpdate() {
      this.componentKey += 1;
    },
  },
  created() {
    this.setDefaultProductForm();
  },
};
</script>

<style scoped></style>

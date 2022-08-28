<template>
  <v-container fluid class="pb-0">
    <v-row>
      <v-col cols="12">
        <BaseCard icon-name="mdi-store">
          <template v-slot:card-content>
            <v-row class="justify-end mt-n8 px-2">
              <base-menu
                @save="$emit('submit')"
                @delete="$emit('deleteItem')"
              />
            </v-row>
            <product-form
              :isNewProduct="false"
              @submit="$emit('submit', $event)"
            />
          </template>
        </BaseCard>
      </v-col>
      <v-col cols="12">
        <product-images
          @imageChanges="$emit('imageChanges', $event)"
          @deleteProductImage="$emit('deleteProductImage', $event)"
          @addImage="$emit('addImage', $event)"
        />
      </v-col>
    </v-row>
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
import { mapGetters } from "vuex";

export default {
  name: "SingleProduct",
  props: {
    submitting: Boolean,
  },
  components: {
    BaseCard,
    BaseMenu,
    ProductForm,
    ProductImages,
  },
  computed: {
    ...mapGetters("products", ["product"]),
  },
};
</script>

<style scoped></style>

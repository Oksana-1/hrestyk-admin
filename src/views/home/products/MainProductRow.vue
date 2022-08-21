<template>
  <div>
    <v-skeleton-loader type="list-item-avatar" :loading="loading">
      <v-list-item link :to="`/products/${product.id}`" class="px-0">
        <v-row align="center" no-gutters class="py-1">
          <v-col cols="12" md="2">
            <v-list-item-avatar color="grey lighten-3">
              <v-img v-if="mainImageSrc" :src="mainImageSrc"></v-img>
              <v-icon v-else>mdi-image</v-icon>
            </v-list-item-avatar>
          </v-col>
          <v-col cols="12" md="10">
            <v-list-item-content>
              <v-list-item-title class="text-caption">{{
                product.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-col>
        </v-row>
      </v-list-item>
    </v-skeleton-loader>
    <v-divider class="mb-0" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Product from "@/entities/Product";
export default {
  name: "MainProductRow",
  props: {
    product: Product,
  },
  computed: {
    ...mapGetters("products", ["loading"]),
    mainImageSrc() {
      if (this.product !== undefined) {
        return this.product.images.length > 0
          ? this.product.images[0].url
          : null;
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped></style>

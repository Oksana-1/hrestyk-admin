<template>
  <div>
    <v-skeleton-loader type="list-item-avatar" :loading="loading">
      <v-list-item link :to="`/products/${product.id}`">
        <v-row align="center" no-gutters class="py-1">
          <v-col md="1" cols="3">
            <v-list-item-avatar color="grey lighten-3">
              <v-img v-if="mainImageSrc" :src="mainImageSrc"></v-img>
              <v-icon v-else>mdi-image</v-icon>
            </v-list-item-avatar>
          </v-col>
          <v-col md="4" cols="5">
            <v-list-item-content>
              <v-list-item-title class="text-caption">{{
                product.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-col>
          <v-col md="2" cols="3">
            <div class="text-caption">{{ product.category }}</div>
          </v-col>
          <v-col md="1" cols="3">
            <div class="text-caption font-weight-bold">
              {{ product.price }} грн
            </div>
          </v-col>
          <v-col md="1" cols="5">
            <div class="text-caption">{{ product.qty_available }} шт.</div>
          </v-col>
          <v-col md="2" cols="3">
            <div class="text-caption">
              {{ product.createdAt | dateToString }}
            </div>
          </v-col>
          <v-col md="1" cols="1">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  small
                  color="transparent"
                  v-bind="attrs"
                  v-on="on"
                  @click.prevent="$emit('onProductListDelete', product.id)"
                >
                  <v-icon color="grey" small>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Видалити</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-list-item>
    </v-skeleton-loader>
    <v-divider class="mb-0" />
  </div>
</template>

<script>
import Product from "../../entities/Product";
import { mapGetters } from "vuex";

export default {
  name: "ProductListItem",
  props: {
    product: Product,
  },
  computed: {
    ...mapGetters("products", ["loading"]),
    mainImageSrc() {
      if (!this.product) return "";
      if (this.product.images.length === 0) return "";
      return this.product.mainImage
        ? this.product.mainImage.url
        : this.product.images[0].url;
    },
  },
};
</script>

<style scoped></style>

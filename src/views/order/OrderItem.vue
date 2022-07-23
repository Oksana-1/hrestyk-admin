<template>
  <v-list-item link :to="`/products/${product._id}`">
    <v-row align="center" no-gutters class="py-1">
      <v-col cols="2">
        <v-list-item-avatar color="grey lighten-3">
          <v-img v-if="mainImageSrc" :src="mainImageSrc"></v-img>
          <v-icon v-else>mdi-image</v-icon>
        </v-list-item-avatar>
      </v-col>
      <v-col cols="4">
        <v-list-item-content>
          <v-list-item-title class="text-caption">{{
            product.title
          }}</v-list-item-title>
        </v-list-item-content>
      </v-col>
      <v-col cols="2">
        <div class="text-caption font-weight-bold">{{ product.price }} грн</div>
      </v-col>
      <v-col cols="2">
        <div class="text-caption">{{ product.amount }} шт.</div>
      </v-col>
      <v-col cols="2">
        <div class="text-caption">{{ product.price * product.amount }} грн</div>
      </v-col>
    </v-row>
  </v-list-item>
</template>

<script>
import { OrderProduct } from "@/entities/Order";

export default {
  name: "OrderItem",
  props: {
    product: OrderProduct,
  },
  computed: {
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

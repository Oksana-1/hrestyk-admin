<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row class="px-2">
      <v-col cols="12" lg="4" md="6">
        <main-products-card />
      </v-col>
      <v-col cols="12" lg="4" md="6">
        <main-order-card  :vuexArgs="{ take: 10, skip: 0 }"/>
      </v-col>
      <v-col cols="12" lg="4" md="6">
        <main-slider-card/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainProductsCard from "@/views/home/MainProductsCard";
import MainSliderCard from "@/views/home/MainSliderCard";
import MainOrderCard from "@/views/home/MainOrderCard";
import WithVuexFetch from "@/hoc/WithVuexFetch";

export default {
  name: "Index",
  components: {
    MainOrderCard: WithVuexFetch(MainOrderCard, "orders/fetchOrders"),
    MainSliderCard,
    MainProductsCard: WithVuexFetch(MainProductsCard, "products/fetchProducts"),
  },
};
</script>

<style scoped></style>

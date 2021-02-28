<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row class="px-2">
      <v-col cols="12" lg="4" md="6">
        <main-products-card />
      </v-col>
      <v-col cols="12" lg="4" md="6">
       <main-slider-card/>
      </v-col>
      <v-col cols="12" lg="4" md="6">
        <main-order-card/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainProductsCard from "@/views/home/MainProductsCard";
import MainSliderCard from "@/views/home/MainSliderCard";
import MainOrderCard from "@/views/home/MainOrderCard";
export default {
  name: "Index",
  components: {
    MainOrderCard,
    MainSliderCard,
    MainProductsCard,
  },
};
</script>

<style scoped></style>

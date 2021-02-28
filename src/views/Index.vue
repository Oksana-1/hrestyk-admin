<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row class="px-2">
      <v-col cols="12" lg="4" md="6">
        <main-products-card />
      </v-col>
      <v-col cols="12" lg="4" md="6">
        <base-card>
          <template v-slot:heading>
            <div class="d-flex justify-center fill-height">
              <v-icon color="#fff" class="mr-2">mdi-cart</v-icon>
              <div class="font-weight-light">Замовлення</div>
            </div>
          </template>
        </base-card>
      </v-col>
      <v-col cols="12" lg="4" md="6">
        <base-card>
          <template v-slot:heading>
            <div class="d-flex justify-center">
              <v-icon color="#fff" class="mr-2"
                >mdi-folder-multiple-image</v-icon
              >
              <div class="font-weight-light">Слайдер</div>
            </div>
          </template>
        </base-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
import MainProductsCard from "@/views/home/MainProductsCard";
export default {
  name: "Index",
  components: {
    BaseCard,
    MainProductsCard,
  },
};
</script>

<style scoped></style>

<template>
    <base-card>
      <template v-slot:heading>
        <div class="d-flex justify-center">
          <v-icon color="#fff" class="mr-2">mdi-store</v-icon>
          <div class="font-weight-light">
            Магазин
          </div>
        </div>
      </template>
      <template v-slot:card-content>
        <div class="card-title font-weight-light pt-6">Останні додані товари:</div>
        <v-divider class="mt-2" />
        <v-list avatar="true" class="py-0 mb-5">
          <main-product-row
            v-for="item in products"
            :key="item.id"
            :product="item"/>
        </v-list>
      </template>
      <template v-slot:actions>
        <v-icon
            class="mr-1"
            small
        >
          mdi-clock-outline
        </v-icon>
        <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
      </template>
    </base-card>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
import MainProductRow from "@/views/home/MainProductRow";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MainProductsCard",
  components: {
    MainProductRow,
    BaseCard
  },
  computed: {
    ...mapGetters(['products']),
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    async init() {
      this.busy = true;
      try {
        await this.fetchProducts();
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
      }
    },
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>

</style>
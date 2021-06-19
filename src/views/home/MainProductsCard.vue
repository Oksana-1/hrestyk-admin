<template>
  <base-card>
    <template v-slot:heading>
      <div class="d-flex justify-center">
        <v-icon color="#fff" class="mr-2">mdi-store</v-icon>
        <div class="font-weight-light">Товари</div>
      </div>
    </template>
    <template v-slot:card-content>
      <div class="card-title font-weight-light pt-6">
        Останні додані товари:
      </div>
      <v-divider class="mt-2" />
      <v-list avatar="true" class="py-0 mb-5">
        <main-product-row
          v-for="item in lastProducts"
          :key="item.id"
          :product="item"
        />
      </v-list>
    </template>
    <template v-slot:actions>
      <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
      <span class="caption grey--text font-weight-light"
        >останнє оновлення:
        {{
          (lastCreatedDate > lastUpdatedDate
            ? lastCreatedDate
            : lastUpdatedDate) | dateToString
        }}</span
      >
    </template>
  </base-card>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
import MainProductRow from "@/views/home/MainProductRow";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MainProductsCard",
  components: {
    MainProductRow,
    BaseCard,
  },
  computed: {
    ...mapGetters(["products"]),
    lastProducts() {
      if (!this.products) return [];
      return [...this.products]
        .sort((prev, next) =>
          new Date(prev.createdAt) > new Date(next.createdAt) ? -1 : 1
        )
        .slice(0, 3);
    },
    lastUpdatedDate() {
      if (!this.products) return null;
      return [...this.products]
        .filter((item) => typeof item.updatedAt !== "undefined")
        .sort((prev, next) =>
          new Date(prev.updatedAt) > new Date(next.updatedAt) ? -1 : 1
        )[0].updatedAt;
    },
    lastCreatedDate() {
      return this.lastProducts && this.lastProducts[0] ? this.lastProducts[0].createdAt : null;
    },
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
  },
};
</script>

<style scoped></style>

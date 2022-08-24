<template>
  <base-mini-card page-link="/products">
    <template v-slot:heading>
      <div class="d-flex justify-center">
        <v-icon color="#fff" class="mr-2">mdi-store</v-icon>
        <div class="font-weight-light">Товари</div>
      </div>
    </template>
    <template v-slot:card-content>
      <not-found v-if="products.length === 0" :message="notFoundMessages.products"/>
      <template v-else>
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
    </template>
    <template v-if="products.length > 0" v-slot:actions>
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
  </base-mini-card>
</template>

<script>
import BaseMiniCard from "@/components/base/BaseMiniCard";
import MainProductRow from "@/views/home/products/MainProductRow";
import { mapGetters } from "vuex";
import NotFound from "@/components/not-found/NotFound";
import notFoundMessages from "@/translations/not-found/notFoundMessages";

export default {
  name: "MainProductsCard",
  components: {
    NotFound,
    MainProductRow,
    BaseMiniCard,
  },
  data() {
    return {
      notFoundMessages
    }
  },
  computed: {
    ...mapGetters("products", ["products"]),
    lastProducts() {
      if (!this.products) return [];
      return [...this.products]
        .sort((prev, next) =>
          new Date(prev.createdAt) > new Date(next.createdAt) ? -1 : 1
        )
        .slice(0, 5);
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
};
</script>

<style scoped></style>

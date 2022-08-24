<template>
  <base-mini-card page-link="/orders/all">
    <template v-slot:heading>
      <div class="d-flex justify-center fill-height">
        <v-icon color="#fff" class="mr-2">mdi-cart</v-icon>
        <div class="font-weight-light">Замовлення</div>
      </div>
    </template>
    <template v-slot:card-content>
      <not-found
        v-if="orders.length === 0"
        :message="notFoundMessages.orders"
      />
      <template v-else>
        <div class="card-title font-weight-light pt-6">Останні замовлення:</div>
        <v-divider class="mt-2" />
        <v-list avatar="true" class="py-0 mb-5">
          <main-order-row
            v-for="item in lastOrders"
            :key="item.id"
            :order="item"
          />
        </v-list>
      </template>
    </template>
    <template v-if="orders.length > 0" v-slot:actions>
      <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
      <span class="caption grey--text font-weight-light"
        >останнє оновлення: {{ lastUpdatedDate | dateToString }}</span
      >
    </template>
  </base-mini-card>
</template>

<script>
import BaseMiniCard from "@/components/base/BaseMiniCard";
import { mapGetters } from "vuex";
import NotFound from "@/components/not-found/NotFound";
import notFoundMessages from "@/translations/not-found/notFoundMessages";
import MainOrderRow from "@/views/home/orders/MainOrderRow";

export default {
  name: "MainOrderCard",
  components: {
    MainOrderRow,
    NotFound,
    BaseMiniCard,
  },
  data() {
    return {
      notFoundMessages,
    };
  },
  computed: {
    ...mapGetters("orders", ["orders"]),
    lastOrders() {
      return this.orders;
    },
    lastUpdatedDate() {
      return this.lastOrders && this.lastOrders[0]
        ? this.lastOrders[0].createdAt
        : null;
    },
  },
};
</script>

<style scoped></style>

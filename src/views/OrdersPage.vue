<template>
  <v-container fluid>
    <orders-list
      :key="`ordersList-${componentKey}`"
      :vuexArgs="{ take: ordersPerPage, skip: shift }"
    />
    <v-row justify="center" v-if="paginationLength > 1">
      <v-col cols="6">
        <v-pagination
          v-model="page"
          :length="paginationLength"
          :disabled="busy"
          @input="goToPage"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import OrdersList from "@/views/orders/OrdersList";
import WithVuexFetch from "@/hoc/WithVuexFetch";

export default {
  name: "OrdersPage",
  components: {
    OrdersList: WithVuexFetch(OrdersList, "orders/fetchOrders"),
  },
  data() {
    return {
      busy: false,
      page: 1,
      ordersPerPage: 10,
      componentKey: 1,
    };
  },
  computed: {
    ...mapGetters("orders", ["count"]),
    paginationLength() {
      return this.count ? Math.ceil(this.count / this.ordersPerPage) : null;
    },
    shift() {
      return (this.page - 1) * this.ordersPerPage;
    },
  },
  methods: {
    ...mapActions("orders", ["fetchOrders"]),
    async goToPage(page) {
      this.page = page;
      this.forceUpdate();
    },
    forceUpdate() {
      this.componentKey += 1;
    },
  },
};
</script>

<style scoped></style>

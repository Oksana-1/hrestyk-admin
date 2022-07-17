<template>
  <v-container fluid>
    <load-spinner v-if="busy" />
    <orders-list v-else />
    <v-row justify="center" v-if="false">
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
import LoadSpinner from "@/components/spinners/LoadSpinner";

export default {
  name: "Orders",
  components: {
    LoadSpinner,
    OrdersList,
  },
  data() {
    return {
      busy: false,
      page: 1,
      ordersPerPage: 10,
    };
  },
  computed: {
    ...mapGetters("orders", ["count"]),
    paginationLength() {
      return this.count ? this.count / this.ordersPerPage : null;
    },
    shift() {
      return (this.page - 1) * this.ordersPerPage;
    },
  },
  methods: {
    ...mapActions("orders", ["fetchOrders"]),
    async init() {
      this.busy = true;
      try {
        await this.fetchOrders({ take: 10, skip: this.shift });
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
      }
    },
    async goToPage() {
      console.log("working hard...");
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped></style>

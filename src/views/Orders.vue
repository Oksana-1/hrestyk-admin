<template>
  <v-container fluid>
    <orders-list />
    <v-row justify="center">
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
import { mapGetters } from "vuex";
import OrdersList from "@/views/orders/OrdersList";
import WithVuexFetch from "@/hoc/WithVuexFetch";

export default {
  name: "Orders",
  components: {
    OrdersList: WithVuexFetch(OrdersList, "getOrders"),
  },
  data() {
    return {
      busy: false,
      page: 1,
      ordersPerPage: 10,
    };
  },
  computed: {
    ...mapGetters(["count"]),
    paginationLength() {
      return this.count ? this.count / this.ordersPerPage : null;
    },
    shift() {
      return (this.page - 1) * this.ordersPerPage;
    }
  },
  methods: {
    async goToPage() {
     console.log("working hard...")
    }
  },
};
</script>

<style scoped></style>

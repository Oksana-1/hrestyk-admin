<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <BaseCard header-type="avatar" icon-name="mdi-cart">
          <template v-slot:card-content>
            <v-list-item>
              <v-row align="center" class="hidden-sm-and-down" no-gutters>
                <v-col cols="2" class="text-caption primary--text">Дата</v-col>
                <v-col cols="2" class="text-caption primary--text"
                  >Статус</v-col
                >
                <v-col cols="2" class="text-caption primary--text">Сума</v-col>
                <v-col cols="2" class="text-caption primary--text">Ім'я</v-col>
                <v-col cols="2" class="text-caption primary--text"
                  >Телефон</v-col
                >
                <v-col cols="2" class="text-caption primary--text" />
              </v-row>
            </v-list-item>
            <v-divider />
            <v-list class="py-0 mb-5">
              <order-list-item
                v-for="order in orders"
                :key="order.id"
                :order="order"
                :loading="busy"
                @onOrdertListDelete="deleteOrderFromList($event)"
              />
            </v-list>
          </template>
        </BaseCard>
      </v-col>
    </v-row>
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
import BaseCard from "@/components/base/BaseCard";
import OrderListItem from "@/views/orders/OrderListItem";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Orders",
  components: {
    BaseCard,
    OrderListItem,
  },
  data() {
    return {
      busy: false,
      page: 1,
      ordersPerPage: 10,
    };
  },
  computed: {
    ...mapGetters(["orders", "count"]),
    paginationLength() {
      return this.count ? this.count / this.ordersPerPage : null;
    },
    shift() {
      return (this.page - 1) * this.ordersPerPage;
    }
  },
  methods: {
    ...mapActions(["getOrders"]),
    async init() {
      this.busy = true;
      try {
        await this.getOrders({ take: 10, skip: this.shift });
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
      }
    },
    deleteOrderFromList(itemId) {
      console.log(itemId);
      console.log("working hard to delete order...");
    },
    async goToPage() {
      await this.init();
    }
  },
  created() {
    this.init();
  },
};
</script>

<style scoped></style>

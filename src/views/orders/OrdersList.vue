<template>
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
            <orders-list-item
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

</template>

<script>
import BaseCard from "@/components/base/BaseCard";
import OrdersListItem from "@/views/orders/OrdersListItem";
import {mapGetters} from "vuex";
export default {
  name: "OrdersList",
  components: {
    ...mapGetters(["orders"]),
    BaseCard,
    OrdersListItem,
  },
  methods: {
    deleteOrderFromList(itemId) {
      console.log(itemId);
      console.log("working hard to delete order...");
    },
  }
}
</script>

<style scoped>

</style>
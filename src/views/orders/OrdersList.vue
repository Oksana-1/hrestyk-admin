<template>
  <v-row>
    <v-col cols="12">
      <BaseCard icon-name="mdi-cart">
        <template v-slot:card-content>
          <not-found v-if="orders.length === 0" :message="notFound" />
          <template v-else>
            <v-list-item>
              <v-row align="center" class="hidden-sm-and-down" no-gutters>
                <v-col cols="2" class="text-caption primary--text">Дата</v-col>
                <v-col cols="3" class="text-caption primary--text"
                  >Замовник</v-col
                >
                <v-col cols="2" class="text-caption primary--text"
                  >Телефон</v-col
                >
                <v-col cols="2" class="text-caption primary--text"
                  >Статус</v-col
                >
                <v-col cols="2" class="text-caption primary--text">Сума</v-col>
                <v-col cols="1" class="text-caption primary--text" />
              </v-row>
            </v-list-item>
            <v-divider />
            <v-list class="py-0 mb-5">
              <orders-list-item
                v-for="order in orders"
                :key="order.id"
                :order="order"
                :loading="busy"
                @onOrderListDelete="$emit('onOrderListDelete', $event)"
              />
            </v-list>
          </template>
        </template>
      </BaseCard>
    </v-col>
  </v-row>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
import OrdersListItem from "@/views/orders/OrdersListItem";
import { mapGetters } from "vuex";
import NotFound from "@/components/not-found/NotFound";
import notFoundMessages from "@/translations/not-found/notFoundMessages";
export default {
  name: "OrdersList",
  components: {
    NotFound,
    BaseCard,
    OrdersListItem,
  },
  data() {
    return {
      busy: false,
      notFound: notFoundMessages.orders,
    };
  },
  computed: {
    ...mapGetters("orders", ["orders"]),
  },
};
</script>

<style scoped></style>

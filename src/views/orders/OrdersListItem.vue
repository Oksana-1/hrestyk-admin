<template>
  <div>
    <v-skeleton-loader type="list-item" :loading="loading">
      <v-list-item link :to="`/orders/${order.id}`">
        <v-row align="center" no-gutters>
          <v-col cols="4" md="2">
            <v-list-item-content>
              <div class="text-caption font-weight-bold">
                {{ order.createdAt | dateToString }}
              </div>
            </v-list-item-content>
          </v-col>
          <v-col cols="6" md="3">
            <v-list-item-content>
              <div class="text-caption">{{ order.userInfo.name }}</div>
            </v-list-item-content>
          </v-col>
          <v-col cols="4" md="2">
            <v-list-item-content>
              <div class="text-caption">{{ order.userInfo.phone }}</div>
            </v-list-item-content>
          </v-col>
          <v-col cols="4" md="2">
            <v-list-item-content>
              <div class="text-caption">{{ order.orderStatus }}</div>
            </v-list-item-content>
          </v-col>
          <v-col cols="3" md="2">
            <v-list-item-content>
              <div class="text-caption">
                {{ order.orderSum | roundSum }} грн
              </div>
            </v-list-item-content>
          </v-col>
          <v-col cols="1">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  small
                  color="transparent"
                  v-bind="attrs"
                  v-on="on"
                  @click.prevent="$emit('onOrderListDelete', order.id)"
                >
                  <v-icon color="grey" small>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Видалити</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-list-item>
    </v-skeleton-loader>
    <v-divider class="mb-0" />
  </div>
</template>

<script>
import Order from "@/entities/Order";
import { mapGetters } from "vuex";

export default {
  name: "OrdersListItem",
  props: {
    order: Order,
  },
  computed: {
    ...mapGetters("orders", ["loading"]),
  },
};
</script>

<style scoped></style>

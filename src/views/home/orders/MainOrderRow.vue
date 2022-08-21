<template>
  <div>
    <v-list-item link :to="`/orders/${order.id}`" class="px-0">
      <v-row align="center" no-gutters class="py-1">
        <v-col cols="12" md="2">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              {{ order.createdAt | dateToString }}
            </v-list-item-title>
          </v-list-item-content>
        </v-col>
        <v-col cols="12" md="5">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              {{ order.userInfo.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-col>
        <v-col cols="12" md="2">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              {{ order.orderSum }} грн
            </v-list-item-title>
          </v-list-item-content>
        </v-col>
        <v-col cols="12" md="3">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              {{ order.orderStatus }}
            </v-list-item-title>
          </v-list-item-content>
        </v-col>
      </v-row>
    </v-list-item>
    <v-divider class="mb-0" />
  </div>
</template>

<script>
import Order from "@/entities/Order";

export default {
  name: "MainOrderRow",
  props: {
    order: Order,
  },
};
</script>

<style scoped></style>

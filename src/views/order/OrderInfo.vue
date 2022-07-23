<template>
  <div>
<!--    <div v-if="order.orderStatus" class="mb-3 black&#45;&#45;text">
      Статус замовлення:
      <span class="font-weight-light">{{ order.orderStatus }}</span>
    </div>-->
    <div v-if="order.products && order.products.length > 0" class="mb-3 black--text">
      <order-item-list :products="order.products"/>
    </div>
  </div>
</template>

<script>
import Order from "@/entities/Order";
import OrderItemList from "@/views/order/OrderItemList";

export default {
  name: "OrderInfo",
  components: {OrderItemList},
  props: {
    order: Order,
  },
};
</script>

<style scoped></style>

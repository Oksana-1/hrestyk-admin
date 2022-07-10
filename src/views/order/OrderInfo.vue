<template>
<div>
  <div v-if="order.orderStatus" class="mb-3 black--text">
    Статус замовлення: <span class="font-weight-light">{{ order.orderStatus }}</span>
  </div>
  <div v-if="order.products" class="mb-3 black--text">
    Замовлені продукти:
    <ul>
      <li v-for="product in order.products" :key="product._id">{{product.title}} - {{product.amount}} шт (ціна {{product.price}} грн)</li>
    </ul>
  </div>

</div>
</template>

<script>
import Order from "@/entities/Order";

export default {
  name: "OrderInfo",
  props: {
    order: Order
  }
}
</script>

<style scoped>

</style>

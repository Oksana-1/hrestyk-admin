<template>
  <v-list>
    <v-list-item>
      <v-row align="center" class="hidden-sm-and-down" no-gutters>
        <v-col cols="2" class="text-caption primary--text">Картинка</v-col>
        <v-col cols="4" class="text-caption primary--text">Назва товару</v-col>
        <v-col cols="2" class="text-caption primary--text">Ціна</v-col>
        <v-col cols="2" class="text-caption primary--text">Кількість</v-col>
        <v-col cols="2" class="text-caption primary--text">Сума</v-col>
      </v-row>
    </v-list-item>
    <v-divider />
    <order-item v-for="product in products" :key="product._id" :product="product"/>
  </v-list>
</template>

<script>
import OrderItem from "@/views/order/OrderItem";
export default {
  name: "OrderItemList",
  props: {
    products: Array,
  },
  components: { OrderItem },
};
</script>

<style scoped></style>

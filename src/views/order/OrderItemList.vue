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
    <v-divider />
    <v-row align="center" no-gutters class="pa-3">
      <v-col  cols="12"><small>Загальна сума: <b>{{ total }} грн</b></small></v-col>
    </v-row>
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
  computed: {
    total() {
      return this.products.reduce((total, product) => {
        total = total + product.price * product.amount;
        return total;
      }, 0);
    }
  }
};
</script>

<style scoped></style>

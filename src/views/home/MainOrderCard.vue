<template>
  <base-mini-card page-link="/orders/all">
    <template v-slot:heading>
      <div class="d-flex justify-center fill-height">
        <v-icon color="#fff" class="mr-2">mdi-cart</v-icon>
        <div class="font-weight-light">Замовлення</div>
      </div>
    </template>
    <template v-slot:card-content>
      <div class="card-title font-weight-light pt-6">
        Поки що немає замовлень (((
      </div>
    </template>
  </base-mini-card>
</template>

<script>
import BaseMiniCard from "@/components/base/BaseMiniCard";
export default {
  name: "MainOrderCard",
  components: {
    BaseMiniCard
  }
}
</script>

<style scoped>

</style>

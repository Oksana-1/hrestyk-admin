<template>
  <base-card>
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
  </base-card>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
export default {
  name: "MainOrderCard",
  components: {
    BaseCard
  }
}
</script>

<style scoped>

</style>
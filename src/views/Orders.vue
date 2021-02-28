<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <BaseCard header-type="avatar" icon-name="mdi-cart">
          <template v-slot:card-content>
            <v-row class="pa-6">
              Тут буде сторінка замовлень
            </v-row>
          </template>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
export default {
  name: "Orders",
  components: {
    BaseCard
  }
}
</script>

<style scoped>

</style>
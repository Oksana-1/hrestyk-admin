<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12"> Тут буде внутрішня сторінка замовлення </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Order",
  data() {
    return {
      orderId: this.$route.params.id,
    };
  },
  watch: {
    $route(to) {
      this.orderId = to.params.id;
    },
  },
  methods: {
    ...mapActions(["getOrder"]),
    async init() {
      try {
        await this.getOrder(this.orderId);
      } catch (e) {
        console.error(e);
      }
    }
  },
  created() {
    this.init();
  },
};
</script>

<style scoped></style>

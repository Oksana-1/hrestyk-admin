<template>
  <div class="fill-height">
    <single-order :vuexArgs="orderId"/>
  </div>
</template>

<script>

import SingleOrder from "@/views/order/SingleOrder";
import WithVuexFetch from "@/hoc/WithVuexFetch";

export default {
  name: "SingleOrderPage",
  components: {
    SingleOrder: WithVuexFetch(SingleOrder, "orders/getOrder"),
  },
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
};
</script>

<style scoped></style>

<template>
  <base-mini-card page-link="/orders/all">
    <template v-slot:heading>
      <div class="d-flex justify-center fill-height">
        <v-icon color="#fff" class="mr-2">mdi-cart</v-icon>
        <div class="font-weight-light">Замовлення</div>
      </div>
    </template>
    <template v-slot:card-content>
      <not-found
        v-if="orders.length === 0"
        :message="notFoundMessages.orders"
      />
    </template>
  </base-mini-card>
</template>

<script>
import BaseMiniCard from "@/components/base/BaseMiniCard";
import { mapGetters } from "vuex";
import NotFound from "@/components/not-found/NotFound";
import notFoundMessages from "@/translations/not-found/notFoundMessages";

export default {
  name: "MainOrderCard",
  components: {
    NotFound,
    BaseMiniCard,
  },
  data() {
    return {
      notFoundMessages,
    };
  },
  computed: {
    ...mapGetters("orders", ["orders"]),
  },
};
</script>

<style scoped></style>

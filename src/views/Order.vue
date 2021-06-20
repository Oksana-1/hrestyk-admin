<template>
  <div v-if="!busy">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <BaseCard header-type="avatar" icon-name="mdi-cart">
            <template v-slot:card-content>
              <v-row class="justify-end mt-n8 px-2">
                <base-menu @save="submit" @delete="deleteItem" />
              </v-row>
              <v-row> </v-row>
            </template>
          </BaseCard>
        </v-col>
      </v-row>
      <v-row class="justify-space-between secondary lighten-2 white--text">
        <v-col class="caption px-6"
          >Дата створення: {{ order.createdAt | dateToString }}</v-col
        >
        <v-col v-if="order.updatedAt" class="caption px-6 text-right"
          >Дата останнього редагування:
          {{ order.updatedAt | dateToString }}</v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseCard from "../components/base/BaseCard";
import BaseMenu from "../components/base/BaseMenu";

export default {
  name: "Order",
  components: {
    BaseCard,
    BaseMenu,
  },
  data() {
    return {
      orderId: this.$route.params.id,
      busy: false,
    };
  },
  computed: {
    ...mapGetters(["order"]),
  },
  watch: {
    $route(to) {
      this.orderId = to.params.id;
    },
  },
  methods: {
    ...mapActions(["getOrder"]),
    async init() {
      this.busy = true;
      try {
        await this.getOrder(this.orderId);
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
      }
    },
    submit() {
      console.log("whaaat?");
    },
    deleteItem() {
      console.log("working hard to delete order...");
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped></style>

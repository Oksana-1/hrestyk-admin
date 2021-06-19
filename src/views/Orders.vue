<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <BaseCard header-type="avatar" icon-name="mdi-cart">
          <template v-slot:card-content>
            <v-list-item>
              <v-row align="center" class="hidden-sm-and-down" no-gutters>
                <v-col cols="2" class="text-caption primary--text">Дата</v-col>
                <v-col cols="2" class="text-caption primary--text"
                  >Статус</v-col
                >
                <v-col cols="2" class="text-caption primary--text">Сума</v-col>
                <v-col cols="2" class="text-caption primary--text">Ім'я</v-col>
                <v-col cols="2" class="text-caption primary--text">Телефон</v-col>
                <v-col cols="2" class="text-caption primary--text" />
              </v-row>
            </v-list-item>
            <v-divider />
            <v-list v-if="!busy" class="py-0 mb-5">
              <order-list-item
                v-for="order in orders"
                :key="order.id"
                :order="order"
                :loading="busy"
                @onProductListDelete="deleteOrderFromList($event)"
              />
            </v-list>
          </template>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
import OrderListItem from "@/views/orders/OrderListItem";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Orders",
  components: {
    BaseCard,
    OrderListItem,
  },
  data() {
    return {
      busy: false,
    };
  },
  computed: {
    ...mapGetters(["orders"]),
  },
  methods: {
    ...mapActions(["getOrders"]),
    async init() {
      this.busy = true;
      try {
        await this.getOrders({ take: 10, skip: 190 });
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
      }
    },
    deleteOrderFromList() {
      console.log("working hard to delete order...");
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped></style>

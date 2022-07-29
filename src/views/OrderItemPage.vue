<template>
  <div v-if="!busy" class="fill-height">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <BaseCard header-type="avatar" icon-name="mdi-cart">
            <template v-slot:card-content>
              <v-row class="justify-end mt-n8 px-2">
                <base-menu @save="submit" @delete="deleteItem" />
              </v-row>
              <v-row>
                <v-col cols="8">
                  <v-stepper v-model="step" vertical class="elevation-0">
                    <v-stepper-step :complete="step > 1" step="1">
                      Замовлено
                      <small>id: {{ order.id }}</small>
                    </v-stepper-step>
                    <v-stepper-content step="1">
                      <v-card class="mb-6 elevation-0">
                        <order-info :order="order" />
                      </v-card>
                      <v-btn color="primary" @click="step = 2">
                        Готове до відправки
                      </v-btn>
                    </v-stepper-content>
                    <v-stepper-step :complete="step > 2" step="2">
                      Відправлено
                    </v-stepper-step>
                    <v-stepper-content step="2">
                      <v-card class="mb-12 elevation-0">
                        <order-info :order="order" />
                        <v-form ref="form">
                          <v-textarea
                            label="Інфо по відправці"
                            v-model="deliveryInfo"
                          />
                        </v-form>
                      </v-card>
                      <v-btn color="primary" @click="step = 3">
                        Відправлене
                      </v-btn>
                      <v-btn text @click="step = 1">Не готове ще</v-btn>
                    </v-stepper-content>
                    <v-stepper-step :complete="step > 3" step="3">
                      Одержано
                    </v-stepper-step>
                    <v-stepper-content step="3">
                      <v-card class="mb-12 elevation-0">
                        <order-info :order="order" />
                      </v-card>
                      <v-btn color="primary" @click="step = 4">
                        Одержано
                      </v-btn>
                      <v-btn text @click="step = 2">Не відправлено</v-btn>
                    </v-stepper-content>
                  </v-stepper>
                  <v-card v-if="step === 4" class="mb-12 ml-14 elevation-0">
                    <order-info :order="order" />
                    <v-btn text @click="step = 3">Не одержано</v-btn>
                  </v-card>
                </v-col>
                <v-col cols="4">
                  <customer-info :customer="order.userInfo" />
                </v-col>
              </v-row>
            </template>
            <template v-slot:actions>
              <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
              <span class="caption grey--text font-weight-light">
                Дата створення: {{ order.createdAt | dateToString }}.
                <span v-if="order.updatedAt">
                  Дата останнього редагування:
                  {{ order.updatedAt | dateToString }}
                </span>
              </span>
            </template>
          </BaseCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseCard from "../components/base/BaseCard";
import BaseMenu from "../components/base/BaseMenu";
import OrderInfo from "@/views/order/OrderInfo";
import CustomerInfo from "@/views/order/CustomerInfo";

export default {
  name: "OrderItemPage",
  components: {
    BaseCard,
    BaseMenu,
    OrderInfo,
    CustomerInfo,
  },
  data() {
    return {
      orderId: this.$route.params.id,
      busy: false,
      step: 1,
      deliveryInfo: "",
    };
  },
  computed: {
    ...mapGetters("orders", ["order"]),
  },
  watch: {
    $route(to) {
      this.orderId = to.params.id;
    },
  },
  methods: {
    ...mapActions("orders", ["getOrder"]),
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

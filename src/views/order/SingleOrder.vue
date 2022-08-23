<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <BaseCard icon-name="mdi-cart">
          <template v-slot:card-content>
            <v-row class="justify-end mt-n8 px-2">
              <base-menu :items="baseMenuItems" @cancel="cancelOrder" />
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-row v-if="step === 0" class="align-center px-7">
                  <v-avatar color="grey lighten-3" size="40"
                    ><v-icon>mdi-exclamation-thick</v-icon></v-avatar
                  >
                  <div class="mx-4">Замовлення відмінено!</div>
                </v-row>
                <v-stepper v-else v-model="step" vertical class="elevation-0">
                  <v-stepper-step :complete="step > 1" step="1">
                    Замовлено
                    <small>id: {{ order.id }}</small>
                  </v-stepper-step>
                  <v-stepper-content step="1">
                    <v-card class="mb-6 elevation-0">
                      <order-info :order="order" />
                    </v-card>
                    <v-btn
                      color="primary"
                      @click="changeStatus('processed')"
                      :disabled="loading"
                    >
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
                    <v-btn
                      color="primary"
                      @click="changeStatus('sent')"
                      :disabled="loading"
                    >
                      Відправлене
                    </v-btn>
                    <v-btn
                      text
                      @click="changeStatus('ordered')"
                      :disabled="loading"
                      >Не готове ще</v-btn
                    >
                  </v-stepper-content>
                  <v-stepper-step :complete="step > 3" step="3">
                    Одержано
                  </v-stepper-step>
                  <v-stepper-content step="3">
                    <v-card class="mb-12 elevation-0">
                      <order-info :order="order" />
                    </v-card>
                    <v-btn
                      color="primary"
                      @click="changeStatus('finished')"
                      :disabled="loading"
                    >
                      Одержано
                    </v-btn>
                    <v-btn text @click="step = 2" :disabled="loading"
                      >Не відправлено</v-btn
                    >
                  </v-stepper-content>
                </v-stepper>
                <v-card v-if="step === 4" class="mb-12 ml-14 elevation-0">
                  <order-info :order="order" />
                  <v-btn
                    text
                    outlined
                    @click="changeStatus('sent')"
                    :disabled="loading"
                    >Не одержано</v-btn
                  >
                </v-card>
              </v-col>
              <v-col cols="4">
                <customer-info :customer="order.userInfo" />
                <v-card
                  v-if="deliveryInfo"
                  class="ma-2 pa-2 elevation-0"
                  color="grey lighten-5"
                >
                  <pre>{{ deliveryInfo }}</pre>
                </v-card>
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
    <confirm-modal
      :confirmationText="confirmationMessage"
      v-if="modalToShow === 'confirm'"
      @confirm="doDecline"
      @cancel="closeModal"
      :disabled-button="loading"
    />
  </v-container>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
import BaseMenu from "@/components/base/BaseMenu";
import OrderInfo from "@/views/order/OrderInfo";
import CustomerInfo from "@/views/order/CustomerInfo";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { errorHandleMixin } from "@/mixins/errorHandleMixin";
import { confirmationMessages } from "@/translations/pages/orders";

export default {
  name: "SingleOrder",
  components: {
    BaseCard,
    BaseMenu,
    OrderInfo,
    CustomerInfo,
    ConfirmModal,
  },
  mixins: [errorHandleMixin],
  data() {
    return {
      step: 1,
      deliveryInfo: "",
      baseMenuItems: [
        {
          title: "Відмінити",
          icon: "mdi-alert-octagon",
          methodToEmit: "cancel",
        },
      ],
      stepMapping: {
        declined: 0,
        ordered: 1,
        processed: 2,
        sent: 3,
        finished: 4,
      },
      confirmationMessage: confirmationMessages.decline,
      modalToShow: null,
    };
  },
  computed: {
    ...mapGetters("orders", ["order", "loading"]),
  },
  methods: {
    ...mapActions("orders", ["changeOrderStatus"]),
    ...mapMutations("dialogs", ["SET_DIALOG"]),
    init() {
      this.updateState(this.order.orderStatus);
    },
    updateState(status) {
      this.step = this.stepMapping[status];
      this.deliveryInfo = this.order.getContentByStatus("sent");
    },
    async changeStatus(status) {
      try {
        await this.changeOrderStatus({
          id: this.order.id,
          status,
          content: this.deliveryInfo,
        });
        this.updateState(status);
      } catch (e) {
        await this.handleErrors(e);
      }
    },
    async doDecline() {
      await this.changeStatus("declined ");
      this.step = 0;
      this.closeModal();
    },
    async cancelOrder() {
      this.modalToShow = "confirm";
      this.SET_DIALOG(true);
    },
    closeModal() {
      this.SET_DIALOG(false);
      this.modalToShow = null;
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped></style>

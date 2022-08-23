<template>
  <v-container fluid>
    <orders-list
      :key="`ordersList-${componentKey}`"
      :vuexArgs="{ take: ordersPerPage, skip: shift }"
      @onOrderListDelete="deleteOrderFromList($event)"
    />
    <v-row justify="center" v-if="paginationLength > 1">
      <v-col cols="6">
        <v-pagination
          v-model="page"
          :length="paginationLength"
          :disabled="busy"
          @input="goToPage"
        />
      </v-col>
    </v-row>
    <confirm-modal
      :confirmationText="confirmationMessage"
      v-if="modalToShow === 'confirm'"
      @confirm="doRemove"
      @cancel="closeModal"
      :disabled-button="busy"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import OrdersList from "@/views/orders/OrdersList";
import ConfirmModal from "@/components/modals/ConfirmModal";
import WithVuexFetch from "@/hoc/WithVuexFetch";
import { errorHandleMixin } from "@/mixins/errorHandleMixin";
import { confirmationMessages } from "@/translations/pages/orders";

export default {
  name: "OrdersPage",
  components: {
    OrdersList: WithVuexFetch(OrdersList, "orders/fetchOrders"),
    ConfirmModal,
  },
  mixins: [errorHandleMixin],
  data() {
    return {
      busy: false,
      page: Number(this.$route.params.page) || 1,
      ordersPerPage: 10,
      componentKey: 1,
      modalToShow: null,
      confirmationMessage: confirmationMessages.delete,
      productIdToDelete: null,
    };
  },
  watch: {
    $route(to) {
      this.page = Number(to.params.page) || 1;
    },
  },
  computed: {
    ...mapGetters("orders", ["count"]),
    paginationLength() {
      return this.count ? Math.ceil(this.count / this.ordersPerPage) : null;
    },
    shift() {
      return (this.page - 1) * this.ordersPerPage;
    },
  },
  methods: {
    ...mapActions("orders", ["fetchOrders", "deleteOrderById"]),
    ...mapMutations("dialogs", ["SET_DIALOG"]),
    async goToPage(page) {
      const currentLocation = this.$route.path;
      const targetLocation = page === 1 ? "/orders/all" : `/orders/all/${page}`;
      if (targetLocation === currentLocation) return;
      await this.$router.push(targetLocation);
      this.forceUpdate();
    },
    async deleteOrderFromList(itemId) {
      this.modalToShow = "confirm";
      this.SET_DIALOG(true);
      this.productIdToDelete = itemId;
    },
    async doRemove() {
      this.busy = true;
      try {
        await this.deleteOrderById(this.productIdToDelete);
        this.forceUpdate();
      } catch (e) {
        await this.handleErrors(e);
      } finally {
        this.busy = false;
        this.closeModal();
      }
    },
    closeModal() {
      this.SET_DIALOG(false);
      this.modalToShow = null;
      this.productIdToDelete = null;
    },
    forceUpdate() {
      this.componentKey += 1;
    },
  },
};
</script>

<style scoped></style>

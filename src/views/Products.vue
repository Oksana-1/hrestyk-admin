<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <BaseCard
              header-type="avatar"
              icon-name="mdi-store">
            <template v-slot:card-content>
              <v-list-item>
                <v-row align="center" class="hidden-sm-and-down" no-gutters>
                  <v-col cols="1" class="text-caption primary--text">Картинка</v-col>
                  <v-col cols="4" class="text-caption primary--text">Назва товару</v-col>
                  <v-col cols="2" class="text-caption primary--text">Категорія</v-col>
                  <v-col cols="1" class="text-caption primary--text">Ціна</v-col>
                  <v-col cols="1" class="text-caption primary--text">На складі</v-col>
                  <v-col cols="2" class="text-caption primary--text">Дата</v-col>
                </v-row>
              </v-list-item>
              <v-divider/>
              <v-list v-if="!busy" avatar="true" class="py-0 mb-5">
                <product-list-item
                    v-for="item in products"
                    :key="item.id"
                    :product="item"
                    @onProductListDelete="deleteItemFromList($event)"/>
              </v-list>
              <v-row class="justify-end">
                <v-col cols="3" class="d-flex justify-end">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          fab
                          dark
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                          @click.prevent="addProduct"
                      >
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <span>Додати товар</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </template>
          </BaseCard>
        </v-col>
      </v-row>
    </v-container>
    <confirm-modal
        :confirmationText="confirmationMessage"
        v-if="modalToShow === 'confirm'"
        @confirm="doRemove"
        @cancel="closeModal"
        :disabled-button="removing"
    />
    <new-product-modal
        v-if="modalToShow === 'addProduct'"/>
  </div>
</template>

<script>
import BaseCard from "../components/base/BaseCard";
import ProductListItem from "./products/ProductListItem";
import NewProductModal from "./newProduct/NewProductModal";
import {mapActions, mapGetters, mapMutations} from 'vuex';
import ConfirmModal from "./modals/ConfirmModal";

export default {
  name: "Products",
  data() {
    return {
      busy: false,
      modalToShow: null,
      confirmationMessage: 'Видалити цей продукт?',
      productIdToDelete: null,
      removing: false,
    }
  },
  components: {
    ProductListItem,
    BaseCard,
    NewProductModal,
    ConfirmModal
  },
  computed: {
    ...mapGetters(['products', 'dialog']),
  },
  methods: {
    ...mapActions(['fetchProducts', 'deleteProduct']),
    ...mapMutations(['SET_DIALOG']),
    addProduct() {
      this.SET_DIALOG(true);
      this.modalToShow = 'addProduct';
    },
    async init() {
      this.busy = true;
      try {
        await this.fetchProducts();
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
      }
    },
    deleteItemFromList(productId) {
      this.modalToShow = 'confirm';
      this.SET_DIALOG(true);
      this.productIdToDelete = productId;
    },
    async doRemove() {
      this.removing = true;
      try {
        await this.deleteProduct(this.productIdToDelete);
      } catch (e) {
        console.error(e);
      } finally {
        this.removing = false;
        this.closeModal();
      }
    },
    closeModal() {
      this.SET_DIALOG(false);
      this.modalToShow = null;
      this.productIdToDelete = null;
    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>

</style>
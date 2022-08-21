<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <BaseCard header-type="avatar" icon-name="mdi-store">
          <template v-slot:card-content>
            <not-found v-if="products.length === 0" :message="notFound" />
            <template v-else>
              <v-list-item>
                <v-row align="center" class="hidden-sm-and-down" no-gutters>
                  <v-col cols="1" class="text-caption primary--text">{{
                    productsHeaders.picture
                  }}</v-col>
                  <v-col cols="4" class="text-caption primary--text">{{
                    productsHeaders.name
                  }}</v-col>
                  <v-col cols="2" class="text-caption primary--text">{{
                    productsHeaders.category
                  }}</v-col>
                  <v-col cols="1" class="text-caption primary--text">{{
                    productsHeaders.price
                  }}</v-col>
                  <v-col cols="1" class="text-caption primary--text">{{
                    productsHeaders.onStock
                  }}</v-col>
                  <v-col cols="2" class="text-caption primary--text">{{
                    productsHeaders.date
                  }}</v-col>
                </v-row>
              </v-list-item>
              <v-divider />
              <v-list v-if="!busy" avatar="true" class="py-0 mb-5">
                <product-list-item
                  v-for="item in products"
                  :key="item.id"
                  :product="item"
                  @onProductListDelete="$emit('deleteItemFromList', $event)"
                />
              </v-list>
            </template>
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
                        @click.prevent="$emit('addProduct')"
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
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
import ProductListItem from "@/views/products/ProductListItem";
import { productsHeaders } from "@/translations/pages/products";
import { mapGetters } from "vuex";
import NotFound from "@/components/not-found/NotFound";
import notFoundMessages from "@/translations/not-found/notFoundMessages";

export default {
  name: "ProductList",
  components: {
    NotFound,
    BaseCard,
    ProductListItem,
  },
  data() {
    return {
      productsHeaders,
      busy: false,
      notFound: notFoundMessages.products,
    };
  },
  computed: {
    ...mapGetters("products", ["products"]),
  },
};
</script>

<style scoped></style>

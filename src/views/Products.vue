<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12">
                <BaseCard icon-name="mdi-storefront">
                    <template v-slot:card-content>
                        <v-list-item>
                            <v-row align="center" class="hidden-sm-and-down" no-gutters>
                                <v-col cols="1" class="text-caption primary--text">Картинка</v-col>
                                <v-col cols="4" class="text-caption primary--text">Назва товару</v-col>
                                <v-col cols="3" class="text-caption primary--text">Категорія</v-col>
                                <v-col cols="1" class="text-caption primary--text">Ціна</v-col>
                                <v-col cols="1" class="text-caption primary--text">На складі</v-col>
                                <v-col cols="2" class="text-caption primary--text">Відредаговано</v-col>
                            </v-row>
                        </v-list-item>
                        <v-list-item-group>
                            <v-list avatar="true">
                               <product-item
                                   v-for="(product, i) in products"
                                   :key="`product-${i}`"
                                   :product="product"/>
                            </v-list>
                        </v-list-item-group>
                    </template>
                </BaseCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BaseCard from "../components/base/BaseCard";
import ProductItem from "./parts/ProductItem";
import {apiResponseProducts} from "../api";

export default {
    name: "Products",
    components: {
        ProductItem,
        BaseCard
    },
    data() {
        return {
            products: apiResponseProducts
        }
    }
}
</script>

<style scoped>

</style>
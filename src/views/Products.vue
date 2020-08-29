<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12">
                <BaseCard
                    header-type="avatar"
                    icon-name="mdi-storefront">
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
                               :product="item"/>
                        </v-list>
                        <v-row>
                            <v-spacer/>
                            <v-col cols="1">
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
</template>

<script>
import BaseCard from "../components/base/BaseCard";
import ProductListItem from "./parts/ProductListItem";
import {mapActions, mapGetters} from 'vuex';

export default {
    name: "Products",
    data() {
        return {
            busy: false
        }
    },
    components: {
        ProductListItem,
        BaseCard
    },
    computed: {
        ...mapGetters(['products']),
    },
    methods: {
        ...mapActions(['fetchProducts']),
        addProduct() {
            alert('Add product!');
        },
        async init() {
            this.busy = true;
            await this.fetchProducts();
            this.busy = false;
        }
    },
    created() {
        this.init();
    }
}
</script>

<style scoped>

</style>
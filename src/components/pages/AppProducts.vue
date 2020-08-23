<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col>
                <BaseCard icon-name="mdi-storefront">
                    <template v-slot:card-content>
                        <v-list
                        avatar="true"
                        >
                            <v-list-item-group v-model="item" color="primary">
                                <v-list-item
                                    v-for="product in products"
                                    :key="product.id"
                                >
                                    <v-list-item-avatar>
                                        <v-img :src="product.images[1].src"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-html="product.title"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </template>
                </BaseCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BaseCard from "../base/BaseCard";
import {apiResponseProducts} from "../../api";

export default {
    name: "PageProducts",
    components: {
        BaseCard
    },
    data() {
        return {
            products: apiResponseProducts
        }
    },
    created() {
        console.log(apiResponseProducts);
    }
}
</script>

<style scoped>

</style>
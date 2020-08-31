<template>
    <div>
        <v-list-item link :to="`/products/${product.id}`">
            <v-row align="center" no-gutters class="py-1">
                <v-col cols="3" sm="1">
                    <v-list-item-avatar color="grey lighten-3">
                        <v-img :src="product.images[0].url"></v-img>
                    </v-list-item-avatar>
                </v-col>
                <v-col cols="5" sm="4">
                    <v-list-item-content>
                        <v-list-item-title class="text-caption">{{product.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-col>
                <v-col cols="3" sm="2">
                    <div class="text-caption">{{product.category}}</div>
                </v-col>
                <v-col cols="4" sm="1">
                    <div class="text-caption font-weight-bold">{{product.price}} грн</div>
                </v-col>
                <v-col cols="4" sm="1">
                    <div class="text-caption">{{product.qty_available}} шт.</div>
                </v-col>
                <v-col cols="3" sm="2">
                    <div class="text-caption">{{product.createdAt | dateToString}}</div>
                </v-col>
                <v-col cols="1" class="d-flex justify-end">
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                text
                                small
                                color="transparent"
                                v-bind="attrs"
                                v-on="on"
                                @click.prevent="deleteItem"
                            >
                                <v-icon color="grey" small>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Видалити</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-list-item>
        <v-divider class="mb-0" />
    </div>
</template>

<script>
import Product from "../../entities/Product";
export default {
    name: "ProductItem",
    props: {
        product: Product
    },
    methods: {
        deleteItem() {
            alert('Delete!');
        }
    }
}
</script>

<style scoped>

</style>
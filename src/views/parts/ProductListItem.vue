<template>
    <div>
        <v-skeleton-loader
            type="list-item-avatar"
            :loading="loading"
        >
            <v-list-item link :to="`/products/${product.id}`">
                <v-row align="center" no-gutters class="py-1">
                    <v-col cols="3" sm="1">
                        <v-list-item-avatar color="grey lighten-3">
                            <v-img v-if="mainImageSrc" :src="mainImageSrc"></v-img>
                            <v-icon v-else>mdi-image</v-icon>
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
                                    @click.prevent="$emit('onProductListDelete', product.id)"
                                >
                                    <v-icon color="grey" small>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Видалити</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-list-item>
        </v-skeleton-loader>
        <v-divider class="mb-0" />
    </div>
</template>

<script>
import Product from "../../entities/Product";
import {mapGetters} from 'vuex';
export default {
    name: "ProductListItem",
    props: {
        product: Product
    },
    computed: {
        ...mapGetters(['loading']),
        mainImageSrc() {
            if (this.product !== undefined) {
                return this.product.images.length > 0
                    ? this.product.images[0].url
                    : null
            } else {
                return null
            }
        }
    }
}
</script>

<style scoped>

</style>
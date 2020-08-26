<template>
    <v-list-item>
        <v-row align="center" no-gutters class="py-1">
            <v-col cols="3" sm="1">
                <v-list-item-avatar color="grey lighten-3">
                    <v-img :src="product.images[1].src"></v-img>
                </v-list-item-avatar>
            </v-col>
            <v-col cols="5" sm="4">
                <v-list-item-content>
                    <v-list-item-title class="text-caption">{{product.title}}</v-list-item-title>
                </v-list-item-content>
            </v-col>
            <v-col cols="3">
                <div class="text-caption">{{productCategoryTitle}}</div>
            </v-col>
            <v-col cols="4" sm="1">
                <div class="text-caption font-weight-bold">{{product.price}} грн</div>
            </v-col>
            <v-col cols="4" sm="1">
                <div class="text-caption">{{product.onStock}} шт.</div>
            </v-col>
            <v-col cols="4" sm="2">
                <div class="text-caption">{{lastEditDate}}</div>
            </v-col>
        </v-row>


    </v-list-item>
</template>

<script>
import { apiResponseCategories } from "../../api";

export default {
    name: "ProductItem",
    props: {
        product: Object
    },
    computed: {
        productCategoryTitle() {
            const category = apiResponseCategories.find(item => item.id === this.product.categoryId) || null;
            return category ? category.title : null;
        },
        lastEditDate() {
            const date = new Date(this.product.lastEditDate*1000);
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            return `${day}.${month >=10 ? month: '0' + month}.${year}`;
        }
    }
}
</script>

<style scoped>

</style>
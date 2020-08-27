<template>
    <v-card-text>
        <v-text-field
            label="Назва товару"
            :value="`${product.title}`"
        ></v-text-field>
        <v-textarea
            label="Опис товару"
            :value="product.description"
        ></v-textarea>
        <v-row>
            <v-col class="d-flex" cols="4">
                <v-select
                    :items="categories"
                    label="Категорія"
                    :value="category.title"
                ></v-select>
            </v-col>
            <v-col class="d-flex" cols="4">
                <v-text-field
                    label="Ціна, грн"
                    :value="`${product.price}`"
                ></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="На складі, шт"
                    :value="`${product.onStock}`"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-card-text>
</template>

<script>
import {apiResponseCategories} from "../../api";
export default {
    name: "ProductForm",
    props: {
        product: Object,
        category: Object
    },
    data() {
        return {
            categories: apiResponseCategories.map(item => item.title)
        }
    }
}
</script>

<style scoped>

</style>
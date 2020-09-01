<template>
    <v-card-text>
        <v-form>
            <v-text-field
                label="Назва товару"
                :value="product.title"
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
                        :value="product.category"
                    ></v-select>
                </v-col>
                <v-col class="d-flex" cols="4">
                    <v-text-field
                        label="Ціна, грн"
                        :value="product.price"
                    ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        label="На складі, шт"
                        :value="product.qty_available"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-form>
    </v-card-text>
</template>

<script>
import {apiResponseCategories} from "../../api";
import Product from "../../entities/Product";
export default {
    name: "ProductForm",
    props: {
        product: Product,
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
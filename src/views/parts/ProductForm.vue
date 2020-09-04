<template>
    <v-form>
        <v-text-field
            label="Назва товару"
            v-model="productForm.title"
        ></v-text-field>
        <v-textarea
            label="Опис товару"
            v-model="productForm.description"
        ></v-textarea>
        <v-row>
            <v-col class="d-flex" cols="4">
                <v-select
                    :items="categories"
                    label="Категорія"
                    v-model="productForm.category"
                ></v-select>
            </v-col>
            <v-col class="d-flex" cols="4">
                <v-text-field
                    type="number"
                    label="Ціна, грн"
                    v-model.number="productForm.price"
                ></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-text-field
                    type="number"
                    label="На складі, шт"
                    v-model.number="product.qty_available"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
    name: "ProductForm",
    props: {
        product: Object
    },
    computed: {
        ...mapGetters(['newProduct', 'categories']),
        productForm: {
            get () {
                return this.newProduct;
            },
            set (value) {
                this.SET_NEW_PRODUCT(value);
            },
        },
    },
    methods: {
        ...mapMutations(['SET_NEW_PRODUCT'])
    },
    created() {
        this.SET_NEW_PRODUCT(this.product);
    }
}
</script>

<style scoped>

</style>
<template>
<div>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12">
                <BaseCard
                    header-type="avatar"
                    icon-name="mdi-storefront">
                    <template v-slot:card-content>
                        <product-form :product="product" :category="category"/>
                    </template>
                </BaseCard>
            </v-col>
            <v-col cols="12">
                <v-row>
                    <v-col cols="4" v-for="(image, i) in productImages" :key="`productImage-${i}`">
                        <product-image :image="image"/>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-center align-center">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    fab
                                    dark
                                    color="primary"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click.prevent="addPic"
                                >
                                    <v-icon dark>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>Додати картинку</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import BaseCard from "../components/base/BaseCard";
import ProductForm from "./parts/ProductForm";
import ProductImage from "./parts/ProductImage";
import {apiResponseProducts, apiResponseCategories} from "../api";

export default {
    name: "Product",
    components: {
        ProductImage,
        BaseCard,
        ProductForm
    },
    data() {
        return {
            productId: parseInt(this.$route.params.id)
        }
    },
    computed: {
        product() {
            return apiResponseProducts.find(item => item.id === this.productId) || null;
        },
        productImages() {
            return this.product ? this.product.images : [];
        },
        category() {
            return apiResponseCategories.find(item => item.id === this.product.categoryId) || null;
        }
    },
    watch: {
        '$route'(to){
            this.productId = to.params.id;
        }
    },
    methods: {
        addPic() {
            alert("Add a pic please!");
        }
    }
}
</script>

<style scoped>

</style>
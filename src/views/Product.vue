<template>
<div>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12">
                <BaseCard icon-name="mdi-storefront">
                    <template v-slot:card-content>
                        <h1 class="font-weight-light mb-2 headline">{{ productTitle }}</h1>
                    </template>
                </BaseCard>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import BaseCard from "../components/base/BaseCard";
import {apiResponseProducts, apiResponseCategories} from "../api";

export default {
    name: "Product",
    components: {
        BaseCard
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
        category() {
            return apiResponseCategories.find(item => item.id === this.product.categoryId) || null;
        },
        productTitle() {
            return this.product ? this.product.title : null;
        }
    },
    watch: {
        '$route'(to){
            this.productId = to.params.id;
        }
    },
}
</script>

<style scoped>

</style>
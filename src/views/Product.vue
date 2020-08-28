<template>
<div>
    <v-container fluid>
        <v-form v-model="valid">
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
                            <product-image
                                :image="image"
                                @makeImageMain="makeImageMain"/>
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
        </v-form>
    </v-container>
    <info-modal :infoText="'Зробити картинку головною?'"/>
</div>
</template>

<script>
import BaseCard from "../components/base/BaseCard";
import InfoModal from "./modals/InfoModal";
import ProductForm from "./parts/ProductForm";
import ProductImage from "./parts/ProductImage";
import {apiResponseProducts, apiResponseCategories} from "../api";
import {mapMutations} from 'vuex';

export default {
    name: "Product",
    components: {
        ProductImage,
        BaseCard,
        InfoModal,
        ProductForm,
    },
    data() {
        return {
            productId: parseInt(this.$route.params.id),
            valid: false,
            dialogVisible: false
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
        ...mapMutations(['SET_DIALOG']),
        addPic() {
            alert("Add a pic please!");
        },
        makeImageMain() {
            this.SET_DIALOG(true);
        }
    }
}
</script>

<style scoped>

</style>
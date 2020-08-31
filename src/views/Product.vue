<template>
<div>
    <v-container fluid>
        <v-form v-model="valid" v-if="!busy">
            <v-row>
                <v-col cols="12">
                    <BaseCard
                        header-type="avatar"
                        icon-name="mdi-store">
                        <template v-slot:card-content>
                            <v-row class="justify-end mt-n8 px-2">
                                <base-menu/>
                            </v-row>
                            <product-form :product="product"/>
                        </template>
                    </BaseCard>
                </v-col>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="4" v-for="image in productImages" :key="image.id">
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
                                        depressed
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
            <v-row class="justify-center px-6 mb-10 mt-5">
                <v-btn depressed large dark color="primary">
                    <v-icon class="pr-2">{{ 'mdi-content-save' }}</v-icon>
                    Зберегти
                </v-btn>
            </v-row>
        </v-form>
    </v-container>
    <v-row class="justify-space-between secondary lighten-2 white--text">
        <v-col class="caption px-6">Дата створення: {{ product.createdAt | dateToString}}</v-col>
        <v-col class="caption px-6 text-right">Дата останнього редагування: {{ product.createdAt | dateToString}}</v-col>
    </v-row>
    <info-modal :infoText="'Зробити картинку головною?'"/>
</div>
</template>

<script>
import BaseCard from "../components/base/BaseCard";
import BaseMenu from "../components/base/BaseMenu";
import InfoModal from "./modals/InfoModal";
import ProductForm from "./parts/ProductForm";
import ProductImage from "./parts/ProductImage";
import {apiResponseCategories} from "../api";
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
    name: "Product",
    components: {
        ProductImage,
        BaseCard,
        BaseMenu,
        InfoModal,
        ProductForm,
    },
    data() {
        return {
            productId: this.$route.params.id,
            valid: false,
            dialogVisible: false,
            busy: false
        }
    },
    computed: {
        ...mapGetters(['product']),
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
        ...mapActions(['getSingleProduct']),
        addPic() {
            alert("Add a pic please!");
        },
        makeImageMain() {
            this.SET_DIALOG(true);
        },
        async init() {
            this.busy = true;
            await this.getSingleProduct(this.productId);
            this.busy = false;
        }
    },
    created() {
        this.init();
    }
}
</script>

<style scoped>

</style>
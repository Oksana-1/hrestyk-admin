<template>
    <base-modal dialogWidth="700px">
        <template v-slot:dialog-header>
            <v-card-title class="grey lighten-2 justify-space-between">
                Новий товар
                <v-btn
                    icon
                    @click="onCancel"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
        </template>
        <template v-slot:dialog-body>
            <product-form :product="product"/>
        </template>
        <template v-slot:dialog-footer>
            <v-card-actions class="d-flex justify-center">
                <v-btn
                    color="primary"
                    @click="onSuccess"
                    class="mx-3"
                >
                    Створити
                </v-btn>
               <v-btn
                   color="secondary lighten-3"
                   @click="onCancel"
                   class="mx-3"
               >
                   Відмінити
               </v-btn>
            </v-card-actions>
        </template>
    </base-modal>
</template>

<script>
import BaseModal from "../../components/base/BaseModal";
import ProductForm from "../parts/ProductForm";
import Product from "../../entities/Product";
import {newProductInitialForm} from "../../entities/initialForms/newProduct";

export default {
    name: "NewProductModal",
    components: {
        ProductForm,
        BaseModal
    },
    data() {
        return {
            product: new Product(newProductInitialForm)
        }
    },
    methods: {
        onSuccess() {
            console.log('create a product please!');
        },
        onCancel() {
            console.log('cancelled!');
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <base-modal dialogWidth="700px">
        <template v-slot:dialog-body>
            <v-stepper v-model="e1">
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">Загальна інформація</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2">Завантаження фото</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <product-form :product="product"/>
                        <v-btn
                            text
                            class="mx-2"
                        >
                            Відмінити
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click="e1 = 2"
                            class="mx-2"
                        >
                            Зберегти
                        </v-btn>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <add-image-form/>
                        <v-row>
                            <v-btn
                                text
                                class="mx-2"
                                @click="e1 = 1"
                            >
                                Назад
                            </v-btn>
                            <v-btn
                                color="primary"
                                class="mx-2"
                                @click="e1 = 2"
                            >
                                Зберегти
                            </v-btn>
                        </v-row>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </template>
    </base-modal>
</template>

<script>
import BaseModal from "../../components/base/BaseModal";
import ProductForm from "../parts/ProductForm";
import AddImageForm from "../parts/AddImageForm";
import Product from "../../entities/Product";
import {newProductInitialForm} from "../../entities/initialForms/newProduct";

export default {
    name: "NewProductModal",
    components: {
        ProductForm,
        AddImageForm,
        BaseModal
    },
    data() {
        return {
            product: new Product(newProductInitialForm),
            e1: 1,
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
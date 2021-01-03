<template>
    <v-form
        ref="form"
        v-model="valid">
        <v-text-field
            label="Назва товару"
            v-model="productForm.title"
            :rules="rules.title"
        ></v-text-field>
        <v-textarea
            label="Опис товару"
            v-model="productForm.description"
            :rules="rules.description"
        ></v-textarea>
        <v-row>
            <v-col class="d-flex" cols="4">
                <v-select
                    :items="categories"
                    label="Категорія"
                    v-model="productForm.category"
                    :rules="rules.category"
                >
                  <template v-slot:append-item>
                    <v-list-item-content class="px-2">
                        <v-text-field
                            type="text"
                            label="Нова категорія"
                            v-model="customCategory"
                        />
                        <v-btn
                            :disabled="!customCategory"
                            color="primary"
                            @click="addCategory"
                        >
                          Додати
                        </v-btn>
                    </v-list-item-content>
                  </template>
                </v-select>

            </v-col>
            <v-col class="d-flex" cols="4">
                <v-text-field
                    type="number"
                    label="Ціна, грн"
                    v-model.number="productForm.price"
                    :rules="rules.price"
                ></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-text-field
                    type="number"
                    label="На складі, шт"
                    v-model.number="productForm.qty_available"
                    :rules="rules.qty_available"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-btn
                text
                class="mx-2"
                @click="closeDialog"
            >
                Відмінити
            </v-btn>
            <v-btn
                color="primary"
                @click="goToNextStep"
                class="mx-2"
            >
                Зберегти
            </v-btn>
        </v-row>
    </v-form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import {errorMessages} from "@/entities/errors/errorMessages";
import ProductFormData from "@/entities/ProductFormData";
import {cloneObject} from "@/utils/helpers";

export default {
    name: "ProductForm",
    props: {
        product: ProductFormData
    },
    data() {
        return {
            valid: true,
            rules: {
                title: [
                    value => !!value || errorMessages.requiredField,
                ],
                description: [
                    value => !!value || errorMessages.requiredField,
                ],
                category: [
                    value => !!value || errorMessages.requiredField,
                ],
                price: [
                    value => !!value || errorMessages.requiredField,
                    value => typeof(value) === 'number' || errorMessages.floatField,

                ],
                qty_available: [
                    value => !!value || errorMessages.requiredField,
                    value => Number.isInteger(value) || errorMessages.integerField,
                ],
            },
            customCategory: ''
        }
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
        ...mapMutations(['SET_NEW_PRODUCT', 'SET_DIALOG', 'SET_CATEGORIES']),
        goToNextStep() {
            this.$refs.form.validate();
            if (this.valid) {
                this.$emit('validationPass');
            }
        },
        closeDialog() {
            this.SET_DIALOG(false);
        },
        addCategory() {
            const cloneCategories = cloneObject(this.categories);
            cloneCategories.push(this.customCategory);
            this.SET_CATEGORIES(cloneCategories);

        }
    },
    created() {
        this.SET_NEW_PRODUCT(this.product);
    }
}
</script>

<style scoped>

</style>
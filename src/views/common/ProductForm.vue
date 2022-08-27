<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      label="Назва товару"
      v-model="form.title"
      :rules="rules.title"
    ></v-text-field>
    <v-textarea
      label="Опис товару"
      v-model="form.description"
      :rules="rules.description"
    ></v-textarea>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          :items="categories"
          label="Категорія"
          v-model="form.category"
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
      <v-col cols="6" md="4">
        <v-text-field
          type="number"
          label="Ціна, грн"
          v-model.number="form.price"
          :rules="rules.price"
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="4">
        <v-text-field
          type="number"
          label="На складі, шт"
          v-model.number="form.qty_available"
          :rules="rules.qty_available"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-btn text class="mx-2" :disabled="submitting" @click="closeDialog">
        Відмінити</v-btn
      >
      <v-btn
        color="primary"
        :disabled="submitting"
        @click="goToNextStep"
        class="mx-2"
      >
        Зберегти
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { errorMessages } from "@/translations/errors/errorMessages";
import { cloneObject } from "@/utils/helpers";
import { newProductInitialForm } from "@/entities/initialForms/newProduct";
import ProductFormData from "@/entities/ProductFormData";

export default {
  name: "ProductForm",
  props: {
    submitting: Boolean,
  },
  data() {
    return {
      valid: true,
      rules: {
        title: [(value) => !!value || errorMessages.requiredField],
        description: [(value) => !!value || errorMessages.requiredField],
        category: [(value) => !!value || errorMessages.requiredField],
        price: [
          (value) => !!value || errorMessages.requiredField,
          (value) => typeof value === "number" || errorMessages.floatField,
        ],
        qty_available: [
          (value) => !!value || errorMessages.requiredField,
          (value) => Number.isInteger(value) || errorMessages.integerField,
        ],
      },
      customCategory: "",
      form: new ProductFormData(newProductInitialForm),
    };
  },
  computed: {
    ...mapGetters("products", ["categories", "product"]),
  },
  methods: {
    ...mapMutations("products", ["SET_CATEGORIES"]),
    ...mapMutations("dialogs", ["SET_DIALOG"]),
    goToNextStep() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$emit("submit", this.form);
      }
    },
    closeDialog() {
      this.SET_DIALOG(false);
    },
    addCategory() {
      const cloneCategories = cloneObject(this.categories);
      cloneCategories.push(this.customCategory);
      this.SET_CATEGORIES(cloneCategories);
      this.customCategory = "";
    },
  },
  created() {
    console.log(this.product);
    //this.SET_NEW_PRODUCT(this.product);
  },
};
</script>

<style scoped></style>

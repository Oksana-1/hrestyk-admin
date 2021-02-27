<template>
  <v-card class="fill-height">
    <v-responsive min-width="100%" :aspect-ratio="1">
      <v-card-actions class="justify-center mb-3 flex-shrink-0 fill-height">
        <v-form v-if="editMode" ref="form" v-model="valid">
          <v-row class="align-center">
            <v-col cols="12">
              <v-file-input
                min-width="100%"
                label="Завантажити фото"
                prepend-icon="mdi-camera"
                accept="image/*"
                truncate-length="15"
                v-model="image.file"
                :rules="rules.file"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
              <v-card-title class="caption grey--text lighten-4 pl-0 pr-0">
                <v-text-field label="Alt" v-model="image.alt" />
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">
                      <v-checkbox v-model="image.is_main"></v-checkbox>
                    </div>
                  </template>
                  <span>Головна</span>
                </v-tooltip>
              </v-card-title>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-btn
                text
                class="mx-2"
                :disabled="busy"
                @click="cancel"> Назад </v-btn>
            <v-btn
                color="primary"
                :disabled="busy"
                @click="submit"> Зберегти </v-btn>
          </v-row>
        </v-form>
        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              depressed
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click.prevent="editMode = true"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Додати картинку</span>
        </v-tooltip>
      </v-card-actions>
    </v-responsive>
  </v-card>
</template>

<script>
import { errorMessages } from "@/entities/errors/errorMessages";
import ProductFormData, {
  ProductFormDataImage,
} from "@/entities/ProductFormData";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { newProductInitialImage } from "@/entities/initialForms/newProduct";

export default {
  name: "NewImage",
  data() {
    return {
      editMode: false,
      valid: false,
      rules: {
        file: [(value) => !!value || errorMessages.requiredField],
      },
      image: new ProductFormDataImage(newProductInitialImage),
      busy: false,
    };
  },
  computed: {
    ...mapGetters(["product", "newProduct"]),
    isNoneImageMain() {
      return (
        this.newProduct.images.filter((image) => image.is_main).length === 0
      );
    },
  },
  methods: {
    ...mapActions(["editProduct", "addImage"]),
    ...mapMutations(["SET_NEW_PRODUCT"]),
    submit: async function () {
      if (this.image.is_main && !this.isNoneImageMain) {
        this.$emit("showIsMainSnackbar");
        return;
      }
      this.validate();
      if (!this.valid) return;
      this.busy = true;
      try {
        const response = await this.addImage({
          productId: this.product.id,
          payload: this.image.getFormdata(),
        });
        this.SET_NEW_PRODUCT(new ProductFormData(response));
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
      }
      this.editMode = false;
      this.resetForm();
    },
    validate() {
      this.$refs.form.validate();
    },
    resetForm() {
      this.image = new ProductFormDataImage(newProductInitialImage);
    },
    cancel() {
      this.editMode = false;
      this.resetForm();
    },
  },
};
</script>

<style scoped></style>

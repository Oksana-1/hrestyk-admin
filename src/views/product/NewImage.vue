<template>
  <v-card class="fill-height">
    <v-responsive min-width="100%" :aspect-ratio="1">
      <v-card-actions
        class="justify-center mb-3 flex-shrink-0 fill-height pa-10"
      >
        <v-form v-if="editMode" ref="form" v-model="valid" class="flex-grow-1">
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
            <v-btn text class="mx-2" :disabled="busy" @click="cancel">
              Відмінити
            </v-btn>
            <v-btn color="primary" :disabled="busy" @click="submit">
              Зберегти
            </v-btn>
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
import { errorMessages } from "@/translations/errors/errorMessages";
import { ProductFormDataImage } from "@/entities/ProductFormData";
import { mapActions } from "vuex";
import { newProductInitialImage } from "@/entities/initialForms/newProduct";
import { errorHandleMixin } from "@/mixins/errorHandleMixin";

export default {
  name: "NewImage",
  mixins: [errorHandleMixin],
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
  methods: {
    ...mapActions("products", ["editProduct", "addImage"]),
    submit: async function () {
      this.validate();
      if (!this.valid) return;
      this.$emit("addImage", this.image);
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

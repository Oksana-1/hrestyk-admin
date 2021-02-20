<template>
  <v-card class="fill-height">
    <v-responsive min-width="100%" :aspect-ratio="editMode ? 0 : 1">
      <v-card-actions class="justify-center mb-3 flex-shrink-0 fill-height">
        <v-form v-if="editMode" ref="form" v-model="valid">
          <v-row class="align-center">
            <v-col cols="12">
              <v-responsive :aspect-ratio="1" class="align-end">
                <v-file-input
                  label="Завантажити фото"
                  prepend-icon=""
                  prepend-inner-icon="mdi-camera"
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
              </v-responsive>
            </v-col>
            <v-col cols="12">
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
            <v-btn text class="mx-2" @click="editMode=false"> Назад </v-btn>
            <v-btn color="primary"> Зберегти </v-btn>
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
import { ProductFormDataImage } from "@/entities/ProductFormData";

export default {
  name: "NewImage",
  data() {
    return {
      editMode: false,
      valid: true,
      rules: {
        file: [(value) => !!value || errorMessages.requiredField],
      },
      image: new ProductFormDataImage({
        alt: "",
        is_main: false,
        file: null,
      }),
    };
  },
  methods: {
    addPic() {
      alert("Add a pic please!");
    },
    deleteImage() {
      console.log("DELETE!");
    },
  },
};
</script>

<style scoped></style>

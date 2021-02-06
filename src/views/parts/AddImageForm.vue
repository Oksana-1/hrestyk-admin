<template>
  <v-form
      ref="form"
      v-model="valid">
    <v-row class="align-center">
      <v-col cols="12" sm="5">
        <v-file-input
            label="Завантажити фото"
            prepend-icon="mdi-camera"
            accept="image/*"
            truncate-length="15"
            v-model="image.file"
            :rules="rules.file"
        >
          <template v-slot:selection="{ text }">
            <v-chip
                small
                label
                color="primary"
            >
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </v-col>
      <v-col cols="12" sm="5">
        <v-text-field
            label="Alt для фото"
            v-model="image.alt"
        ></v-text-field>
      </v-col>
      <v-col
          cols="6"
          sm="1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div
                v-bind="attrs"
                v-on="on">
              <v-checkbox
                  v-model="image.is_main"
              ></v-checkbox>
            </div>
          </template>
          <span>Головна</span>
        </v-tooltip>
      </v-col>
      <v-col cols="6" sm="1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                text
                small
                color="transparent"
                v-bind="attrs"
                v-on="on"
                @click.prevent="deleteImage"
            >
              <v-icon color="grey" small>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Видалити поле</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import {ProductFormDataImage} from "@/entities/ProductFormData";
import {errorMessages} from "@/entities/errors/errorMessages";

export default {
  name: "AddImageForm",
  props: {
    image: ProductFormDataImage
  },
  data() {
    return {
      valid: true,
      rules: {
        file: [
          value => !!value || errorMessages.requiredField,
        ],
      }
    }
  },
  methods: {
    deleteImage() {
      this.$emit('deleteImage', this.$vnode.key);
    }
  }
}
</script>

<style scoped>

</style>
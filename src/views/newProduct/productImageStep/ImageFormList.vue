<template>
  <div>
    <add-image-form
      v-for="image in images"
      ref="addImageForm"
      :key="`image-${image.key}`"
      :image="image"
      @deleteImage="deleteImage($event)"
    />
    <v-row>
      <v-col cols="12">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              small
              dark
              depressed
              color="primary"
              class="mb-5"
              v-bind="attrs"
              v-on="on"
              @click.prevent="addFileInput"
              :disabled="addPhotoBtnDisabled"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Додати поле</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-btn text class="mx-2" :disabled="submitting" @click="$emit('step', 1)">
        Назад
      </v-btn>
      <v-btn
        color="primary"
        class="mx-2"
        :disabled="submitting"
        @click="submit"
      >
        Зберегти
      </v-btn>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import AddImageForm from "./AddImageForm";
import { ProductFormDataImage } from "@/entities/ProductFormData";
import { newProductInitialImage } from "@/entities/initialForms/newProduct";
import { snackbarMessages } from "@/translations/errors/errorMessages";

export default {
  name: "ImageFormList",
  components: {
    AddImageForm,
  },
  props: {
    submitting: Boolean,
  },
  data() {
    return {
      images: [],
      addPhotoBtnDisabled: false,
      newImageKey: 0,
      snackbar: false,
      text: snackbarMessages.mainImageErrorMessage,
      timeout: 2000,
    };
  },
  computed: {
    isOnlyOneOrNoneImageMain() {
      return this.images.filter((image) => image.is_main).length <= 1;
    },
  },
  methods: {
    addFileInput() {
      const newImage = new ProductFormDataImage(newProductInitialImage);
      this.newImageKey++;
      newImage.key = `image-${this.newImageKey}`;
      this.images.length < 50
        ? this.images.push(newImage)
        : (this.addPhotoBtnDisabled = true);
    },
    validate() {
      let isValid = true;
      if (this.$refs.addImageForm) {
        this.$refs.addImageForm.forEach((addImageFormComponent) => {
          addImageFormComponent.$refs.form.validate();
          if (!addImageFormComponent.valid) {
            isValid = false;
          }
        });
      }
      if (!this.isOnlyOneOrNoneImageMain) {
        this.snackbar = true;
        isValid = false;
        return;
      }
      return isValid;
    },
    submit() {
      const isValid = this.validate();
      if (isValid) {
        this.$emit("submit", this.images);
      }
    },
    deleteImage(nodeKey) {
      const index = this.images.findIndex((image) => image.id === nodeKey);
      this.images.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>

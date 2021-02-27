<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
      sm="6"
      v-for="image in productImages"
      :key="image.id"
    >
      <product-image
        :image="image"
        :disabled-button="editSubmitting"
        @setImageMain="setImageMain"
        @setImageAlt="setImageAlt"
        @deleteImage="showConfirmModal"
      />
    </v-col>
    <v-col cols="12" md="4" sm="6">
      <new-image @showIsMainSnackbar="snackbar = true" />
    </v-col>
    <info-modal
      v-if="modalToShow === 'mainImage'"
      :infoText="infoMessage"
      :disabled-button="editSubmitting"
      @ok="changeMainImage"
    />
    <confirm-modal
      v-if="modalToShow === 'confirm'"
      :confirmation-text="'Видалити цю картинку?'"
      :disabled-button="busy"
      @confirm="deleteProductImage"
      @cancel="closeModal"
    />
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import ProductImage from "@/views/product/ProductImage";
import NewImage from "@/views/product/NewImage";
import InfoModal from "@/views/modals/InfoModal";
import ConfirmModal from "@/views/modals/ConfirmModal";
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProductFormData from "@/entities/ProductFormData";

export default {
  name: "ProductImages",
  props: {
    productImages: Array,
    editSubmitting: Boolean,
  },
  components: {
    ProductImage,
    InfoModal,
    ConfirmModal,
    NewImage,
  },
  data() {
    return {
      modalToShow: null,
      activeImage: null,
      snackbar: false,
      text: "Тільки одна картинка може бути головною",
      timeout: 2000,
      busy: false,
    };
  },
  computed: {
    ...mapGetters(["newProduct"]),
    infoMessage() {
      if (!this.activeImage) return "";
      return this.activeImage.is_main
        ? "Зробити картинку не головною?"
        : "Зробити картинку головною?";
    },
    isNoneImageMain() {
      return (
        this.newProduct.images.filter((image) => image.is_main).length === 0
      );
    },
  },
  methods: {
    ...mapMutations(["SET_DIALOG", "SET_NEW_PRODUCT"]),
    ...mapActions(["deleteImage"]),
    setImageMain(imageId) {
      this.activeImage = this.newProduct.images.find(
        (image) => image.id === imageId
      );
      this.SET_DIALOG(true);
      this.modalToShow = "mainImage";
    },
    changeMainImage() {
      if (this.isNoneImageMain || this.activeImage.is_main) {
        this.activeImage.is_main = !this.activeImage.is_main;
        this.$emit("imageChanges");
        this.closeModal();
      } else {
        this.snackbar = true;
        this.closeModal();
      }
    },
    setImageAlt(imageId, imageAlt) {
      this.activeImage = this.newProduct.images.find(
        (image) => image.id === imageId
      );
      this.activeImage.alt = imageAlt;
      this.$emit("imageChanges");
      this.activeImage = null;
    },
    async deleteProductImage() {
      this.busy = true;
      try {
        const response = (await this.deleteImage(this.activeImage.id)).product;
        this.SET_NEW_PRODUCT(new ProductFormData(response));
        this.$emit("imageDeleted");
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
        this.closeModal();
      }
    },
    showConfirmModal(imageId) {
      this.activeImage = this.newProduct.images.find(
        (image) => image.id === imageId
      );
      this.SET_DIALOG(true);
      this.modalToShow = "confirm";
    },
    closeModal() {
      this.SET_DIALOG(false);
      this.modalToShow = null;
      this.activeImage = null;
    },
  },
};
</script>

<style scoped></style>

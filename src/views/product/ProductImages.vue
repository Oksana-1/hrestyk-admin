<template>
  <v-row>
    <v-col cols="4" v-for="image in productImages" :key="image.id">
      <product-image
        :image="image"
        @setImageMain="setImageMain"
        @setImageAlt="setImageAlt"
        @deleteImage="showConfirmModal"
      />
    </v-col>
    <v-col cols="4">
      <new-image />
    </v-col>
    <info-modal
      v-if="modalToShow === 'mainImage'"
      :infoText="infoMessage"
      @ok="changeMainImage"
    />
    <confirm-modal
        v-if="modalToShow === 'confirm'"
        :confirmation-text="'Видалити цю картинку?'"
        @confirm="deleteProductImage"
        @cancel="closeModal"
    />
  </v-row>
</template>

<script>
import ProductImage from "@/views/product/ProductImage";
import NewImage from "@/views/product/NewImage";
import InfoModal from "@/views/modals/InfoModal";
import ConfirmModal from "@/views/modals/ConfirmModal";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "ProductImages",
  props: {
    productImages: Array,
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
  },
  methods: {
    ...mapMutations(["SET_DIALOG"]),
    ...mapActions(['deleteImage']),
    setImageMain(imageId) {
      this.activeImage = this.newProduct.images.find(
        (image) => image.id === imageId
      );
      this.SET_DIALOG(true);
      this.modalToShow = "mainImage";
    },
    changeMainImage() {
      this.activeImage.is_main = !this.activeImage.is_main;
      this.$emit("imageChanges");
      this.closeModal();
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
      try {
        await this.deleteImage(this.activeImage.id);
        this.$emit('imageDeleted');
      } catch (e) {
        console.error(e);
      } finally {
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
    }
  },
};
</script>

<style scoped></style>
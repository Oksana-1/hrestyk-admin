<template>
  <v-row>
    <v-col cols="4" v-for="image in productImages" :key="image.id">
      <product-image :image="image" @setImageMain="setImageMain" />
    </v-col>
    <v-col cols="4">
      <new-image/>
    </v-col>
    <info-modal
      v-if="modalToShow === 'mainImage'"
      :infoText="infoMessage"
      @ok="changeMainImage"
    />
  </v-row>
</template>

<script>
import ProductImage from "@/views/product/ProductImage";
import NewImage from "@/views/product/NewImage";
import InfoModal from "@/views/modals/InfoModal";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "ProductImages",
  props: {
    productImages: Array,
  },
  components: {
    ProductImage,
    InfoModal,
    NewImage
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
      if (!this.activeImage) return '';
      return this.activeImage.is_main
        ? "Зробити картинку не головною?"
        : "Зробити картинку головною?";
    },
  },
  methods: {
    ...mapMutations(["SET_DIALOG"]),
    setImageMain(imageId) {
      this.activeImage = this.newProduct.images.find(
        (image) => image.id === imageId
      );
      this.SET_DIALOG(true);
      this.modalToShow = "mainImage";
    },
    changeMainImage() {
      this.activeImage.is_main = !this.activeImage.is_main;
      this.SET_DIALOG(false);
      this.modalToShow = null;
      this.activeImage = null;
      this.$emit('imageChanges')
    },
  },
};
</script>

<style scoped></style>

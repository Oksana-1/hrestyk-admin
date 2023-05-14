<template>
  <v-row>
    <v-col cols="12" md="4" sm="6" v-for="image in images" :key="image.id">
      <product-image
        :image="image"
        :disabled-button="editing"
        @setImageMain="setImageMain"
        @setImageAlt="setImageAlt"
        @deleteImage="showConfirmModal"
      />
    </v-col>
    <v-col cols="12" md="4" sm="6">
      <new-image @addImage="addImage" />
    </v-col>
    <confirm-modal
      v-if="modalToShow === 'mainImage'"
      :confirmation-text="infoMessage"
      :disabled-button="editing"
      @confirm="changeMainImage"
      @cancel="closeModal"
    />
    <confirm-modal
      v-if="modalToShow === 'confirm'"
      :confirmation-text="'Видалити цю картинку?'"
      :disabled-button="busy"
      @confirm="deleteImage"
      @cancel="closeModal"
    />
    <v-snackbar v-model="snackbar.onlyOneImageCanBeMain" :timeout="timeout">
      {{ snackbarText.onlyOneImageCanBeMain }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar.onlyOneImageCanBeMain = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar.nothingChanges" :timeout="timeout">
      {{ snackbarText.nothingChanges }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar.nothingChanges = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import ProductImage from "@/views/product/ProductImage";
import NewImage from "@/views/product/NewImage";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { mapGetters, mapMutations } from "vuex";
import { errorHandleMixin } from "@/mixins/errorHandleMixin";
import { modalsText, snackbarText } from "@/translations/pages/singleProduct";
import { cloneObject } from "@/utils/helpers";
import { Image } from "@/entities/Product";

export default {
  name: "ProductImages",
  components: {
    ProductImage,
    ConfirmModal,
    NewImage,
  },
  mixins: [errorHandleMixin],
  data() {
    return {
      images: [],
      modalToShow: null,
      mainImage: null,
      snackbar: {
        nothingChanges: false,
        onlyOneImageCanBeMain: false,
      },
      snackbarText,
      timeout: 2000,
      busy: false,
    };
  },
  computed: {
    ...mapGetters("products", ["product", "editing"]),
    infoMessage() {
      if (!this.mainImage) return "";
      return this.mainImage.is_main
        ? modalsText.setImageNotMain
        : modalsText.setImageMain;
    },
    isNoneImageMain() {
      return this.product.images.filter((image) => image.is_main).length === 0;
    },
  },
  methods: {
    ...mapMutations("dialogs", ["SET_DIALOG"]),
    setImageMain(imageId) {
      this.mainImage = this.images.find((image) => image.id === imageId);
      this.SET_DIALOG(true);
      this.modalToShow = "mainImage";
    },
    changeMainImage() {
      if (this.isNoneImageMain || this.mainImage.is_main) {
        this.mainImage.is_main = !this.mainImage.is_main;
        this.$emit("imageChanges", this.images);
        this.closeModal();
      } else {
        this.snackbar.onlyOneImageCanBeMain = true;
        this.closeModal();
      }
    },
    setImageAlt(imageId, imageAlt) {
      this.mainImage = this.images.find((image) => image.id === imageId);
      this.mainImage.alt = imageAlt;
      const isImagesChanged = this.isProductImagesChanged();
      if (!isImagesChanged) {
        this.snackbar.nothingChanges = true;
      } else {
        this.$emit("imageChanges", this.images);
        this.mainImage = null;
      }
    },
    addImage(image) {
      if (image.is_main && !this.isNoneImageMain) {
        this.snackbar.onlyOneImageCanBeMain = true;
      } else {
        this.$emit("addImage", image);
      }
    },
    deleteImage() {
      this.$emit("deleteProductImage", this.mainImage.id);
      this.closeModal();
    },
    showConfirmModal(imageId) {
      this.mainImage = this.images.find((image) => image.id === imageId);
      this.SET_DIALOG(true);
      this.modalToShow = "confirm";
    },
    closeModal() {
      this.SET_DIALOG(false);
      this.modalToShow = null;
      this.mainImage = null;
    },
    init() {
      this.images = this.product
        ? [...this.product.images.map((image) => new Image(cloneObject(image)))]
        : [];
    },
    isProductImagesChanged() {
      if (this.product.images.length !== this.images.length) {
        return true;
      } else {
        // comparing images props
        return (
          this.images.filter((image) => {
            const comparingItem = this.product.images.find(
              (item) => item.id === image.id
            );
            if (!comparingItem) return true;
            return (
              image.alt !== comparingItem.alt ||
              image.is_main !== comparingItem.is_main
            );
          }).length > 0
        );
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped></style>

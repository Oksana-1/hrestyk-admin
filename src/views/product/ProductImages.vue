<template>
  <v-row>
    <v-col cols="4" v-for="image in productImages" :key="image.id">
      <product-image :image="image" @makeImageMain="makeImageMain" />
    </v-col>
    <v-col cols="4" class="d-flex justify-center align-center">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            depressed
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click.prevent="addPic"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Додати картинку</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import ProductImage from "@/views/product/ProductImage";
import { mapMutations } from "vuex";
export default {
  name: "ProductImages",
  props: {
    productImages: Array,
  },
  components: {
    ProductImage,
  },
  methods: {
    ...mapMutations(["SET_DIALOG"]),
    addPic() {
      alert("Add a pic please!");
    },
    makeImageMain() {
      this.SET_DIALOG(true);
      this.modalToShow = "mainImage";
    },
  },
};
</script>

<style scoped></style>

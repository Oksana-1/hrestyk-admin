<template>
  <v-card class="mb-3" min-height="100%">
    <v-hover v-slot:default="{ hover }">
      <v-img :src="image.url" aspect-ratio="1">
        <v-fade-transition>
          <div
            v-if="hover"
            class="d-flex transition-ease-in-out display-3"
            style="height: 100%"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  dark
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  class="ma-auto"
                  @click.prevent="$emit('deleteImage', image.id)"
                >
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
              </template>
              <span>Видалити</span>
            </v-tooltip>
          </div>
        </v-fade-transition>
      </v-img>
    </v-hover>
    <v-card-actions>
      <v-card-title class="caption grey--text lighten-4">
        <v-text-field label="Alt" v-model="alt" />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click.prevent="$emit('setImageAlt', image.id, alt)"
            >
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </template>
          <span>Зберегти</span>
        </v-tooltip>
      </v-card-title>
      <v-spacer />

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            :color="image.is_main ? 'primary' : ''"
            v-bind="attrs"
            v-on="on"
            @click.prevent="$emit('setImageMain', image.id)"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </template>
        <span>{{ infoMessage }}</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Image } from "@/entities/Product";

export default {
  name: "ProductImage",
  props: {
    image: Image,
  },
  data() {
    return {
      alt: this.image.alt,
    };
  },
  computed: {
    infoMessage() {
      return this.image.is_main ? "Зробити не головною" : "Зробити головною";
    },
  },
};
</script>

<style scoped></style>

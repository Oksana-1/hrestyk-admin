<template>
  <base-mini-card page-link="/main-slider">
    <template v-slot:heading>
      <div class="d-flex justify-center">
        <v-icon color="#fff" class="mr-2">mdi-folder-multiple-image</v-icon>
        <div class="font-weight-light">Слайдер</div>
      </div>
    </template>
    <template v-slot:card-content>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-avatar size="80" color="grey lighten-3" class="mx-8">
            <v-icon>mdi-timer-sand-empty</v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="12" class="text-center">
          <div class="card-title font-weight-light">
            Розділ в розробці...
          </div>
        </v-col>
      </v-row>
    </template>
  </base-mini-card>
</template>

<script>
import BaseMiniCard from "@/components/base/BaseMiniCard";
export default {
  name: "MainSliderCard",
  components: {
    BaseMiniCard,
  },
};
</script>

<style scoped></style>

<template>
  <base-mini-card page-link="/main-slider">
    <template v-slot:heading>
      <div class="d-flex justify-center">
        <v-icon color="#fff" class="mr-2"
        >mdi-folder-multiple-image</v-icon
        >
        <div class="font-weight-light">Слайдер</div>
      </div>
    </template>
    <template v-slot:card-content>
      <div class="card-title font-weight-light pt-6">
        Розділ в розробці...
      </div>
    </template>
  </base-mini-card>
</template>

<script>
import BaseMiniCard from "@/components/base/BaseMiniCard";
export default {
  name: "MainSliderCard",
  components: {
    BaseMiniCard
  }
}
</script>

<style scoped>

</style>

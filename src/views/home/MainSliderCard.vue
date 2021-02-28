<template>
  <base-card>
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
  </base-card>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
export default {
  name: "MainSliderCard",
  components: {
    BaseCard
  }
}
</script>

<style scoped>

</style>
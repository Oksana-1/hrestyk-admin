<template>
  <v-container fluid>
      <v-row>
        <v-col cols="12">
          <BaseCard icon-name="mdi-folder-multiple-image">
            <template v-slot:card-content>
              <v-row class="pa-6">
                Тут буде сторінка зі слайдами головного слайдера
              </v-row>
            </template>
          </BaseCard>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import BaseCard from "@/components/base/BaseCard";
export default {
  name: "MainSliderPage",
  components: {
    BaseCard,
  },
}
</script>

<style scoped>

</style>

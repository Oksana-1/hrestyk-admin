<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <BaseCard header-type="avatar" icon-name="mdi-cog">
          <template v-slot:card-content>
            <v-row class="pa-6">
              Тут буде сторінка з налаштуваннями (текстами email-ів тощо)
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
  name: "Settings",
  components: {
    BaseCard
  }
}
</script>

<style scoped>

</style>
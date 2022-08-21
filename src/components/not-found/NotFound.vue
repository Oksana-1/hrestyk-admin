<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <v-avatar size="80" color="grey lighten-3" class="mx-8">
        <v-icon>mdi-timer-sand-empty</v-icon>
      </v-avatar>
    </v-col>
    <v-col cols="12" class="text-center" v-html="message" />
  </v-row>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    message: String,
  },
};
</script>

<style scoped></style>

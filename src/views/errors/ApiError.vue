<template>
  <v-row>
    <v-col cols="12">
      <v-alert dense dismissible border="left" type="error"
        >Наш сервер, напевне, заснув. Не будіть його!</v-alert
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ApiError",
};
</script>

<style scoped></style>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-alert colored-border border="left" type="error"
          >Наш сервер, напевне, заснув. Не будіть його!</v-alert
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ApiError",
};
</script>

<style scoped></style>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-alert dense outlined text type="error">{{ message }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ApiError",
  props: {
    message: {
      type: String,
      default: () => "Щось пішло не так, спробуйте пізніше!",
    },
  },
};
</script>

<style scoped></style>

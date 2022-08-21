<template>
  <v-card class="pa-3">
    <router-link :to="pageLink">
      <v-sheet
        color="primary"
        elevation="6"
        class="rounded pa-6 text-center text-h6 mt-n6"
        dark
      >
        <slot v-if="$slots.heading" name="heading" />
      </v-sheet>
    </router-link>
    <slot name="card-content" />
    <template v-if="$slots.actions">
      <v-card-actions class="pb-0">
        <slot name="actions" />
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "BaseMiniCard",
  props: {
    pageLink: {
      type: String,
      default: "/"
    },
    iconName: String,
  },
};
</script>

<style scoped></style>

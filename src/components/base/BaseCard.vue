<template>
  <v-card class="pa-3">
    <v-avatar size="60" color="primary" class="rounded-lg mt-n8 elevation-1">
      <v-icon color="#fff">{{ iconName }}</v-icon>
    </v-avatar>
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
  name: "BaseCard",
  props: {
    iconName: String,
  },
};
</script>

<style scoped></style>

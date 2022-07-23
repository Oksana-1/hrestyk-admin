<template>
  <v-card class="pa-3">
    <v-avatar
        v-if="headerType==='avatar'"
        size="60"
        color="primary"
        class="rounded-lg mt-n8 elevation-1"
    >
      <v-icon color="#fff">{{ iconName }}</v-icon>
    </v-avatar>
    <v-sheet
        v-else
        color="primary"
        elevation="6"
        class="rounded pa-6 text-center text-h6 mt-n6"
        dark
    >
      <slot
          v-if="$slots.heading"
          name="heading"
      />
    </v-sheet>
    <slot
        name="card-content"
    />
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
    headerType: String,
    iconName: String
  }
}
</script>

<style scoped>

</style>

<template>
  <base-modal dialogWidth="300px">
    <template v-slot:dialog-body>
      <div class="pa-3 text-center">{{ infoText }}</div>
    </template>
    <template v-slot:dialog-footer>
      <div class="pa-3">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
                color="primary"
                @click="$emit('ok')"
                class="mx-2"
            >
              Добре
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from "@/components/base/BaseModal";

export default {
  name: "InfoModal",
  props: {
    infoText: String
  },
  components: {
    BaseModal
  }
}
</script>

<style scoped>

</style>
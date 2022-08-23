<template>
  <base-modal dialogWidth="300px">
    <template v-slot:dialog-body>
      <div class="pt-5 pb-3 text-center">{{ confirmationText }}</div>
    </template>
    <template v-slot:dialog-footer>
      <div class="pa-3">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
                color="primary"
                @click="$emit('confirm')"
                class="mx-2"
                :disabled="disabledButton"
            >
              Добре
            </v-btn>
            <v-btn
                text
                class="mx-2"
                @click="$emit('cancel')"
                :disabled="disabledButton"
            >
              Нє, не треба
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from "../base/BaseModal";

export default {
  name: "ConfirmModal",
  components: {
    BaseModal
  },
  props: {
    confirmationText: String,
    disabledButton: Boolean,
  }
}
</script>

<style scoped>

</style>

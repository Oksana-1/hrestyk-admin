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
                            text
                            class="mx-2"
                            @click="$emit('cancel')"
                        >
                            Відмінити
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click="$emit('confirm')"
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
import BaseModal from "../../components/base/BaseModal";
export default {
name: "ConfirmModal",
    components: {
        BaseModal
    },
    props: {
        confirmationText: String
    }
}
</script>

<style scoped>

</style>
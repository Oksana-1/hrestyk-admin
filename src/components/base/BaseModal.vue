<template>
    <v-dialog
        v-model="baseDialog"
        :width="dialogWidth"
    >
        <v-card class="py-5">
            <slot name="dialog-body"/>
            <slot name="dialog-footer">
                <v-card-actions class="d-flex justify-center">
                    <v-btn
                        color="primary"
                        @click="onSuccess"
                    >
                        Ок
                    </v-btn>
                </v-card-actions>
            </slot>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
    name: "BaseModal",
    props: {
        dialogWidth: {
            type: String,
            default: '500px'
        }
    },
    computed: {
        ...mapGetters(['dialog']),
        baseDialog: {
            get () {
                return this.dialog;
            },
            set (val) {
                this.SET_DIALOG(val);
            },
        },
    },
    methods: {
        ...mapMutations(['SET_DIALOG']),
        onSuccess() {
            this.SET_DIALOG(false);
        }
    }
}
</script>

<style scoped>

</style>
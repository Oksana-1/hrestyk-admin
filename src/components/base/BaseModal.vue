<template>
    <v-dialog
        v-model="baseDialog"
        :width="dialogWidth"
    >
        <v-card>
            <slot name="dialog-header"/>
            <slot name="dialog-body"/>
            <slot name="dialog-footer"/>
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
    }
}
</script>

<style scoped>

</style>
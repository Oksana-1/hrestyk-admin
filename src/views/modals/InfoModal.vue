<template>
    <base-modal dialogWidth="300px">
        <template v-slot:dialog-body>
            <div class="pa-3 text-center">{{ infoText }}</div>
        </template>
        <template v-slot:dialog-footer/>
    </base-modal>
</template>

<script>
import BaseModal from "../../components/base/BaseModal";

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
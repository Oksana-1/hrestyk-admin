<template>
    <v-app-bar
        app
        color="primary"
        dark
        :clipped-left="true"
    >
        <v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>
        <v-toolbar-title>Хрестик</v-toolbar-title>
    </v-app-bar>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
    name: "CoreBar",
    computed: {
        ...mapGetters(['drawer']),
    },
    methods: {
        ...mapMutations({
            setDrawer: 'SET_DRAWER',
        }),
    }
}
</script>

<style scoped>

</style>
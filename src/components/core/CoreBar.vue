<template>
    <v-app-bar
        absolute
        app
        color="transparent"
        flat
        height="75"
    >

        <v-btn
            class="mr-3"
            elevation="1"
            fab
            small
            dark
            @click="setDrawer(!drawer)"
            color="brown lighten-2"
        >
            <v-icon>
                mdi-dots-vertical
            </v-icon>
        </v-btn>
        <v-toolbar-title
            class="hidden-sm-and-down font-weight-light"
            v-text="$route.name"/>
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
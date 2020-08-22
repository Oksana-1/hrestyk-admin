<template>
    <v-navigation-drawer
        v-model="drawer"
        :clipped="true"
        app
    >
        <v-list dense>
            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-storefront</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Товари</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-folder-multiple-image</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Слайдер</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-cart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Замовлення</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link>
                <v-list-item-action>
                    <v-icon>mdi-cog</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Налаштування</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "CoreDrawer",
    computed: {
        drawer: {
            get () {
                return this.$store.getters.drawer
            },
            set (val) {
                this.$store.commit('SET_DRAWER', val)
            },
        },
    }
}
</script>

<style scoped>

</style>
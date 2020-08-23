<template>
    <v-navigation-drawer
        v-model="drawer"
        src="../../assets/images/hrestyk.jpg"
        dark
        app
    >
        <template v-slot:img="props">
            <v-img
                gradient="to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)"
                v-bind="props"
            />
        </template>

        <v-divider class="mb-1" />

        <v-list
            dense
            nav
        >
            <v-list-item>
                <v-list-item-avatar
                    class="align-self-center"
                    color="#fff"
                    contain
                >
                    <v-img
                        src="../../assets/images/logo.png"
                        max-height="30"
                    />
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title
                        class="h1"
                        v-text="'Хрестик'"
                    />
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider class="mb-2" />


        <v-list expand nav>
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
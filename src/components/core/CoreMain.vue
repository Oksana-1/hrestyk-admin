<template>
    <v-main>
        <v-container
            class="fill-height"
            fluid
        >
            <v-row
                align="center"
                justify="center"
            >
                <v-col class="text-center">
                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                :href="'#'"
                                icon
                                large
                                target="_blank"
                                v-on="on"
                            >
                                <v-icon large>mdi-code-tags</v-icon>
                            </v-btn>
                        </template>
                        <span>Source</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
export default {
name: "CoreMain"
}
</script>

<style scoped>

</style>
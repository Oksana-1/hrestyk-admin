<template>
        <v-card
            class="mb-3">
            <v-hover v-slot:default="{ hover }">
            <v-img
                :src="image.url"
                aspect-ratio="1"
            >
            <v-fade-transition>
                <div
                    v-if="hover"
                    class="
                    d-flex
                    transition-ease-in-out
                    display-3"
                    style="height: 100%;"
                >
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                fab
                                dark
                                color="primary"
                                v-bind="attrs"
                                v-on="on"
                                class="ma-auto"
                                @click.prevent="deletePic"
                            >
                                <v-icon dark>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <span>Видалити</span>
                    </v-tooltip>
                </div>
            </v-fade-transition>
            </v-img>
            </v-hover>
            <v-card-actions>
                <v-card-title class="caption grey--text lighten-4">
                    <v-text-field
                        label="Alt"
                        :value="image.alt"
                    ></v-text-field>
                </v-card-title>
                <v-spacer/>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon :color="image.is_main ? 'primary': ''"
                            v-bind="attrs"
                            v-on="on"
                            @click.prevent="makeItMain"
                        >
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </template>
                    <span>Зробити головною</span>
                </v-tooltip>
            </v-card-actions>
        </v-card>
</template>

<script>
export default {
    name: "ProductImage",
    props: {
        image: Object
    },
    methods: {
        deletePic() {
            alert("Are you sure?");
        },
        makeItMain() {
            this.$emit('makeImageMain');
        }
    }
}
</script>

<style scoped>

</style>
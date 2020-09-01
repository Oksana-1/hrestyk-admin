<template>
    <v-row>
        <v-col cols="12" sm="6">
            <v-file-input
                label="Завантажити фото"
                prepend-icon="mdi-camera"
            ></v-file-input>
        </v-col>
        <v-col cols="12" sm="5">
            <v-text-field
                label="Alt для фото"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="1">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <div
                    v-bind="attrs"
                    v-on="on">
                        <v-checkbox
                            v-model="checkbox"
                        ></v-checkbox>
                    </div>
                </template>
                <span>Головна</span>
            </v-tooltip>
        </v-col>
        <v-col cols="12">
            <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        fab
                        small
                        dark
                        depressed
                        color="primary"
                        class="mb-5"
                        v-bind="attrs"
                        v-on="on"
                        @click.prevent="addFileInput"
                    >
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span>Додати поле</span>
            </v-tooltip>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "AddImageForm",
    data() {
        return {
            checkbox: false
        }
    },
    methods: {
        addFileInput() {
            console.log('addFileInput');
        }
    }
}
</script>

<style scoped>

</style>
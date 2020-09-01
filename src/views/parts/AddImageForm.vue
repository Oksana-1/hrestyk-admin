<template>
    <v-row class="align-center">
        <v-col cols="12" sm="5">
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
        <v-col
            cols="6"
            sm="1">
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
        <v-col cols="6" sm="1">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        text
                        small
                        color="transparent"
                        v-bind="attrs"
                        v-on="on"
                        @click.prevent="deleteImage"
                    >
                        <v-icon color="grey" small>mdi-delete</v-icon>
                    </v-btn>
                </template>
                <span>Видалити поле</span>
            </v-tooltip>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "AddImageForm",
    props: {
        image: Object
    },
    data() {
        return {
            checkbox: false
        }
    },
    methods: {
        deleteImage() {
            this.$emit('deleteImage', this.$vnode.key);
        }
    }
}
</script>

<style scoped>

</style>
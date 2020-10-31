<template>
    <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
                color="secondary"
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item
                v-for="(item, i) in items"
                :key="`baseMenuItem-${_uid}-${i}`"
                class="d-flex align-center"
                @click="$emit(item.methodToEmit)"
            >
                <v-icon class="pr-2">{{ item.icon }}</v-icon>
                <v-list-item-title class="caption text-uppercase">{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: "BaseMenu",
    data() {
        return {
            items: [
                {title: 'Зберегти', icon: 'mdi-content-save', methodToEmit: 'save'},
                {title: 'Видалити', icon: 'mdi-delete',  methodToEmit: 'delete'}
            ]
        }
    },
}
</script>

<style scoped>

</style>
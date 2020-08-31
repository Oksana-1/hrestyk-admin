<template>
    <v-card class="pa-3">
        <v-avatar
            v-if="headerType==='avatar'"
            size="60"
            color="primary"
            class="rounded-lg mt-n8 elevation-1"
        >
            <v-icon color="#fff">{{iconName}}</v-icon>
        </v-avatar>
        <slot name="card-content"/>
    </v-card>
</template>

<script>

export default {
    name: "BaseCard",
    props: {
        headerType: String,
        iconName: String
    }
}
</script>

<style scoped>

</style>
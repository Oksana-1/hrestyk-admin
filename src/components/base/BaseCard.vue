<template>
    <v-card class="pa-3">
        <v-avatar
            v-if="headerType==='avatar'"
            size="60"
            color="primary"
            class="hr-card-header elevation-5"
        >
            <v-icon color="#fff">{{iconName}}</v-icon>
        </v-avatar>
        <v-card-title
            v-if="headerType==='title'"
            class="primary white--text hr-card-header elevation-5" >
            <slot name="card-header"/>
        </v-card-title>
        <slot name="card-content"/>
    </v-card>
</template>

<script>
import '../../scss/_baseCard.scss';
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
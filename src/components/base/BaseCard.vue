<template>
    <v-card class="pa-3">
        <div class="hr-card-header">
            <v-avatar
                size="60"
                color="primary"
                class="hr-card-header_icon elevation-5"
            >
                <v-icon color="#fff">{{iconName}}</v-icon>
            </v-avatar>
            <slot name="card-content"/>
        </div>
    </v-card>
</template>

<script>
import '../../scss/_baseCard.scss';
export default {
    name: "BaseCard",
    props: {
        iconName: String
    }
}
</script>

<style scoped>

</style>
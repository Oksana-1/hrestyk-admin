<template>
    <div>Product page</div>
</template>

<script>
import {apiResponseProducts} from "../../api";

export default {
    name: "PageProducts",
    created() {
        console.log(apiResponseProducts);
    }
}
</script>

<style scoped>

</style>
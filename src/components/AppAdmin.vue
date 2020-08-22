
<template>
    <v-app>
        <core-drawer/>
        <core-bar/>
        <core-main/>
        <core-footer/>
    </v-app>
</template>

<script>
import CoreBar from "./core/CoreBar";
import CoreDrawer from "./core/CoreDrawer";
import CoreMain from "./core/CoreMain";
import CoreFooter from "./core/CoreFooter";

export default {
    name: "AppAdmin",
    components: {
        CoreMain,
        CoreDrawer,
        CoreBar,
        CoreFooter
    },
}
</script>
<template>
    <v-app>
        <core-drawer/>
            <v-main class="grey lighten-4">
                <router-view/>
            </v-main>
        <core-bar/>
        <core-footer/>
    </v-app>
</template>

<script>

import CoreBar from "./components/core/CoreBar";
import CoreDrawer from "./components/core/CoreDrawer";
import CoreFooter from "./components/core/CoreFooter";

export default {
  name: 'App',

  components: {
      CoreBar,
      CoreDrawer,
      CoreFooter
  }
};
</script>

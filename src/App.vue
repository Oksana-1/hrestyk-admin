<template>
  <v-app>
    <core-drawer/>
    <v-main class="grey lighten-4">
      <router-view/>
    </v-main>
    <core-bar/>
  </v-app>
</template>

<script>

import CoreBar from "./components/core/CoreBar";
import CoreDrawer from "./components/core/CoreDrawer";

export default {
  name: 'App',

  components: {
    CoreBar,
    CoreDrawer
  }
};
</script>

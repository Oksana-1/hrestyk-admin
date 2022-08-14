<template>
  <v-app>
    <core-drawer v-if="isUserAuthorised" />
    <v-main class="grey lighten-4">
      <router-view />
    </v-main>
    <core-bar v-if="isUserAuthorised" />
  </v-app>
</template>

<script>
import CoreBar from "./components/core/CoreBar";
import CoreDrawer from "./components/core/CoreDrawer";

export default {
  name: "App",
  components: {
    CoreBar,
    CoreDrawer,
  },
  data() {
    return {
      isUserAuthorised: this.$route.path !== "/login" ,
    };
  },
  watch: {
    $route(to) {
      this.isUserAuthorised = to.path !== "/login"
    },
  },
};
</script>

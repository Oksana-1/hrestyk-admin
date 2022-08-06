<template>
  <v-app>
    <core-drawer v-if="isUserAuthorised" />
    <v-main class="grey lighten-4">
      <router-view @loginSuccess="onLogin" />
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
      isUserAuthorised: false,
    };
  },
  methods: {
    onLogin() {
      this.isUserAuthorised = true;
      this.$router.push("/");
    },
  },
};
</script>

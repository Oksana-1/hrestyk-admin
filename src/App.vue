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
import JwtManager from "@/api/jwt/JwtManager";

export default {
  name: "App",
  components: {
    CoreBar,
    CoreDrawer,
  },
  data() {
    return {
      isUserAuthorised: false,
      jwtManager: new JwtManager(),
    };
  },
  methods: {
    checkHasUserAccess() {
      this.isUserAuthorised = this.jwtManager.hasUserAccess;
    },
    onLogin() {
      this.checkHasUserAccess();
      if (this.isUserAuthorised) {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.checkHasUserAccess();
  }
};
</script>

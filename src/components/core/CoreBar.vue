<template>
  <v-app-bar absolute app color="transparent" flat height="75">
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
      color="white"
    >
      <v-icon> mdi-dots-vertical </v-icon>
    </v-btn>
    <v-toolbar-title
      class="font-weight-light"
      v-text="$route.name"
    />
    <v-spacer></v-spacer>
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import JwtManager from "@/api/jwt/JwtManager";

export default {
  name: "CoreBar",
  data() {
    return {
      jwtManager: new JwtManager(),
    }
  },
  computed: {
    ...mapGetters("dialogs", ["drawer"]),
  },
  methods: {
    ...mapMutations("dialogs", {
      setDrawer: "SET_DRAWER",
    }),
    logout() {
      this.jwtManager.deleteUserAccess();
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped></style>

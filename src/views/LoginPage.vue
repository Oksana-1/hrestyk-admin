<template>
  <v-row class="fill-height">
    <v-card
      elevation="2"
      class="mx-auto my-auto px-4 py-6"
      width="500"
    >
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.username"
          :rules="rules.username"
          label="Login"
          color="info"
          required
        />
        <v-text-field
          v-model="form.password"
          :rules="rules.password"
          label="Password"
          color="info"
          required
        />
        <v-row>
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mx-auto"
            @click="login"
          >
            Login
          </v-btn>
        </v-row>
      </v-form>
      <api-error v-if="fatalErrorMessage" :message="fatalErrorMessage"/>
    </v-card>
  </v-row>
</template>

<script>
import { signIn } from "@/entities/initialForms/signIn";
import JwtApi from "@/api/jwt/JwtApi";
import ApiError from "@/views/errors/ApiError";
export default {
  name: "LoginPage",
  components: {
    ApiError
  },
  data: () => ({
    valid: true,
    form: signIn,
    rules: {
      username: [(v) => !!v || "Login is required"],
      password: [(v) => !!v || "Password is required"],
    },
    jwtApi: new JwtApi(),
    fatalErrorMessage: "",
  }),
  methods: {
    async login() {
      this.validate();
      if (this.valid) {
        await this.signIn();
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    async signIn() {
      try {
        await this.jwtApi.signIn(this.form);
      } catch (e) {
        this.fatalErrorMessage = e.message;
        console.error(e);
      } finally {
        this.$emit("loginSuccess");
      }
    },
  },
};
</script>

<style scoped></style>

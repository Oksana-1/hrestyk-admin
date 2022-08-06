<template>
  <v-row class="fill-height">
    <v-card
      elevation="2"
      class="mx-auto my-auto px-4 py-6"
      width="500"
      height="225"
    >
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="login"
          :rules="rules.login"
          label="Login"
          color="info"
          required
        />
        <v-text-field
          v-model="password"
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
            @click="validate"
          >
            Login
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "LoginPage",
  data: () => ({
    valid: true,
    login: "",
    password: "",
    rules: {
      login: [(v) => !!v || "Login is required"],
      password: [(v) => !!v || "Password is required"],
    },
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) this.$emit("loginSuccess");
    },
  },
};
</script>

<style scoped></style>

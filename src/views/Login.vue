<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <v-img
          class="mx-auto"
          style="filter: brightness(0);"
          src="@/assets/logo-dark.png"
          width="100"
        ></v-img>
      </div>
    </div>

    <hr />

    <div class="row">
      <div class="col text-center">
        <p class="h1">HackVSIT 3.0 Judging App</p>
        <p class="h6">Please Sign In to your Judging App!</p>
      </div>
    </div>

    <v-form @submit.prevent="login">
      <v-text-field
        v-model="username"
        color="primary"
        outlined
        label="username"
      ></v-text-field>
      <v-text-field
        type="password"
        v-model="password"
        color="primary"
        outlined
        label="password"
      ></v-text-field>
      <v-btn type="submit" block color="primary">Login</v-btn>
    </v-form>
  </div>
</template>

<script>
import urls from "@/shared/urls";
import { saveAuthInfo } from "@/shared/helpers";

export default {
  name: "Login",

  data: () => ({
    username: null,
    password: null
  }),

  methods: {
    login() {
      this.$http
        .post(urls.login, {
          username: this.username,
          password: this.password
        })
        .then(response => {
          saveAuthInfo(response.data);
          this.$toastr.s("Logged In Successfully!");
          this.$router.push("/home");
        })
        .catch(() => {
          this.$toastr.e("Either username or password is wrong!");
        });
    }
  }
};
</script>

<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>HackVSIT 3.0 Judgment Portal</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn outlined @click="logout">
        <v-icon left>last_page</v-icon>
        Logout
      </v-btn>
    </v-toolbar>
    <div class="container my-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { clearAuthInfo } from "@/shared/helpers";

export default {
  name: "Dashboard",

  methods: {
    logout() {
      clearAuthInfo();
      this.$toastr.s("Logged Out Successfully!");
      this.$router.push("/");
    }
  }
};
</script>

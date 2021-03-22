<template>
  <div class="home">
    <div class="hero">
      <img class="hero-img" src="../assets/hero.jpg" />
      <div class="hero-content">
        <h1>Manage your collaborative projects</h1>
        <h2>
          A solution for stucturing and online co-ordination for oganizations
          and individuals alike
        </h2>
        <button class="guest-btn" @click="enterAsGuest">Try it now!</button>
      </div>
    </div>

    <div class="about"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { userService } from "../services/NEW-user.service.js";
export default {
  name: "home",
  methods: {
    async enterAsGuest() {
      await userService.login({ username: "Guest", password: "guest" });
      this.$router.push("/board");
    },
  },
  components: {},
};
</script>

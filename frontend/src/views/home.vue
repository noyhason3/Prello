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

    <about />
  </div>
</template>

<script>
// @ is an alias to /src
import { userService } from "../services/user.service.js";
import about from "./about.vue";
export default {
  name: "home",
  methods: {
    async enterAsGuest() {
      const userCred = {
        username: "Guest",
        password: "guest",
      };
      const user = await this.$store.dispatch({ type: "login", userCred });
      this.$router.push("/board");
    },
  },
  components: { about },
};
</script>

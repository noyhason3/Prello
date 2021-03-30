<template>
  <div class="home">
    <div class="hero">
      <img class="hero-img" src="../assets/hero.jpg" />
      <div class="hero-content">
        <h1>
          <span class="hover-underline">
            Manage your collaborative projects</span
          >
        </h1>
        <h2>
          A solution for structuring and online co-ordination for organizations
          and individuals alike
        </h2>
        <button class="guest-btn" @click="enterAsGuest">Try it now!</button>
      </div>
    </div>

    <!-- <about /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import about from "./about.vue";
export default {
  name: "home",
  methods: {
    async enterAsGuest() {
      const userCred = {
        username: "Noy",
        password: "1234",
      };
      const user = await this.$store.dispatch({ type: "login", userCred });
      this.$router.push("/board");
    },
    // async enterAsGuest() {
    //   const userCred = {
    //     username: "Guest",
    //     password: "guest",
    //   };
    //   const user = await this.$store.dispatch({ type: "login", userCred });
    //   this.$router.push("/board");
    // },
  },
  mounted() {
    //getImgColors(".hero-img");
  },
  components: { about },
};
</script>

<template>
  <nav id="nav">
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/dashboard">dashboard</router-link> |
      <router-link to="/board">board list</router-link> |
      <router-link to="/board/demo101">board</router-link> -->
    <router-link to="/" style="font-family: fa-solid" class="icon"
      >&#xf015;</router-link
    >
    <router-link to="/board" v-if="user._id"><div class="icon board"></div>Boards</router-link>
  </nav>
</template>

<script>
export default {
  computed: {
    user() {
      console.log(
        "file: main-nav.vue - line 23 - user - this.$store.getters.loggedInUser",
        this.$store.getters.loggedinUser
      );
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>

<style>
</style>
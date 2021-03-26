<template>
  <nav id="nav">
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/dashboard">dashboard</router-link> |
      <router-link to="/board">board list</router-link> |
      <router-link to="/board/demo101">board</router-link> -->
    <router-link
      to="/"
      style="font-family: fa-solid"
      class="icon house"
    ></router-link>
    <router-link to="/board" v-if="user._id" class="boards"
      ><div class="icon board"></div>
      Boards</router-link
    >
    <div
      class="search-container"
      @click="openSearch"
      :class="{ active: isActive }"
    >
      <input type="text" :placeholder="placeholder" />
      <span v-if="!isActive" class="icon search"></span>
      <span v-else  @click.stop="closeSearch" class="icon x"></span>
    </div>
    <div>
    <!-- TODO: ADD Board Menue -->

    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      placeholder:'Jump to...'
    };
  },
  methods: {
    openSearch() {
      this.isActive = true;
      this.placeholder = "Search..."
    },
    closeSearch() {
      this.isActive = false;
      this.placeholder = "Jump to..."
    },
  },
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
<template>
  <div id="app">
    <main-header />
    <router-view class="page-container" />
  </div>
</template>

<script>
import mainHeader from "@/cmps/main-header";

export default {
  data() {
    return {};
  },
  components: {
    mainHeader,
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
  <div id="app">
    <main-header ref="mainHeader" />
    <router-view />
    <user-msg />
  </div>
</template>

<script>
import mainHeader from "@/cmps/common/main-header";
import boardService from "./services/board.service.js";
// import userMsg from "@cmps/user-msg.";
import userMsg from "./cmps/user-msg.vue";

export default {
  data() {
    return {};
  },
  components: {
    mainHeader,
    userMsg,
  },
  mounted() {
    this.$store.commit({
      type: "setMainHeader",
      mainHeader: this.$refs.mainHeader.$el,
    });
    this.$store.dispatch({ type: "loadUsers" });
  },
};
</script>


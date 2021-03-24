<template>
  <div id="app">
    <main-header ref="mainHeader" />
    <router-view />
  </div>
</template>

<script>
import mainHeader from "@/cmps/common/main-header";
import boardService from "./services/board.service.js";

export default {
  data() {
    return {};
  },
  components: {
    mainHeader,
  },
  mounted() {
    this.$store.commit({
      type: "setMainHeader",
      mainHeader: this.$refs.mainHeader.$el,
    });
  },
};
</script>


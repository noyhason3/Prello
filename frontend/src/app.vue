<template>
  <div id="app">
    <main-header />
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
};
</script>


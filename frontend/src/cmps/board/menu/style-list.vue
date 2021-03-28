<template>
  <board-menu-popup @toggle-board-menu="toggleBoardMenu">
    <div slot="header">
      <button @click="toggleStyleMenu" class="icon back"></button>
      <h2 class="headline">{{ headline }}</h2>
    </div>
    <div slot="main">
      <ul v-if="styleList" class="clean-list choose-style-menu">
        <li
          v-for="(style, idx) in styleList"
          @click="selectStyle(style.id)"
          :key="'style' + idx"
          class="board-menu-img"
          :style="style.style"
        ></li>
      </ul>
    </div>
  </board-menu-popup>
</template>

<script>
import boardMenuPopup from "@/cmps/board/menu/board-menu-popup.vue";
export default {
  props: {
    styleList: Array,
    headline: String,
  },
  methods: {
      toggleBoardMenu() {
      this.$emit("toggle-board-menu");
    },
    toggleStyleMenu() {
      this.$emit("toggle-style-menu");
    },
    selectStyle(styleId) {
      let isImg = this.headline==='Photos';
      this.$emit('set-board-style', {styleId, isImg})
    },
  },
  components: {
    boardMenuPopup,
  },
};
</script>

<style>
</style>
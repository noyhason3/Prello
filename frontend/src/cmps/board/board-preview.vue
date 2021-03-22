<template>
  <div class="board-preview-container">
    <!-- <li
      v-for="board in boards"
      :key="board._id"
      class="board-preview"
      @click="openBoard(board._id)"
      :style="boardStyle(board)"
    >
      {{ board.title }}
      <button class="board-options" @click="toggleOptionsMenu"></button>
    </li> -->
  </div>
</template>

<script>
export default {
  props: {
    // boards: Array,
  },
  methods: {
    // toggleOptionsMenu() {
    //   this.$emit("toggle-options-menu");
    // },
    // openBoard(boardId) {
    //   this.$emit("open-board", boardId);
    // },
    // boardStyle(board) {
    //   if (board.style.bgImg) {
    //     const img = require("@/assets/img/" + board.style.bgImg.name);
    //     return { backgroundImage: `url(${img})` };
    //   }
    //   return { backgroundColor: board.style.bgColor.name };
    // },
  },
};
</script>

<style>
</style>
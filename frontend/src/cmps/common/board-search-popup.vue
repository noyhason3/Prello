<template>
  <ul class="clean-list board-search">
    <li
      v-for="board in boards"
      :key="board._id"
      :style="boardStyle(board)"
      @click.stop="openBoard(board._id)"
    >
      <a class="nav-board-preview">
        {{ board.title }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    boards: Array,
  },
  methods: {
    boardStyle(board) {
      if (board.style.bgImg) {
        const img = require("@/assets/img/background/" +
          board.style.bgImg.value);
        return { backgroundImage: `url(${img})` };
      }
      return { backgroundColor: board.style.bgColor.value };
    },
    openBoard(boardId) {
      this.$router.push("/board/" + boardId);
      console.log("[close search");
      this.$emit("close-search");
    },
    logHi() {
      console.log("hI! :)");
    },
  },
};
</script>

<style>
</style>
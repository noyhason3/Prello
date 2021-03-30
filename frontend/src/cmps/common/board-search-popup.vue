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
      if (board.style.bgImg?.value) {
        const img = require("@/assets/img/background/" +
          board.style.bgImg.value);
        return { backgroundImage: `url(${img})` };
      }
      return { backgroundColor: board.style.bgColor.value };
    },
    async openBoard(boardId) {
      if(this.$route.params.boardId === boardId) return;
      await this.$router.push("/board/" + boardId);
      this.$emit("close-search");
    },
  },
};
</script>

<style>
</style>
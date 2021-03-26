<template>
  <ul class="clean-list board-search">
    <li v-for="board in boards" :key="board._id" :style="boardStyle(board)">
      <router-link class="nav-board-preview" :to="'/board/' + board._id">
        <!-- <div class="thumbnail" ></div> -->
        {{ board.title }}
      </router-link>
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
  },
};
</script>

<style>
</style>
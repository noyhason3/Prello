<template>
  <section class="board">
    <board-header :board="board" />
    <ul class="clean-list">
      <li v-for="group in board.groups" :key="group.id">
        <group :group="group" :boardId="board._id" />
      </li>
    </ul>
    <router-view />
  </section>
</template>


<script>
import boardHeader from "../cmps/board/board-header.vue";
import group from "../cmps/board/group.vue";

export default {
  data() {
    return {
      maxHeight: "0px",
    };
  },
  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
  },
  components: { boardHeader, group },
};
</script>

<style>
</style>
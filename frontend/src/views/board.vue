<template>
  <section class="board">
    <board-header :board="board" />

    <div class="main-container">
      <ul class="group-list clean-list">
        <li v-for="group in board.groups" :key="group.id">
          <group :group="group" :boardId="board._id" />
        </li>
      </ul>
    </div>
    <router-view />
  </section>
</template>


<script>
import boardHeader from "../cmps/board/board-header.vue";
import group from "../cmps/board/group.vue";

export default {
  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
    groups() {},
  },
  components: { boardHeader, group },
};
</script>

<style>
</style>
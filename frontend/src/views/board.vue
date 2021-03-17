<template>
  <section class="board">
    <ul>
      <li v-for="group in board.groups" :key="group.id">
        <group :group="group" :boardId="board._id" />
      </li>
    </ul>
    <router-view />
  </section>
</template>

<script>
import group from "../cmps/board/group.vue";
export default {
  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
    groups() {},
  },
  components: { group },
};
</script>

<style>
</style>
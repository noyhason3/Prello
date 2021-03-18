<template>
  <section class="board">
    <ul class="clean-list">
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
  components: { group },
};
</script>

<style>
</style>
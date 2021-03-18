<template>
  <section class="board">
    <board-header :board="board" />
    <ul class="clean-list main">
      <li v-for="group in board.groups" :key="group.id" class="group-wrapper">
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
  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
  },
  methods: {
    added({ items, droptarget, owner }) {
      console.log("added", items, "to", droptarget, "from", owner);
    },
    removed({ items, droptarget, owner }) {
      console.log("removed", items, "to", droptarget, "from", owner);
    },
    reordered({ items, droptarget, owner }) {
      console.log("reordered", items, "to", droptarget, "from", owner);
    },
  },
  components: { boardHeader, group },
};
</script>

<style>
</style>
<template>
  <section class="board" ref="board">
    <ul class="clean-list" ref="list">
      <li v-for="group in board.groups" :key="group.id">
        <!-- :style="`max-height:${maxHeight};`" -->
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
    groups() {},
  },
  mounted() {
    this.maxHeight = this.$refs.list.clientHeight + "px";
  },
  components: { group },
};
</script>

<style>
</style>
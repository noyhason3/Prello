<template>
  <section class="board">
    <board-header :board="board" />
    <ul class="clean-list main">
      <li v-for="group in board.groups" :key="group.id" class="group-wrapper">
        <group :group="group" :boardId="board._id" />
      </li>
    </ul>
    <button v-if="!isAddNewGroup" @click="isAddNewGroup = true">
      Add a new group
    </button>
    <editable-text
      v-else
      v-model="newGroup.title"
      :type="'title'"
      :elementType="'group'"
      @close-textarea="isAddNewGroup = false"
      @input="addGroup"
    />
    <router-view />
  </section>
</template>


<script>
import boardHeader from "../cmps/board/board-header.vue";
import group from "../cmps/board/group.vue";
import boardService from "../services/board.service";
import editableText from "@/cmps/task/task-cmps/editable-text.vue";

export default {
  data() {
    return {
      maxHeight: "0px",
      isAddNewGroup: false,
      newGroup: boardService.getEmptyGroup(),
    };
  },
  methods: {
    addGroup() {
      this.newGroup.board = { id: this.board.id };
      this.$store.commit({ type: "saveGroup", group: this.newGroup });
      this.newGroup = boardService.getEmptyGroup();
      this.isAddNewGroup = false;
    },
  },
  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
  },
  components: {
    boardHeader,
    group,
    editableText,
  },
};
</script>

<style>
</style>
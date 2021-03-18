<template>
  <section class="board">
    <board-header :board="board" />
    <ul class="clean-list main">
      <draggable
        v-model="board.groups"
        group="group"
        @start="drag = true"
        @end="drag = false"
        animation="150"
        emptyInsertThreshold="50"
        ghost-class="ghost"
        chosen-class="chosen"
        drag-class="drag"
        class="group-list"
        filter=".task-preview"
        draggable=".group-wrapper"
        handle=".clean-list"
      >
        <li v-for="group in board.groups" :key="group.id" class="group-wrapper">
          <group :group="group" :boardId="board._id" />
        </li>
      </draggable>

      <div class="add-new-group">
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
      </div>
    </ul>
    <router-view />
  </section>
</template>


<script>
import boardHeader from "../cmps/board/board-header.vue";
import group from "../cmps/board/group.vue";
import boardService from "../services/board.service";
import editableText from "@/cmps/task/task-cmps/editable-text.vue";

import draggable from "vuedraggable";

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
    draggable,
  },
};
</script>

<style>
</style>
<template>
  <section class="board" v-if="board">
    <board-header :board="board" />
    <draggable
      v-model="board.groups"
      group="group"
      @start="drag = true"
      @end="drag = false"
      animation="150"
      empty-insert-threshold="5"
      ghost-class="ghost"
      chosen-class="chosen"
      drag-class="drag"
      filter=".group-tasks-preview"
      draggable=".group-container"
      class="clean-list main"
      tag="ul"
    >
      <!-- <li v-for="group in board.groups" :key="group.id" class="group-container"> -->
      <draggable
        v-for="group in board.groups"
        :key="group.id"
        v-model="group.tasks"
        group="tasks"
        @start="drag = true"
        @end="drag = false"
        @move="console.log('moving')"
        empty-insert-threshold="5000"
        draggable=".task-preview"
        class="clean-list group-container"
        tag="li"
      >
        <group :group="group" :boardId="board._id" />
      </draggable>
      <!-- </li> -->

      <div class="add-new-group">
        <button v-if="!isAddNewGroup" @click="isAddNewGroup = true">
          Add a new group
        </button>
        <editable-text
          v-else
          v-model="newGroup.title"
          :type="'title'"
          :isEditFirst="true"
          :elementType="'group'"
          @close-textarea="isAddNewGroup = false"
          @input="addGroup"
        />
      </div>
    </draggable>
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
  async created() {
    ////DONT FORGET TO LOAD PROPERLY - not that we will
    const board = await boardService.query("b101");
    this.$store.commit({ type: "setBoard", board });
  },
  methods: {
    addGroup() {
      if (!this.newGroup.title) return;
      this.newGroup.board = { id: this.board._id };
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
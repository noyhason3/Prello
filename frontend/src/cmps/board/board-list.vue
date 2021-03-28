<template>
  <ul v-if="boards" class="clean-list board-list-layout">
    <li
      v-for="board in boards"
      :key="board._id"
      class="board-preview"
      @click="openBoard(board._id)"
      @mouseleave="closeOptionsMenu()"
      :style="boardStyle(board)"
    >
      <h3>{{ board.title }}</h3>
      <button
        v-if="starredBoards"
        class="btn options"
        @click.stop="toggleOptionsMenu(board)"
      ></button>
      <div v-if="isBoardSelected(board._id)" class="nav-small">
        <button @click.stop="removeBoard()">Remove board</button>
      </div>
      <button
        :class="starClass(board._id)"
        @click.stop="toggleStarred(board)"
      ></button>
    </li>
    <li v-if="starredBoards">
      <button  
        @click="openCreatePopup"
        class="btn add-board icon plus"
      ></button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    boards: Array,
    starredBoards: Array,
  },
  data() {
    return {
      selectedBoard: null,
    };
  },
  methods: {
    starClass(id) {
      if (
        !this.starredBoards ||
        this.starredBoards.some(({ _id }) => _id === id)
      )
        return "starred";
      return "toggle-starred";
    },
    boardStyle(board) {
      if (board.style.bgImg?.value) {
        const img = require("@/assets/img/background/" +
          board.style.bgImg.value);
        return { backgroundImage: `url(${img})` };
      }
      return { backgroundColor: board.style.bgColor.value };
    },
    isBoardSelected(id) {
      return this.selectedBoard?._id === id;
    },
    openCreatePopup() {
      this.$emit("open-create-popup");
    },
    closeOptionsMenu() {
      this.selectedBoard = null;
    },
    toggleStarred(board) {
      board.isStarred = !board.isStarred;
      this.$emit("save-board", board);
    },
    removeBoard() {
      this.$emit("remove-board", this.selectedBoard?._id);
    },
    toggleOptionsMenu(board) {
      if (this.selectedBoard?._id === board._id)
        return (this.selectedBoard = null);
      this.selectedBoard = JSON.parse(JSON.stringify(board));
    },
    openBoard(boardId) {
      this.$emit("open-board", boardId);
    },
  },
};
</script>

<style>
</style>
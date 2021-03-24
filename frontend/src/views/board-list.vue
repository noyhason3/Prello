<template>
  <section class="board-list-container">
    <h2><span class="starred"></span>Starred boards</h2>
    <ul v-if="boardList" class="clean-list board-list">
      <li
        v-for="board in starredBoards"
        :key="board._id"
        class="board-preview"
        @click="openBoard(board._id)"
        :style="boardStyle(board)"
      >
        <h3>{{ board.title }}</h3>
        <button class="starred" @click.stop="toggleStarred(board)"></button>
      </li>
    </ul>
    <h2>
      <span class="recent"></span>Recently viewed 
      <input type="text" @input="setFilter" v-model="filterBy.txt" placeholder="Search boards..."/>
      </h2>
    
    <ul v-if="boardList" class="clean-list board-list">
      <li
        v-for="board in recentBoards"
        :key="board._id"
        class="board-preview"
        @click="openBoard(board._id)"
        @mouseleave="closeOptionsMenu()"
        :style="boardStyle(board)"
      >
        <h3>{{ board.title }}</h3>
        <button
          class="board-options"
          @click.stop="toggleOptionsMenu(board)"
        ></button>
        <transition name="slide">
          <div v-if="isBoardSelected(board._id)" class="nav-board-options">
            <button @click.stop="removeBoard()">Remove board</button>
          </div>
        </transition>
        <button
          class="toggle-starred"
          :class="{ starred: isBoardStarred(board._id) }"
          @click.stop="toggleStarred(board)"
        ></button>
      </li>
      <li>
        <button @click="openBoardPopup" class="btn add-board">
          Create new board
        </button>
      </li>
    </ul>
    <popup-create-board
      v-if="isAddBoard"
      :isAddBoard="isAddBoard"
      @close-board-popup="closeBoardPopup"
      @open-board="openBoard"
    />
  </section>
</template>

<script>
import popup from "@/cmps/common/pop-up.vue";
import popupCreateBoard from "@/cmps/board/popup-create-board.vue";
export default {
  data() {
    return {
      isAddBoard: false,
      boardList: null,
      selectedStyle: null,
      selectedBoard: null,
      filterBy: { txt: "" },
    };
  },
  async created() {
    this.boardList = await this.$store.dispatch({ type: "loadBoards" });
    this.$store.commit("setBoard", { currBoard: null });
  },
  methods: {
    openBoardPopup() {
      this.isAddBoard = true;
    },
    closeBoardPopup() {
      this.isAddBoard = false;
    },

    async openBoard(boardId) {
      console.log("id:", boardId);
      await this.$store.dispatch({ type: "getBoard", boardId });
      this.$router.push("/board/" + boardId);
    },

    boardStyle(board) {
      if (board.style.bgImg) {
        const img = require("@/assets/img/background/" +
          board.style.bgImg.value);
        return { backgroundImage: `url(${img})` };
      }
      return { backgroundColor: board.style.bgColor.value };
    },
    isSelected(id) {
      return this.selectedStyle.id === id;
    },
    toggleOptionsMenu(board) {
      if (this.selectedBoard?._id === board._id)
        return (this.selectedBoard = null);
      this.selectedBoard = { ...board };
    },
    closeOptionsMenu() {
      this.selectedBoard = null;
    },
    isBoardSelected(id) {
      return this.selectedBoard?._id === id;
    },
    async removeBoard() {
      this.$store.dispatch({
        type: "removeBoard",
        boardId: this.selectedBoard._id,
      });
    },
    toggleStarred(board) {
      this.selectedBoard = { ...board };
      this.selectedBoard.isStarred = !this.selectedBoard.isStarred;
      this.$store.dispatch("saveBoard", { board: this.selectedBoard });
    },
    isBoardStarred(id) {
      return this.starredBoards.some(({ _id }) => _id === id);
    },
    setFilter() {
      //TODO:filter from backend
    },
  },
  computed: {
    starredBoards() {
      return this.boardList.filter(({ isStarred }) => isStarred);
    },
    recentBoards() {
      const boardsToShow = this.boardList.filter(({ title }) => {
        return title.toLowerCase().includes(this.filterBy.txt.toLowerCase());
      });
      return boardsToShow.sort(
        (board1, board2) => board1.lastViewedAt - board2.lastViewedAt
      );
    },
  },
  components: {
    popup,
    popupCreateBoard,
  },
};
</script>

<style>
</style>
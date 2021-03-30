<template>
  <section v-if="boardList" class="board-list-page">
    <div class="board-list-container">
      <h2 class="hello">Hello {{ user.username }}</h2>
      <h2><span class="starred"></span>Starred boards</h2>
      <board-list
        :boards="starredBoards"
        @open-create-popup="openCreatePopup"
        @remove-board="removeBoard"
        @open-board="openBoard"
        @save-board="saveBoard"
      />

      <div class="board-list-layout headline">
        <h2><span class="recent"></span>Recently viewed</h2>
        <input
          type="text"
          v-model="filterBy.txt"
          placeholder="Search boards..."
        />
      </div>
      <board-list
        :boards="recentBoards"
        :starredBoards="starredBoards"
        @open-create-popup="openCreatePopup"
        @remove-board="removeBoard"
        @open-board="openBoard"
        @save-board="saveBoard"
      />
      <div class="board-list-layout headline">
        <h2><span class="board"></span>My boards</h2>
      </div>
      <board-list
        :boards="myBoards"
        :starredBoards="starredBoards"
        @open-create-popup="openCreatePopup"
        @remove-board="removeBoard"
        @open-board="openBoard"
        @save-board="saveBoard"
      />

      <popup-create-board
        v-if="isAddBoard"
        :isAddBoard="isAddBoard"
        @close-board-popup="closeCreatePopup"
        @open-board="openBoard"
      />
    </div>
  </section>
</template>

<script>
import popup from "@/cmps/common/pop-up.vue";
import popupCreateBoard from "@/cmps/board/popup-create-board.vue";
import boardList from "@/cmps/board/board-list.vue";
export default {
  data() {
    return {
      isAddBoard: false,
      boardList: null,
      selectedStyle: null,
      filterBy: { txt: "" },
    };
  },
  async created() {
    this.boardList = this.$store.getters.boards;
    if (!this.boardList)
    this.boardList = await this.$store.dispatch({ type: "loadBoards" });
    this.$store.commit("setBoard", { currBoard: null });
  },
  methods: {
    openCreatePopup() {
      this.isAddBoard = true;
    },
    closeCreatePopup() {
      this.isAddBoard = false;
    },
    async openBoard(boardId) {
      await this.$store.dispatch({ type: "getBoard", boardId });
      this.$router.push("/board/" + boardId);
    },

    boardStyle(board) {
      if (board.style.bgImg?.value) {
        const img = require("@/assets/img/background/" +
          board.style.bgImg.value);
        return { backgroundImage: `url(${img})` };
      }
      return { backgroundColor: board.style.bgColor.value };
    },
    isSelected(id) {
      return this.selectedStyle.id === id;
    },

    async removeBoard(boardId) {
      this.$store.dispatch({
        type: "removeBoard",
        boardId,
      });
    },

    saveBoard(board) {
      console.log("new board:", board);
      this.$store.dispatch("saveBoard", { board });
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
        (board1, board2) => board2.lastViewedAt - board1.lastViewedAt
      );
    },
    myBoards() {
      const boardsToShow = this.boardList.filter(({ createdBy }) => {
        return createdBy._id === this.user._id;
      });
      return boardsToShow;
    },
    user() {
      return this.$store.getters.loggedinUser;
    },
  },
  components: {
    popup,
    popupCreateBoard,
    boardList,
  },
};
</script>

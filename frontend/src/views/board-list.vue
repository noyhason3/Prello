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
    <h2><span class="recent"></span>Recently viewed</h2>
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
          :class="{starred:isBoardStarred(board._id)}"
          @click.stop="toggleStarred(board)"
        ></button>
      </li>
      <li>
        <button @click="openBoardPopup" class="btn add-board">
          Create new board
        </button>
      </li>
    </ul>
    <!-- <popup-create-board :boardToEdit="boardToEdit"/> -->
    <div>
      <div
        @click="closeBoardPopup"
        class="create-board-screen"
        :class="{ 'add-board': isAddBoard }"
      ></div>
      <div v-if="isAddBoard" class="popup-create-board">
        <form @submit.prevent="createNewBoard">
          <div class="new-board-info">
            <div class="title-container" :style="selectedStyle.style">
              <input
                type="text"
                placeholder="Add board title"
                v-model="boardToEdit.title"
                class="title"
              />
              <button @click="closeBoardPopup" class="btn close">X</button>
            </div>
            <ul class="clean-list bgStyle-list">
              <li
                v-for="(style, idx) in bgStyles"
                @click="selectStyle(style)"
                :key="'style' + idx"
                class="bgStyle"
                :class="{ selected: isSelected(style.id) }"
                :style="style.style"
              ></li>
            </ul>
          </div>
          <button
            class="btn create-board"
            :class="{ gray: !boardToEdit.title }"
          >
            Create board
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import popup from "@/cmps/common/pop-up.vue";
import popupCreateBoard from '@/cmps/board/popup-create-board.vue'
export default {
  data() {
    return {
      isAddBoard: false,
      boardToEdit: null,
      boardList: null,
      selectedStyle: null,
      imgs: [
        { id: "i101", value: "1.jpg" },
        { id: "i102", value: "2.jpg" },
        { id: "i103", value: "3.jpg" },
        { id: "i104", value: "4.jpg" },
        { id: "i105", value: "5.jpg" },
      ],
      colors: [
        { id: "c101", value: "#C10BB3" },
        { id: "c102", value: "#03A7BE" },
        { id: "c103", value: "#003152" },
        { id: "c104", value: "#8BCB8A" },
      ],
    };
  },
  async created() {
    this.boardList = await this.$store.dispatch({ type: "loadBoards" });
    this.$store.commit('setBoard', {currBoard:null})
  },
  methods: {
    openBoardPopup() {
      this.boardToEdit = this.$store.getters.emptyBoard;
      console.log("this.boardToEdit:", this.boardToEdit);
      this.selectedStyle = this.bgStyles[0];
      this.isAddBoard = true;
    },
    closeBoardPopup() {
      this.isAddBoard = false;
      this.boardToEdit.title = "";
    },
    async createNewBoard() {
      if (!this.boardToEdit.title) return;
      const style = this.getSelectedStyle(this.selectedStyle.id);;
      if(style.value.startsWith('#')){
        this.boardToEdit.style.bgColor = style
      }else{
        this.boardToEdit.style.bgImg = style
      }

      const board = await this.$store.dispatch({
        type: "saveBoard",
        board: this.boardToEdit,
      });
      this.openBoard(board._id);
    },
    async openBoard(boardId) {
      console.log('id:', boardId)
      await this.$store.dispatch({ type: "getBoard", boardId });
      this.$router.push("/board/" + boardId);
    },
    selectStyle(style) {
      this.selectedStyle = style;
    },
    boardStyle(board) {
      if (board.style.bgImg) {
        const img = require("@/assets/img/background/" + board.style.bgImg.value);
        return { backgroundImage: `url(${img})` };
      }
      return { backgroundColor: board.style.bgColor.value };
    },
    isSelected(id) {
      return this.selectedStyle.id === id;
    },
    getSelectedStyle(styleId) {
      let style = this.imgs.find(({ id }) => id === styleId);
      if (style) return style;
      style = this.colors.find(({ id }) => id === styleId);
      return style;
    },
    toggleOptionsMenu(board) {
      if (this.boardToEdit?._id === board._id) return (this.boardToEdit = null);
      this.boardToEdit = board;
    },
    closeOptionsMenu() {
      this.boardToEdit = null;
    },
    isBoardSelected(id) {
      return this.boardToEdit?._id === id;
    },
    async removeBoard() {
      // console.log("removing!", this.boardToEdit);
      this.$store.dispatch({ type: "removeBoard", boardId });
    },
    toggleStarred(board) {
      this.boardToEdit = board
      this.boardToEdit.isStarred = !this.boardToEdit.isStarred
      this.$store.dispatch('saveBoard', {board:this.boardToEdit})
    },
    isBoardStarred(id){
      return this.starredBoards.some(({_id}) => _id===id)
    }
  },
  computed: {
    bgStyles() {
      const imgStyles = this.imgs.map((currImg) => {
        const img = require("@/assets/img/background/" + currImg.value);
        return { id: currImg.id, style: { backgroundImage: `url(${img})` } };
      });
      const colorStyles = this.colors.map((currColor) => {
        return { id: currColor.id, style: { backgroundColor: currColor.value } };
      });
      const styles = imgStyles.concat(colorStyles);
      return styles;
    },
    starredBoards() {
      return this.boardList.filter(({ isStarred }) => isStarred);
    },
    recentBoards() {
      return this.boardList.sort(
        (board1, board2) => board1.lastViewedAt - board2.lastViewedAt
      );
    },
  },
  components: {
    popup,
    popupCreateBoard
  },
};
</script>

<style>
</style>
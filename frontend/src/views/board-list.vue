<template>
  <section class="board-list-container">
    <ul class="clean-list board-list">
      <li
        v-for="board in boardList"
        :key="board._id"
        class="board-preview"
        @click="openBoard(board._id)"
        :style="{
          backgroundColor: backgroundColor(board),
          backgroundImage: backgroundStyle(board),
        }"
      >
        {{ board.title }}
        <button @click.stop="removeBoard(board._id)">X</button>
      </li>
      <li>
        <button @click="openBoardPopup" class="btn add-board">
          Create new board
        </button>
      </li>
    </ul>
    <div>
      <div
        @click="closeBoardPopup"
        class="create-board-screen"
        :class="{ 'add-board': isAddBoard }"
      ></div>
      <popup v-if="isAddBoard" 
      class="popup-create-board">
        <div slot="main">
          <form @submit.prevent="createNewBoard">
            <div class="new-board-info">
              <div class="title-container" :style="bgStyles[0]">
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
                  :style="style"
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
      </popup>
    </div>
  </section>
</template>

<script>
import popup from "@/cmps/common/pop-up.vue";
import boardService from "../services/board.service";
// import img from '../assets/img/i.jpg'
// import editableTitle from "@/cmps/common/editable-title.vue";
export default {
  data() {
    return {
      isAddBoard: false,
      boardToEdit: null,
      boardList: null,
    };
  },
  async created() {
    this.boardList = [
      {
        _id: "b102",
        title: "Apsus upgrade",
        style: { bgImg: "1.jpg", color: "yellow" },
      },
      {
        _id: "b103",
        title: "MegoTap market research",
        style: { bgImg: "2.jpg", color: "pink" },
      },
      {
        _id: "b104",
        title: "Office management",
        style: { bgImg: "3.jpg", color: "blue" },
      },
      {
        _id: "b105",
        title: "Office management",
        style: { bgImg: "", color: "lightBlue" },
      },
      {
        _id: "b106",
        title: "Office management",
        style: { bgImg: "5.jpg", color: "blue" },
      },
    ];
    // this.boardList = await this.$store.dispatch({ type: "loadBoards" });
    // console.log('this.boardToEdit:', this.boardToEdit)
  },
  methods: {
    async openBoardPopup() {
      this.boardToEdit = await this.$store.dispatch({ type: "getEmptyBoard" });
      this.isAddBoard = true;
    },
    closeBoardPopup() {
      this.isAddBoard = false;
      this.boardToEdit.title = "";
    },
    async createNewBoard() {
      if (!this.boardToEdit.title) return;
      const board = await this.$store.dispatch({
        type: "saveBoard",
        board: this.boardToEdit,
      });
      this.openBoard(board._id);
    },
    openBoard(id) {
      this.$router.push("/board/" + id);
    },
    async removeBoard(boardId) {
      this.$store.dispatch({ type: "removeBoard", boardId });
    },
    selectStyle(style) {
      //TODO_set style as background of image and boardToEdit
    },
    backgroundStyle(board) {
      if (board.style.bgImg) {
        const str1 = board.style.bgImg;
        const img3 = require("@/assets/img/" + str1);
        return `url(${img3})`;
      }
    },
    backgroundColor(board) {
      return board.style.color;
    },
  },
  computed: {
    bgStyles() {
      const imgNames = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
      const colors = ["#C10BB3", "#03A7BE", "#003152", "#8BCB8A"];
      const imgStyles = imgNames.map((imgName) => {
        const img = require("@/assets/img/" + imgName);
        return { backgroundImage: `url(${img})` };
      });
      const colorStyles = colors.map((color) => {
        return { backgroundColor: color };
      });
      console.log("colorStyles:", colorStyles);
      console.log("imgStyles:", imgStyles);
      const styles = imgStyles.concat(colorStyles);
      console.log("styles:", styles);
      return styles;
      // return [{a:1},{b:2}]
      // return imgStyles
    },
  },
  components: {
    popup,
    // editableTitle,
  },
};
</script>

<style>
</style>
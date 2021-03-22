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
        <!-- :style="{backgroundImage: `url(${img})`}" -->
        <!-- :style="backGroundStyle(board)" -->
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
      <div @click="closeBoardPopup" class="create-board-screen" :class="{'add-board':isAddBoard}"></div>
    <popup v-if="isAddBoard" class="popup-create-board">
      <div slot="main">
        <form @submit.prevent="createNewBoard">
          <div class="new-board-info">
            <template>
              <input
                type="text"
                class="add-board-title"
                placeholder="Add board title"
                v-model="boardToEdit.title"
              />
              <button @click="closeBoardPopup" class="btn close">X</button>
            </template>
            <ul class="clean-list bgStyle-list">
              <li
                v-for="(style, idx) in styles"
                @click="selectStyle(style)"
                :key="'style' + idx"
                class="bgStyle"
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
      img: null,
    };
  },
  async created() {
    // this.boardList = [
    //   {
    //     _id: 1,
    //     title: "My new project",
    //     style: { bgImg: "i", color: "yellow" },
    //   },
    //   { _id: 2, title: "Trip to USA", style: { bgImg: "", color: "pink" } },
    //   { _id: 3, title: "a project", style: { bgImg: "", color: "blue" } },
    // ];
    this.boardList = await this.$store.dispatch({ type: "loadBoardList" });
    this.img = require("@/assets/img/i.jpg");
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
      // console.log("board:", board);//Continue
      // if (board.style.imgUrl) {
      //   return { "background-image": require(img) };
      //   }
      // return { "background-color": board.style.color };

      // const bgImg = boardService.getRandomImg()
      // console.log('bgImg:', bgImg)
      // return {'background-image': `url(${bgImg})`}

      if (board.style.bgImg) {
        const img2 = require("@/assets/img/i.jpg");
        console.log("img2:", img2);
        // const str = `@/assets/img/${board.style.bgImg}.jpg`
        // const img3 = require(str)
        // console.log('img:', img3)
        return `url(${img2})`;
      }
    },
    backgroundColor(board) {
      return board.style.color;
    },
  },
  computed: {
    styles() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
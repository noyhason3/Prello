<template>
  <section class="board-list-container">
    <h2>Starred boards</h2>
    <h2>Recently viewed</h2>
    <ul class="clean-list board-list">
      <li
        v-for="board in boardList"
        :key="board._id"
        class="board-preview"
        @click="openBoard(board._id)"
        :style="boardStyle(board)"
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
      <popup v-if="isAddBoard" class="popup-create-board">
        <div slot="main">
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
      </popup>
    </div>
  </section>
</template>

<script>
import popup from "@/cmps/common/pop-up.vue";

export default {
  data() {
    return {
      isAddBoard: false,
      boardToEdit: null,
      boardList: null,
      selectedStyle: null,
      imgs: [
        { id: "i101", name: "1.jpg" },
        { id: "i102", name: "2.jpg" },
        { id: "i103", name: "3.jpg" },
        { id: "i104", name: "4.jpg" },
        { id: "i101", name: "5.jpg" },
      ],
      colors: [
        { id: "c101", name: "#C10BB3" },
        { id: "c102", name: "#03A7BE" },
        { id: "c103", name: "#003152" },
        { id: "c104", name: "#8BCB8A" },
      ],
    };
  },
  async created() {
    this.boardList = [
      {
        _id: "b102",
        title: "Apsus upgrade",
        style: { bgImg: { id: "i102", name: "2.jpg" }, bgColor: "" },
        createdAt: 1546678789800,
        lastViewedAt: 1606678789800,
        isStarred: false,
      },
      {
        _id: "b103",
        title: "MegoTap web",
        style: { bgImg: { id: "i104", name: "4.jpg" }, bgColor: "" },
        createdAt: 1426678789800,
        lastViewedAt: 1544678789800,
        isStarred: true,
      },
      {
        _id: "b104",
        title: "MrToy frontend",
        style: { bgImg: "", bgColor: { id: "c101", name: "#C10BB3" } },
        createdAt: 1265678789800,
        lastViewedAt: 1585678789800,
        isStarred: false,
      },
      {
        _id: "b105",
        title: "Getro ",
        style: { bgImg: { id: "i103", name: "3.jpg" }, bgColor: "" },
        createdAt: 1426678789800,
        lastViewedAt: 1606678789800,
        isStarred: false,
      },
      {
        _id: "b106",
        title: "Web Dev. MiniMoney",
        style: { bgImg: "", bgColor: { id: "c103", name: "#003152" } },
        createdAt: 1566678789800,
        lastViewedAt: 1588678789800,
        isStarred: false,
      },
    ];
    // this.boardList = await this.$store.dispatch({ type: "loadBoards" });
    // console.log('this.boardToEdit:', this.boardToEdit)
  },
  methods: {
    async openBoardPopup() {
      this.boardToEdit = await this.$store.dispatch({ type: "getEmptyBoard" });
      this.selectedStyle = this.bgStyles[0];
      this.isAddBoard = true;
    },
    closeBoardPopup() {
      this.isAddBoard = false;
      this.boardToEdit.title = "";
    },
    async createNewBoard() {
      if (!this.boardToEdit.title) return;
      this.boardToEdit.style = this.getSelectedStyle(this.selectedStyle.id);
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
      this.selectedStyle = style;
    },
    boardStyle(board) {
      if (board.style.bgImg) {
        const img = require("@/assets/img/" + board.style.bgImg.name);
        return { backgroundImage: `url(${img})` };
      }
      return { backgroundColor: board.style.bgColor.name };
    },
    isSelected(id) {
      return this.boardToEdit.style.id === id;
    },
    getSelectedStyle(styleId) {
      let style = this.imgs.find(({ id }) => id === styleId);
      if (style) return style;
      style = this.colors.find(({ id }) => id === styleId);
      return style;
    },
  },
  computed: {
    bgStyles() {
      const imgStyles = this.imgs.map((currImg) => {
        const img = require("@/assets/img/" + currImg.name);
        return { id: currImg.id, style: { backgroundImage: `url(${img})` } };
      });
      const colorStyles = this.colors.map((currColor) => {
        return { id: currColor.id, style: { backgroundColor: currColor.name } };
      });
      const styles = imgStyles.concat(colorStyles);
      return styles;
    },
  },
  components: {
    popup,
  },
};
</script>

<style>
</style>
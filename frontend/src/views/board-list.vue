<template>
  <section class="board-list-container">
    <ul class="clean-list board-list">
      <li
        v-for="board in boardList"
        :key="board._id"
        class="board-preview"
        :style="{backgroundImage: `url(${img})`}"
      >
        <!-- :style="backGroundStyle(board)" -->
        {{ board.title }}
      </li>
      <li>
        <button @click="openBoardPopup" class="btn add-board">Create new board</button>
      </li>
    </ul>
    <popup v-if="isAddBoard">
      <div slot="main">
        <form @submit.prevent="createNewBoard">
          <input
            type="text"
            placeholder="Add board title"
            v-model="boardToEdit.title"
          />
          <button>Create board</button>
        </form>
      </div>
    </popup>
  </section>
</template>

<script>
import popup from "@/cmps/common/pop-up.vue";
import boardService from "../services/board.service";
import img from '../assets/img/i1.jpg'
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
        _id: 1,
        title: "My new project",
        style: { bgImg: "", color: "yellow" },
      },
      { _id: 2, title: "Trip to USA", style: { bgImg: "", color: "pink" } },
      { _id: 3, title: "a project", style: { bgImg: "", color: "blue" } },
    ];
    // console.log('this.boardToEdit:', this.boardToEdit)
  },
  methods: {
    async openBoardPopup() {
      this.boardToEdit = await this.$store.dispatch({ type: "getEmptyBoard" });
      this.isAddBoard = true;
    },
    async createNewBoard() {
      const board = await this.$store.dispatch({
        type: "saveBoard",
        board: this.boardToEdit,
      });
      console.log("board:", board);
      this.openBoard(board._id);
    },
    openBoard(id) {
      this.$router.push("/board/" + id);
    },
    backGroundStyle(board) {
      console.log("board:", board);
      if (board.style.imgUrl) return { "background-image": board.style.imgUrl };
      return { "background-color": board.style.color };

      // const bgImg = boardService.getRandomImg()
      // console.log('bgImg:', bgImg)
      // return {'background-image': `url(${bgImg})`}
    },
  },
  components: {
    popup,
    img
    // editableTitle,
  },
};
</script>

<style>
</style>
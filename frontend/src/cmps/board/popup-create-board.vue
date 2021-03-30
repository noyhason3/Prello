<template>
  <div>
    <div
      @click="closeBoardPopup"
      class="create-board-screen"
      :class="{ 'add-board': isAddBoard }"
    ></div>
    <div class="popup-create-board">
      <form @submit.prevent="createNewBoard">
        <div class="new-board-info">
          <div class="title-container" :style="selectedStyle.style">
            <div class="top">
              <input
                type="text"
                placeholder="Add board title"
                v-model="boardToEdit.title"
                class="title"
              />
              <button @click="closeBoardPopup" class="btn close">X</button>
            </div>
            <!-- <label for=""><input type="checkbox" name="checkbox" v-model="isUseTemplate">Use template</label> -->
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
        <button class="btn create-board" :class="{ gray: !boardToEdit.title }">
          Create board
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { boardService } from "../../services/board.service";
export default {
  props: {
    isAddBoard: Boolean,
  },
  data() {
    return {
      selectedStyle: null,
      boardToEdit: null,
      // isUseTemplate: false,
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
  created() {
    this.boardToEdit = { ...this.$store.getters.emptyBoard };
    this.selectedStyle = this.bgStyles[0];
  },
  methods: {
    isSelected(id) {
      return this.selectedStyle.id === id;
    },
    getSelectedStyle(styleId) {
      let style = this.imgs.find(({ id }) => id === styleId);
      if (style) return style;
      style = this.colors.find(({ id }) => id === styleId);
      return style;
    },
    async createNewBoard() {
      console.log('this.boardToEdit.title:', this.boardToEdit.title)
      if (!this.boardToEdit.title) return;
      const style = this.getSelectedStyle(this.selectedStyle.id);
      if (style.value.startsWith("#")) {
        this.boardToEdit.style.bgColor = style;
      } else {
        this.boardToEdit.style.bgImg = style;
      }

      // if (this.isUseTemplate)
      //   this.boardToEdit.groups = { ...boardService.getEmptyTemplate() };
      const board = await this.$store.dispatch({
        type: "saveBoard",
        board: this.boardToEdit,
      });
      console.log('board',board);
      this.$emit("open-board", board._id);
    },
    boardStyle(board) {
      if (board.style.bgImg?.value) {
        const img = require("@/assets/img/background/" +
          board.style.bgImg.value);
        return { backgroundImage: `url(${img})` };
      }
      return { backgroundColor: board.style.bgColor.value };
    },
    selectStyle(style) {
      this.selectedStyle = style;
    },
    closeBoardPopup() {
      this.$emit("close-board-popup");
    },
  },
  computed: {
    bgStyles() {
      const imgStyles = this.imgs.map((currImg) => {
        const img = require("@/assets/img/background/" + currImg.value);
        return { id: currImg.id, style: { backgroundImage: `url(${img})` } };
      });
      const colorStyles = this.colors.map((currColor) => {
        return {
          id: currColor.id,
          style: { backgroundColor: currColor.value },
        };
      });
      const styles = imgStyles.concat(colorStyles);
      return styles;
    },
  },
};
</script>

<style>
</style>
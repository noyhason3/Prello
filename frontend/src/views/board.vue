<template>
  <section class="board-container" v-if="board" ref="board">
    <div :style="boardStyle" class="board-bg"></div>
    <board-header
      :board="board"
      :boardStyle="boardStyle"
      @toggle-board-menu="toggleBoardMenu"
    />
    <draggable
      v-model="board.groups"
      group="group"
      @start="drag = true"
      @end="
        drag = false;
        saveBoard();
      "
      animation="150"
      empty-insert-threshold="5"
      filter=".group-tasks-preview,textarea,.editable-title"
      :prevent-on-filter="false"
      draggable=".group"
      class="clean-list main"
      tag="ul"
    >
      <group
        v-for="(group, idx) in board.groups"
        :key="group.id"
        :group="group"
        :boardId="board._id"
        :idx="idx"
        @save-board="saveBoard"
      />
      <div class="add-new-group">
        <button
          v-if="!isAddNewGroup"
          @click="isAddNewGroup = true"
          class="group-addition"
        >
          + Add another list
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
    <board-menu
      :boardStyle="boardStyle"
      :board="board"
      :activities="activities"
      :class="{ 'show-menu': isOpenMenu }"
      @toggle-board-menu="toggleBoardMenu"
    />
    <router-view />

    <div class="dragged-container" style="position: absolute"></div>
  </section>
</template>


<script>
// import { boardService } from "../services/board.service";
import boardHeader from "../cmps/board/board-header.vue";
import group from "../cmps/board/group.vue";
import editableText from "@/cmps/common/editable-text.vue";
import draggable from "vuedraggable";
import boardMenu from "@/cmps/board/menu/board-menu.vue";

export default {
  data() {
    return {
      maxHeight: "0px",
      isAddNewGroup: false,
      newGroup: JSON.parse(JSON.stringify(this.$store.getters.getEmptyGroup)),
      isOpenMenu: false,
    };
  },
  async created() {
    if (!this.$store.getters.board) {
      const boardId = this.$route.params.boardId;
      await this.loadBoard(boardId);
      this.assignClasses();
      this.board.lastViewedAt = Date.now();
      this.saveBoard();
    }
  },
  mounted() {
    const boardHeader = this.$refs.boardHeader;
    if (boardHeader) {
      this.$store.commit({
        type: "setBoardHeader",
        boardHeader,
      });
    }
  },
  destroyed() {
    const header = this.$store.getters.mainHeader;
    header.classList.remove("img-bg");
  },
  methods: {
    async loadBoard(boardId) {
      await this.$store.dispatch({ type: "getBoard", boardId });
    },
    async addGroup() {
      if (!this.newGroup.title) return;
      this.newGroup.board = { id: this.board._id };
      await this.$store.dispatch({ type: "saveGroup", group: this.newGroup });
      this.newGroup = JSON.parse(
        JSON.stringify(this.$store.getters.getEmptyGroup)
      );
      this.isAddNewGroup = false;
    },
    async saveBoard() {
      await this.$store.dispatch({ type: "saveBoard", board: this.board });
    },
    assignClasses() {
      const header = this.$store.getters.mainHeader;
      const body = this.$refs.board;
      if (this.board.style.bgImg || this.board.style.bgColor) {
        header.classList.add("img-bg");
        body.classList.add("img-bg");
      } else {
        header.classList.remove("img-bg");
        body.classList.remove("img-bg");
      }
    },
    toggleBoardMenu() {
      this.isOpenMenu = !this.isOpenMenu;
    },
  },
  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
    background() {
      const style = this.$store.getters.currBoard.style;
      console.log("style:", style);
      if (style.bgImg?.value) {
        return {
          "background-image":
            "url(" +
            require("@/assets/img/background/" + style.bgImg.value) +
            ")",
          "background-size": "cover",
        };
      } else if (style.bgColor) {
        return {
          background: style.bgColor.value,
        };
      }
    },
    boardStyle() {
      if (this.board.style.bgImg?.value) {
        const img = require("@/assets/img/background/" +
          this.board.style.bgImg.value);
        return { backgroundImage: `url(${img})` };
      }
      return { backgroundColor: this.board.style.bgColor.value };
    },
    activities() {
      // if (this.taskId) {
      //   return this.board.activities.filter((activity) => {
      //     return activity.task._id === this.taskId;
      //   });
      // } else {
      return this.board.activities;
      // }
    },
  },
  watch: {
    "$route.params.boardId"(boardId) {
      this.loadBoard(boardId);
    },
  },
  components: {
    boardHeader,
    group,
    editableText,
    draggable,
    boardMenu,
  },
};
</script>

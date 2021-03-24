<template>
  <section class="board" v-if="board" ref="board">
    <img
      class="board-bg"
      :src="require('@/assets/img/background/' + board.style.bgImg.value)"
      alt=""
    />
    <board-header :board="board" />
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
      filter=".group-tasks-preview"
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

    <router-view />
  </section>
</template>


<script>
import { boardService } from "../services/board.service";
import boardHeader from "../cmps/board/board-header.vue";
import group from "../cmps/board/group.vue";
import editableText from "@/cmps/common/editable-text.vue";
import draggable from "vuedraggable";

export default {
  data() {
    return {
      maxHeight: "0px",
      isAddNewGroup: false,
      newGroup: JSON.parse(JSON.stringify(this.$store.getters.getEmptyGroup)),
    };
  },
  async created() {
    if (!this.$store.getters.board) {
      const boardId = this.$route.params.boardId;
      await this.$store.dispatch({ type: "getBoard", boardId });
      this.assignClasses();
    }
  },
  destroyed() {
    const header = this.$store.getters.mainHeader;
    header.classList.remove("img-bg");
  },
  methods: {
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
      if (this.board.style.bgImg) {
        header.classList.add("img-bg");
        body.classList.add("img-bg");
      } else {
        header.classList.remove("img-bg");
        body.classList.remove("img-bg");
      }
    },
  },
  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
    background() {
      const style = this.$store.getters.currBoard.style;
      if (style.bgImg) {
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
  },
  components: {
    boardHeader,
    group,
    editableText,
    draggable,
  },
};
</script>

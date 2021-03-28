<template>
  <section class="board-header" :class="{ 'img-bg': isBoardOpen }">
    <div class="board-title">
      <editableTitle v-model="board.title" />
      <button
        @click="toggleStarred"
        class="icon star"
        :class="{ 'is-starred': this.board.isStarred }"
      ></button>
    </div>
    <member-list
      :members="board.members"
      :isTaskRelated="false"
      class="board-header-members"
      @remove-task-member="removeMember"
    />
    <button @click="toggleBoardMenu" class="menu-btn white-btn">
      <span class="icon elipsis"></span>
      Show Menu
    </button>
  </section>
</template>
<script>
import memberList from "../common/member-list.vue";
import editableTitle from "@/cmps/common/editable-title.vue";
export default {
  props: {
    board: Object,
    boardStyle: Object,
  },
  data() {
    return {
      isBoardOpen: false,
    };
  },
  created() {
    const boardId = this.$route.params.boardId;
    if (boardId) return (this.isBoardOpen = true);
    this.isBoardOpen = false;
  },
  methods: {
    toggleStarred() {
      this.board.isStarred = !this.board.isStarred;
      this.$store.dispatch({ type: "saveBoard", board: this.board });
    },
    toggleBoardMenu() {
      this.$emit("toggle-board-menu");
    },
    removeMember(memberId) {
      const idx = this.board.members.findIndex(
        (member) => member._id === memberId
      );
      if (idx >= 0) {
        this.board.members.splice(idx, 1);
        this.$store.dispatch({ type: "saveBoard", board: this.board });
      }
    },
  },
  computed: {
    starredClass() {
      var str = "is-starred ";
      str += this.board.isStarred ? "active" : "unactive";
      return str;
    },
    saveBoard() {
      this.$store.dispatch({ type: "saveBoard", board: this.board });
    },
  },
  watch: {
    "board.title"() {
      this.saveBoard;
    },
    async "$route.params.boardId"(boardId) {
      if (!boardId) return (this.isBoardOpen = false);
      this.isBoardOpen = true;
      this.$store.commit("setBoard", this.board);
    },
  },
  components: {
    editableTitle,
    memberList,
  },
};
</script>

<template>
  <section class="board-header" :class="{ 'img-bg': isBoardOpen }">
    <div class="board-title">
      <editableTitle v-model="board.title" />
      <!-- <button @click="toggleStarred" :class="starredClass">&#xf005;</button> -->
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
    />
    <!-- <div class="board-header-members"> -->
    <!-- </div> -->
    <button class="menu-btn">
      <span class="icon elipsis"></span>Show Menu
    </button>
  </section>
</template>
<script>
import memberList from "../common/member-list.vue";
import editableTitle from "@/cmps/common/editable-title.vue";
export default {
  props: {
    board: Object,
    isBoardOpen: false,
  },
  created() {
      const boardId = this.$route.params.boardId
      console.log("boardId:", boardId);
      if (boardId) return (this.isBoardOpen = true);
      this.isBoardOpen = false;
    // console.log("this.board.isStarred:", this.board.isStarred);
  },
  methods: {
    toggleStarred() {
      this.board.isStarred = !this.board.isStarred;
      this.$store.dispatch({ type: "saveBoard", board: this.board });
    },
  },
  computed: {
    starredClass() {
      var str = "is-starred ";
      str += this.board.isStarred ? "active" : "unactive";
      return str;
    },
    saveBoard(val) {
      // console.log(
      //   "file: board-header.vue - line 35 - saveBoard - val",
      //   this.board.title
      // );
      this.$store.dispatch({ type: "saveBoard", board: this.board });
    },
  },
  watch: {
    "board.title"() {
      this.saveBoard;
    },
    // "$route.params.boardId"(boardId) {
    //   console.log("boardId:", boardId);
    //   if (boardId) return (this.isBoardOpen = true);
    //   this.isBoardOpen = false;
    // },
  },
  components: { editableTitle, memberList },
};
</script>

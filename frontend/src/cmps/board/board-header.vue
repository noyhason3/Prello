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
    <button @click="toggleBoardMenu" class="menu-btn">
      <span class="icon elipsis"></span>
      Show Menu
    </button>
    <div class="board-menu" :class="{'show-menu':isOpenMenu}">
      <header>
        <h2 class="headline">Menu</h2>
        <button @click="toggleBoardMenu" class="btn close icon x"></button>
      </header>
      <main>
        <ul class="clean-list">
          <li class="board-menu-layout">
            <div class="icon dashboard"></div>
            <button>Dashboard</button>
          </li>
          <li class="board-menu-layout">
            <div :style="boardStyle" class="thumbnail"></div>
            <button>Change background</button>
          </li>
        </ul>
          <div class="board-menu-layout activity-list">
            <div class="icon list"></div>
            <h3>Activity</h3>
          </div>
      </main>
    </div>
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
      isOpenMenu:false
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
    toggleBoardMenu(){
      this.isOpenMenu = !this.isOpenMenu 
    }
  },
  computed: {
    starredClass() {
      var str = "is-starred ";
      str += this.board.isStarred ? "active" : "unactive";
      return str;
    },
    saveBoard(val) {
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
  components: { editableTitle, memberList },
};
</script>

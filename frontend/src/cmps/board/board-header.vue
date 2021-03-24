<template>
  <section class="board-header">
    <!-- <div class="board-title">{{ board.title }}</div> -->
    <editableTitle v-model="board.title" />
    <button @click="toggleStarred" :class="starredClass">&#xf005;</button>
    <div class="board-header-members">
      <member-list :members="board.members" :isTaskRelated="false" />
    </div>
    <div class="menu-btn">Show Menu</div>
  </section>
</template>
<script>
import memberList from "../common/member-list.vue";
import editableTitle from "@/cmps/common/editable-title.vue";
export default {
  props: {
    board: Object,
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
      console.log(
        "file: board-header.vue - line 35 - saveBoard - val",
        this.board.title
      );
      this.$store.dispatch({ type: "saveBoard", board: this.board });
    },
  },
  watch: {
    "board.title"() {
      this.saveBoard;
    },
  },
  components: { editableTitle, memberList },
};
</script>

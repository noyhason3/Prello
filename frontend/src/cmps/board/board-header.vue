<template>
  <section class="board-header">
    <editableTitle v-model="board.title" class="board-title"/>
    <!-- <button @click="toggleStarred" :class="starredClass">&#xf005;</button> -->
    <button @click="toggleStarred" v-if="this.board.isStarred" class="icon star" :class="{'is-starred':this.board.isStarred}"></button>

    <!-- <div class="board-header-members"> -->
      <member-list :members="board.members" :isTaskRelated="false" class="board-header-members"/>
    <!-- </div> -->
    <div class="menu-btn"><span class="icon elipsis"></span>Show Menu</div>
  </section>
</template>
<script>
import memberList from "../common/member-list.vue";
import editableTitle from "@/cmps/common/editable-title.vue";
export default {
  props: {
    board: Object,
  },
  created(){
    console.log('this.board.isStarred:', this.board.isStarred)
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

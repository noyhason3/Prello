<template>
  <nav id="nav">
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/dashboard">dashboard</router-link> |
      <router-link to="/board">board list</router-link> |
      <router-link to="/board/demo101">board</router-link> -->
    <router-link
      to="/"
      style="font-family: fa-solid"
      class="nav-link icon house"
    ></router-link>
    <router-link to="/board" v-if="user._id" class="nav-link boards"
      ><div class="icon board"></div>
      Boards</router-link
    >
    <div
      class="search-container"
      @click="openSearch"
      :class="{ active: isActive }"
      ref="boardSearch"
      tabindex="0;"
      @blur="closeSearch"
    >
      <board-search-popup
        v-if="isActive"
        :boards="boards"
        @close-search="closeSearch"
        tabindex="0"
        @blur.native="blurHandler"
      />
      <input
        type="text"
        :placeholder="placeholder"
        v-model="filterBy.txt"
        @input="searchBoards"
        @blur="blurHandler"
      />
      <span v-if="!isActive" class="icon search"></span>
      <span v-else @click.stop="closeSearch" class="icon x"></span>
    </div>

    <div>
      <!-- TODO: ADD Board Menue -->
    </div>
  </nav>
</template>

<script>
import boardSearchPopup from "./board-search-popup.vue";
export default {
  data() {
    return {
      isActive: false,
      placeholder: "Jump to...",
      filterBy: { txt: "" },
      boards: null,
    };
  },
  async created() {
    this.boards = await this.$store.dispatch({ type: "loadBoards" });
  },
  methods: {
    async openSearch() {
      this.isActive = true;
      this.$refs.boardSearch.focus;
      this.placeholder = "Search...";
    },
    closeSearch() {
      this.isActive = false;
      this.placeholder = "Jump to...";
    },
    searchBoards() {
      this.boards = this.$store.getters.boards.filter(({ title }) =>
        title.toLowerCase().includes(this.filterBy.txt.toLowerCase())
      );
    },
    logHi() {
      console.log("hI! :)");
    },
    blurHandler(ev) {
      if (ev.relatedTarget) {
        const classList = Array.from(ev.relatedTarget.classList);
        if (
          classList.includes("board-search") ||
          classList.includes("search-container")
        )
          ev.target.focus();
        else {
          console.log("closeSearch");
          this.closeSearch();
        }
      } else this.closeSearch();
    },
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
  },
  components: {
    boardSearchPopup,
  },
};
</script>

<style>
</style>
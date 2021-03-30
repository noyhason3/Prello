<template>
  <div class="board-menu">
    <board-menu-popup v-if="isMainMenu" @toggle-board-menu="toggleBoardMenu">
      <div slot="header">
        <h2 class="headline">Menu</h2>
      </div>
      <div slot="main" class="main-part">
        <ul class="clean-list board-menu-options">
          <li class="board-menu-layout" @click="toggleDashboard">
            <div class="icon dashboard"></div>
            <button>Dashboard</button>
          </li>
          <li class="board-menu-layout" @click="toggleStylePicker">
            <div :style="boardStyle" class="thumbnail"></div>
            <button>Change background</button>
          </li>
        </ul>
      <!-- </div>
      <div slot="footer" class="activity-list" v-if="activities.length"> -->
        <div class="board-menu-layout">
          <div class="icon list"></div>
          <h3>Activity</h3>
        </div>
        <activity-list 
        :activities="activities" 
        :layoutClass="'board-menu-layout'" 
        :isTaskList="false"
        class="activity-list"/>
      </div>
      <!-- <activity-list /> -->
    </board-menu-popup>
    <board-menu-style
      v-else
      :board="board"
      @toggle-board-menu="toggleBoardMenu"
      @open-board-menu="openBoardMenu"
    />
  </div>
</template>

<script>
import boardMenuPopup from "@/cmps/board/menu/board-menu-popup.vue";
import boardMenuStyle from "@/cmps/board/menu/board-menu-style.vue";
import activityList from "@/cmps/common/activity-list.vue";
export default {
  props: {
    boardStyle: Object,
    board: Object,
    activities: Array,
  },
  data() {
    return {
      isMainMenu: true,
    };
  },
  methods: {
    toggleBoardMenu() {
      this.$emit("toggle-board-menu");
      this.openBoardMenu();
    },
    openBoardMenu() {
      this.isMainMenu = true;
    },
    toggleDashboard() {
      const boardId = this.board._id;
      this.$router.push("/board/" + boardId + "/dashboard");
      this.toggleBoardMenu();
    },
    toggleStylePicker() {
      this.isMainMenu = false;
    },
  },
  components: {
    boardMenuPopup,
    boardMenuStyle,
    activityList,
  },
};
</script>

<style>
</style>
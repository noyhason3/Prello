<template>
  <section>
    <board-menu-popup v-if="isStyleMenu" @toggle-board-menu="toggleBoardMenu">
      <div slot="header">
        <button @click="backToLastMenu" class="icon back"></button>
        <h2 class="headline">Change background</h2>
      </div>
      <div slot="main" class="choose-style-menu">
        <div>
          <img
            src="@/assets/img/menu/photos.jpg"
            alt="photos"
            class="board-menu-img"
            @click="openImgMenu"
          />
          <h2>Photos</h2>
        </div>
        <div>
          <img
            src="@/assets/img/menu/colors.jpg"
            alt="colors"
            class="board-menu-img"
            @click="openColorMenu"
          />
          <h2>Colors</h2>
        </div>
      </div>
    </board-menu-popup>
    <!-- <board-menu-popup > -->
    <style-list
      v-else-if="isImgMenu"
      :styleList="imgStyles"
      :headline="'Photos'"
      @toggle-style-menu="toggleStyleMenu"
      @set-board-style="setBoardStyle"
      @toggle-board-menu="toggleBoardMenu"
    />
    <!-- </board-menu-popup> -->
    <!-- <board-menu-popup > -->
    <style-list
      v-else
      :styleList="colorStyles"
      :headline="'Colors'"
      @toggle-style-menu="toggleStyleMenu"
      @set-board-style="setBoardStyle"
      @toggle-board-menu="toggleBoardMenu"
    />
    <!-- </board-menu-popup> -->
  </section>
</template>

<script>
import boardMenuPopup from "@/cmps/board/menu/board-menu-popup.vue";
import styleList from "@/cmps/board/menu/style-list.vue";
import utilService from "../../../services/util.service";

export default {
  props: {
    board: Object,
  },
  data() {
    return {
      // selectedStyle: null,
      boardToEdit: JSON.parse(JSON.stringify(this.board)),
      isStyleMenu: true,
      isImgMenu: false,
      imgs: [],
      colors: [
        { id: "c101", value: "#C10BB3" },
        { id: "c102", value: "#0079bf" },
        { id: "c103", value: "#003152" },
        { id: "c105", value: "#f2d600" },
        { id: "c106", value: "#61bd4f" },
        { id: "c107", value: "#ff9f1a" },
        { id: "c108", value: "#eb5a46" },
        { id: "c109", value: "#c377e0" },
        { id: "c110", value: "#00c2e0" },
        { id: "c111", value: "#51e898" },
      ],
    };
  },
  mounted() {
    this.importAll(require.context("@/assets/img/background/", true, /\.jpg$/));
  },
  methods: {
    importAll(r) {
      r.keys().forEach((key) => {
        const id = utilService.makeId();
        const value = key.replace("./", "");
        this.imgs.push({ id, value });
      });
    },
    toggleBoardMenu() {
      this.$emit("toggle-board-menu");
    },
    backToLastMenu() {
      this.$emit("open-board-menu");
    },
    toggleStyleMenu() {
      this.isStyleMenu = !this.isStyleMenu;
    },
    openColorMenu() {
      this.selectedStyle = this.colorStyles[0];
      this.toggleStyleMenu();
      this.isImgMenu = false;
    },
    openImgMenu() {
      this.selectedStyle = this.imgStyles[0];
      this.toggleStyleMenu();
      this.isImgMenu = true;
    },
    setBoardStyle({ styleId, isImg }) {
      // console.log('isImg:', isImg)
      if (isImg) {
        if (this.boardToEdit.style.bgImg?.id === styleId) return;
        this.boardToEdit.style.bgImg = this.imgs.find(({ id }) => id === styleId);
      } else {
        this.boardToEdit.style.bgImg = {};
        if (this.boardToEdit.style.bgColor?.id === styleId) return;
        this.boardToEdit.style.bgColor = this.colors.find(({ id }) => id === styleId);
      }      
      this.$store.dispatch('saveBoard', {board:this.boardToEdit, activity:null, task:null})
    },
  },
  computed: {
    imgStyles() {
      const imgs = this.imgs.map((currImg) => {
        const img = require("@/assets/img/background/" + currImg.value);
        return { id: currImg.id, style: { backgroundImage: `url(${img})` } };
      });
      return imgs;
    },
    colorStyles() {
      const colors = this.colors.map((currColor) => {
        return {
          id: currColor.id,
          style: { backgroundColor: currColor.value },
        };
      });
      return colors;
    },
  },
  components: {
    boardMenuPopup,
    styleList,
  },
};
</script>

